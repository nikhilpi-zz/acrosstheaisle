import React, { Component } from 'react';
import firebase from '../../firebase'
import { getChatandAdd } from '../../lib/chatFinder';
import styles from './styles';
import $ from 'jquery';

import MessageList from '../../components/MessageList'
import MessageInput from '../../components/MessageInput'



export default class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      state: 'waiting',
      chatId: this.props.params.id,
      user: firebase.auth().currentUser,
      profile: {},
      loggedIn: false,
      online: []
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.getChatandAdd = getChatandAdd.bind(this);
  }

  componentDidMount(){
    this.userRef = firebase.syncState('users/'+this.state.user.uid, {
      context: this,
      state: 'profile',
    });


    this.messagesRef = firebase.syncState('chats/'+this.state.chatId+'/messages', {
      context: this,
      state: 'messages',
      asArray: true
    });

    this.stateRef = firebase.syncState('chats/'+this.state.chatId+'/state', {
      context: this,
      state: 'state',
    });

    firebase.database().ref(this.stateRef.endpoint).onDisconnect().set('disconnected')

    var presenceRef = firebase.push('presence',{
      data: {uid: this.state.user.uid}
    })

    presenceRef.onDisconnect().remove();

    this.presenceRef = firebase.syncState('presence', {
      context: this,
      state: 'online',
      asArray: true
    });

  }

  componentDidUpdate(prevProps, prevState) {
    // Check if new message was added, for example:
        if (this.state.messages.length === prevState.messages.length + 1) {
            var d = $('#message_list');
            d.scrollTop(d.prop("scrollHeight"));
        }
  }

  componentWillUnmount(){
    firebase.removeBinding(this.userRef);
    firebase.removeBinding(this.messagesRef);
    firebase.removeBinding(this.stateRef);
    firebase.removeBinding(this.presenceRef);
  }

  sendMessage(message) {
    const { messages, user, profile } = this.state;
    const newMessages = messages.concat([{
      body: message, 
      party: profile.party,
      createdAt: (new Date()).toJSON()
    }]);
    this.setState({messages: newMessages});
    console.log(newMessages)
  }

  handleDisconnectChat(){
    this.setState({state: 'disconencted'});
  }

  handleNewChat(){
    this.getChatandAdd(nuser, (data)=>{
      browserHistory.push('/chat/'+data)
    })
  }

  render() {
    const {online} = this.state;
    const onlineCount = online.length;
    return (
      <div style={styles.container}>
        <div style={styles.chatNav}>
          <h2 style={styles.chatContentLeft}>Status: {this.state.state}</h2>
          <h2 style={styles.chatContentRight}>Online Now: {onlineCount}</h2>
        </div>
        <div style={styles.chatMessages} id="message_list">
          <MessageList messages={this.state.messages}/>
        </div>
        <div style={styles.chatInput}>
          <MessageInput onMessageSubmit={this.sendMessage}/>
        </div>
      </div>  
    );
  }
}
