import React from "react";
import "../styles.css";

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2>📩 Contact Us</h2>
      <form id="contact-form">
        <input type="text" placeholder="Your Name" className="input-field" required />
        <input type="email" placeholder="Your Email" className="input-field" required />
        <textarea placeholder="Your Message" className="input-field" required></textarea>
        <button type="submit" className="btn signup">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
