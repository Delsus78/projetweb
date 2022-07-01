const authentification = require("../controllers/authentification.controller.js");
var router = require("express").Router();

//login a new user
router.post("/login", authentification.login);

module.exports = router;