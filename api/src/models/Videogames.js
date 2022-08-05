const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogames', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name : {
      type: DataTypes.STRING,   //
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,     //
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,   //
    },
    rating: {
      type: DataTypes.FLOAT,     //  o INTEGER 4,47  DOUBLE 
    },
    platforms: {
      type: DataTypes.STRING, //
      allowNull: false,
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
   
  },{
    timeStamps: false
  });
};
