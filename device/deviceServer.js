//Install this on the server and start it first. 
//Then Install the other files onto the client.
//On the client update the settings file to put the ip or dns name of the server

const express = require("express")
var PORT = process.env.PORT || 8080;
var app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(PORT, function () {
    console.log("Server listening on PORT: " + PORT)
})

app.post("/", function (req, res) {
   
    var data = req.body
    console.log(data)
    if (data) {
        var returnData = { "task1": "Do This Task", "task2": "DO another task" }
        res.send(returnData)
    } else {
        res.sendStatus(200)
    }
})
function display(message) {
    console.clear()
    console.log(message)
}