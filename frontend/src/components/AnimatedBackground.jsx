import React from 'react';

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 flex flex-wrap justify-center items-center overflow-hidden opacity-10">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="text-6xl animate-float"
        style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float 15s infinite ${i * 0.5}s linear`
        }}
      >
        🌿
      </div>
    ))}
  </div>
);

export default AnimatedBackground;