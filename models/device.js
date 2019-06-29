module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("Device", {
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 16] }
    },
    deviceIP: {
      type: DataTypes.STRING,
      validate: { isIP: true }
    },
    isDeviceConnected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isWatering: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: { isNumeric: true }
    },
    PlantId: {
      type: DataTypes.INTEGER,
      validate: { isNumeric: true }
    }
  });

  Device.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Device.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Device.hasMany(models.LiveStats, {
      onDelete: "cascade"
    });
    Device.hasMany(models.HistStats, {
      onDelete: "cascade"
    });
  };

  return Device;
};
