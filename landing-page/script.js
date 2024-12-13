'use strict';

/**
 * Add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * Toggle navbar
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
};

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * Header active on scroll
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * Firebase integration for contact form
 */

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf4AdsCTVo3C4vFfwF3h0aK5_pY_EuQ9E",
  authDomain: "fir-9cee4.firebaseapp.com",
  databaseURL: "https://fir-9cee4-default-rtdb.firebaseio.com",
  projectId: "fir-9cee4",
  storageBucket: "fir-9cee4.firebasestorage.app",
  messagingSenderId: "955535476810",
  appId: "1:955535476810:web:6a64be2a9625fa0be93eb3",
  measurementId: "G-8JEY20MW40"
};

//initliaze app
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form default submission behavior

    // Collect form data
    const name = this.name.value.trim();
    const email = this.email_address.value.trim();
    const subject = this.subject.value.trim();
    const phone = this.phone.value.trim();
    const message = this.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Save data to Firebase
    const contactRef = database.ref('contacts');
    contactRef
      .push({
        name,
        email,
        subject,
        phone,
        message,
        timestamp: new Date().toISOString(),
      })
      .then(() => {
        // Display success message
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Message sent successfully! We will contact you shortly.';
        successMessage.style.color = 'green';
        successMessage.style.textAlign = 'center';
        successMessage.style.marginTop = '15px';

        this.appendChild(successMessage);

        // Clear the form after submission
        this.reset();

        // Remove success message after 5 seconds
        setTimeout(() => successMessage.remove(), 5000);
      })
      .catch((error) => {
        alert('Failed to send message. Please try again.');
        console.error(error);
      });
  });
}
