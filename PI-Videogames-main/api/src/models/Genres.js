const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("genres", ///definimos el modelo genres
  {
    id: {
      type: DataTypes.UUID, ///tendra un id unico,UUID es un tipo de identificador unico
      defaultValue: DataTypes.UUIDV4,///este id ser una cadena alfanumerica,,UUIDDV4 es una version espesifica de UUID
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,///time stamps indica que tendra 2 columnas que indican cuando se creo y cuando se actualizo..(si estuviera en true)
  });
};
