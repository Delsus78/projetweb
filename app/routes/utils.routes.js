const utils = require("../controllers/utils.controller.js");
var router = require("express").Router();

router.post("/findtickets", utils.findTickets);

router.get("/users", utils.getAllUsers);

module.exports = router;