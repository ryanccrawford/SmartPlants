
const SF = require(__dirname + "/settingsFile.js")
const J5 = require(__dirname + "/device.js")
var Configs = {}

function set(settings) {
    Configs = settings
    new J5(Configs, function (b) {
        console.log("Started device, Looking for connection")
        var checkforconnection = setInterval(function () {
            console.log("checking for connection")
            if (typeof b.tempVal === null || typeof b.tempVal === 'undefined') {
                return
            } else {
                clearInterval(checkforconnection)
                console.log("Conneted")
                b.timer()
                b.liveTimer()
            }
            }, 2000);

    });
}
SF(set)

