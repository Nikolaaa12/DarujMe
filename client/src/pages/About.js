import React from 'react';
import '../styles/About.css'; 

function About() {
  return (
    <div className="about-us-container">
      <h1>Welcome to GiftMe!</h1>
      <p>We're based in beautiful Serbia, and our mission is to bring joy and create unforgettable moments through uniquely curated gifts.</p>

      <h2>Our Commitment</h2>
      <p>At GiftMe, we take pride in our commitment to exceptional service. Our passionate team is here to make every gift special, ensuring a delightful experience for you and your loved ones.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions, suggestions, or just want to say hello, feel free to reach out to us at <a href="mailto:info@giftme.com">info@giftme.com</a>. We're here to help!</p>
    </div>
  );
}

export default About;
