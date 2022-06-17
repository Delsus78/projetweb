const utils = require("../controllers/utils.controller.js");
var router = require("express").Router();

router.post("/findtickets", utils.findTickets);

module.exports = router;