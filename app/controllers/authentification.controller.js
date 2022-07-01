const Authentification = require("../models/authentification.model.js");


//Login a user
exports.login = (req, res) => {

    const userSecurityInfo = {
        email: req.body.email,
        password: req.body.password
    }
    Authentification.login(userSecurityInfo, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Impossible de se connecter"
            });
        } else res.send(data);
    });
};