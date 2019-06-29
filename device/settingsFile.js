
const fs = require("file-system")

function Settings(cb) {
    this.settings = []
    fs.readFile(__dirname + "/settings.txt", "utf8", function (err, data) {

        if (err) {
            throw (err)

        }
        console.log(data)
        var lines = data.split("\r\n")
        var csettings = []
        lines.forEach(function (item) {
            var valuePair = cObj(item)
            csettings.push(valuePair)
        })
        this.settings = csettings
        cb(this.settings)
    })
    function cObj(line) {
        var split = line.split("=")
        var key = split[0]
        var value = split[1]
        console.log( value )
        return {[key]:value}
    }
    
}



module.exports = Settings