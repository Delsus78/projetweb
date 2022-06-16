const developpeur = require("../controllers/developpeur.controller.js");
var router = require("express").Router();

//CREATE un nouveau developpeur
router.post("/", developpeur.create);

//GET ALL des developpeurs
router.get("/", developpeur.findAll);

//GET ALL tickets d'un developpeur
router.get("/AllTickets/:id", developpeur.findAllTickets)

//GET un developpeur en fonction de son id
router.get("/:id", developpeur.findOne);

//UPDATE un developpeur identifié par son id
router.put("/", developpeur.update);

//DELETE un developpeur identifié par son id
router.delete("/:id", developpeur.delete);

module.exports = router;