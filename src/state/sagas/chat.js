import io from 'socket.io-client';
import { eventChannel, delay, END } from 'redux-saga';
import { fork, take, call, put, select, cancel, cancelled } from 'redux-saga/effects';
import { SEND_MESSAGE, newMessage, deleteMessage, highlightMessage, SEND_USER_TYPING } from '../modules/chat';
import { setTyping, setNickname } from '../modules/participant';

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
          const { message, isOwner, think } = data;
          yield put(newMessage(message, think, isOwner));
          break;
        case 'set_nickname': 
          yield put(setNickname(data.nickname));
          break;
        case 'delete_message':
          yield put(deleteMessage());
          break;
        case 'set_participant_typing':
          yield put(setTyping(data.isTyping));
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

function* writeMessage(socket) {
  while (true) {
    const { message } = yield take(SEND_MESSAGE);
    socket.emit('message', JSON.stringify({ message, userId: socket.id }));
  }
}

function* writeActivity(socket) {
  while (true) {
    const { isTyping } = yield take(SEND_USER_TYPING);
    socket.emit('activity', JSON.stringify({ isTyping, userId: socket.id }));
  }
}

function* write(socket) {
  const writeMessageFork = yield fork(writeMessage, socket);
  const writeActivityFork = yield fork(writeActivity, socket);
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