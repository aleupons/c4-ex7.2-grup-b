const express = require("express");
const { getNombreCiudad } = require("../../db/controladores/ciudades");
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

module.exports = router;
