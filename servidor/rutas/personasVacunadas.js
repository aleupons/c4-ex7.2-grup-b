const express = require("express");
const { getNombreCiudad } = require("../../db/controladores/ciudades");
const CentroVacunacion = require("../../db/modelos/CentroVacunacion");
const Ciudad = require("../../db/modelos/Ciudad");
const Persona = require("../../db/modelos/Persona");

const router = express.Router();

router.get("/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const { puntosVacunacion } = await Ciudad.findOne({
    _id: idCiudad,
  }).populate("puntosVacunacion");
  const personas = await Persona.find({
    centroVacunacion: puntosVacunacion.map((centro) => centro._id),
  });
  const nombreCiudad = await getNombreCiudad(idCiudad);
  if (!nombreCiudad) {
    const nuevoError = new Error("No existe esta ciudad");
    nuevoError.codigo = 404;
    return next(nuevoError);
  } else if (personas.length === 0) {
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
  const { _id } = await CentroVacunacion.findOne({
    _id: idCentro,
  });
  const personas = await Persona.find({
    centroVacunacion: _id,
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
