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

module.exports = Utils;