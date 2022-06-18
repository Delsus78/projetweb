const sql = require("./db.js");

const Developpeur = function(developpeur) {
    this.id = developpeur.id;
    this.nom = developpeur.nom;
    this.prenom = developpeur.prenom;
    this.email = developpeur.email;
    this.noisettes = developpeur.noisettes;
    this.profilPicture = developpeur.profilPicture;
};

Developpeur.create = (newDeveloppeur, result) => {
    sql.query("INSERT INTO developpeur SET ?", newDeveloppeur, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created developpeur: ", { id: newDeveloppeur.id, ...newDeveloppeur });
        result(null, { id: newDeveloppeur.id, ...newDeveloppeur });
    });
}

Developpeur.findById = (id, result) => {
    sql.query(`SELECT * FROM developpeur WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found developpeur: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found developpeur with the id
        result({ kind: "not_found" }, null);
    });
}

Developpeur.getAll = (contient, result) => {
    let query = "SELECT * FROM developpeur";
    if (contient) {
        query += ` WHERE nom LIKE '%${contient}' OR WHERE prenom LIKE '%${contient}'`;
        query += ` OR WHERE email LIKE '%${contient}' OR noisettes LIKE '%${contient}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Developpeurs : ", res);
        result(null, res);
    });
}

Developpeur.updateById = (developpeur, result) => {
    sql.query(
        "UPDATE developpeur SET nom = ?, noisettes = ?, prenom = ?, email = ?, profilPicture = ? WHERE id = ?",
        [developpeur.nom, developpeur.noisettes, developpeur.prenom, developpeur.email,developpeur.profilPicture, developpeur.id],
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
            console.log("Updated developpeur: ", { id: developpeur.id, ...developpeur });
            result(null, { id: developpeur.id, ...developpeur });
        });
}

Developpeur.getAllTickets = (id, result) => {
    sql.query("SELECT * FROM ticket WHERE idDev = ?", id, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Tickets Developpeur : ", res);
        result(null, res);
    });
}

Developpeur.getTicketsDonePerProject = (id, result) => {
    sql.query(`SELECT ticket.id, projet.nom, projet.id as projetId FROM ticket JOIN projet ON ticket.idProjet = projet.id WHERE idDev = ${id} AND ticket.etatAvancement = "FINI"`, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        let projects = [];
        for (let i = 0; i < res.length; i++) {
            if (!projects.find(project => project.id === res[i].projetId)) {
                projects.push(
                    {
                        id: res[i].projetId,
                        nom: res[i].nom,
                        nbTicketFini: 1
                    }
                );
            } else projects.find(project => project.id === res[i].projetId).nbTicketFini++;
        }
        console.log("Tickets finis par le developpeur : ", projects);
        result(null, projects);
    });
}

Developpeur.remove = (id, result) => {
    sql.query("DELETE FROM developpeur WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found developpeur with the id
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Le developpeur avec l'id: ", id, " a été supprimé");
        result(null, res);
    });
}

module.exports = Developpeur;