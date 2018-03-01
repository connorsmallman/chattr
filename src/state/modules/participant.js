export const SET_NICKNAME = '@chattr/paticipant/SET_NICKNAME';
export const SET_TYPING = '@chattr/paticipant/SET_TYPING';

export function setNickname(name) {
  return {
    type: SET_NICKNAME,
    name
  };
};

export function setTyping(isTyping) {
  return {
    type: SET_TYPING,
    isTyping
  }
}

const defaultState = {
  nickname: 'unknown',
  isTyping: false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.name
      };
    case SET_TYPING:
      return {
        ...state,
        isTyping: action.isTyping
      };
    default:
      return state;
  }
}

