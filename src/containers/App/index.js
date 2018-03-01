import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './state';
import ChatForm from '../Chat';
import MessageList from '../../components/MessageList';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  background: black;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const ChatContainer = styled.div`
  background: lightblue;
  display: grid;
  grid-auto-rows: 1rem 1fr;
  height: 80vh;
  width: 80vh;
`;

class App extends Component {
  constructor() {
    super();

    this.handleSendMessage.bind(this);
    this.handleOnChange.bind(this);
  }

  handleSendMessage(payload) {
    this.props.handleSendMessage(payload);
  }

  handleOnChange(e) {
    this.props.updateMessage(e.target.value);
  }

  render() {
    return (
      <Container>
        <ChatContainer>
          <span>{this.props.name}</span>
          <MessageList 
            participantTyping={this.props.participantTyping} 
            messages={this.props.messages} 
          />
          <ChatForm onSubmit={this.handleSendMessage} onChange={this.handleOnChange} value={this.props.message} />
        </ChatContainer>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(App);