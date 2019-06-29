var db = require("../models");

before(async function() {
  await db.sequelize.sync({ force: true });
});
