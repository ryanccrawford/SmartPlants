const five = require("johnny-five");
const request = require("request-json");
const publicIP = require("public-ip");

function J5(confg, cb) {
    
    this.lightVal = 0
    this.soilVal = 0
    this.tempVal = 0 
    this.relayState = "closed"
    this.isWatering = false
    this.zip = ""
    this.deviceIp = ""
    this.config = confg
    this.deviceId = this.config[6].DEVICE_UID
    this.comPort = this.config[5].USB_PORT
    this.serviceURL = 'http://' + this.config[0].REMOTE_SERVER + ':' + this.config[1].REMOTE_SERVER_PORT + "/api/live"
    this.interval = parseInt(this.config[4].TIME_INTERVAL)
    this.setLight = function(val) {
        this.lightVal = val
        
    }
    this.setTemp = function(val) {
        this.tempVal = val
        
    }
    this.setSoil = function(val) {
       this.soilVal = val
       
    }
    this.draw = function(){
        console.clear()
        console.log("Light:" + bord.lightVal)
        console.log("Soil:" + bord.soilVal)
        console.log("Temp:" + bord.tempVal)
        console.log("Relay: " + bord.relayState)
        console.log("Is Watering: " + bord.isWatering)
        console.log("Device Public IP: " + bord.deviceIp)
    }
    this.relay = function (state) {

        //TODO:

    }
    this.writeLCD = function (message) {
        //TODO:
    }
    this.timerId
    this.timer = function () {      
     this.timerId = setInterval(this.loop, this.interval);
    }
    this.discLoop = function () {
        var data = { error: true, message: "Device Loss of Signal" }
        var client = request.createClient(bord.serviceURL);
        client.post('/', data, function (error, response, body) {
            if (error) {
                console.log('error:', error);
                return
            }
            console.log(response);
         })
    }
    this.drawTimer

    this.loop = function () {
      
        if (bord.tempVal === undefined || bord.soilVal === undefined || bord.lightVal === undefined || bord.relayState === undefined){
            return
        }
        console.log(bord)
        var data = {DeviceId: bord.deviceId, temp: bord.tempVal, soil: bord.soilVal, light: bord.lightVal, isWatering: bord.isWatering, deviceIp: bord.deviceIp }
        if (bord.zip) {
            data.zip = bord.zip
        }
        var client = request.createClient(bord.serviceURL);
        client.post(bord.serviceURL, data, function (error, response, body) {
            if (error) {
                console.log('error:', error);
                return
            }
            if (response && response.statusCode) {

                console.log(response.statusCode)
                console.log(body)
             if (body) {
                    var reslt = JSON.parse(body)
                    if (reslt.zip) {
                        console.log("inside device ")
                        bord.zip = reslt.zip
                    }
                    var commands = reslt
                    if (commands === undefined) {
                        console.log("nothing to do")
                        return
                    }
                    console.log(commands)
                     if (commands.relay) {
                         bord.relay(commands.relay)
                     }
                     if (commands.led) {
                         bord.led(commands.led)
                     }
                     if (commands.lcd) {
                         bord.lcd(commands.lcd)
                     }
             }
        }
        }
        )
    }
    var bord = this;
    board = new five.Board({ port: this.comPort, repl: false, })
   
    publicIP.v4().then(function (ipval) {
        bord.deviceIp = ipval;
    });
   

    board.on('ready', function () {
        if (bord.drawTimer === null || bord.drawTimer === undefined) {
            bord.drawTimer = setInterval(bord.draw, 2000)
        }
       
        console.log('Device is connected');
        if (bord.timerId !== undefined || bord.timerId !== null) {
            clearInterval(bord.timerId)
            bord.timerId = null
            bord.timer()
        }
      
        var lcd = new five.LCD({
           pins: [7, 8, 9, 10, 11, 12],
           backlight: 13,
           rows: 2,
           cols: 16
        });
        
        var photoresistor = new five.Sensor("A0")
        var soilMoisture = new five.Sensor("A1")
        var tempsensor = new five.Thermometer({
            controller: "LM35",
            pin: "A2"
        })
        var relay = new five.Relay({
         type: "NC",
        pin: 2
        });
        relay.close()
        function r(state) {
           if (state === "open") {
               relay.open();
               bord.relayState = 'opened'
               bord.isWatering = true
           } else {
               relay.close();
               bord.relayState = 'closed'
               bord.isWatering = false
           }
       }

        photoresistor.on("data", function () {
            bord.setLight(this.value)
        })
        soilMoisture.on("data", function () {
            if (this.value > 350) {
               r("close");
            } else {
               r("open");
            }
            bord.setSoil(this.value)
        })
        tempsensor.on("data", function () {
            bord.setTemp(this.F/2)
        })

      
            cb()
       
    })
    board.on('close', function () {
        console.log("Sensor Has Disconnected")
        if (bord.timerId !== undefined || bord.timerId !== null) {
            clearInterval(bord.timerId)
            timerId = null
        } 
        if (bord.drawTimer !== null || bord.drawTimer !== undefined) {
            clearInterval(bord.drawTimer)
            bord.drawTimer = null;
        }

        this.timerId = setInterval(bord.discLoop, 10000)
    })

}




module.exports = J5