/**
 * Funcões para permitir o upload de arquivos
 */
const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Defina o local da pasta de uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "../";
    const { id } = req.params;
    const uploadDirectory = path.join(folder, "data", id);
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Só permitimos arquivos PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido"), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Max 5 MB
});

router.post(
  "/upload/:id",
  upload.single("file", (req, res) => {
    try {
      res.status(200).json("Arquivo carregado com sucesso");
    } catch (err) {
      res.status(500).json("Erro ao carregar o arquivo");
    }
  })
);
router.get("/listFiles/:id", (req, res) => {
  const folder = "../";
  const { id } = req.params;
  const uploadDirectory = path.join(folder, "data", id);
  fs.readdir(path.join(uploadDirectory), (err, files) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(files);
  });
});

module.exports = router;
