const Rapporteur = require("../models/rapporteur.model.js");

//Créé et sauvegarde un nouveau rapporteur
exports.create = (req, res) => {
    //Si le body est vide
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    //Instanciation d'un Rapporteur
    const rapporteur = new Rapporteur({
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: req.body.password,
        email: req.body.email,
        profilPicture: req.body.profilPicture
    });
    //Sauvegarde du client dans la base
    Rapporteur.create(rapporteur, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la création du Rapporteur."
            });
        } else {
            res.send(data);
        }
    });
};

//Trouve tous les rapporteurs de la base de donnée
exports.findAll = (req, res) => {
    const contient = req.query.contient;
    Rapporteur.getAll(contient, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Rapporteurs"
            });
        } else res.send(data);
    });
};

//Trouve tous les tickets de la base de donnée d'un rapporteur donné
exports.findAllTickets = (req, res) => {
    const id = req.params.id;
    Rapporteur.getAllTickets(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les tickets"
            });
        } else res.send(data);
    });
};

exports.getTicketsDonePerProject = (req, res) => {
    const id = req.params.id;
    Rapporteur.getTicketsDonePerProject(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les tickets"
            });
        } else res.send(data);
    });
};

//Touve un seul rapporteur à partir de son id
exports.findOne = (req, res) => {
    Rapporteur.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Le rapporteur ayant pour id ${req.params.id} n'a pas été trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Une erreur est apparue lors de la recherche du
                    rapporteur ayant pour id ${req.params.id}.`
                });
            }
        } else res.send(data);
    });
};

//Met à jour un rapporteur à partir de son id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    newRapporteur = new Rapporteur(req.body);
    Rapporteur.updateById(
        newRapporteur,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Aucun rapporteur avec l id ${req.params.id} n'a été trouvé.`
                    });
                } else {
                    res.status(500).send({
                        message: "Une erreur est apparue lors de l'update du rapporteur ayant pour id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Rapporteur.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Aucun rapporteur n'a été trouvé à partir de l id : ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Le rapporteur identifié par l id " + req.params.id + " n'a pas pu être supprimé"
                });
            }
        } else res.send({ message: `Rapporteur correctement supprimé` });
    });
};