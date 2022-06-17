const sql = require("./db.js");

let Utils = function() {};

Utils.findTickets = (info, result) => {
    sql.query(
        `SELECT * FROM ticket WHERE etatAvancement = '${info.etatAvancement}' ` +
            `AND dateStart >= '${info.dateStart}' `+
            `AND dateStart < '${info.dateEnd}'`,
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