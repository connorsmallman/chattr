import React from 'react';
import Message from './Message';

export function MessageList(props) {
  return props.messages.map(message => <Message {...message} />);
}