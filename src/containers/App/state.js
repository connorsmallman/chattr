export function mapStateToProps(state) {
  return {
    messages: state.messages.messages,
    nickname: state.nickname
  };
}

