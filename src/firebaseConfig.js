import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'


// firebase init goes here
const config = {
	apiKey: "AIzaSyA9MzHGy2IzIku88pacjAFqQSznxVuFJ8s",
  authDomain: "shwe-thee-lay.firebaseapp.com",
  databaseURL: "https://shwe-thee-lay.firebaseio.com",
  projectId: "shwe-thee-lay",
  storageBucket: "shwe-thee-lay.appspot.com",
  messagingSenderId: "759127095049"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const incomesCollection = db.collection('incomes')
const expensesCollection = db.collection('expenses')

export {
    db,
    auth,
		storage,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection,
		incomesCollection,
		expensesCollection
}
