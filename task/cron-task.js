const cron = require("node-cron")

//running every 2 minutes
cron.schedule('*/45 * * * *', () => {
    function makeHistory() {

        var sql = "INSERT INTO "

    }
});