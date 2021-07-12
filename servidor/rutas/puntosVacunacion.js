const express = require("express");

const { listarCentros } = require("../../db/controladores/centros");
const { getNombreCiudad } = require("../../db/controladores/ciudades");

const router = express.Router();

router.get("/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const nombreCiudad = await getNombreCiudad(idCiudad);
  const puntosVacunacion = await listarCentros(nombreCiudad, true);
  if (!nombreCiudad) {
    const nuevoError = new Error("No existe esta ciudad");
    nuevoError.codigo = 404;
    return next(nuevoError);
  } else if (puntosVacunacion.length === 0) {
    const nuevoError = new Error(
      "No existen centros de vacunación en esta ciudad"
    );
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(puntosVacunacion);
});

module.exports = router;
