const rapporteur = require("../controllers/rapporteur.controller.js");
var router = require("express").Router();

//CREATE un nouveau rapporteur
router.post("/", rapporteur.create);

//GET ALL des rapporteurs
router.get("/", rapporteur.findAll);

//GET ALL tickets d'un rapporteur
router.get("/AllTickets/:id", rapporteur.findAllTickets)

router.get("/TicketsDonePerProject/:id", rapporteur.getTicketsDonePerProject);

//GET un rapporteur en fonction de son id
router.get("/:id", rapporteur.findOne);

//UPDATE un rapporteur identifié par son id
router.put("/", rapporteur.update);

//DELETE un rapporteur identifié par son id
router.delete("/:id", rapporteur.delete);

module.exports = router;