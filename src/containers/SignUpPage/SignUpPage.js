import React, { Component } from 'react';
import firebase from '../../firebase'
import { getChatandAdd } from '../../lib/chatFinder';
import { browserHistory } from 'react-router'

export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      user: null,
      party: ''
    }

    this.getChatandAdd = getChatandAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePartyChange = this.handlePartyChange.bind(this);
  }


  componentDidMount() {
    var that = this;

    if (!this.state.user) {
      firebase.authAnonymously(function(error) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Logged In");
        }
      });
    }

    firebase.onAuth(function(user) {
      if (user) {
        that.setState({loggedIn: true, user: user});
        var presenceRef = firebase.push('presence',{
          data: {uid: this.state.user.uid}
        })

        presenceRef.onDisconnect().remove();
      } else {
        that.setState({loggedIn: false, user: ''}) 
      }
    });
  }

  handlePartyChange(event){
    this.setState({
      party: event.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const user = this.state.user;
    var that = this;
    var profile = { party: this.state.party };
    firebase.post('users/'+user.uid, {
      data: profile,
      then(){
        that.getChatandAdd(user,profile, (data)=>{
          browserHistory.push('/chat/'+data)
        })
      }
    })
  }


  render() {
    const {loggedIn, party} = this.state;
    const partySelected = party.length ? true : false;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="radio" 
            name="party" 
            value="democrat"
            checked={this.state.party === 'democrat'} 
            onChange={this.handlePartyChange}/> test
          <input type="radio" 
            name="party" 
            value="republican"
            checked={this.state.party === 'republican'} 
            onChange={this.handlePartyChange}/> Republican

          <input type="submit" value="Get Started"/>
            
        </form>

      </div>  
    );
  }
}
