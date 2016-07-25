import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

import ChatPage from './containers/ChatPage';
import SignUpPage from './containers/SignUpPage';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={SignUpPage}/>
        <Route path="/chat/:id" component={ChatPage}/>
      </Router>
    );
  }
}
