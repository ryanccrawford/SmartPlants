module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("device", {
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 16] }
    }
  });

  Device.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Device.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
    Device.hasOne(models.plant, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Device;
};
