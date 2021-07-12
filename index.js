require("dotenv").config();
const debug = require("debug")("vacunasApp:principal");
const conectarBD = require("./db");
const iniciaPreguntas = require("./cli");
const iniciaServidor = require("./servidor");

conectarBD(
  () => iniciaPreguntas(),
  () => iniciaServidor()
);
