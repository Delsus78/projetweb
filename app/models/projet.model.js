const sql = require("./db.js");

const Projet = function(projet) {
    this.id = projet.id;
    this.nom = projet.nom;
};

Projet.create = (newProjet, result) => {
    sql.query(`INSERT INTO projet SET ?`, newProjet, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("Created Projet : ", { id: newProjet.id, ...newProjet });
        result(null, { id: newProjet.id, ...newProjet });
    });
};

Projet.findById = (id, result) => {
    sql.query(`SELECT * FROM projet WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found projet : ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Projet.getAll = (contient, result) => {
    let query = "SELECT * FROM projet"
    if (contient) {
        query += ` WHERE nom LIKE '%${contient}'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Projets : ", res);
        result(null, res);
    });
};

Projet.getAllTickets = (id, result) => {
    sql.query("SELECT * FROM ticket WHERE idProjet = ?", id, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Tickets Projet : ", res);
        result(null, res);
    });
}

Projet.updateById = (projet, result) => {
    sql.query(
        "UPDATE projet SET nom = ? WHERE id = ?",
        [projet.nom, projet.id],
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
            console.log("Updated projet: ", { id: projet.id, ...projet });
            result(null, { id: projet.id, ...projet });
        });
};

Projet.remove = (id, result) => {
    sql.query("DELETE FROM projet WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Le projet avec l'id ", id, " a été supprimé");
        result(null, res);
    });
};

module.exports = Projet;