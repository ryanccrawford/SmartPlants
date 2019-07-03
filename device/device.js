require("dotenv").config();
const weather = require('weather-js');
const five = require("johnny-five");
const request = require("request-json");
const req = require("request");
const publicIP = require("public-ip");
const apiKey = process.env.APIKEY;
const endpoint = 'http://api.ipstack.com';
var zip = null
var weatherObj = null
var sensorObj = {}
const isHex = require('is-hex')


Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function J5(confg, cb) {
    this.getzipfromIp = function (ip, callback) {

        var uri = endpoint + `/${ip}?access_key=${apiKey}&format=1`;

        req(uri, function (error, response, body) {
            if (error) {
                console.log(error)
            }
            if (response && (response.statusCode === 200)) {

                var results = JSON.parse(body)

                console.log(results)
                zip = results.zip
                callback(zip);
            }
        });
    }
    this.getWeatherFn = function (ip) {
        console.log("INSIDE GET WEATHER")
        this.getzipfromIp(ip, weatherCallback)
       
        function weatherCallback(zip) {

            weather.find({ search: zip, degreeType: 'F' }, function (err, result) {
                if (err) {
                    console.log(err)
                    return
                };
                var w = result[0].current
                console.log("inside Weather")
                console.log(w)
                var wtr = {
                    weatherTemp: w.temperature,
                    precipIntensity: w.skycode,
                    humidity: w.humidity,
                    windSpeed: w.windspeed.split(" ")[0]
                }
                console.log(wtr)
                weatherObj = wtr
            });


        }
    }
    this.lightVal = 0;
    this.soilVal = 0;
    this.tempVal = 0;
    this.relayState = "closed";
    this.isWatering = false;
    this.zip = "";
    this.deviceIp = "";
    this.config = confg;
    this.tempPin = "A3"
    this.lightPin = "A4"
    this.soilPin = "A0"
    this.relayPin = "2"
    this.redPin = "9"
    this.greenPin = "10"
    this.bluePin = "11"
    this.color = "#00ff00"
    this.DeviceId = this.config[6].DEVICE_UID;
    this.comPort = this.config[5].USB_PORT;
    this.serviceURL = "https://" + this.config[0].REMOTE_SERVER + "/api/hist";
    this.liveURL = "https://" + this.config[0].REMOTE_SERVER + "/api/live";
   // this.serviceURL = "http://" + this.config[0].REMOTE_SERVER + ":" + this.config[1].REMOTE_SERVER_PORT + "/api/hist";
    //this.liveURL = "http://" + this.config[0].REMOTE_SERVER + ":" + this.config[1].REMOTE_SERVER_PORT + "/api/live";
    this.interval = parseInt(this.config[4].HIST_INTERVAL);
    this.liveInterval = parseInt(this.config[9].LIVE_INTERVAL);
    this.setThisWeather = function (weatherobj) {
        return
        if (!weatherobj) {
            return
        } else {
            weatherObj = weatherobj
        }
    }
    this.setLight = function (val) {
        this.lightVal = val;
        sensorObj.light = val;
    };
    this.setTemp = function (val) {
        this.tempVal = val;
        sensorObj.sensorTempFehr = val;
    };
    this.setSoil = function (val) {
        this.soilVal = val;
        sensorObj.moisture = val;
    }

    this.draw = function () {
        console.clear()
        console.log("Light:" + bord.lightVal)
        console.log("Soil:" + bord.soilVal)
        console.log("Temp:" + bord.tempVal)
        console.log("Relay: " + bord.relayState)
        console.log("Is Watering: " + bord.isWatering)
        console.log("Device Public IP: " + bord.deviceIp)
        console.log("Led Color: " + bord.color)
        console.log(bord.getWeather)
    }
    this.greenLed
    this.rgbLED

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
    this.updateBoard = function (data) {
        if (!data) {
            return
        }

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
    this.liveTimerId
    this.liveTimer = function () {

        this.liveTimerId = setInterval(function () { bord.liveLoop() }, this.liveInterval);
      
    }
    this.getWeather = null
    this.liveLoop = function () {
        console.log("inside live loop")
       
        if (sensorObj.sensorTempFehr === 0) {
            return
        }
        sensorObj.DeviceId = bord.DeviceId
        var sensorData = combineData(sensorObj, weatherObj);
        console.log("Combined Result")
        console.log(sensorData)
        var client = request.createClient(bord.liveURL);
        client.post(bord.liveURL, sensorData, function (error, response, body) {
            if (error) {
                console.log('error:', error);
                return
            }
            if (response && response.statusCode) {
                console.log(body)
                console.log(response.statusCode)
                
                //if (body) {
                //    var reslt = JSON.parse(body)
                //    if (reslt.zip) {
                //        console.log("inside device ")
                //        bord.zip = reslt.zip
                //    }
                //    var commands = reslt
                //    if (commands === undefined) {
                //        console.log("nothing to do")
                //        return
                //    }
                //    console.log(commands)
                //    if (commands.relay) {
                //        bord.relay(commands.relay)
                //    }
                //    if (commands.led) {
                //        bord.led(commands.led)
                //    }
                //    if (commands.lcd) {
                //        bord.lcd(commands.lcd)
                //    }
                //} else {
                //    bord.updateBoard(false)
                //}
            }
            if (response.statusCode !== 200) {
                console.log(`Error sending data to endpoint: ${response.statusCode}`)
            }
        }
        )
    }
    this.loop = function () {
        console.log("inside History loop")

        if (sensorObj.sensorTempFehr === 0) {
            return
        }
        sensorObj.DeviceId = bord.DeviceId
        var hourly = combineData(sensorObj, weatherObj);
        console.log("Combined Result")
        console.log(hourly)
        var client = request.createClient(bord.serviceURL);
        client.post(bord.serviceURL, hourly, function (error, response, body) {
            if (error) {
                console.log('error:', error);
                return
            }
            if (response && response.statusCode) {

                console.log(response.statusCode)
                console.log(body)

                //if (body) {
                //    var reslt = JSON.parse(body)
                //    if (reslt.zip) {
                //        console.log("inside device ")
                //        bord.zip = reslt.zip
                //    }
                //    var commands = reslt
                //    if (commands === undefined) {
                //        console.log("nothing to do")
                //        return
                //    }
                //    console.log(commands)
                //    if (commands.relay) {
                //        bord.relay(commands.relay)
                //    }
                //    if (commands.led) {
                //        bord.led(commands.led)
                //    }
                //    if (commands.lcd) {
                //        bord.lcd(commands.lcd)
                //    }
                //}
            }
        }
        )
    }
    this.isfading = false;
    var bord = this;

    board = new five.Board({ port: this.comPort, repl: false, })
    publicIP.v4().then(function (ipval) {
        bord.deviceIp = ipval;
        bord.getWeatherFn(bord.deviceIp)

        setInterval(start, (60000 * 60));
    });

    function start() {
        bord.getWeatherFn(bord.deviceIp);
    }
   
    board.on('ready', function () {
      
            var led = new five.Led.RGB({
                pins: {
                    red: bord.redPin,
                    green: bord.greenPin,
                    blue: bord.bluePin
                },
                isAnode: true
            });
            led.color("#0000ff");
            led.intensity(3);

            var photoresistor = new five.Sensor(bord.lightPin)
            var soilMoisture = new five.Sensor(bord.soilPin)
            var tempsensor = new five.Thermometer({
                controller: "LM35",
                pin: bord.tempPin
            })
            var relay = new five.Relay({
                type: "NC",
                pin: bord.relayPin
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
                sensorObj.isWatering = bord.isWatering
            })
            soilMoisture.on("data", function () {
                //in_min, in_max, out_min, out_max
                bord.setSoil(this.value)
                if (bord.isfading) {

                    return
                }

                bord.isfading = true
                function dec2hexString(dec) {
                    return (dec + 0x10000).toString(16).substr(-2).toUpperCase();
                }


                if (this.value < 0 || this.value > 1024) {

                    return

                }

                //var mappedBrightness = parseInt(this.value).map(0, 1023, 0, 255)
                var hex = dec2hexString(255)
                var redb = "00"
                var greenb = "00"
                var blueb = "00"
                if (this.value < 350) {
                    redb = hex
                   
                }
                if (this.value >= 350 && this.value <= 500) {
                    greenb = hex
                    blueb = "00"
                    redb = "00"
                }
                if (this.value > 500) {
                    blueb = hex
                    redb = "00"
                    greenb = "00"
                }
                var hexstring = redb + greenb + blueb
                bord.color = hexstring
                if (isHex(hexstring)) {
                    console.log(hexstring)
                        led.color("#"+hexstring)
                }
                


                if (this.value < 350) {
                    r("close");
                } else {
                    r("open");
                }

                bord.isfading = false
            })

            tempsensor.on("data", function () {
                bord.setTemp(this.F / 2)
            })
            console.log('Device is connected');


        
   
        cb(bord)
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

function combineData(sensorData, weatherData) {
    return {
        DeviceId: sensorData.DeviceId,
        sensorTempFehr: sensorData.sensorTempFehr,
        moisture: sensorData.moisture,
        light: sensorData.light,
        isWatering: sensorData.isWatering ? 1:0,
        //deviceIp: sensorData.deviceIp,
        weatherTemp: weatherData.weatherTemp,
        precipIntensity: weatherData.precipIntensity,
        humidity: weatherData.humidity,
        windSpeed: weatherData.windSpeed,
    }
}


module.exports = J5