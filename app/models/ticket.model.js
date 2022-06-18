const sql = require("./db.js");

const Ticket = function(ticket) {
    this.id = ticket.id;
    this.idDev = ticket.idDev;
    this.idRapporteur = ticket.idRapporteur;
    this.etatAvancement = ticket.etatAvancement;
    this.importance = ticket.importance;
    this.description = ticket.description;
    this.idProjet = ticket.idProjet;
    this.idClient = ticket.idClient;
    this.nom = ticket.nom;
    this.dateStart = ticket.dateStart;
    this.dateAssign = ticket.dateAssign;
    this.dateEnd = ticket.dateEnd;
};

Ticket.create = (newTicket, result) => {
    sql.query("INSERT INTO ticket SET ?", newTicket, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("Created Ticket : ", { id: newTicket.id, ...newTicket });
        result(null, { id: newTicket.id, ...newTicket });
    });
};

Ticket.findById = (id, result) => {
    sql.query(`SELECT * FROM ticket WHERE id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found ticket : ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Ticket.getAll = (contient, result) => {
    let query = "SELECT * FROM ticket"
    if (contient) {
        query += `WHERE etatAvancement LIKE '%${contient}%' ` +
        `OR importance LIKE '%${contient}%' ` +
        `OR description LIKE '%${contient}%' ` +
        `OR nom LIKE '%${contient}%' ` +
        `OR date LIKE '%${contient}%'` +
        `OR idProjet LIKE '%${contient}' ` +
        `OR idDev LIKE '%${contient}%'` +
        `OR idRapporteur LIKE '%${contient}%'` +
        `OR idClient LIKE '%${contient}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Tickets : ", res);
        result(null, res);
    });
};

Ticket.updateById = (ticket, result) => {
    sql.query(
        "UPDATE ticket SET etatAvancement = ?, importance = ?, description = ?, nom = ?, dateStart = ?, dateAssign = ?, dateEnd = ?, idProjet = ?, idRapporteur = ?, idDev = ?, idClient = ? WHERE id = ?",
        [
            ticket.etatAvancement,
            ticket.importance,
            ticket.description,
            ticket.nom,
            ticket.dateStart,
            ticket.dateAssign,
            ticket.dateEnd,
            ticket.idProjet,
            ticket.idRapporteur,
            ticket.idDev,
            ticket.idClient,
            ticket.id
        ],
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
            console.log("Updated ticket: ", { id: ticket.id, ...ticket });
            result(null, { id: ticket.id, ...ticket });
        });
};

Ticket.remove = (id, result) => {
    sql.query("DELETE FROM ticket WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Le ticket numero ", id, " a été supprimé");
        result(null, res);
    });
};

module.exports = Ticket;