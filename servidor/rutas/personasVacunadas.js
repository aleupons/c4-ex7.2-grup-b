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
  const persona = req.body;
  const {
    dosis: [primeraDosis, segundaDosis],
  } = persona;
  if (primeraDosis) {
    persona.primeraDosis = primeraDosis;
  }
  if (segundaDosis) {
    persona.segundaDosis = segundaDosis;
  }
  const nuevaPersonaVacunada = await crearPersonaVacunada(
    persona.dni,
    persona.centroVacunacion,
    persona.vacuna,
    persona.primeraDosis,
    persona.segundaDosis
  );
  if (!nuevaPersonaVacunada) {
    const nuevoError = new Error("La persona no se ha enviado correctamente");
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(nuevaPersonaVacunada);
});

router.delete("/persona/:idPersona", async (req, res, next) => {
  const { idPersona } = req.params;
  const existePersona = await Persona.findOne({
    _id: idPersona,
  });
  if (!existePersona) {
    const nuevoError = new Error("No tenemos esta persona");
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  const personaVacunadaEliminada = await Persona.findByIdAndDelete(idPersona);
  res.json(personaVacunadaEliminada);
});

router.put("/persona/:idPersona", async (req, res, next) => {
  const { idPersona } = req.params;
  const persona = req.body;
  const existePersona = await Persona.findOne({
    _id: idPersona,
  });
  if (!existePersona) {
    const nuevoError = new Error("No tenemos esta persona");
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  const personaAModificar = await Persona.findByIdAndUpdate(idPersona, persona);
  res.json(personaAModificar);
});

module.exports = router;
