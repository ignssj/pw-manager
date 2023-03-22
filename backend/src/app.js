const express = require('express');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const router = require("./router");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

module.exports = app;