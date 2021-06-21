const express = require('express');
require('../db/db');
const routes = require('../routes/routes');
const app = express();
app.use(express.json());
app.use(routes);
module.exports=app