// Register.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css";

const Register = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username) {
      setError("Informe o seu nome completo");
      return;
    }

    if (!validateEmail(email)) {
      setError("Informe um e-mail válido");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("Escolha uma senha. Mínimo 6 caracteres");
      return;
    }

    setIsLoading(true);
    // Simulate a registration API call
    const register = async () => {
      try {
        const response = await axios.post(
          "/api/v1/registroUsuario",
          {
            nomeUsuario: username,
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //console.log("Response:", response.data);
        setIsLoading(false);
        onClose(onClose);
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          // A request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
          if (error.response.data.error == "11000")
            setError("Usuário já existe");
          else {
            setError("Ocorreu um erro código " + error.response.data.error);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error request:", error.request);
          setError("Sem resposta do servidor. Tente novamente mais tarde");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
          setError("Ocorreu um erro na requisição. Tente novamente mais tarde");
        }
        console.error("Error config:", error.config);
      }
    };

    register();
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.toUpperCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
  };

  /**
   * Limpa os campos do formulário
   */

  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
    setConfirmPassword("");
  };

  return (
    <div className="register-modal">
      <div className="register-container">
        <h2>Novo Usuário</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Informe seu nome"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            type="email"
            placeholder="Informe um e-mail válido"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Escolha uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Gravando..." : "OK"}
            </button>
            <button type="button" onClick={handleClear} disabled={isLoading}>
              Limpar
            </button>
            <button type="button" onClick={onClose}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
