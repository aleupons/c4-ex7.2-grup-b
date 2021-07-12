const Ciudad = require("../modelos/Ciudad");

const getNombreCiudad = async (idCiudad) => {
  try {
    const ciudad = await Ciudad.findOne().where("_id").equals(idCiudad);
    return ciudad.nombre;
  } catch (err) {
    console.log("No existe la ciudad", err.message);
  }
};

module.exports = {
  getNombreCiudad,
};
