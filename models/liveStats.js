module.exports = function(sequelize, DataTypes) {
  var LiveStats = sequelize.define(
    "LiveStats",
    {
      timeStamp: {
        type: "TIMESTAMP",
        defaultValue: sequelize.fn("NOW"),
        allowNull: false
      },
      moisture: DataTypes.INTEGER,
      light: DataTypes.INTEGER,
      sensorTempFehr: DataTypes.FLOAT,
      weatherTemp: DataTypes.FLOAT,
      precipIntensity: DataTypes.FLOAT,
      humidity: DataTypes.FLOAT,
      windSpeed: DataTypes.FLOAT,
      isWatering: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
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

  LiveStats.associate = function(models) {
    LiveStats.belongsTo(models.Device, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return LiveStats;
};
