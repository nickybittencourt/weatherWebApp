const request = require('request')

const forecast = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=5738f9b5b769bcb85dba52ed635065ec&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}`
    
    request({
        url,
        json: true
    }, (error, {body}) => {

        if (error) {

            callback("Unable to connect to weather service!", undefined)

        } else if (body.error) {

            callback("Unable to find location!", undefined)

        } else {

            callback(undefined, {
                temp: body.current.temperature,
                feelsLike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
            })
        }
    })
}

module.exports = forecast