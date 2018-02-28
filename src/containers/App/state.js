export function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
    nickname: state.nickname
  };
}

