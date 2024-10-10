import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

const MassEmailModal = ({ emails, onClose }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!bearer_token) {
      alert("No token found, please log in again.");
      return;
    }

    setLoading(true); // Set loading to true when starting the request

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };

      const formData_POST = {
        emails: emails, // Use the emails array from props
        description: message, // Use the message state for the email body
      };

      console.log(
        "POST URL:",
        `${protocal_url}${name}.${tenant_base_url}/Lead/lead/massemail`
      );
      console.log("formData_POST:", formData_POST);

      // Make the POST request
      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Lead/lead/massemail`,
        formData_POST,
        config
      );

      alert("Emails sent successfully!");
      onClose(); // Close modal after sending email
    } catch (error) {
      console.error("Error response:", error.response);

      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        console.error("Validation errors:", validationErrors);

        let errorMessage = "Validation errors:\n";
        for (const field in validationErrors) {
          if (validationErrors.hasOwnProperty(field)) {
            errorMessage += `${field}: ${validationErrors[field].join(", ")}\n`;
          }
        }
        alert(errorMessage);
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Always set loading to false after the request
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Mass Email</h2>

        {/* Display Selected Emails */}
        <div className="mb-4">
          <h4 className="font-medium">Selected Emails:</h4>
          <div className="p-2 border rounded bg-gray-100 h-24 overflow-y-auto">
            {emails.length > 0 ? (
              emails.map((email, index) => (
                <div key={index} className="text-sm">
                  {email}
                </div>
              ))
            ) : (
              <p>No emails selected.</p>
            )}
          </div>
        </div>

        {/* Textarea for Mass Email */}
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows="4"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update the message state
        ></textarea>

        {/* Button Container */}
        <div className="flex justify-end">
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit} // Call handleSubmit to send email
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Sending...' : 'Send'} {/* Change button text based on loading state */}
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Define prop types
MassEmailModal.propTypes = {
  emails: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MassEmailModal;
