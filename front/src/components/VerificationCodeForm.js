import React, { useState } from "react";
import axios from "axios";
import PasswordResetForm from "./PasswordResetForm";
import "../styles/loginForm.css";

const VerificationCodeForm = ({ email, onClose, onBack }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (code.length !== 6 || isNaN(code)) {
      setError("Informe um código válido de 6 números");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:6500/api/v1/verifyCode",
        {
          email: email,
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);     
      setIsVerified(true);
    } catch (error) {
      setIsLoading(false);
      setError(
        "Código inválido."
      );
    }
  };

  return (
    <div className="login-modal">
      <div className="login-container">
        {!isVerified ? (
          <>
            <div className="login-header">
              <h2>Verificar Código</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Código enviado por e-mail"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              {error && <div className="error">{error}</div>}
              <div>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Verificando..." : "OK"}
                </button>

                <button className="close-button" onClick={onClose}>
                  Fechar
                </button>
              </div>
            </form>
          </>
        ) : (
          <PasswordResetForm email={email} code={code} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default VerificationCodeForm;
