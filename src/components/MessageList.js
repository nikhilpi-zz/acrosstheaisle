import React, { Component } from 'react';

export default class MessageList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.messages.map((message)=>{
            return <li>{message.party}: {message.body}</li>
          })}
        </ul>
      </div>
    );
  }
}
