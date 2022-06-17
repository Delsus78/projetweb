const Utils = require("../models/utils.model.js");

exports.findTickets = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }

    const info = {
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        etatAvancement: req.body.etatAvancement,
        typeDate: req.body.typeDate
    }

    Utils.findTickets(info, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Tickets"
            });
        } else res.send(data);
    });
}