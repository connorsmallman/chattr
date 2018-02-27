import { sendMessage } from "../../state/modules/messages";

export function mapDispatchToProps(dispatch) {
  return {
    sendMessage: message => dispatch(sendMessage(message))
  }
}