import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>TrustFlow</h3>
          <p>
            TrustFlow is a review and rating platform that helps you make confident shopping decisions by showing only verified reviews with real sentiment analysis.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Basics</h3>
          <ul>
            <li><Link to="/how-it-works">How it works</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/review-with-us">Review with us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><Link to="/vision">Vision</Link></li>
            <li><Link to="/story">Story</Link></li>
            <li><Link to="/community">Community</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Get Help</h3>
          <ul>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 TRUSTFLOW | <Link to="/privacy">PRIVACY</Link> | <Link to="/terms">TERMS</Link></p>
      </div>
    </footer>
  );
};

export default Footer;