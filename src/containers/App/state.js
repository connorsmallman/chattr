import { newMessage } from "../../state/modules/messages";

export function mapStateToProps(state) {
  return {
    message: state.messages.message,
    messages: state.messages,
    nickname: state.nickname
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    updateMessage: message => dispatch(updateMessage(message)),
    sendMessage: message => dispatch(sendMessage(message))
  }
}