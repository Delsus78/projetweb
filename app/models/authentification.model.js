const sql = require("./db.js");
const Utils = require("./utils.model.js");

const Authentification = () => {};

Authentification.login = (userSecurityInfo, result) => {
        Utils.getAllUsers(userSecurityInfo, (err, res) => {

            // parcourir tout les utilisateurs et savoir si un email existe, et si le mot de passe est correct
            let finalRes = {
                message: "",
                user: null
            };

            for (let i = 0; i < res.length; i++) {
                if (res[i].email === userSecurityInfo.email) {
                    if (res[i].password === userSecurityInfo.password) {
                        finalRes.message = "OK";
                        finalRes.user = {
                            userId : res[i].id,
                            userType : res[i].type,
                            userNom : res[i].nom,
                            userPrenom : res[i].prenom,
                            userNoisettes : null
                        }

                        if (res[i].type === "DEV") {
                            finalRes.user.userNoisettes = 100;
                        }
                        break;
                    } else {
                        finalRes.message = "Mauvais password";
                        console.log("response : ", finalRes);
                        result(null, finalRes);
                        return;
                    }
                }
            }
            if (finalRes.user == null) {
                finalRes.message = "Email existe pas";
                console.log("response : ", finalRes);
                result(null, finalRes);
                return;
            }

            console.log("response : ", finalRes);
            result(null, finalRes);
        }
    );
};


module.exports = Authentification;