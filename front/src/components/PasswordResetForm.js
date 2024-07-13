import React, { useState } from "react";
import axios from "axios";
import "../styles/loginForm.css";

const PasswordResetForm = ({ email, code,  onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:6500/api/v1/resetPassword', {
        email: email,
        code: code,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIsLoading(false);
      alert('Senha alterada com sucesso!');
      onClose(); // Go back on successful password reset
    } catch (error) {
      setIsLoading(false);
      setError("Ocorreu um erro ao alterar a senha. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="login-modal">
      <div className="login-container">
        <div className="login-header">
          <h2>Trocar Senha</h2>          
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nova Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Nova Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Alterando..." : "OK"}
            </button>
            <button type="button" onClick={() => {
              setPassword("");
              setConfirmPassword("");
            }} disabled={isLoading}>
              Limpar
            </button>
            <button type="button" onClick={onClose} disabled={isLoading}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default PasswordResetForm;
