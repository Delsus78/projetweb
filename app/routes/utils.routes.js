const utils = require("../controllers/utils.controller.js");
var router = require("express").Router();

router.post("/findtickets", utils.findTickets);

router.get("/users", utils.getAllUsers);

router.get("/enterprises", utils.getAllEnterprises);

router.get("/nbTickets/:type/:nbMois/:userType/:id", utils.getNbTickets);

router.get("/AverageTicketsPerDay/:state/:userType/:id", utils.getAverageTicketsPerDay);

router.get("/AverageTimeSpendPerTicket/:id", utils.getAverageTimeSpendPerTicket);

module.exports = router;