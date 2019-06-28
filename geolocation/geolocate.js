var apiKey = '1234f1b93e4b78224a19eedee0272692';
const request = require("request");
const endpoint = 'http://api.ipstack.com/';


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
                var locationCord = {
                    latitude: locationObj.latitude,
                    longitude: locationObj.longitude
                }

                res.json(locationCord);

            }

        });
    }

});

