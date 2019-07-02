const db = require("../models");
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

module.exports = function (app) {

    app.post('/api/createSampledata/', function (req, res) {

        var sun = 0, temp = 80, hum = 0, rain = 0, wind = 2, season = 0, sunisnight = false, soil = 200, isWatering = false, timestamp = "", time;
        var dt = new Date();
        for (var i = 0; i < 1000; i++) {
            if (sunisnight) {
                sun--
                if (sun <= 0) {
                    sunisnight = false
                }
            } else {
                sun++
                if (sun >= 12) {
                    sunisnight = true
                }
            }
                    temp = temp * (sun / 10) + sun
            hum = (temp / 2) * (i / 1000) / .32
            wind = wind + sun / 2 * hum / temp + rain 
            if (hum > 61 && sun > 3 && temp < 90) {
                rain = rain + hum / 2 + wind
                soil = rain - hum
            }
            soil++
            if (temp > 90) {
                soil = soil - sun + temp
            }
           
            
            dt.setHours(dt.getHours() - 1);
            timestamp = dt.toISOString().slice(0, 19).replace('T', ' ')
            console.log(timestamp)
            if (sun < 6) {
                isWatering = true;
            }
            
            var sensordata = {
                timeStamp: timestamp,
                moisture: parseInt(soil),
                light: parseInt(sun * 100),
                sensorTempFehr: parseInt(temp),
                DeviceId: 1,
                deviceIp: "72.65.21.3.1",
                isWatering: isWatering,
                weatherTemp : parseInt(temp - 2),
                precipIntensity : 20,
                humidity: parseInt(hum),
                windSpeed: 2
            }

            if (!("DeviceId" in sensordata)) {
                console.log("bad request - DeviceId not included");
                res.status(400).end();
            } else {
                db.LiveStats.create(sensordata)
                    .then(function (data) {
                        res.json(data);
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.status(400).end();
                    });
            }


        }

       




    })

    app.post("/api/live/", function (req, res) {
       // var weather = req.body.weather;
        console.log("inside server live Route")
        console.log(req.body)
        var sensorData = req.body
        if (!("DeviceId" in sensorData)) {
                console.log("bad request - DeviceId not included");
                res.json({ "error": "400"}).end();
            } else {
            console.log(sensorData)
            db.LiveStats.create(sensorData)
                    .then(function (data) {
                        res.json(data);
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.json({"error":"400"}).end();
                    });
            }
       });
    
    app.get("/api/livegauge/:type/:valnow/:deviceId", function (req, res) {
        var lastVal = parseInt(req.params.valnow)
        var type = req.params.type.toLowerCase()
        var deviceId = parseInt(req.params.deviceId);
        if (typeof deviceId !== 'number') {
            return
        }
        if (type === "moisture") {

        var sqlQuery = "SELECT moisture ";
            sqlQuery += " FROM LiveStats ";
            sqlQuery += " WHERE 1=" + deviceId + " ";  
            sqlQuery += "ORDER BY timeStamp DESC";
            sqlQuery += " LIMIT 1;";

            db.sequelize
                .query(sqlQuery, { type: db.sequelize.QueryTypes.SELECT })
                .then(function (data) {
                    console.log(data)

                    res.json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(400).end();
                });
        }
    });
}