import React from 'react';

const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;