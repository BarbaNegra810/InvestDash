import React, { useState } from "react";
import "../styles/mainDash.css";
import Sidebar from "./Sidebar";
import UploadForm from "./UploadForm";
import Header from "./Header";

const SidebarBox = ({ isLogged, id, onClose }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
      {isLogged && (
        <div className="grid-container"> 
        
         <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
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

export default SidebarBox;
