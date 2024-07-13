/**
 * Componente para realizar o upload dos arquivos PDF de notas de negociação
 * @todo - Multiplos arquivos de uma vez
 *       - Validar se é um arquivo de notas de negociação e recusar o upload caso não seja
 *       -
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/uploadForm.css";

const UploadForm = ({ isLogged, id, onClose }) => {
  
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    if (id) {
      fetchFiles(id);
    }
  }, [id]);

  const fetchFiles = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:6500/api/v1/listFiles/${id}`
      );
      setFiles(response.data);
    } catch (error) {
      console.error("Erro ao listar os arquivos", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    console.log("Loading id", id);
    if (!selectedFile || !id) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(`http://localhost:6500/api/v1/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(percentage);
        },
      });
      setSelectedFile(null);
      fetchFiles(id); // Refresh the list of files
    } catch (error) {
      console.error("Erro ao carregar o arquivo", error);
    }
  };

  return (
    <div className="file-upload-container">
      {isLogged && (
        <div className="upload-section">
          <h1>Carga de arquivos</h1>
          <div className="upload-container">
            <input type="file" onChange={handleFileChange} />
            {uploadProgress > 0 && (
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="button-container">
              <button onClick={handleFileUpload}>Upload</button>
              <button onClick={onClose}>Fechar</button>
            </div>
          </div>
          <h2>Arquivoso já carregados</h2>
          <div className="file-list">
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  <p>{file}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
