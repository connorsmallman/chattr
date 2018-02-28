import { sendMessage } from "../../state/modules/chat";

export function mapDispatchToProps(dispatch) {
  return {
    sendMessage: message => dispatch(sendMessage(message))
  }
}