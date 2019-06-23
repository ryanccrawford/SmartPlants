module.exports = function(sequelize, DataTypes) {
  var Plant = sequelize.define("plant", {
    plantName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 16] }
    }
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
