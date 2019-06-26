module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 16] }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 16] }
    }
  });

  User.associate = function(models) {
    // Associating User with Devices
    // When an User is deleted, also delete any associated Devices
    User.hasMany(models.Device, {
      onDelete: "cascade"
    });
  };

  return User;
};
