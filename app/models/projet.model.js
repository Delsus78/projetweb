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
    sql.query(`SELECT p.nom, p.id, t.importance FROM projet p JOIN ticket t on p.id = t.idProjet WHERE p.id = ?`, id, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
        if (res.length) {

            let finalRes = {
                id: res[0].id,
                nom: res[0].nom,
                nombreTicketsUrgents : 0,
                nombreTicketsImportants : 0,
                nombreTicketsMineurs : 0
            };

            res.forEach(element => {
                switch (element.importance) {
                    case "URGENT":
                        finalRes.nombreTicketsUrgents++;
                        break;
                    case "IMPORTANT":
                        finalRes.nombreTicketsImportants++;
                        break;
                    case "MINEUR":
                        finalRes.nombreTicketsMineurs++;
                        break;
                }
            });

            console.log("Found projet : ", finalRes);
            result(null, finalRes);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Projet.getAll = (contient, result) => {
    let query = "SELECT p.nom, p.id, t.importance FROM projet p LEFT JOIN ticket t on p.id = t.idProjet";
    if (contient) {
        query += ` WHERE nom LIKE '%${contient}'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        let finalRes = [];

        res.forEach(element => {
            let found = false;
            finalRes.forEach(project => {
                if (project.id === element.id) {
                    found = true;
                    switch (element.importance) {
                        case "URGENT":
                            project.nombreTicketsUrgents++;
                            break;
                        case "IMPORTANT":
                            project.nombreTicketsImportants++;
                            break;
                        case "MINEUR":
                            project.nombreTicketsMineurs++;
                            break;
                    }
                }
            });
            if (!found) {
                finalRes.push({
                    id: element.id,
                    nom: element.nom,
                    nombreTicketsUrgents : element.importance === "URGENT" ? 1 : 0,
                    nombreTicketsImportants : element.importance === "IMPORTANT" ? 1 : 0,
                    nombreTicketsMineurs : element.importance === "MINEUR" ? 1 : 0
                });
            }
        });

        console.log("Projets : ", finalRes);
        result(null, finalRes);
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