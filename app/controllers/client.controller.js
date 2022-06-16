const Client = require("../models/client.model.js");

//Créé et sauvegarde un nouveau client
exports.create = (req, res) => {
    //Si le body est vide
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    //Instanciation d'un Client
    const client = new Client({
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        entreprise: req.body.entreprise
    });
    //Sauvegarde du client dans la base
    Client.create(client, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la création du Client."
            });
        } else {
            res.send(data);
        }
    });
};

//Trouve tous les clients de la base de donnée
exports.findAll = (req, res) => {
    const contient = req.query.contient;
    Client.getAll(contient, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est apparue lors de la recherche de tous les Clients"
            });
        } else res.send(data);
    });
};

//Touve un seul client à partir de son id
exports.findOne = (req, res) => {
    Client.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Le client ayant pour id ${req.params.id} n'a pas été trouvé.`
                });
            } else {
                res.status(500).send({
                    message: `Une erreur est apparue lors de la recherche du
                    client ayant pour id ${req.params.id}.`
                });
            }
        } else res.send(data);
    });
};

//Met à jour un client à partir de son id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le body de la requête ne peut pas être vide"
        });
    }
    newClient = new Client(req.body);
    Client.updateById(
        newClient,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Aucun client avec l id ${req.params.id} n'a été trouvé.`
                    });
                } else {
                    res.status(500).send({
                        message: "Une erreur est apparue lors de l'update du client ayant pour id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Client.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Aucun client n'a été trouvé à partir de l id : ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Le client identifié par l id " + req.params.id + " n'a pas pu être supprimé"
                });
            }
        } else res.send({ message: `Client correctement supprimé` });
    });
};