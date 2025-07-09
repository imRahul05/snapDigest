
import React from "react";

const ArticleCard = ({ refEl, article, fetchMode }) => {
  return (
    <div ref={refEl} className="article-card">
      {fetchMode === "high" && article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title} 
          className="article-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x180?text=SnapDigest';
          }}
        />
      )}
      
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        
        {fetchMode === "high" && article.description && (
          <p className="article-desc">{article.description}</p>
        )}
        
        <div>
          {article.source?.name && (
            <small style={{ color: '#666', marginBottom: '8px', display: 'block' }}>
              Source: {article.source.name} • {new Date(article.publishedAt || Date.now()).toLocaleDateString()}
            </small>
          )}
          
          <a 
            href={article.url} 
            target="_blank" 
            rel="noreferrer"
            className="article-link"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
