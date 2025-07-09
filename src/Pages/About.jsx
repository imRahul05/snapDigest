import React from 'react';

const About = () => {
  return (
    <div className="news-container">
      <h1 className="section-title">About SnapDigest</h1>
      
      <div className="location-card">
        <h2>Our Mission</h2>
        <p>
          SnapDigest is an adaptive news reader that customizes your news experience based on your location and network conditions.
          We believe that news should be accessible to everyone, regardless of their internet connection quality.
        </p>
        
        <h2>How It Works</h2>
        <p>
          SnapDigest uses your location to deliver personalized news that matters to you. Our adaptive technology detects your
          connection speed and optimizes content delivery - showing lightweight text on slow connections and rich media on faster ones.
        </p>
        
        <h2>Privacy</h2>
        <p>
          We respect your privacy. Your location data is only used to fetch relevant news and is never stored on our servers.
          You can revoke location permissions at any time through your browser settings.
        </p>
        
        <h2>Contact</h2>
        <p>
          Have questions or feedback? Reach out to us at <a href="mailto:info@snapdigest.com">info@snapdigest.com</a>
        </p>
      </div>
    </div>
  );
};

export default About;
