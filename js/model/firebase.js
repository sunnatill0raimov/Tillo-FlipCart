// firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js'
import {
	getDatabase,
	ref,
	set,
	get,
	onValue,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js'

// 🔑 Firebase konfiguratsiyasi
const firebaseConfig = {
	apiKey: 'AIzaSyAv_ZwXqv1tOAX0kOMs26wwOQSyS4iBAk8',
	authDomain: 'gamezone-flipcards.firebaseapp.com',
	databaseURL: 'https://gamezone-flipcards-default-rtdb.firebaseio.com',
	projectId: 'gamezone-flipcards',
	storageBucket: 'gamezone-flipcards.firebasestorage.app',
	messagingSenderId: '440055218475',
	appId: '1:440055218475:web:a3651383b7991b5825c56e',
	measurementId: 'G-RN06SYQPDV',
}

// 🚀 Firebase’ni ishga tushirish
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { db, ref, set, get, onValue }
