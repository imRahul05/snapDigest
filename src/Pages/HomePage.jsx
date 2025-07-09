import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/styles.css'

const HomePage = () => {
  return (
    <div className="news-container">
      <div className="location-card">
        <h1 className="section-title">Welcome to SnapDigest</h1>
        <p>Your personalized news digest that adapts to your location and network conditions.</p>
        
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div className="feature-card" style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>📍 Location-Based</h3>
            <p>Get news that matters to your specific location</p>
          </div>
          
          <div className="feature-card" style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>📱 Adaptive Content</h3>
            <p>Content quality adjusts based on your network speed</p>
          </div>
          
          <div className="feature-card" style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>🔍 Personalized</h3>
            <p>Relevant information without the noise</p>
          </div>
        </div>
      </div>
      
      <div className="location-card">
        <h2 className="section-title">Get Started</h2>
        <p>
          Head over to the News section to explore articles relevant to your location.
          SnapDigest will automatically detect your connection speed and adjust content delivery accordingly.
        </p>
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <Link to="/news" className="permission-btn" style={{textDecoration: 'none', display: 'inline-block'}}>
            Browse News
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage