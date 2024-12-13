// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyACxiIFyq2SLlYSMq6GZlK5NYz2O08lFk4",
    authDomain: "digissanchaar.firebaseapp.com",
    databaseURL: "https://digissanchaar-default-rtdb.firebaseio.com",
    projectId: "digissanchaar",
    storageBucket: "digissanchaar.firebasestorage.app",
    messagingSenderId: "642817709188",
    appId: "1:642817709188:web:df2d5e6b43b141f414ded1",
    measurementId: "G-637YJW01B1"
  };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

// Form submission logic
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Push data to Firebase Realtime Database
    const newContactRef = firebase.database().ref('contacts').push();
    newContactRef
        .set(data)
        .then(() => {
            alert('Message sent successfully! We will contact you shortly.');
            this.reset();
        })
        .catch((error) => {
            alert('Failed to send message. Please try again.');
            console.error(error);
        });
});
