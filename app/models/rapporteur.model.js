const sql = require("./db.js");

const Rapporteur = function(rapporteur) {
    this.id = rapporteur.id;
    this.nom = rapporteur.nom;
    this.prenom = rapporteur.prenom;
    this.email = rapporteur.email;
    this.profilPicture = rapporteur.profilPicture;
};

Rapporteur.create = (newRapporteur, result) => {
    sql.query("INSERT INTO rapporteur SET ?", newRapporteur, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("Created Rapporteur : ", { id: newRapporteur.id, ...newRapporteur });
        result(null, { id: newRapporteur.id, ...newRapporteur });
    });
};

Rapporteur.findById = (id, result) => {
    sql.query(`SELECT * FROM rapporteur WHERE id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found Rapporteur : ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Rapporteur.getAll = (contient, result) => {
    let query = "SELECT * FROM rapporteur"
    if (contient) {
        query += ` WHERE nom LIKE '%${contient}' OR prenom LIKE '%${contient}%'`;
        query += ` OR email LIKE '%${contient}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Rapporteurs : ", res);
        result(null, res);
    });
};

Rapporteur.getAllTickets = (id, result) => {
    sql.query("SELECT * FROM ticket WHERE idRapporteur = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Tickets Rapporteur : ", res);
        result(null, res);
    });
}

Rapporteur.updateById = (rapporteur, result) => {
    sql.query(
        "UPDATE rapporteur SET nom = ?, prenom = ?, email = ?, profilPicture = ? WHERE id = ?",
        [rapporteur.nom, rapporteur.prenom, rapporteur.email, rapporteur.profilPicture, rapporteur.id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("Updated Rapporteur: ", { id: rapporteur.id, ...rapporteur });
            result(null, { id: rapporteur.id, ...rapporteur });
        });
};

Rapporteur.remove = (id, result) => {
    sql.query("DELETE FROM rapporteur WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Le Rapporteur numero ", id, " a été supprimé");
        result(null, res);
    });
};

module.exports = Rapporteur;