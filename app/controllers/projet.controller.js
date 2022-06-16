const Projet = require("../models/projet.model.js");

//Créé et sauvegarde un nouveau projet
exports.create = (req, res) => {
    //Si le body est vide
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    //Instanciation d'un Projet
    const projet = new Projet({
        id: req.body.id,
        nom: req.body.nom
    });
    //Sauvegarde du projet dans la base
    Projet.create(projet, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la création du Projet."
            });
        } else {
            res.send(data);
        }
    });
};

//Trouve tous les projets de la base de donnée
exports.findAll = (req, res) => {
    const contient = req.query.contient;
    Projet.getAll(contient, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Projets"
            });
        } else res.send(data);
    });
};

//Trouve tous les tickets de la base de donnée d'un projet donné
exports.findAllTickets = (req, res) => {
    const id = req.params.id;
    Projet.getAllTickets(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les tickets"
            });
        } else res.send(data);
    });
};

//Touve un seul projet à partir de son id
exports.findOne = (req, res) => {
    Projet.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Le projet ayant pour id ${req.params.id} n'a pas été trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Une erreur est apparue lors de la recherche du
                    projet ayant pour id ${req.params.id}.`
                });
            }
        } else res.send(data);
    });
};

//Met à jour un projet à partir de son id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    newProjet = new Projet(req.body);
    Projet.updateById(
        newProjet,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Aucun projet avec l id ${req.params.id} n'a été trouvé.`
                    });
                } else {
                    res.status(500).send({
                        message: "Une erreur est apparue lors de l'update du projet ayant pour id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Projet.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Aucun projet n'a été trouvé à partir de l id : ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Le projet identifié par l id " + req.params.id + " n'a pas pu être supprimé"
                });
            }
        } else res.send({ message: `Projet correctement supprimé` });
    });
};