const express = require('express');
const routes = require('../routes/routes');
require('../database/db');
const app=express();
app.use(express.json());
app.use(routes);



module.exports=app;