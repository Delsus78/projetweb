const sql = require("./db.js");

let Utils = function() {};

Utils.findTickets = (info, result) => {
    console.log(`SELECT * FROM ticket WHERE etatAvancement = '${info.etatAvancement}' ` +
        `AND ${info.typeDate} >= '${info.dateStart}' `+
        `AND ${info.typeDate} < '${info.dateEnd}'`);
    sql.query(
        `SELECT * FROM ticket WHERE etatAvancement = '${info.etatAvancement}' ` +
            `AND ${info.typeDate} >= '${info.dateStart}' `+
            `AND ${info.typeDate} < '${info.dateEnd}'`,
        (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        console.log("Tickets : ", res);
        result(null, res);
    });
}

Utils.getAllUsers = (contient, result) => {
    let resFinal = [];
    let query = "SELECT * FROM developpeur";
    sql.query(query, (err, res1) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        // Ajout du champs type dans le résultat
        res1.forEach(dev => {
            dev.type = "DEV";
            resFinal.push(dev);
        });

        console.log("Developpeurs : ", res1);
        query = "SELECT * FROM rapporteur";
        sql.query(query, (err, res2) => {
            if (err) {
                console.log("error : ", err);
                result(null, err);
                return;
            }

            // Ajout du champs type dans le résultat
            res2.forEach(rap => {
                rap.type = "RAP";
                resFinal.push(rap);
            });

            result(null, resFinal);
        });

    });
};

module.exports = Utils;