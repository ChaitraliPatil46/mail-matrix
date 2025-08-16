// 📁 src/components/EmailList.js
// Importing React and the DOMPurify library to sanitize HTML content
import React, { useState } from "react";
import DOMPurify from "dompurify";
import axios from "axios";

// EmailList component that takes in emails and the selected folder name as props
const EmailList = ({ emails, folderName, onEmailsUpdate }) => {
  // State to keep track of which email is currently open (expanded)
  const [openEmailId, setOpenEmailId] = useState(null);
  
  // State for bulk selection
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to toggle open/close of an email body
  const toggleEmail = (id) => {
    setOpenEmailId((prevId) => (prevId === id ? null : id));
  };

  // Function to handle individual email deletion
  const handleDeleteEmail = async (emailId, e) => {
    e.stopPropagation(); // Prevent email expansion
    
    if (!window.confirm("Are you sure you want to delete this email?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/emails/${emailId}`);
      
      // Remove from selected emails if it was selected
      setSelectedEmails(prev => {
        const newSet = new Set(prev);
        newSet.delete(emailId);
        return newSet;
      });
      
      // Notify parent to refresh emails
      if (onEmailsUpdate) {
        onEmailsUpdate();
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      alert("Failed to delete email. Please try again.");
    }
  };

  // Function to handle bulk email deletion
  const handleBulkDelete = async () => {
    if (selectedEmails.size === 0) {
      alert("Please select emails to delete.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedEmails.size} email(s)?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/emails/bulk`, {
        data: { emailIds: Array.from(selectedEmails) }
      });
      
      setSelectedEmails(new Set());
      
      // Notify parent to refresh emails
      if (onEmailsUpdate) {
        onEmailsUpdate();
      }
    } catch (error) {
      console.error("Error deleting emails:", error);
      alert("Failed to delete emails. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Function to handle email selection
  const handleEmailSelect = (emailId, e) => {
    e.stopPropagation(); // Prevent email expansion
    
    setSelectedEmails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(emailId)) {
        newSet.delete(emailId);
      } else {
        newSet.add(emailId);
      }
      return newSet;
    });
  };

  // Function to select all emails
  const handleSelectAll = () => {
    if (selectedEmails.size === emails.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(emails.map(email => email._id)));
    }
  };

  return (
    // Wrapper div with responsive padding and scrollable area
    <div className="p-3 p-md-4 flex-grow-1 overflow-auto">
      {/* Show folder heading or ask to select a folder */}
      <div className="mb-4">
        <h4 className="mb-2">
          {folderName ? `📁 ${folderName}` : "📁 Select a folder"}
        </h4>
        {folderName && (
          <p className="text-muted mb-0">
            {emails.length} email{emails.length !== 1 ? 's' : ''} in this folder
          </p>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {folderName && emails.length > 0 && (
        <div className="card mb-3 bg-light border-0">
          <div className="card-body p-3">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="d-flex align-items-center mb-2 mb-md-0">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={selectedEmails.size === emails.length && emails.length > 0}
                  onChange={handleSelectAll}
                  style={{ minHeight: '18px', minWidth: '18px' }}
                />
                <span className="text-muted">
                  {selectedEmails.size > 0 
                    ? `${selectedEmails.size} of ${emails.length} selected`
                    : `Select all (${emails.length})`
                  }
                </span>
              </div>
              
              {selectedEmails.size > 0 && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleBulkDelete}
                  disabled={isDeleting}
                  style={{ minHeight: '36px' }}
                >
                  {isDeleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      🗑️ Delete Selected ({selectedEmails.size})
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* If no emails, show message. Else, display email list */}
      {emails.length === 0 ? (
        <div className="text-center py-5">
          <div className="text-muted mb-3">
            <span style={{ fontSize: '3rem' }}>📧</span>
          </div>
          <p className="text-muted">
            {folderName ? "No emails in this folder" : "Select a folder to view emails"}
          </p>
        </div>
      ) : (
        // Loop through emails in reverse (latest first)
        <div className="email-list">
          {emails.slice().reverse().map((email) => (
            <div
              className="card mb-3 shadow-sm border-0"
              key={email._id || email.subject}
              style={{ 
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                border: selectedEmails.has(email._id) ? "2px solid #007bff" : "1px solid #dee2e6"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              {/* Clicking the email toggles its body visibility */}
              <div 
                className="card-body p-3 p-md-4" 
                onClick={() => toggleEmail(email._id)}
              >
                {/* Email Header with Selection and Delete */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center flex-grow-1 me-2">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={selectedEmails.has(email._id)}
                      onChange={(e) => handleEmailSelect(email._id, e)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ minHeight: '18px', minWidth: '18px' }}
                    />
                    <h6 className="card-title mb-0 fw-bold flex-grow-1" style={{ 
                      wordBreak: "break-word",
                      lineHeight: "1.3"
                    }}>
                      {email.subject || "No Subject"}
                    </h6>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={(e) => handleDeleteEmail(email._id, e)}
                    style={{ 
                      minWidth: "32px",
                      minHeight: "32px",
                      padding: "4px 8px"
                    }}
                    title="Delete email"
                  >
                    🗑️
                  </button>
                </div>

                {/* Email sender and date */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2">
                  <h6 className="card-subtitle text-muted mb-1 mb-md-0" style={{ 
                    wordBreak: "break-word",
                    fontSize: "0.9rem"
                  }}>
                    <strong>From:</strong> {email.from || "Unknown Sender"}
                  </h6>
                  <small className="text-muted">
                    {email.date ? new Date(email.date).toLocaleDateString() : "No Date"}
                  </small>
                </div>

                {/* Expand/collapse indicator */}
                <div className="text-center">
                  <small className="text-muted">
                    {openEmailId === email._id ? "Click to collapse" : "Click to expand"}
                  </small>
                </div>

                {/* Email body rendered only when this email is open */}
                {openEmailId === email._id && (
                  <div className="mt-3 pt-3 border-top">
                    <h6 className="text-muted mb-2">Email Content:</h6>
                    <div
                      className="card-text"
                      style={{ 
                        wordBreak: "break-word",
                        lineHeight: "1.6",
                        fontSize: "0.95rem"
                      }}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(email.body, {
                          ALLOWED_TAGS: ["b", "i", "a", "p", "br", "ul", "li", "div", "span"],
                          ALLOWED_ATTR: ["href", "class"],
                        }),
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Exporting the EmailList component so it can be used in other files
export default EmailList;
