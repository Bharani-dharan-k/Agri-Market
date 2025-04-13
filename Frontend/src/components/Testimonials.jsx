import React from "react";
import "../styles.css";

const Testimonials = () => {
  const testimonials = [
    { text: "This platform helped me monitor my crops effectively!", name: "Farmer A" },
    { text: "Easy to use and provides real-time insights. Highly recommended!", name: "Farmer B" },
  ];

  return (
    <section id="testimonials" className="section">
      <h2>🌟 What Our Users Say</h2>
      <div className="testimonials-container">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-box">
            <p>"{t.text}"</p>
            <span>- {t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
