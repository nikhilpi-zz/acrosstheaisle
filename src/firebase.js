import Rebase from 're-base';

const firebaseConfig = {
  apiKey: "AIzaSyAutt3cj8uCQSownQWj1u4nDjDrty_zS5w",
  authDomain: "talkto-fee7b.firebaseapp.com",
  databaseURL: "https://talkto-fee7b.firebaseio.com",
  storageBucket: "talkto-fee7b.appspot.com",
};

const base = Rebase.createClass(firebaseConfig);

export default base;