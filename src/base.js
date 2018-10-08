import Rebase from 're-base'
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCZ953rPP8bSI0zBPIxKVPoDp0bUMAJr0M',
  authDomain: 'bora-ajudar-98759.firebaseapp.com',
  databaseURL: 'https://bora-ajudar-98759.firebaseio.com',
  projectId: 'bora-ajudar-98759',
  storageBucket: 'bora-ajudar-98759.appspot.com',
  messagingSenderId: '297197543436'
};

const app=  firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export const auth = firebase.auth()

export default base