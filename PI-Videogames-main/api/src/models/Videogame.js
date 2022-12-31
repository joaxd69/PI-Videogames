const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      released: {
        type: DataTypes.DATEONLY,///Dateonly representa que recibira una fecha  solo fecha, sin horas
        defaultValue: DataTypes.NOW,//nos generara la fecha actual al momento de poner datos
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
       
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
    );
};


///////////////
// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('videogame', {
//     id:{
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     released: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     rating: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     platforms: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: false,
//     },
//     createdInDb:{
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//       allowNull: false,
//     }
//   });
// };