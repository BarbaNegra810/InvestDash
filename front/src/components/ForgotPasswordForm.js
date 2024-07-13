import React, { useState } from "react";
import axios from "axios";
import VerificationCodeForm from "./VerificationCodeForm";
import "../styles/loginForm.css";

const ForgotPasswordForm = ({ onClose, onBack }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [clickedButton, setClickedButton] = useState('');
  

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Informe um e-mail válido");
      return;
    }

  

  // Verifica qual botão foi clicado
  if (clickedButton === 'b1') {
    console.log('Botão 1 foi clicado');
    try {
      const response = await axios.post('http://localhost:6500/api/v1/generateCode', {
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIsLoading(false);
      setIsCodeSent(true);
    } catch (error) {
      setIsLoading(false);
      setError("Ocorreu um erro ao enviar o e-mail de recuperação. Tente novamente mais tarde.");
    }
    // Código específico para o Botão 1
  } else if (clickedButton === 'b2') {
    console.log('Botão 2 foi clicado');
    setIsCodeSent(true);

    // Código específico para o Botão 2
  }

    setIsLoading(true);
    
  };

  return isCodeSent ? (
    <VerificationCodeForm email={email} onClose={onClose} onBack={() => setIsCodeSent(false)} />
  ) : (
    <div className="login-modal">
      <div className="login-container">
        <div className="login-header">
          <h2>Recuperar Senha</h2>          
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <div>
            <button type="submit" onClick={()=>{ setClickedButton("b1")}} disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar código"}
            </button>
            <button type="submit" onClick={()=>{ setClickedButton("b2")}} disabled={isLoading}>
              {isLoading ? "Verificando..." : "Já recebi"}
            </button>
            <button type="button" onClick={onBack} disabled={isLoading}>
              Cancelar
            </button>
            <button className="close-button" onClick={onClose}>
            Fechar
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
