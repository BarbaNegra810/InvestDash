// LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "../new.css";

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Informe um e-mail válido");
      return;
    }

    if (password.length < 6) {
      setError("Informe uma password de no mínimo 6 caracteres");
      return;
    }

    setIsLoading(true);
    // Simulate a login API call
    const login = async () => {
        try {
            const response = await axios.post(`${backEndUrl}:6500/api/v1/login`, {
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            setIsLoading(false);
            onLoginSuccess(response.data);
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                // A request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);                
                setError(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                setError("Sem resposta do servidor. Tente novamente mais tarde");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                setError("Ocorreu um erro na requisição. Tente novamente mais tarde");
            }
            console.error('Error config:', error.config);
        }
    };

    login();

    //setTimeout(() => {
    //    setIsLoading(false);
    //    onLoginSuccess();
    //  }, 2000);
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
  };

  return isForgotPassword ? (
    <ForgotPasswordForm onClose={onClose} onBack={handleBackToLogin} />
  ) : (
    <div className="login-modal">
      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>         
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Informe o seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Informe a sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <div className="nav-buttons">
            <button  type="submit" disabled={isLoading}>
              {isLoading ? "Validando..." : "OK"}
            </button>
            <button  type="button" onClick={handleClear} disabled={isLoading}>
              Limpar
            </button>
          </div>
          <div className="nav-buttons" >
            <button type="button" onClick={handleForgotPassword}>
              Esqueci a senha
            </button>
            <button onClick={onClose}>
            Fechar
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
