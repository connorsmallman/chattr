import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './state';
import MessageList from '../../components/MessageList';
import Input from '../../components/Chat';

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
      <div>
        <MessageList messages={this.props.messages} />
        <Input onSubmit={this.handleSendMessage} onChange={this.handleOnChange} value={this.props.message} />
      </div>
    );
  }
}