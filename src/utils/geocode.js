const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2NtMSIsImEiOiJjanhvdHdvNGIwMjhyM2NyOHhhMDk1Nm5lIn0.4vzcTVAStodXpqg1r6qKyA&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('no geocode result', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name, 
                lat: body.features[0].center[1], 
                long: body.features[0].center[0]
            })
        }                
    })
}
module.exports = geocode