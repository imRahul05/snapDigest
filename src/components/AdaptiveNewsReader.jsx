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
  const { effectiveType, downlink } = useNetworkInfo(); 
  const articleRefs = useRef([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    
  }, []);

  useEffect(() => {
  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  return () => {
    window.removeEventListener("online", updateOnlineStatus);
    window.removeEventListener("offline", updateOnlineStatus);
  };
}, []);
  const checkLocationPermission = () => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          setPermissionStatus(result.state);
          if (result.state === "granted") {
            fetchLocationData();
          }

          result.onchange = () => {
            setPermissionStatus(result.state);
            if (result.state === "granted") {
              fetchLocationData();
            }
          };
        });
    } else {
      fetchLocationData();
    }
  };

  const fetchLocationData = () => {
    setIsLoading(true);
    getCurrentPosition(
      async (coords) => {
        setLocation(coords);
        const locationData = await fetchLocationName(
          coords.latitude,
          coords.longitude
        );
        setPlaceName(locationData.formatted);

        const news = await fetchNewsFromAddress(
          locationData.city,
          locationData.state
        );
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

  // const getContentType = () => {
  //   if (effectiveType === "slow-2g" || effectiveType === "2g") {
  //     return "Loading minimal text content due to slow connection.";
  //   } else if (effectiveType === "3g") {
  //     return "Loading standard content.";
  //   } else if (effectiveType === "4g") {
  //     return "Loading high-quality images and videos.";
  //   } else {
  //     return "Connection type unknown. Loading default content.";
  //   }
  // };

  const getContentType = () => {
  if (!isOnline) {
    return "You are offline. Showing cached or limited content.";
  }

  if (effectiveType === "slow-2g" || effectiveType === "2g") {
    return "Loading minimal text content due to slow connection.";
  } else if (effectiveType === "3g") {
    return "Loading standard content.";
  } else if (effectiveType === "4g") {
    return "Loading high-quality images and videos.";
  } else {
    return "Connection type unknown. Loading default content.";
  }
};

  // const getFetchMode = () => {
  //   return effectiveType === "4g" ? "high" : "low";
  // };
  const getFetchMode = () => {
  if (!isOnline) return "offline"; // could load from cache or fallback
  return effectiveType === "4g" ? "high" : "low";
};


  return (
    <div className="news-container">
      <CanvasProgressBar progress={scrollProgress} />
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
              <strong>Connection Type:</strong> {effectiveType}
            </p>
            <p>
              <strong>Estimated Speed:</strong> {downlink} Mbps
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
