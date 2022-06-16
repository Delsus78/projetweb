const client = require("../controllers/client.controller.js");
var router = require("express").Router();

//CREATE un nouveau client
router.post("/", client.create);

//GET ALL des clients
router.get("/", client.findAll);

//GET un client en fonction de son id
router.get("/:id", client.findOne);

//UPDATE un client identifié par son id
router.put("/", client.update);

//DELETE un client identifié par son id
router.delete("/:id", client.delete);

module.exports = router;