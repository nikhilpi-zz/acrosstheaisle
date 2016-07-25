import React, { Component } from 'react';

export default class MessageInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: ''
    }
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMessage(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var message = this.state.message.trim();
    if (!message) {
      return;
    }

    this.props.onMessageSubmit(message);
    this.setState({message: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.message}
          onChange={this.handleChangeMessage}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}
