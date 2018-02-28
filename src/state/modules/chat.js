export const SEND_MESSAGE = '@chattr/messages/SEND_MESSAGE';
export const NEW_MESSAGE = '@chattr/messages/NEW_MESSAGE';
export const UPDATE_MESSAGE = '@chattr/messages/UPDATE_MESSAGE';
export const DELETE_MESSAGE = '@chattr/messages/DELETE_MESSAGE';
export const HIGHLIGHT_MESSAGE = '@chattr/messages/HIGHLIGHT_MESSAGE';

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    message
  };
}

export function newMessage(message, id, think) {
  return {
    type: NEW_MESSAGE,
    message,
    id,
    think
  };
}

export function deleteMessage() {
  return {
    type: DELETE_MESSAGE
  };
}

const defaultState = {
  id: '',
  messages: []
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { message: action.message, id: action.id, highlight: action.think }],
      }
    case DELETE_MESSAGE:
      const messages = state.messages.pop();
      return {
        ...state,
        messages: [...messages]
      };
    default:
      return state;
  }
}

