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

export function newMessage(message, id) {
  return {
    type: NEW_MESSAGE,
    message,
    id
  };
}

export function deleteMessage(id) {
  return {
    type: DELETE_MESSAGE,
    id
  };
}

export function highlightMessage(id) {
 return {
   type: HIGHLIGHT_MESSAGE,
   id
 };
}

const defaultState = {
  id: '',
  message: '',
  messages: []
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case UPDATE_MESSAGE: 
      return {
        message: action.message,
        ...state
      }
    case NEW_MESSAGE:
      return {
        messages: [...state, { message: action.message, id: action.id, highlight: false }],
        ...state
      }
      return 
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.filter(message => message.id !== action.id)
      };
    case HIGHLIGHT_MESSAGE:
      return {
        ...state,
        messages: state.map(message =>
          message.id === action.id ? { ...message, highlight: true } : message)
      };
    default:
      return state;
  }
}

