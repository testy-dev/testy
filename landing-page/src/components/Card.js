import React from 'react';

const Card = ({ className, children }) => (
  <div
    className={`p-12 rounded-lg border border-solid border-gray-300 ${className}`}
    style={{
      boxShadow: '0 10px 28px rgba(0,0,0,.15)',
    }}
  >
    {children}
  </div>
);

export default Card;
