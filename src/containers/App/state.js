export function mapStateToProps(state) {
  return {
    name: state.participant.nickname,
    participantTyping: state.participant.isTyping,
    messages: state.chat.messages
  };
}

