import React from "react";

const NewsCard = ({ article }) => {
  const {
    title,
    snippet,
    newsUrl,
    images,
    publisher,
    timestamp
  } = article;

  const imageUrl = images?.thumbnail;

  return (
    <div style={styles.card}>
      {imageUrl && <img src={imageUrl} alt={title} style={styles.image} />}
      <div style={styles.content}>
        <h3>{title}</h3>
        <p style={styles.description}>{snippet || "No summary available."}</p>
        <p style={styles.meta}>
          <strong>{publisher || "Unknown Source"}</strong> •{" "}
          {timestamp ? new Date(parseInt(timestamp)).toLocaleString() : "Unknown time"}
        </p>
        <a href={newsUrl} target="_blank" rel="noopener noreferrer">
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
