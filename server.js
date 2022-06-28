const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: "Api TICKETTAC" });
});

const developpeurRoutes = require("./app/routes/developpeur.routes.js");
app.use('/api/developpeur', developpeurRoutes);

const rapporteurRoutes = require("./app/routes/rapporteur.routes.js");
app.use('/api/rapporteur', rapporteurRoutes);

const clientRoutes = require("./app/routes/client.routes.js");
app.use('/api/client', clientRoutes);

const projetRoutes = require("./app/routes/projet.routes.js");
app.use('/api/projet', projetRoutes);

const ticketRoutes = require("./app/routes/ticket.routes.js");
app.use('/api/ticket', ticketRoutes);

const utilsRoutes = require("./app/routes/utils.routes.js");
app.use('/api/utils', utilsRoutes);

const authentificationRoutes = require("./app/routes/authentification.routes.js");
app.use('/api/authentification', authentificationRoutes);

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});