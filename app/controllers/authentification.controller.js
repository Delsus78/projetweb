const Authentification = require("../models/authentification.model.js");


//Login a user
exports.login = (req, res) => {

    Authentification.login(contient, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Impossible de se connecter"
            });
        } else res.send(data);
    });
};

//Register a user
exports.register = (req, res) => {

    Authentification.register(contient, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Impossible de s'enregistrer"
            });
        } else res.send(data);
    });
};