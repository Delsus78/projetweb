const Utils = require("../models/utils.model.js");
const Ticket = require("../models/ticket.model");

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

exports.getAllUsers = (req, res) => {
    const contient = req.query.contient;
    Utils.getAllUsers(contient, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Tickets"
            });
        } else res.send(data);
    });
}

exports.getNbTickets = (req, res) => {
    const info = {
        type: req.params.type,
        nbMois: req.params.nbMois,
        userType: req.params.userType,
        id: req.params.id
    }
    Utils.getNbTickets(info, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Tickets"
            });
        } else res.send(data);
    });
}

exports.getAverageTicketsPerDay = (req, res) => {
    const info = {
        state: req.params.state,
        userType: req.params.userType,
        id: req.params.id
    }
    Utils.getAverageTicketsPerDay(info, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Tickets"
            });
        } else res.send(data);
    });
}

exports.getAverageTimeSpendPerTicket = (req, res) => {
    const info = {
        id: req.params.id
    }
    Utils.getAverageTimeSpendPerTicket(info, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Tickets"
            });
        } else res.send(data);
    });
}