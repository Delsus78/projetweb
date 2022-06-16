const ticket = require("../controllers/ticket.controller.js");
var router = require("express").Router();

//CREATE un nouveau ticket
router.post("/", ticket.create);

//GET ALL des tickets
router.get("/", ticket.findAll);

//GET un ticket en fonction de son id
router.get("/:id", ticket.findOne);

//UPDATE un ticket identifié par son id
router.put("/", ticket.update);

//DELETE un ticket identifié par son id
router.delete("/:id", ticket.delete);

module.exports = router;