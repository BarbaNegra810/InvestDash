import React, { useState } from "react";
import "../styles/mainDash.css";
import UploadForm from "./UploadForm";

const Sidebar = ({ isLogged, id, onClose }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <>
      {isLogged && (
        <div className="dash-container">
          <aside className="sidebar">
            <div className="logo-container">
              <img
                src="https://placehold.co/40x40?text=InvestDash"
                alt="Logo"
                className="logo"
              />
            </div>
            <nav className="nav">
              <ul>
                <li
                  className="nav-item"
                  onClick={() => setShowUploadForm(true)}
                >
                  <img
                    src="https://placehold.co/24x24?text=Upload"
                    alt="Home"
                    className="icon"
                  />
                  <span>Carregar PDF</span>
                </li>
                {/* Other list items */}
              </ul>
            </nav>
          </aside>
        </div>
      )}
      {showUploadForm && (
        <UploadForm
          isLogged={isLogged}
          id={id}
          onClose={() => setShowUploadForm(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
