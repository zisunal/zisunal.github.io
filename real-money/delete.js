// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClC05fx90Kqif1soTSU4_8AZBD-7F5-OM",
  authDomain: "real-money-5.firebaseapp.com",
  projectId: "real-money-5",
  storageBucket: "real-money-5.appspot.com",
  messagingSenderId: "734521333513",
  appId: "1:734521333513:web:119c9674af7eaae43ea5d8",
  measurementId: "G-57DHHMZMYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get form
const form = document.querySelector('#delete-form')
form.onSubmit = async (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    if (email === '') {
        alert('Email is required');
        return;
    }
    if (password === '') {
        await addDoc(collection(db, 'deletion-requests'), {
            email: email
        });
        alert('Deletion request submitted. You will get an email from us soon.');
    } else {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            if (user) {
                if(confirm('Are you sure you want to delete your account? It can not be undone')) {
                    await deleteUser(user);
                    alert('Account deleted successfully');
                } else {
                    alert('Account deletion cancelled');
                }
            } else {
                alert('User not found');
            }
        } catch (error) {
            alert(error.message);
        }
    }
}
