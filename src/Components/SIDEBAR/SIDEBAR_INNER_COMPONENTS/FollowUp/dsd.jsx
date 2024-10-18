import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Assuming you have a Modal component

const TimeBasedModal = () => {
  const [showModal, setShowModal] = useState(false);
  
  // Set your desired time here (e.g., "14:30" for 2:30 PM)
  const setTime = "14:30";

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const hours = String(currentTime.getHours()).padStart(2, '0');
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      if (formattedTime === setTime) {
        setShowModal(true);
      }
    };

    // Check every minute
    const interval = setInterval(checkTime, 60000);

    // Check immediately on component mount
    checkTime();

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [setTime]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <Modal onClose={closeModal}>
          <h2>Reminder</h2>
          <p>This is your scheduled time!</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default TimeBasedModal;
