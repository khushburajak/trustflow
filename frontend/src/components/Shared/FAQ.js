import React from 'react';

const FAQ = () => {
  return (
    <div className="faq">
      <h1>Frequently Asked Questions</h1>
      
      <div className="faq-item">
        <h3>What is TrustFlow?</h3>
        <p>
          TrustFlow is a platform designed to improve your online shopping experience by showcasing verified reviews, analyzing user sentiments, and generating trustworthy scores for products. Our goal is to reduce fake feedback and help you make confident purchase decisions with real insights from real users.
        </p>
      </div>
      
      <div className="faq-item">
        <h3>How is the Trust Score calculated?</h3>
        <p>
          The Trust Score is a smart metric calculated using a combination of factors such as review authenticity, user ratings, verified purchase status, and sentiment analysis. Reviews that are detailed, balanced, and marked as helpful by others contribute more weight to the score, offering a transparent reflection of the product's reliability.
        </p>
      </div>
      
      <div className="faq-item">
        <h3>Can I write a review without an account?</h3>
        <p>
          No, you must be logged into a verified account to write a review on TrustFlow. This ensures that all reviews come from real users and helps us maintain a community built on trust, accuracy, and accountability.
        </p>
      </div>
      
      <div className="faq-item">
        <h3>Is my personal data safe?</h3>
        <p>
          Yes, your privacy and data security are a top priority for us. TrustFlow uses strong encryption, secure login methods, and follows data protection best practices to ensure that your personal information is always protected and never shared without your consent.
        </p>
      </div>
    </div>
  );
};

export default FAQ;