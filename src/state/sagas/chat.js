import io from 'socket.io-client';
import { eventChannel, delay, END } from 'redux-saga';
import { fork, take, call, put, select, cancel, cancelled } from 'redux-saga/effects';
import { SEND_MESSAGE, newMessage, deleteMessage, highlightMessage } from './modules/messages';
import { setNickname } from './modules/nickname';

function connect() {
  const socket = io('http://localhost');
  return new Promise((resolve, reject) => {
    socket.on('open', () => resolve(socket));
    socket.on('error', reject);
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('broadcast_message', payload => {
      const { event, data } = JSON.parse(payload);
      emit({ event, data });
    });

    socket.on('close', () => emit(END));
    socket.on('error', console.log);

    return () => socket.close();
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);

  try {
    while (true) {
      const payload = yield take(channel);
      switch (payload.event) {
        case 'broadcast_message':
          yield put(newMessage());
          break;
        case 'set_nickname': 
          yield put(setNickname());
          break;
        case 'delete_message':
          yield put(deleteMessage());
          break;
        case 'think_message':
          yield put(highlightMessage());
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
    const payload = yield take(SEND_MESSAGE);

    socket.send(JSON.stringify({
      event: 'message',
      data
    }));
  }
}

function* handleIO(socket) {
  const readFork = yield fork(read, socket);
  const writeFork = yield fork(write, socket);
}

export function* watchChat() {
  try {
    const socket = yield call(connect);
    yield fork(handleIO, socket);
  } catch (e) {
    // handle disconnection
  }
}