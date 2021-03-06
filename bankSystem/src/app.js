const express = require("express");
const hbs = require("hbs");
const path = require("path");
const routers = require("../routes/routes");
const session = require("express-session");

app = express();
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "../resources/views"));
hbs.registerPartials(path.join(__dirname, "../resources/layouts"));

app.use(express.json())
app.use(express.urlencoded());
app.use(session({ secret: "hash" }));

app.use(routers);
module.exports = app;
