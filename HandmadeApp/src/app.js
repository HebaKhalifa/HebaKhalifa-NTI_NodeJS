const express = require('express');
const routes = require('../routes/routes');
const cors=require('cors');
require('../database/db');
const app=express();
app.use(cors());
app.use(express.json());
app.use(routes);



module.exports=app;