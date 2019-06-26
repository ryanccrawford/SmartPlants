module.exports = function(sequelize, DataTypes) {
  var Plant = sequelize.define("Plant", {
    plantName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 16] }
    },
    image: DataTypes.STRING
    // tempMinFehr: DataTypes.FLOAT,
    // shadeTolerance: DataTypes.STRING,
    // precMinInches: DataTypes.INTEGER,
    // precMaxInches: DataTypes.INTEGER,
  });

  Plant.associate = function(models) {
    Plant.hasOne(models.Device, {
      foreignKey: {
        allowNull: false
      }
    });
    Plant.hasMany(models.LiveStats, {
      foreignKey: {
        allowNull: false
      }
    });
    Plant.hasMany(models.HistStats, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Plant;
};
