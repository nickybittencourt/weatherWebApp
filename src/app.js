const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Yee'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About',
        name: 'Yee'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        helpText: "helpful text",
        title: "Help",
        name: "Yee"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "No address provided!"
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(lat, long, (error, { temp, feelsLike, description }) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: {
                    temperature: temp,
                    feelsLike,
                    description
                },
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yee',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Yee',
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {

    console.log('server is up on port 3000')
})