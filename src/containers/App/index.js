import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './state';
import Chat from '../Chat';
import MessageList from '../../components/MessageList';
import styled from 'styled-components';

const Container = styled.div`
  background: lightblue;
  display: grid;
  grid-auto-rows: 1rem 1fr 2rem;
  height: 100%;
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
        <span>{this.props.name}</span>
        <MessageList messages={this.props.messages} />
        <Chat onSubmit={this.handleSendMessage} onChange={this.handleOnChange} value={this.props.message} />
      </Container>
    );
  }
}

export default connect(mapStateToProps)(App);