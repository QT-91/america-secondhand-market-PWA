import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = process.env.__FIREBASE_DEFAULTS__

if (firebaseConfig === null) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase
