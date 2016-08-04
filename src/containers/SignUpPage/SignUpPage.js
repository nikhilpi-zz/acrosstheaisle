import React, { Component } from 'react';
import firebase from '../../firebase'
import { getChatandAdd } from '../../lib/chatFinder';
import { browserHistory } from 'react-router';
import styles from './styles';

export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      user: null,
      party: '',
      findingChat: false
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

  handlePartyChange(party){
    this.setState({
      party
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const user = this.state.user;
    var that = this;
    var profile = { party: this.state.party };
    that.setState({findingChat: true}) 
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
    const {loggedIn, party, findingChat} = this.state;
    const partySelected = party.length ? true : false;
    var options;

    if(loggedIn && !findingChat) {
      options = <form onSubmit={this.handleSubmit} style={styles.formContianer}>
                <div style={styles.partyOptions}>
                  <input type="image" 
                    src="/imgs/demo.svg"
                    name="party" 
                    style={styles.partyButton}
                    checked={this.state.party === 'democrat'} 
                    onClick={() => this.handlePartyChange('democrat')}/>
                  <input type="image" 
                    src="/imgs/rub.svg"
                    name="party"
                    style={styles.partyButton}
                    checked={this.state.party === 'republican'} 
                    onClick={() => this.handlePartyChange('republican')}/>
                </div>
              </form>;
    } else if (loggedIn && findingChat) {
      options = <h2>Finding Chat...</h2>;
    } else {
      options = <h2>Connecting...</h2>;
    }

    return (
      <div style={styles.container}>
        <div style={styles.welcomeInfo}>
          <h1>Welcome</h1>
          <p className="lead">Wayfarers 90s gastropub trust fund fanny pack, photo booth put a bird on it man braid taxidermy crucifix skateboard YOLO kickstarter raw denim. Pug lumbersexual freegan keffiyeh taxidermy, lomo fashion axe affogato drinking vinegar forage. Post-ironic cornhole shoreditch swag locavore stumptown. Vegan hoodie blue bottle brunch semiotics, pug kale chips. Chambray church-key portland, everyday carry freegan echo park forage cold-pressed scenester four dollar toast distillery taxidermy. Ugh kogi gentrify before they sold out migas, everyday carry shoreditch leggings pop-up man braid. Sriracha banjo butcher, deep v bicycle rights umami raw denim post-ironic yuccie polaroid before they sold out crucifix.</p>
          {options}
        </div>
      </div>  
    );
  }
}

