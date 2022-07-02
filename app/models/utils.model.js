const sql = require("./db.js");

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let Utils = function() {};

Utils.findTickets = (info, result) => {
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
                result(err, null);
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

Utils.getAllEnterprises = (contient, result) => {
    let resFinal = [];
    let query = "SELECT DISTINCT(entreprise) FROM client ORDER BY entreprise";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        res.forEach(entrep => {
           resFinal.push(entrep.entreprise);
        });

        console.log("Enterprises : ", resFinal);
        result(null, resFinal);
    });
};

Utils.getNbTickets = (info, result) => {

    let typeDateQuery = "";
    switch (info.type) {
        case "A_FAIRE":
        case "ALL":
            typeDateQuery = `, dateStart`;
            break;
        case "EN_COURS":
            typeDateQuery = `, dateAssign`;
            break;
        case "FINI":
            typeDateQuery = `, dateEnd`;
            break;
        default:
            result({kind: "Erreur : type de requête inconnu"}, null);
            return;
    }

    let typeUserQuery = "";
    switch (info.userType) {
        case "dev":
            typeUserQuery = `idDev`;
            break;
        case "rap":
            typeUserQuery = `idRapporteur`;
            break;
        case "projet":
            typeUserQuery = `idProjet`;
            break;
        default:
            result({kind: "Erreur : type de requête inconnu"}, null);
            return;
    }

    // query
    let query = `SELECT importance` + typeDateQuery +` AS date
                 FROM ticket
                 WHERE ` + typeUserQuery +` = ?`;

    if (info.type !== "ALL") {
        query += ` AND etatAvancement = '${info.type}'`;
    }

    // objet json final
    let resFinal =
        {
            "id": 0
        };

    resFinal.id = info.id;

    // requête
    sql.query(query, [info.id, info.type],
        (err, res) => {
            if (err) {
                console.log("error : ", err);
                result(null, err);
                return;
            }

            // par mois
            if (info.nbMois !== 0) {
                resFinal.months = [];
                for (let i = info.nbMois - 1; i >= 0; i--) {
                    // final object to add to resFinal
                    let finalObj = {
                        "month": "",
                        "URGENT": 0,
                        "IMPORTANT": 0,
                        "MINEUR": 0
                    }

                    const date = new Date();
                    date.setDate(1);
                    date.setMonth(date.getMonth() - i);


                    let dateStartInfo = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    let dateEndInfo = date.getFullYear() + "-" + (date.getMonth() + 2) + "-" + date.getDate();

                    finalObj.month = monthNames[date.getMonth()];

                    res.filter(ticket => {
                        let dateTicket = new Date(ticket.date);
                        let dateStart = new Date(dateStartInfo);
                        let dateEnd = new Date(dateEndInfo);

                        if (dateTicket >= dateStart && dateTicket <= dateEnd) {
                            return true;
                        }
                    }).forEach(ticket => finalObj[ticket.importance]++);

                    resFinal.months.push(finalObj);
                }
            } else {
                // final object to add to resFinal
                let finalObj = {
                    "URGENT": 0,
                    "IMPORTANT": 0,
                    "MINEUR": 0
                }

                res.forEach(ticket => finalObj[ticket.importance]++);

                resFinal.ticket = finalObj;
            }
            console.log(resFinal);
            result(null, resFinal);
        });
};

Utils.getAverageTicketsPerDay = (info, result) => {
    let typeUserQuery = "";
    let typeDateQuery = "";

    switch (info.state) {
        case "A_FAIRE":
            typeDateQuery = `dateStart`;
            break;
        case "EN_COURS":
            typeDateQuery = `dateAssign`;
            break;
        case "FINI":
            typeDateQuery = `dateEnd`;
            break;
        default:
            result({kind: "Erreur : type de requête inconnu"}, null);
            return;
    }

    switch (info.userType) {
        case "dev":
            typeUserQuery = `idDev`;
            break;
        case "rap":
            typeUserQuery = `idRapporteur`;
            break;
        case "projet":
            typeUserQuery = `idProjet`;
            break;
    }

    // query
    let query = `SELECT `+ typeDateQuery +` AS date
                 FROM ticket WHERE etatAvancement = ?`;
    if (info.userType) query += ` AND `+ typeUserQuery +` = ?`;
    query += ` ORDER BY date ASC`;

        // requête
    sql.query(query, [info.state, info.id], (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        if (res.length === 0) {
            let resulatFinal = {
                moyenne: 0,
                totalDays: 0,
                totalTickets: 0
            };

            result(null, resulatFinal);
            return;
        }

        // get first date of the list
        let firstDate = new Date(res[0].date);

        // get all days between first date and now
        let days = [];
        let date = new Date(firstDate);
        while (date <= new Date()) {
            let dayToAdd = new Date(date);
            if (dayToAdd.getDay() !== 5 && dayToAdd.getDay() !== 6) {
                days.push(dayToAdd.getFullYear() + "-" + (dayToAdd.getMonth() + 1) + "-" + dayToAdd.getDate());
            }
            date.setDate(date.getDate() + 1);
        }

        let resulatFinal = {
            moyenne: res.length/days.length,
            totalDays: days.length,
            totalTickets: res.length
        };

        console.log(resulatFinal);
        result(null, resulatFinal);
    });
}

Utils.getAverageTimeSpendPerTicket = (info, result) => {
    const infoFinal = {
        state: "FINI",
        userType: "dev",
        id: info.id
    }

    let resultatFinal = {
        moyenne: 0
    }

    Utils.getAverageTicketsPerDay(infoFinal, (err, data) => {
        if (err) {
            result(err, null);
            return;
        }
        if (data.totalTickets) resultatFinal.moyenne = data.totalDays * 7 / data.totalTickets;
        else resultatFinal.moyenne = 0;
        console.log(resultatFinal);
        result(null, resultatFinal);
    });
}

module.exports = Utils;