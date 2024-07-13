/**
 * Servidor de APIs da aplicação investDash
 * @author José Barbosa
 * @todo
 *  
 *  
 *  */

/**
 * Basic libs
 */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

/**
 * Routes
 */
const ping = require("./routes/ping");
const usuario = require("./routes/usuario");
const login = require("./routes/login");
const files = require("./routes/files");
const generateCode = require("./routes/generateCode");
const verifyCode = require("./routes/verifyCode");

/**
 * Ler env
 */

dotenv.config();

/**
 * Configurações da aplicação
 */


const app = express();
app.use(express.json());
app.use(cors());


/**
 * Conexão ao BD
 */

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Database is connected");
})
.catch((err) => {
    console.log(err);
})


/**
 * Rotas
 */

app.use("/api/v1/", ping);
app.use("/api/v1/", usuario);
app.use("/api/v1/", login);
app.use("/api/v1/", files);
app.use("/api/v1/", generateCode);
app.use("/api/v1/", verifyCode);
/**
 * Inicia a porta para receber requests
 */
app.listen(process.env.PORT || 6500, () => {
    console.log("Server is waiting for requests");
})