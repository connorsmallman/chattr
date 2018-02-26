import React from 'react';

export default function Form() {
  return (
    <form onSubmit={this.props.onSubmit}>
      <input onChange={props.onChange} value={props.value} />
      <button type={'submit'}>SEND</button>
    </form>
  );
}