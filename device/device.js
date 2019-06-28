const five = require("johnny-five");
const request = require('request-json');


function J5(confg, cb) {
    
    this.lightVal = 0
    this.soilVal = 0
    this.tempVal = 0 
    this.relayState = "closed"
    this.config = confg
    this.deviceId = this.config[6].DEVICE_UID
    this.comPort = this.config[5].USB_PORT
    this.serviceURL = 'http://' + this.config[0].REMOTE_SERVER + ':' + this.config[1].REMOTE_SERVER_PORT + "/" + this.config[7].DEVICE_ENDPOINT
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
         })
    }
    this.drawTimer

    this.loop = function () {
      
        if (bord.tempVal === undefined || bord.soilVal === undefined || bord.lightVal === undefined || bord.relayState === undefined){
            return
        }
        var data = {deviceId: bord.deviceId, temp: bord.tempVal, soil: bord.soilVal, light: bord.lightVal, relayState: bord.relayState }
        var client = request.createClient(bord.serviceURL);
        client.post('/', data, function (error, response, body) {
            if (error) {
                console.log('error:', error);
                return
            }
            if (response && response.statusCode) {

                console.log(response.statusCode)

                if (body) {
                    var commands
                    if (commands = body === undefined) {
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
           } else {
               relay.close();
               bord.relayState = 'closed'
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