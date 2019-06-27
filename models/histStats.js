module.exports = function(sequelize, DataTypes) {
  var HistStats = sequelize.define(
    "HistStats",
    {
      timeStamp: DataTypes.DATE,
      moisture: DataTypes.INTEGER,
      light: DataTypes.INTEGER,
      sensorTempFehr: DataTypes.FLOAT,
      weatherTemp: DataTypes.FLOAT,
      precipIntensity: DataTypes.FLOAT,
      humidity: DataTypes.FLOAT,
      windSpeed: DataTypes.FLOAT
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["timeStamp"]
        }
      ]
    }
  );

  HistStats.associate = function(models) {
    HistStats.belongsTo(models.Plant, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return HistStats;
};
