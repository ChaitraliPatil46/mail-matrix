// Import React and useState hook for managing input and messages
import React, { useState } from 'react';
// Import axios to make HTTP requests to the backend
import axios from 'axios';

// This component allows the user to create a new folder
const FolderCreator = ({ userEmail, onFolderCreated }) => {
  // State to hold the folder name input from the user
  const [folderName, setFolderName] = useState('');
  // State to show success/error messages
  const [message, setMessage] = useState('');
  // State to show loading state
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle folder creation
  const handleCreateFolder = async () => {
    // If folder name is empty or only spaces, show error
    if (!folderName.trim()) {
      setMessage('Folder name cannot be empty.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Send POST request to backend API with user email and folder name
      const res = await axios.post('http://localhost:5000/api/folder/create', {
        userEmail,
        folderName,
      });

      // If successful, show success message and reset input
      setMessage('✅ Folder created successfully!');
      setFolderName('');

      // Call parent component function to refresh folder list in sidebar
      if (onFolderCreated) onFolderCreated();
    } catch (error) {
      // If folder already exists (409 conflict), show warning
      if (error.response?.status === 409) {
        setMessage('⚠️ Folder with this name already exists.');
      } else {
        // For any other error, show generic error message
        setMessage('❌ Failed to create folder.');
        console.error(error); // log the error in console for debugging
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleCreateFolder();
    }
  };

  return (
    <div className="p-3 bg-white rounded border mb-3">
      {/* Heading */}
      <h6 className="mb-3">Create New Folder</h6>

      {/* Input and Create button */}
      <div className="mb-2">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          style={{ minHeight: '44px' }}
        />
        <button 
          className="btn btn-primary w-100" 
          onClick={handleCreateFolder}
          disabled={isLoading || !folderName.trim()}
          style={{ minHeight: '44px' }}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creating...
            </>
          ) : (
            'Create Folder'
          )}
        </button>
      </div>

      {/* Show message if any (success or error) */}
      {message && (
        <div className={`alert alert-sm ${message.includes('✅') ? 'alert-success' : message.includes('⚠️') ? 'alert-warning' : 'alert-danger'} mb-0`}>
          {message}
        </div>
      )}
    </div>
  );
};

// Export the component so it can be used in other parts of the app
export default FolderCreator;
