const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1e1b24b31be9dcc41502a94c3a63b491/' + lattitude + ',' + longitude + '?exlude=minutely,hourly,daily,alerts,flags&units=uk2'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.code == 400) {
            callback('Error! ' + body.error, undefined)
        } else {
            const result = body.currently.summary + ". It is currently " + body.currently.temperature + "C. There is a " + body.currently.precipProbability + "% chance of rain. Wind speed is " + body.currently.windSpeed + " mph."
            callback(undefined, result)
        }
    })
}

module.exports = forecast