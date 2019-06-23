module.exports = function(sequelize, DataTypes) {
  var Plant = sequelize.define("plant", {
    plantName: DataTypes.STRING
  });

  Plant.associate = function(models) {
    Plant.belongsTo(models.device, {
      foreignKey: {
        allowNull: false
      }
    });
    Plant.hasMany(models.hist_stats, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Plant;
};
