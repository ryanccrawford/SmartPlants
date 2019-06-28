
const express = require("express")
const SF = require(__dirname + "/settingsFile.js")
const J5 = require(__dirname + "/device.js")
var app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
var Configs = {}
function set(settings) {
    Configs = settings
    console.log(Configs)
    var PORT = process.env.PORT || Configs[3].THIS_PORT
    app.listen(PORT, function () {
        console.log("Server listening on PORT: " + PORT)
        var j = new J5(Configs, function () {
            j.timer()
        });
    })
}
SF(set)

