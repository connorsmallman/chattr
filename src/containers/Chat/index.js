import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from './state';
import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  padding: .4rem;
`;

const Button = styled.button`
  background: green;
  border: none;
  color: white;
  padding: .4rem .6rem;
`;

class ChatForm extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnChange(e) {
    this.setState({ value: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state.value) {
      this.props.sendMessage(this.state.value);
      this.setState({ value: '' });
    }
  }

  handleOnFocus() {
    this.props.sendUserTyping(true);
  }

  handleOnBlur() {
    this.props.sendUserTyping(false);
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <Group>
          <Input 
            onChange={this.handleOnChange} 
            value={this.state.value}
            onFocus={this.handleOnFocus} 
            onBlur={this.handleOnBlur} 
          />
          <Button type={'submit'}>SEND</Button>
        </Group>
      </form>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(ChatForm); 