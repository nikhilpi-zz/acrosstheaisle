import React, { Component } from 'react';
import $ from 'jquery';
import styles from './MessageListStyles';

export default class MessageList extends Component {

    render() {
        return (
          <div style={styles.container}>
            {this.props.messages.map((message)=>{
              return <div style={styles.row}><span style={styles[message.party]}>{message.party}:</span> {message.body}</div>
            })}
          </div>
        );
    }
}
