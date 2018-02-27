import React from 'react';
import Message from './Message';

export default function MessageList(props) {
  return (
    <div>
      {props.messages.map(message => <Message {...message} />)}
    </div>
  );
}