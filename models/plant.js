module.exports = function(sequelize, DataTypes) {
  var Plant = sequelize.define("Plant", {
    plantName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 16] }
    },
    image: DataTypes.STRING
  });

  Plant.associate = function(models) {
    Plant.belongsTo(models.Device, {
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
