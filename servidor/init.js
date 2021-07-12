require("dotenv").config();
const chalk = require("chalk");
const express = require("express");
const { errorServidor } = require("./errores");

const app = express();
const puerto = process.env.PUERTO || 4001;

const server = app.listen(puerto, () => {
  console.log(chalk.yellow(`\nServidor escuchando en el puerto ${puerto}`));
});

server.on("error", (err) => errorServidor(err, puerto));

module.exports = app;
