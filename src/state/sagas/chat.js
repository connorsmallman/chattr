import io from 'socket.io-client';
import { eventChannel, delay, END } from 'redux-saga';
import { fork, take, call, put, select, cancel, cancelled } from 'redux-saga/effects';
import { SEND_MESSAGE, newMessage, deleteMessage, highlightMessage } from '../modules/chat';
import { setNickname } from '../modules/nickname';

function connect() {
  const socket = io();
  return new Promise((resolve, reject) => {
    socket.on('connect', () => resolve(socket));
    socket.on('error', reject);
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('message', payload => 
      emit(JSON.parse(payload)));

    socket.on('close', () => emit(END));
    socket.on('error', console.log);

    return () => socket.close();
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);

  try {
    while (true) {
      const { data, event } = yield take(channel);

      switch (event) {
        case 'new_message':
          const { message, text, userId, think } = data;
          const owner = userId === socket.id;
          yield put(newMessage(message.text, message.id, think, owner));
          break;
        case 'set_nickname': 
          yield put(setNickname(data.nickname));
          break;
        case 'delete_message':
          yield put(deleteMessage());
          break;
        default: break;
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* write(socket) {
  while (true) {
    const { message } = yield take(SEND_MESSAGE);
    const commands = message.match(/\/(\w+)/ig) || [];

    const data = {
      message: commands.length ? message.substr(message.indexOf(' ') + 1) : message,
      command: commands[0]
    };

    socket.emit('message', JSON.stringify(data));
  }
}

function* handleIO(socket) {
  const readFork = yield fork(read, socket);
  const writeFork = yield fork(write, socket);
}

export function* watchChat() {
  try {
    const socket = yield call(connect);
    console.log(socket);
    yield fork(handleIO, socket);
  } catch (e) {
    // handle disconnection
  }
}