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

/**
 * Routes
 */
const ping = require("./routes/ping");
const registro = require("./routes/registro");

/**
 * Ler env
 */

dotenv.config();
/**
 * Onjeto da aplicação
 */

const app = express();
app.use(express.json());

/**
 * Connecção ao BD
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
app.use("/api/v1/", registro);

/**
 * Inicia a porta para receber requests
 */
app.listen(process.env.PORT || 6500, () => {
    console.log("Server is waiting for requests");
})