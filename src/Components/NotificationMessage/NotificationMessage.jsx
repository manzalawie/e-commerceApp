import React, { useState, useEffect } from 'react';

const NotificationMessage = ({ message }) => {
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [message]);

  return (
    <div
      className={`fixed top-20 right-4 p-4 bg-emerald-600 text-white rounded-lg shadow-lg transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </div>
  );
};

export default NotificationMessage;
