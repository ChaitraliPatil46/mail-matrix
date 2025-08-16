import React, { useState, useEffect } from "react";
import axios from "axios";
import FolderCreator from "../components/FolderCreator";

// Sidebar shows list of folders and allows creation/deletion
const Sidebar = ({ userEmail, onFolderClick }) => {
  const [folders, setFolders] = useState([]);           // Stores all folders
  const [activeFolder, setActiveFolder] = useState(""); // Tracks the selected folder

  // Fetch folders when userEmail changes
  useEffect(() => {
    if (userEmail) {
      fetchFolders();
    }
  }, [userEmail]);

  // Get folders from backend
  const fetchFolders = () => {
    axios
      .get(`http://localhost:5000/api/folder/${userEmail}`)
      .then((res) => setFolders(res.data)) // Save folders to state
      .catch((err) => console.error("❌ Error fetching folders", err));
  };

  // Delete folder from backend and refresh list
  const handleDelete = async (folderId, e) => {
    e.stopPropagation(); // Prevent parent click (folder select)
    try {
      await axios.delete(`http://localhost:5000/api/folder/delete/${folderId}`);
      fetchFolders(); // Refresh folder list
    } catch (err) {
      console.error("❌ Failed to delete folder", err);
    }
  };

  // Handle folder selection
  const handleClick = (folderName) => {
    setActiveFolder(folderName);    // Highlight selected folder
    onFolderClick(folderName);      // Notify parent (to fetch emails)
  };

  return (
    <div
      className="bg-light border-end p-3"
      style={{ 
        width: "100%", 
        height: "100vh", 
        overflowY: "auto",
        paddingTop: "60px" // Space for mobile nav toggle
      }}
    >
      {/* User Email Display */}
      <div className="mb-3 p-2 bg-white rounded border">
        <small className="text-muted">Logged in as:</small>
        <div className="text-truncate fw-bold">{userEmail}</div>
      </div>

      <h5 className="mb-3">📂 Folders</h5>

      {/* Create folder component */}
      <FolderCreator userEmail={userEmail} onFolderCreated={fetchFolders} />

      {/* Folder list */}
      <div className="mt-3">
        <h6 className="text-muted mb-2">Your Folders:</h6>
        {folders.length === 0 ? (
          <p className="text-muted small">No folders yet. Create one above!</p>
        ) : (
          <ul className="list-group">
            {folders.map((folder) => (
              <li
                key={folder._id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  activeFolder === folder.folderName ? "active" : ""
                }`}
                onClick={() => handleClick(folder.folderName)}
                style={{ 
                  cursor: "pointer",
                  transition: "background-color 0.2s ease"
                }}
              >
                <span className="text-truncate me-2">{folder.folderName}</span>

                {/* Delete button */}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={(e) => handleDelete(folder._id, e)}
                  style={{ 
                    minWidth: "32px",
                    minHeight: "32px",
                    padding: "4px 8px"
                  }}
                  title="Delete folder"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
