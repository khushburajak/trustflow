import React from 'react';

const SaveMoreOnAppPage = () => {
  const pageStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
  };

  const heroStyles = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const heroContentStyles = {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    padding: '0 20px',
  };

  const heroTitleStyles = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
    lineHeight: '1.2',
    letterSpacing: '1px',
  };

  const heroSubtitleStyles = {
    fontSize: '18px',
    fontWeight: '300',
    letterSpacing: '2px',
    lineHeight: '1.4',
  };

  const appSectionStyles = {
    padding: '80px 20px',
    backgroundColor: 'white',
    textAlign: 'center',
  };

  const sectionTitleStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#333',
  };

  const downloadButtonsStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '60px',
    flexWrap: 'wrap',
  };

  const downloadButtonStyles = {
    display: 'inline-block',
    transition: 'transform 0.3s ease',
  };

  const buttonImageStyles = {
    height: '60px',
    width: 'auto',
    cursor: 'pointer',
  };

  const featuresContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    maxWidth: '800px',
    margin: '0 auto 60px',
  };

  const featureStyles = {
    textAlign: 'center',
  };

  const featureIconStyles = {
    width: '60px',
    height: '60px',
    margin: '0 auto 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    color: '#333',
  };

  const featureTitleStyles = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  };

  const featureSubtitleStyles = {
    fontSize: '14px',
    color: '#666',
  };

  const bottomSectionStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '40px',
    maxWidth: '1000px',
    margin: '0 auto',
    alignItems: 'center',
  };

  const qrSectionStyles = {
    textAlign: 'center',
  };

  const qrCodeStyles = {
    width: '150px',
    height: '150px',
    backgroundColor: '#000',
    margin: '0 auto 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    borderRadius: '10px',
  };

  const qrTextStyles = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  };

  const phoneSectionStyles = {
    textAlign: 'center',
    position: 'relative',
  };

  const features = [
    {
      icon: '🔒',
      title: 'Instant Login',
      subtitle: ''
    },
    {
      icon: '⊞',
      title: 'App-Only',
      subtitle: 'Deals'
    },
    {
      icon: '🔔',
      title: 'Notifications',
      subtitle: ''
    }
  ];

  const handleDownloadClick = (platform) => {
    if (platform === 'android') {
      window.open('https://play.google.com/store', '_blank');
    } else if (platform === 'ios') {
      window.open('https://apps.apple.com/', '_blank');
    }
  };

  return (
    <div style={pageStyles}>
      {/* Hero Section */}
      <section style={heroStyles}>
        <div style={heroOverlayStyles}></div>
        <div style={heroContentStyles}>
          <h1 style={heroTitleStyles}>
            SAVE MORE. SHOP<br />
            SMARTER. ONLY ON<br />
            THE APP.
          </h1>
          <p style={heroSubtitleStyles}>
            GET EXCLUSIVE DISCOUNTS, EARLY ACCESS,<br />
            AND FASTER REVIEWS-ALL IN ONE APP
          </p>
        </div>
      </section>

      {/* App Download Section */}
      <section style={appSectionStyles}>
        <h2 style={sectionTitleStyles}>SAVE MORE ON APP</h2>

        <div style={downloadButtonsStyles}>
          <div
            style={downloadButtonStyles}
            onClick={() => handleDownloadClick('android')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              style={buttonImageStyles}
            />
          </div>
          <div
            style={downloadButtonStyles}
            onClick={() => handleDownloadClick('ios')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on the App Store"
              style={buttonImageStyles}
            />
          </div>
        </div>

        {/* Features */}
        <div style={featuresContainerStyles}>
          {features.map((feature, index) => (
            <div key={index} style={featureStyles}>
              <div style={featureIconStyles}>{feature.icon}</div>
              <div style={featureTitleStyles}>{feature.title}</div>
              {feature.subtitle && (
                <div style={featureSubtitleStyles}>{feature.subtitle}</div>
              )}
            </div>
          ))}
        </div>

        {/* QR Code and Phone Section */}
        <div style={bottomSectionStyles}>
          <div style={qrSectionStyles}>
            <div style={qrCodeStyles}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>⊞⊞⊞</div>
                <div>QR CODE</div>
              </div>
            </div>
            <div style={qrTextStyles}>
              Scan Now, Save<br />More Instantly
            </div>
          </div>

          <div></div>

          <div style={phoneSectionStyles}>
            <div style={{
              width: '200px',
              height: '400px',
              backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '25px',
              margin: '0 auto',
              position: 'relative',
              transform: 'rotate(-15deg)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                bottom: '20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '1fr 1fr 1fr 1fr',
                gap: '10px',
                padding: '20px',
              }}>
                {[...Array(12)].map((_, i) => (
                  <div key={i} style={{
                    backgroundColor: `hsl(${i * 30}, 70%, 60%)`,
                    borderRadius: '8px',
                    opacity: 0.8,
                  }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section style={{
        padding: '60px 20px',
        backgroundColor: '#f8f9fa',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '24px',
          marginBottom: '20px',
          color: '#333'
        }}>
          Ready to start saving?
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '30px'
        }}>
          Download the TrustFlow app today and unlock exclusive deals and faster shopping.
        </p>
        <div style={downloadButtonsStyles}>
          <div
            style={downloadButtonStyles}
            onClick={() => handleDownloadClick('android')}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              style={{ ...buttonImageStyles, height: '50px' }}
            />
          </div>
          <div
            style={downloadButtonStyles}
            onClick={() => handleDownloadClick('ios')}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on the App Store"
              style={{ ...buttonImageStyles, height: '50px' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SaveMoreOnAppPage;