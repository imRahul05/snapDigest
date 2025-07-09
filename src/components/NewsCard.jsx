// src/components/NewsCard.jsx
import React from "react";

const NewsCard = ({ article }) => {
  const { title, description, url, urlToImage, source, publishedAt } = article;

  return (
    <div style={styles.card}>
      {urlToImage && <img src={urlToImage} alt={title} style={styles.image} />}
      <div style={styles.content}>
        <h3>{title}</h3>
        <p style={styles.description}>{description}</p>
        <p style={styles.meta}>
          <strong>{source.name}</strong> •{" "}
          {new Date(publishedAt).toLocaleString()}
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read full article →
        </a>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    margin: "1rem 0",
    display: "flex",
    flexDirection: "row",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  },
  image: {
    width: "200px",
    height: "auto",
    objectFit: "cover",
  },
  content: {
    padding: "1rem",
    flex: 1,
  },
  description: {
    fontSize: "0.9rem",
    margin: "0.5rem 0",
  },
  meta: {
    fontSize: "0.8rem",
    color: "#555",
    marginBottom: "0.5rem",
  },
};

export default NewsCard;
