export const SET_NICKNAME = '@chattr/nickname/SET_NICKNAME';

export function setNickname(name) {
  return {
    type: SET_NICKNAME,
    name
  };
};

export default function reducer(state = '', action) {
  switch (action.type) {
    case SET_NICKNAME:
      return name;
    default:
      return state;
  }
}

