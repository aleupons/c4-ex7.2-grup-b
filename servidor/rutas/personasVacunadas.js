const express = require("express");
const CentroVacunacion = require("../../db/modelos/CentroVacunacion");
const Ciudad = require("../../db/modelos/Ciudad");
const Persona = require("../../db/modelos/Persona");

const router = express.Router();

router.get("/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const ciudad = await Ciudad.findOne({
    _id: idCiudad,
  });
  if (!ciudad) {
    const nuevoError = new Error("No existe esta ciudad");
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  const personas = await Persona.find({
    centroVacunacion: ciudad.puntosVacunacion.map((centro) => centro._id),
  });
  if (personas.length === 0) {
    const nuevoError = new Error(
      "No tenemos personas vacunadas en esta ciudad"
    );
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(personas);
});

router.get("/centro/:idCentro", async (req, res, next) => {
  const { idCentro } = req.params;
  const centroVacunacion = await CentroVacunacion.findOne({
    _id: idCentro,
  });
  if (!centroVacunacion) {
    const nuevoError = new Error("No existe esta centro de vacunación");
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  const personas = await Persona.find({
    centroVacunacion: centroVacunacion._id,
  });
  if (personas.length === 0) {
    const nuevoError = new Error(
      "No tenemos personas vacunadas en este centro"
    );
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(personas);
});

module.exports = router;
