const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// paths for Express config
const publicFolder = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// setup hbs engine & views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// static directory
app.use(express.static(publicFolder))

// handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'ken'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'ken'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'ken',
        helpText: 'want help?'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        res.send({
            products: []
        })
    }
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'you must supply an address'
        })
    } else {
        geocode(req.query.address, (error, { lat, long, location } = {}) => {
            if (error) {
                res.send({ error })
            } else {
                forecast(lat, long, (error, weatherData) => {
                    if (error) {
                        res.send({ error })
                    }
                    res.send({
                        address: req.query.address,
                        location,
                        weatherData
                    })
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ken',
        errorMsg: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ken',
        errorMsg: 'page doesn\'t exist'
    })
})

app.listen(port, () => {
    console.log('server listening on port ' + port)
    console.log('use ctrl-c to stop')
})