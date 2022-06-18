const Ticket = require("../models/ticket.model.js");

//Créé et sauvegarde un nouveau ticket
exports.create = (req, res) => {
    //Si le body est vide
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    //Instanciation d'un Ticket
    const ticket = new Ticket({
        id: req.body.id,
        nom: req.body.nom,
        dateStart: req.body.dateStart,
        dateAssign: req.body.dateAssign,
        dateEnd: req.body.dateEnd,
        etatAvancement: req.body.etatAvancement,
        importance: req.body.importance,
        description: req.body.description,
        idDev: req.body.idDev,
        idClient: req.body.idClient,
        idProjet: req.body.idProjet,
        idRapporteur: req.body.idRapporteur
    });
    //Sauvegarde du ticket dans la base
    Ticket.create(ticket, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la création du Ticket."
            });
        } else {
            res.send(data);
        }
    });
};

//Trouve tous les tickets de la base de donnée
exports.findAll = (req, res) => {
    const contient = req.query.contient;
    Ticket.getAll(contient, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Tickets"
            });
        } else res.send(data);
    });
};

//Touve un seul ticket à partir de son id
exports.findOne = (req, res) => {
    Ticket.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Le ticket ayant pour id ${req.params.id} n'a pas été trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Une erreur est apparue lors de la recherche du
                    ticket ayant pour id ${req.params.id}.`
                });
            }
        } else res.send(data);
    });
};

//Met à jour un ticket à partir de son id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    newTicket = new Ticket(req.body);
    Ticket.updateById(
        newTicket,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Aucun ticket avec l id ${req.params.id} n'a été trouvé.`
                    });
                } else {
                    res.status(500).send({
                        message: "Une erreur est apparue lors de l'update du ticket ayant pour id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Ticket.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Aucun ticket n'a été trouvé à partir de l id : ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Le ticket identifié par l id " + req.params.id + " n'a pas pu être supprimé"
                });
            }
        } else res.send({ message: `Ticket `+ req.params.id +` correctement supprimé` });
    });
};