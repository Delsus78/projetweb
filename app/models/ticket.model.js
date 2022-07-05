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
    let query = "SELECT d.nom NomDev, d.prenom PrenomDev, c.nom NomClient, c.prenom PrenomClient, p.nom NomProjet, r.Prenom PrenomRapporteur, r.Nom NomRapporteur, ticket.id, idClient, idDev, idRapporteur, ticket.nom, dateStart, etatAvancement, importance, description, idProjet, dateAssign, dateEnd FROM ticket LEFT JOIN developpeur d ON d.id = ticket.idDev LEFT JOIN client c on c.id = ticket.idClient LEFT JOIN rapporteur r on ticket.idRapporteur = r.id LEFT JOIN projet p on p.id = ticket.idProjet WHERE ticket.id = ?"

    sql.query(query, id,(err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        if (res.length) {

            let objetFinal = {
                id: res[0].id,
                nom: res[0].nom,
                developpeur: null,
                client: null,
                rapporteur: null,
                projet: null,
                dateStart: res[0].dateStart,
                etatAvancement: res[0].etatAvancement,
                importance: res[0].importance,
                description: res[0].description,
                dateAssign: res[0].dateAssign,
                dateEnd: res[0].dateEnd
            };

            objetFinal.developpeur = {
                nom: res[0].NomDev,
                prenom: res[0].PrenomDev,
                id: res[0].idDev
            };

            objetFinal.client = {
                nom: res[0].NomClient,
                prenom: res[0].PrenomClient,
                id: res[0].idClient
            };

            objetFinal.rapporteur = {
                nom: res[0].NomRapporteur,
                prenom: res[0].PrenomRapporteur,
                id: res[0].idRapporteur
            };

            objetFinal.projet = {
                nom: res[0].NomProjet,
                id: res[0].idProjet
            };

            console.log("Ticket : ", objetFinal);
            result(null, objetFinal);
            return;
        }

        console.log("Ticket not found with id : ", id);
        result({ kind: "not_found" }, null);
    });
};

Ticket.getAll = (contient, result) => {
    let query = "SELECT d.nom NomDev, d.prenom PrenomDev, c.nom NomClient, c.prenom PrenomClient, p.nom NomProjet, r.Prenom PrenomRapporteur, r.Nom NomRapporteur, ticket.id, idClient, idDev, idRapporteur, ticket.nom, dateStart, etatAvancement, importance, description, idProjet, dateAssign, dateEnd FROM ticket LEFT JOIN developpeur d ON d.id = ticket.idDev LEFT JOIN client c on c.id = ticket.idClient LEFT JOIN rapporteur r on ticket.idRapporteur = r.id LEFT JOIN projet p on p.id = ticket.idProjet"
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

        let listFinal = [];

        for (let i = 0; i <res.length; i++) {
            let objetFinal = {
                id: res[i].id,
                nom: res[i].nom,
                developpeur: null,
                client: null,
                rapporteur: null,
                projet: null,
                dateStart: res[i].dateStart,
                etatAvancement: res[i].etatAvancement,
                importance: res[i].importance,
                description: res[i].description,
                dateAssign: res[i].dateAssign,
                dateEnd: res[i].dateEnd
            };

            objetFinal.developpeur = {
                nom: res[i].NomDev,
                prenom: res[i].PrenomDev,
                id: res[i].idDev
            };

            objetFinal.client = {
                nom: res[i].NomClient,
                prenom: res[i].PrenomClient,
                id: res[i].idClient
            };

            objetFinal.rapporteur = {
                nom: res[i].NomRapporteur,
                prenom: res[i].PrenomRapporteur,
                id: res[i].idRapporteur
            };

            objetFinal.projet = {
                nom: res[i].NomProjet,
                id: res[i].idProjet
            };

            listFinal.push(objetFinal);
        }

        console.log("Tickets : ", listFinal);
        result(null, listFinal);
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

            // adding noisettes to the dev ticket if it's on FINI
            if (ticket.etatAvancement === "FINI" && ticket.idDev) {
                let queryNoisettes = "UPDATE developpeur SET noisettes = noisettes + ? WHERE id = ?";
                let nbNoisettes = 0;
                switch (ticket.importance) {
                    case "URGENT":
                        nbNoisettes = 30;
                        break;
                    case "IMPORTANT":
                        nbNoisettes = 15;
                        break;
                    case "MINEUR":
                        nbNoisettes = 5;
                        break;
                }

                sql.query(queryNoisettes, [nbNoisettes, ticket.idDev], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }
                    console.log("Noisettes added to dev : " + nbNoisettes);
                });
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