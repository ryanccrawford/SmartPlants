module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    }
  });

  User.associate = function(models) {
    // Associating User with Devices
    // When an User is deleted, also delete any associated Devices
    User.hasMany(models.device, {
      onDelete: "cascade"
    });
  };

  return User;
};
