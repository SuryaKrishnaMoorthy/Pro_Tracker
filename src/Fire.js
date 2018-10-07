import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  // Initialize Firebase
  init = () => firebase.initializeApp({
    apiKey: 'AIzaSyDnJVjStYgFAXn-QFdGKU1-fZ9F9FOaNFA',
    authDomain: 'pro-tracker-chat.firebaseapp.com',
    databaseURL: 'https://pro-tracker-chat.firebaseio.com',
    projectId: 'pro-tracker-chat',
    storageBucket: 'pro-tracker-chat.appspot.com',
    messagingSenderId: '931975412079'
  });

  observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        console.log(message);
      }
    }
  };

  get ref() {
  return firebase.database().ref('messages');
  }

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };
   return message;
  };

  // A helper for getting the user’s uid
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  // Get the accurate timestamp for saving messages
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  // append function will save the message object with a unique ID
  append = message => this.ref.push(message);

  off() {
  this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
