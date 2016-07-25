import React, { Component } from 'react';
import firebase from '../firebase'
import { getChatandAdd } from '../lib/chatFinder';

import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'


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

    this.presenceRef = firebase.syncState('presence', {
      context: this,
      state: 'online',
      asArray: true
    });

    var presenceRef = firebase.push('presence',{
      data: {uid: this.state.user.uid}
    })

    presenceRef.onDisconnect().remove();
  }

  componentWillUnmount(){
    firebase.removeBinding(this.userRef);
    firebase.removeBinding(this.messagesRef);
    firebase.removeBinding(this.stateRef);
    firebase.removeBinding(this.presenceRef);
  }

  sendMessage(message) {
    const { messages, user, profile } = this.state;
    this.setState({messages: messages.concat([{body: message, party: profile.party}])});
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
      <div>
        <h2>{this.state.state} Online Now:{onlineCount}</h2>
        <MessageList messages={this.state.messages}/>
        <MessageInput onMessageSubmit={this.sendMessage}/>
      </div>  
    );
  }
}
