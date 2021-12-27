import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import hbs from 'hbs'
import { getCityCoordinates, getCurrentWeather } from './helper.js'

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(path.resolve(), '../public')
const viewsPath = path.join(path.join(path.resolve(), '../templates/views'))
const partialsPath = path.join(path.join(path.resolve(), '../templates/partials'))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kishan Amlani',
        helpMessage: 'This is a helpful text'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kishan Amlani'
    })
})

app.get(['', '/weather'], async (req, res) => {
    res.render('weather', {
        title: 'Weather App',
        name: 'Kishan Amlani'
    })
})

app.get('/weather/getWeather', async (req, res) => {
    try {
        const city = req.query.city
        if (!city) {
            return res.send('City is required')
        }

        const cityCoordinates = await getCityCoordinates(city)
        const currentWeather = await getCurrentWeather(cityCoordinates)
        res.send({ currentWeather })
    } catch (error) {
        error = error.toJSON()
        error.status ? null : error.status = 500
        res.status(error.status).send(error)
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kishan Amlani',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kishan Amlani',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up (´◡`)')
})