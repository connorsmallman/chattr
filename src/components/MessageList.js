import React from 'react';
import Message from './Message';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
`;

export default function MessageList(props) {
  return (
    <Container>
      {props.messages.map((m, key) => <Message key={key} {...m} />)}
    </Container>
  );
}