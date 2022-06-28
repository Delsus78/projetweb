const authentification = require("../controllers/authentification.controller.js");
var router = require("express").Router();

//Register a new user
router.post("/register", authentification.register);

router.post("/login", authentification.login);

module.exports = router;