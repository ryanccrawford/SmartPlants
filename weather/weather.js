const weather = require('weather-js');

var w = function (cb, cityState, zip) {
    if (cityState == '' && zip == '') {
        console.log("City and State or Zip code is missing, using defualt location")

        weather.find({ search: 'Orlando, FL', degreeType: 'F' }, function (err, result) {
            if (err) console.log(err);
            console.log(result)
            cb(result)
        });
    } else {
        var city = cityState.split(" ")[0]
        var state = cityState.split(" ")[1]
        weather.find({ search: (city + ', ' + state) , degreeType: 'F' }, function (err, result) {
            if (err) console.log(err);
            console.log(result)
            cb(result)
        });
    }

}

module.exports = w