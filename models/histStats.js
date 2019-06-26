module.exports = function(sequelize, DataTypes) {
  var HistStats = sequelize.define(
    "HistStats",
    {
      timeStamp: DataTypes.DATE,
      moisture: DataTypes.INTEGER,
      light: DataTypes.INTEGER,
      temp: DataTypes.FLOAT,
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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    HistStats.belongsTo(models.Plant, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return HistStats;
};
