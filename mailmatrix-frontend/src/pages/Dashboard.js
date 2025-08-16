import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import EmailList from "../components/EmailList";
import axios from "axios";

const Dashboard = () => {
  // Store currently selected folder name
  const [selectedFolder, setSelectedFolder] = useState("");

  // Store fetched emails of selected folder
  const [emails, setEmails] = useState([]);

  // Store logged-in user's email (from localStorage or URL)
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // On component load, extract email from URL (if present)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromURL = urlParams.get("email");

    // Save to localStorage and update state
    if (emailFromURL) {
      localStorage.setItem("userEmail", emailFromURL);
      setUserEmail(emailFromURL);
    }
  }, []);

  // Function to fetch emails for current folder
  const fetchEmailsForCurrentFolder = () => {
    if (selectedFolder && userEmail) {
      axios
        .get(`http://localhost:5000/api/emails/${userEmail}/${selectedFolder}`)
        .then((res) => setEmails(res.data))
        .catch((err) => {
          console.error("Error fetching emails:", err);
          setEmails([]);
        });
    }
  };

  // When folder is clicked, fetch emails for that folder and user
  const handleFolderClick = (folderName) => {
    setSelectedFolder(folderName); // update selected folder name
    
    // Close sidebar on mobile after folder selection
    setSidebarOpen(false);

    axios
      .get(`http://localhost:5000/api/emails/${userEmail}/${folderName}`)
      .then((res) => setEmails(res.data)) // update emails list
      .catch((err) => {
        console.error("Error fetching emails:", err);
        setEmails([]); // in case of error, show empty list
      });
  };

  // Function to refresh emails (called after deletion)
  const handleEmailsUpdate = () => {
    fetchEmailsForCurrentFolder();
  };

  // Toggle mobile sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking overlay
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Mobile Navigation Toggle */}
      <button 
        className="mobile-nav-toggle" 
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* Sidebar Overlay for Mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar-mobile ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar userEmail={userEmail} onFolderClick={handleFolderClick} />
      </div>

      {/* Email List */}
      <div className="email-list-mobile flex-grow-1 overflow-auto">
        <EmailList 
          emails={emails} 
          folderName={selectedFolder} 
          onEmailsUpdate={handleEmailsUpdate}
        />
      </div>
    </div>
  );
};

export default Dashboard;
