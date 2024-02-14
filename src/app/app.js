const express = require('express');

const cors = require('cors');

const crypto = require('crypto');

const nodemailer = require('nodemailer');

const router = require('./routes/web');

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

module.exports = app;
