require("dotenv").config();
const weather = require('../weather/weather.js')
const apiKey = process.env.APIKEY;
const GoogleMapsAPIKEY = process.env.GOOGLE_API_KEY;
const request = require("request");
const endpoint = 'http://api.ipstack.com';
const db = require("../models");
var zip

module.exports = function (app) {

    app.post('/api/createSampledata', function (req, res) {

        var sun = 0, temp = 80, hum = 0, rain = 0, wind = 2, season = 0, sunisnight = false, soil = 200, isWatering = false;
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
            if (sun < 6) {
                isWatering = true;
            }
            
            var sensordata = {
                moisture: Math.abs(soil),
                light: Math.abs(sun * 100),
                sensorTempFehr: temp,
                DeviceId: 2,
                deviceIP: "72.65.21.3.1",
                isWatering: isWatering,
                weatherTemp : temp - 2,
                precipIntensity :rain,
                humidity : hum,
                windSpeed : wind + 1
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
       var sensordata = {
            moisture: req.body.soil,
            light: req.body.light,
            sensorTempFehr: req.body.temp,
            DeviceId: req.body.deviceId,
            deviceIP: req.body.deviceIP,
            isWatering: req.body.isWatering
        }
        function callback(returnWeather) {
            
            if (!("DeviceId" in sensordata)) {
                console.log("bad request - DeviceId not included");
                res.status(400).end();
            } else {
                console.log(sensordata)
                console.log(returnWeather)

                sensordata.weatherTemp = typeof returnWeather[0].current.temperature !== 'undefined' ? returnWeather[0].current.temperature : 0;
                sensordata.precipIntensity = typeof returnWeather[0].current.skycode !== 'undefined' ? returnWeather[0].current.skycode : 0;
                sensordata.humidity = typeof returnWeather[0].current.humidity !== 'undefined' ? returnWeather[0].current.humidity : 0;
                sensordata.windSpeed = typeof returnWeather[0].current.windspeed.split(" ")[0] !== 'undefined' ? returnWeather[0].current.windspeed.split(" ")[0] : 0;

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
		
        if (!req.body.zip && !zip) {
            var uri = `/api/getzipfromip/${sensordata.deviceIP}`;
            console.log(uri);
            request("http://localhost:3000" + uri, function (error, response, body) {
                if (error) {
                    console.log(error)
                }
                if (response && response.statusCode) {
                    var bodyresponse = JSON.parse(body)
                    var zipc = bodyresponse;
                    zip = zipc
                    console.log(bodyresponse)
                    weather(callback, zipc);

                }

            });
        } else {
            weather(callback, zip);
        }
        
     });
    
	app.get("/api/geolocate/:ipaddress", function (req, res) {

		var ip = req.params.ipaddress;

		geolocate(ip);

		function geolocate(ipadd) {

			var uri = `${endpoint}/${ipadd}?access_key=${apiKey}&format=1`;
			console.log(uri);

			request(uri, function (error, response, body) {
				if (error) {
					console.log(error)
				}
                if (response && response.statusCode) {
       

                    var locationObj = JSON.parse(body)
                    console.log(locationObj)
                    var locationCord = {
                        latitude: locationObj.latitude,
                        longitude: locationObj.longitude
					}
                    console.log(locationCord)
					res.json(locationCord);

				}

			});
		}

	});

	app.get("/api/getzipfromlatlog/:lat/:long", function (req, res) {


		var lattitude = req.params.lat;
		var longitute = req.params.long;
		var geoLocation = { lat: lattitude, long: longitute }
		reverseGeoLocate(geoLocation);

		function reverseGeoLocate(latlong) {
			var googleEndPoint = 'https://maps.googleapis.com/maps/api/geocode/json'
			var uri = `${googleEndPoint}?latlng=${latlong.lat},${latlong.long}&key=${GoogleMapsAPIKEY}`
			console.log(uri);

			request(uri, function (error, response, body) {
				if (error) {
					console.log(error)
				}
				if (response && response.statusCode) {
					var zip_code = "";
                    var results = JSON.parse(body).results
                    console.log("IN GOOGLE MAPS CALL")
					var components = results[0].address_components
					components.forEach(function (item) {
						item.types.forEach(function (part) {
							if (part === 'postal_code') {
                                zip_code = item.short_name
                                zip = zip_code
							}
						})
					})

					res.json({ zip: zip_code });

				}

			});
		}

	});

	app.get("/api/getzipfromip/:ip", function (req, res) {

		var ip = req.params.ip

		locate(ip);

		function locate(ipadd) {

			var uri = `/api/geolocate/${ipadd}`;
			console.log(uri);

			request("http://localhost:3000" + uri, function (error, response, body) {
				if (error) {
					console.log(error)
				}
				if (response && response.statusCode) {
					var locationObj = JSON.parse(body)
					getzipcode(locationObj)
                    function getzipcode(lo) {
                        console.log(lo)
                        var lat = lo.latitude
                        var long = lo.longitude
                        var uri = `/api/getzipfromlatlog/${lat}/${long}`;
						console.log(uri);

						request("http://localhost:3000" + uri, function (error, response, body) {
							if (error) {
								console.log(error)
							}
							if (response && response.statusCode) {
								var obj = JSON.parse(body)

								alldone(obj.zip)

							}

						});

					}

				}

			});
		}

	});

	function alldone(zip) {
        console.log(zip)
        return
	}
}