const express = require("express");
const Ciudad = require("../../db/modelos/Ciudad");
const Persona = require("../../db/modelos/Persona");
const { listarVacunas } = require("../../db/controladores/vacunas");

const router = express.Router();

router.get("/ciudad/:idCiudad", async (req, res, next) => {
  const { idCiudad } = req.params;
  const puntosCiudad = await Ciudad.findOne({
    _id: idCiudad,
  }).populate("puntosVacunacion");
  if (!puntosCiudad) {
    const nuevoError = new Error("No existe esta ciudad");
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  const vacunas = await listarVacunas();
  const personas = await Persona.find();
  const personasCiudad = personas.filter(({ centroVacunacion }) =>
    puntosCiudad.puntosVacunacion.find((punto) =>
      punto._id.equals(centroVacunacion)
    )
  );
  const vacunasPersonasCiudad = personasCiudad
    .filter((persona) => persona.dosis.length !== 0)
    .map((personaVacunada) => ({
      vacuna: personaVacunada.vacuna,
      dosisPinchadas: personaVacunada.dosis.length,
    }));
  const dosisVacuna = vacunas.map((vacunaMundial) => ({
    nombreVacuna: vacunaMundial.nombre,
    dosisPinchadasEnLaCiudad: vacunasPersonasCiudad.reduce(
      (acumulador, { vacuna, dosisPinchadas }) => {
        if (vacuna.equals(vacunaMundial._id)) {
          acumulador += dosisPinchadas;
        }
        return acumulador;
      },
      0
    ),
  }));
  res.json(dosisVacuna);
});

module.exports = router;
