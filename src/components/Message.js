import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.span`
  background: grey;
  border-radius: .5rem .5rem .5rem 0;
  color: ${props => props.think ? 'grey' : '#333' };
  margin: .6rem;
  padding: .2rem .4rem;
  position: relative;
  width: min-content;

  ${props => props.owner ? 
    `
    background: lightgreen;
    border-radius: .5rem .5rem 0 .5rem;
    margin-left: auto;

    &:after {
      content: '';
      border: .6rem solid transparent;
      border-bottom-color: lightgreen;
      bottom: 0;
      right: -.6rem;
      position: absolute;
    }` : `
    &:before {
      content: '';
      border: .6rem solid transparent;
      border-bottom-color: grey;
      bottom: 0;
      left: -.6rem;
      position: absolute;
    }`
  }
`;

export default function Message(props) {
  return (
    <MessageContainer owner={props.owner} think={props.think}>{props.message}</MessageContainer>
  );
}