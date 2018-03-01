export const SEND_MESSAGE = '@chattr/chat/SEND_MESSAGE';
export const NEW_MESSAGE = '@chattr/chat/NEW_MESSAGE';
export const UPDATE_MESSAGE = '@chattr/chat/UPDATE_MESSAGE';
export const DELETE_MESSAGE = '@chattr/chat/DELETE_MESSAGE';
export const HIGHLIGHT_MESSAGE = '@chattr/chat/HIGHLIGHT_MESSAGE';
export const SEND_USER_TYPING = '@chattr/chat/SEND_USER_TYPING';
export const FADE_MESSAGE = '@chattr/chat/FADE_MESSAGE';

export function sendUserTyping(isTyping) {
  return {
    type: SEND_USER_TYPING,
    isTyping
  };
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    message
  };
}

export function newMessage(message, think, isOwner, isFaded) {
  return {
    type: NEW_MESSAGE,
    message,
    isOwner,
    think,
    isFaded
  };
}

export function deleteMessage() {
  return {
    type: DELETE_MESSAGE
  };
}

export function fadeMessage() {
  return {
    type: FADE_MESSAGE
  };
}

const defaultState = {
  id: '',
  messages: [],
  isTyping: false
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { 
          message: action.message, 
          think: action.think,
          isOwner: action.isOwner
        }],
      }
    case DELETE_MESSAGE:
      const messages = state.messages.pop();
      return {
        ...state,
        messages: [...messages]
      };
    case FADE_MESSAGE: {
      const message = state.messages[state.messages.length - 1];
      const messages = state.messages.pop();
      return {
        ...state,
        messages: [...messages, { ...message, isFaded: true }]
      };
    }
    default:
      return state;
  }
}

