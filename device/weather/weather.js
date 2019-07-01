const weather = require('weather-js');

var w = function (cb, zip) {
    if (zip == '') {
        console.log("City and State or Zip code is missing, using defualt location")

        weather.find({ search: 'Orlando, FL', degreeType: 'F' }, function (err, result) {
            if (err) {
                console.log(err)
                return
            };
            console.log(result)
            cb(result)
        });
    } else {
        weather.find({ search: zip , degreeType: 'F' }, function (err, result) {
            if (err) {
                console.log(err)
                return
            };
            console.log(result)
            cb(result)
        });
    }

}

module.exports = w