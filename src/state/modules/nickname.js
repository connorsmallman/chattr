export const SET_NICKNAME = '@chattr/nickname/SET_NICKNAME';

export function setNickname(name) {
  return {
    type: SET_NICKNAME,
    name
  };
};

const defaultState = 'unknown';

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_NICKNAME:
      return action.name;
    default:
      return state;
  }
}

