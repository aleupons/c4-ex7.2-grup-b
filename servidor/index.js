const morgan = require("morgan");
const express = require("express");
const app = require("./init");
const { error404, errorGeneral } = require("./errores");
const rutaCentros = require("./rutas/puntosVacunacion");
const rutaVacunados = require("./rutas/personasVacunadas");
const rutaVacunas = require("./rutas/vacunas");

const iniciaServidor = () => {
  app.use(morgan("dev"));
  app.use(express.json());

  app.use("/vacunacion/centros", rutaCentros);
  app.use("/vacunacion/vacunados", rutaVacunados);
  /* app.use("/vacunacion/vacunas", rutaVacunas); */

  app.use(error404);
  app.use(errorGeneral);
};

module.exports = iniciaServidor;
