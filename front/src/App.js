// App.js
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";


import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const handleLoginSuccess = (data) => {
    setUserId(data._id);
    console.log("Dados do usuario logado", data._id);
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const renderContent = () => {
    //console.log("Render", userId, "IsLogged",isLoggedIn);
    switch (currentPage) {
      case "login":
        return (
          <LoginForm
            onClose={() => setCurrentPage("home")}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case "register":
        return <Register onClose={() => setCurrentPage("home")} />;
      default:
        return (
          <div>
              <Sidebar isLogged={isLoggedIn} id={userId} onClose={() => setCurrentPage("home")} />
          </div>
        );
    }
  };

  return (
    <div className="mainContainer">
      <header className="header">
        <div className="logo">InvestDash</div>
        <div className="nav-buttons">
          {!isLoggedIn && (
            <div>
              <button onClick={() => setCurrentPage("login")}>Entrar</button>
              <button onClick={() => setCurrentPage("register")}>
                Cadastre-se
              </button>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <button
                onClick={() => {
                  setCurrentPage("home");
                  setIsLoggedIn(false);
                }}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default App;
