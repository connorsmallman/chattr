export function mapStateToProps(state) {
  return {
    name: state.nickname,
    messages: state.chat.messages
  };
}

