import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from './state';

class ChatForm extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e) {
    this.setState({ value: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input onChange={this.handleOnChange} value={this.state.value} />
        <button type={'submit'}>SEND</button>
      </form>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(ChatForm); 