const request = require("request")

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmJpdHRlbmNvdXJ0IiwiYSI6ImNrbjcwMGZoczBqY3EydnFuaDl5Y3AwZzUifQ.Gq4AKGx1WE0_JFbYmQIUmA&limit=1`
    
    request({
        url,
        json: true
    }, (error, {body}) => {

        if (error) {

            callback('Unable to connect to location services!', undefined)

        } else if (body.message || body.features.length === 0) {

            callback('Unable to find location! Try another search', undefined)

        } else {

            callback(undefined, {

                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode