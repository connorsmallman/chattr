import { sendMessage, sendUserTyping } from '../../state/modules/chat';

export function mapDispatchToProps(dispatch) {
  return {
    sendMessage: message => dispatch(sendMessage(message)),
    sendUserTyping: isTyping => dispatch(sendUserTyping(isTyping))
  }
}