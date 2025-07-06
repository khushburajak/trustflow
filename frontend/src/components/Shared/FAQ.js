import React, { useState } from 'react';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const pageStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
  };


  const heroStyles = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
  };

  const heroOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  };

  const heroContentStyles = {
    position: 'relative',
    zIndex: 1,
  };

  const heroTitleStyles = {
    fontSize: '48px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    letterSpacing: '2px',
  };

  const faqSectionStyles = {
    padding: '80px 20px',
    backgroundColor: 'white',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const faqTitleStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '50px',
    color: '#333',
  };

  const faqItemStyles = {
    marginBottom: '30px',
    borderBottom: '1px solid #eee',
    paddingBottom: '30px',
  };

  const questionContainerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '20px',
    cursor: 'pointer',
  };

  const qIconStyles = {
    width: '50px',
    height: '50px',
    backgroundColor: '#b8860b',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    marginRight: '20px',
    flexShrink: 0,
  };

  const questionTextStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
    flex: 1,
  };

  const answerContainerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '15px',
  };

  const aIconStyles = {
    width: '50px',
    height: '50px',
    backgroundColor: '#8b7355',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    marginRight: '20px',
    flexShrink: 0,
  };

  const answerTextStyles = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    margin: 0,
    flex: 1,
  };

  const expandIconStyles = {
    marginLeft: 'auto',
    fontSize: '24px',
    color: '#666',
    transition: 'transform 0.3s ease',
  };

  const faqData = [
    {
      id: 1,
      question: "What is TrustFlow?",
      answer: "TrustFlow is a platform designed to improve your online shopping experience by showcasing verified reviews, analyzing user sentiments, and generating trustworthy scores for products. Our goal is to reduce fake feedback and help you make confident purchase decisions with real insights from real users."
    },
    {
      id: 2,
      question: "How is the Trust Score calculated?",
      answer: "The Trust Score is a smart metric calculated using a combination of factors such as review authenticity, user ratings, verified purchase status, and sentiment analysis. Reviews that are detailed, balanced, and marked helpful by others contribute more weight to the score, offering a transparent reflection of the product's reliability."
    },
    {
      id: 3,
      question: "Can I write a review without an account?",
      answer: "No, you must be logged into a verified account to write a review on TrustFlow. This ensures that all reviews come from real users and helps us maintain a community built on trust, accuracy, and accountability."
    },
    {
      id: 4,
      question: "Is my personal data safe?",
      answer: "Yes, your privacy and data security are a top priority for us. TrustFlow uses strong encryption, secure login methods, and follows data protection best practices to ensure that your personal information is always protected and never shared without your consent."
    },
    {
      id: 5,
      question: "How do I report a fake review?",
      answer: "If you encounter a suspicious or fake review, you can report it by clicking the 'Report' button next to the review. Our moderation team will investigate the report and take appropriate action to maintain the integrity of our platform."
    },
    {
      id: 6,
      question: "Can businesses respond to reviews?",
      answer: "Yes, verified businesses can respond to reviews left on their products. This allows for transparent communication between customers and businesses, helping to resolve issues and provide additional context to potential buyers."
    },
    {
      id: 7,
      question: "How often are Trust Scores updated?",
      answer: "Trust Scores are updated in real-time as new reviews are submitted and verified. Our algorithm continuously processes new data to ensure that the scores reflect the most current and accurate assessment of product reliability."
    },
    {
      id: 8,
      question: "What makes a review 'verified'?",
      answer: "A review is marked as 'verified' when we can confirm that the reviewer has actually purchased the product from a legitimate source. This verification process helps distinguish authentic reviews from potentially fake or biased feedback."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div style={pageStyles}>
      {/* Hero Section */}
      <section style={heroStyles}>
        <div style={heroOverlayStyles}></div>
        <div style={heroContentStyles}>
          <h1 style={heroTitleStyles}>
            FREQUENTLY<br />
            ASKED<br />
            QUESTIONS
          </h1>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={faqSectionStyles}>
        <h2 style={faqTitleStyles}>FAQS</h2>

        {faqData.map((faq) => (
          <div key={faq.id} style={faqItemStyles}>
            <div
              style={questionContainerStyles}
              onClick={() => toggleFAQ(faq.id)}
            >
              <div style={qIconStyles}>Q</div>
              <h3 style={questionTextStyles}>{faq.question}</h3>
              <span
                style={{
                  ...expandIconStyles,
                  transform: openFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                ▼
              </span>
            </div>

            {(openFAQ === faq.id || faq.id <= 4) && (
              <div style={answerContainerStyles}>
                <div style={aIconStyles}>A</div>
                <p style={answerTextStyles}>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default FAQPage;