const Developpeur = require("../models/developpeur.model.js");

//Créé et sauvegarde un nouveau developpeur
exports.create = (req, res) => {
    //Si le body est vide
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    //Instanciation d'un Developpeur
    const developpeur = new Developpeur({
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password,
        noisettes: req.body.noisettes,
        profilPicture: req.body.profilPicture
    });
    //Sauvegarde du client dans la base
    Developpeur.create(developpeur, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la création du Developpeur."
            });
        } else {
            res.send(data);
        }
    });
};

//Trouve tous les developpeurs de la base de donnée
exports.findAll = (req, res) => {
    const contient = req.query.contient;
    Developpeur.getAll(contient, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Developpeurs"
            });
        } else res.send(data);
    });
};

//Trouve tous les tickets de la base de donnée d'un developpeur donné
exports.findAllTickets = (req, res) => {
    const id = req.params.id;
    Developpeur.getAllTickets(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les tickets"
            });
        } else res.send(data);
    });
};

//renvoi les noisettes d'un developpeur donné
exports.getNoisettes = (req, res) => {
    const id = req.params.id;
    Developpeur.getNoisettes(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche des noisettes"
            });
        } else res.send(data);
    });
};

exports.getTicketsDonePerProject = (req, res) => {
    const id = req.params.id;
    Developpeur.getTicketsDonePerProject(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les tickets"
            });
        } else res.send(data);
    });
};

//Touve un seul developpeur à partir de son id
exports.findOne = (req, res) => {
    Developpeur.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Le developpeur ayant pour id ${req.params.id} n'a pas été trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Une erreur est apparue lors de la recherche du
                    developpeur ayant pour id ${req.params.id}.`
                });
            }
        } else res.send(data);
    });
};

//Met à jour un developpeur à partir de son id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    newDeveloppeur = new Developpeur(req.body);
    Developpeur.updateById(
        newDeveloppeur,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Aucun developpeur avec l id ${req.params.id} n'a été trouvé.`
                    });
                } else {
                    res.status(500).send({
                        message: "Une erreur est apparue lors de l'update du developpeur ayant pour id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Developpeur.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Aucun developpeur n'a été trouvé à partir de l id : ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Le developpeur identifié par l id " + req.params.id + " n'a pas pu être supprimé"
                });
            }
        } else res.send({ message: `Developpeur correctement supprimé` });
    });
};