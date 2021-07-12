const express = require("express");
const { crearPersonaVacunada } = require("../../db/controladores/personas");
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

router.get("/persona/:dni", async (req, res, next) => {
  const { dni } = req.params;
  const persona = await Persona.findOne({
    dni,
  });
  if (!persona) {
    const nuevoError = new Error("No tenemos esta persona vacunada");
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(persona);
});

router.post("/persona", async (req, res, next) => {
  const nuevaPersonaVacunada = await crearPersonaVacunada;
  res.json(nuevaPersonaVacunada);
});

router.delete("/persona/:idPersona", async (req, res, next) => {
  const { idPersona } = req.params;
  const personaVacunadaEliminada = await Persona.findById(idPersona);
  res.json(personaVacunadaEliminada);
});

router.put("/persona/:idPersona", async (req, res, next) => {
  const { idPersona } = req.params;
  const personaAModificar = await Persona.findById(idPersona);
  res.json(personaAModificar);
});

module.exports = router;
