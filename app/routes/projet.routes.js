const projet = require("../controllers/projet.controller.js");
var router = require("express").Router();

//CREATE un nouveau projet
router.post("/", projet.create);

//GET ALL des projets
router.get("/", projet.findAll);

//GET ALL tickets d'un projet
router.get("/AllTickets/:id", projet.findAllTickets)

//GET un projet en fonction de son id
router.get("/:id", projet.findOne);

//UPDATE un projet identifié par son id
router.put("/", projet.update);

//DELETE un projet identifié par son id
router.delete("/:id", projet.delete);

module.exports = router;