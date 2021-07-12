/* const express = require("express");
const Persona = require("../../db/modelos/Persona");

const router = express.Router();

router.get("/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const totalVacunasPersonas = await Persona.find();
  console.log(totalVacunasPersonas.dosis);
  if (!ciudad) {
    const nuevoError = new Error("No existe este ciudad");
    nuevoError.codigo = 404;
    return next(nuevoError);
  } else if (ciudad.length === 0) {
    const nuevoError = new Error(
      `No existen ciudads de vacunación con la id: ${idCiudad}`
    );
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(totalVacunasPersonas);
});

module.exports = router; */
