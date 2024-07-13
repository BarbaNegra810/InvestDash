const router = require("express").Router();

router.get("/ping", (req,res) => { 
    console.log("Ping chamado");
    res.send("The app is Up and Running");
});

module.exports = router;