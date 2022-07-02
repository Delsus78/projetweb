const sql = require("./db.js");

const Client = function(client) {
    this.id = client.id;
    this.entreprise = client.entreprise;
    this.nom = client.nom;
    this.email = client.email;
    this.prenom = client.prenom;
};

Client.create = (newClient, result) => {
    sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("Created client : ", { id: newClient.id, ...newClient });
        result(null, { id: newClient.id, ...newClient });
    });
};

Client.findById = (id, result) => {
    sql.query(`SELECT * FROM client WHERE id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found client : ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Client.getAll = (contient, result) => {
    let query = "SELECT * FROM client"
    if (contient) {
        query += ` WHERE nom LIKE '%${contient}' OR prenom LIKE '%${contient}%'`;
        query += ` OR email LIKE '%${contient}' OR entreprise LIKE '%${contient}'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Clients : ", res);
        result(null, res);
    });
};

Client.findAllTickets = (id, result) => {
    sql.query(`SELECT * FROM ticket WHERE idClient = '${id}'`, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Tickets : ", res);
        result(null, res);
    });
}

Client.updateById = (client, result) => {
    sql.query(
        "UPDATE client SET nom = ?, prenom = ?, entreprise = ?, email = ? WHERE id = ?",
        [client.nom, client.prenom, client.entreprise, client.email, client.id],
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
            console.log("Updated client: ", { id: client.id, ...client });
            result(null, { id: client.id, ...client });
        });
};

Client.remove = (id, result) => {
    sql.query("DELETE FROM client WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Le client avec l'id", id, " a été supprimé");
        result(null, res);
    });
};

module.exports = Client;