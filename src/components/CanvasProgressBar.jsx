import React, { useEffect, useRef } from 'react';

const CanvasProgressBar = ({ progress = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = '#f1f1f1';
    ctx.fillRect(0, 0, width, height);

    // Draw progress bar
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, '#2c3e50');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width * progress, height);

    // Add a small animation effect
    const shine = Math.min(progress + 0.1, 1);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(width * progress - 10, 0, 10, height);
    
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={5}
      style={{
        position: 'fixed',
        top: 80, // Below navbar
        left: 0,
        zIndex: 100,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}
    />
  );
};

export default CanvasProgressBar;
