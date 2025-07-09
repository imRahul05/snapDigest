import React, { useEffect, useState, useRef } from "react";
import useNetworkInfo from "../API/useNetworkInfo";
import {
  getCurrentPosition,
  fetchLocationName,
  fetchNewsFromAddress,
} from "../API/api";
import ArticleCard from "./ArticleCard";
import CanvasProgressBar from "./CanvasProgressBar";
import "../styles/styles.css";

const AdaptiveNewsReader = () => {
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState("");
  const [articles, setArticles] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState("prompt");
  const [isLoading, setIsLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const connectionType = useNetworkInfo();
  const articleRefs = useRef([]);
  
  useEffect(() => {
    checkLocationPermission();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent > 0 ? scrollPercent : 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkLocationPermission = () => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((result) => {
          setPermissionStatus(result.state);
          if (result.state === "granted") {
            fetchLocationData();
          }
          
          // Listen for permission changes
          result.onchange = () => {
            setPermissionStatus(result.state);
            if (result.state === "granted") {
              fetchLocationData();
            }
          };
        });
    } else {
      // Fallback for browsers that don't support permissions API
      fetchLocationData();
    }
  };

  const fetchLocationData = () => {
    setIsLoading(true);
    getCurrentPosition(
      async (coords) => {
        setLocation(coords);
        const locationData = await fetchLocationName(coords.latitude, coords.longitude);
        setPlaceName(locationData.formatted);

        const news = await fetchNewsFromAddress(locationData.city, locationData.state);
        setArticles(news?.slice(0, 6) || []);
        setIsLoading(false);
      },
      () => {
        setPlaceName("Location permission denied or unavailable");
        setIsLoading(false);
      }
    );
  };

  const handleRequestLocation = () => {
    fetchLocationData();
  };

  const getContentType = () => {
    if (connectionType === "slow-2g" || connectionType === "2g") {
      return "Loading minimal text content due to slow connection.";
    } else if (connectionType === "3g") {
      return "Loading standard content.";
    } else if (connectionType === "4g") {
      return "Loading high-quality images and videos.";
    } else {
      return "Connection type unknown. Loading default content.";
    }
  };

  const getFetchMode = () => {
    if (connectionType === "slow-2g" || connectionType === "2g") {
      return "low";
    } else {
      return "high";
    }
  };

  return (
    <div className="news-container">
      <h1 className="section-title">📰 Local News Digest</h1>
      
      {permissionStatus !== "granted" && (
        <div className="permission-card">
          <h3>📍 Location Access Needed</h3>
          <p>To show news relevant to your location, we need your permission.</p>
          <button className="permission-btn" onClick={handleRequestLocation}>
            Allow Location Access
          </button>
        </div>
      )}
      
      {permissionStatus === "granted" && (
        <div className="location-card">
          <h2>📍 Location Info</h2>
          {location ? (
            <>
              <div className="location-info">
                <strong>Coordinates:</strong> Lat {location.latitude.toFixed(4)},
                Lon {location.longitude.toFixed(4)}
              </div>
              <div className="location-info">
                <strong>Address:</strong> {placeName}
              </div>
            </>
          ) : (
            <p>Fetching your location...</p>
          )}

          <div className="network-status">
            <h3>📡 Network Status</h3>
            <p>
              <strong>Connection Type:</strong> {connectionType}
            </p>
            <p>{getContentType()}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="loading-spinner">
          <p>Loading news articles...</p>
        </div>
      ) : (
        <>
          <h2 className="section-title">Today's Headlines</h2>
          {articles.length > 0 ? (
            <div className="news-grid">
              {articles.map((article, idx) => (
                <ArticleCard
                  key={idx}
                  refEl={(el) => (articleRefs.current[idx] = el)}
                  article={article}
                  fetchMode={getFetchMode()}
                />
              ))}
            </div>
          ) : (
            <p>No news found for this location.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdaptiveNewsReader;
