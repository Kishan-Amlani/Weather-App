const getWeatherURL = new URL('http://localhost:3000/weather/getWeather')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const weatherImg1 = document.querySelector('#weatherImg-1')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    message1.textContent = 'Loading...'
    weatherImg1.src = ''
    message2.textContent = ''

    const city = searchInput.value
    const getWeatherURLParam = city ? { city } : { city: 'Delhi' }
    getWeatherURL.search = new URLSearchParams(getWeatherURLParam).toString()

    fetch(getWeatherURL)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw response.json()
            }
        })
        .then((data) => {
            const currentWeather = data.currentWeather.current
            message1.textContent = `${data.currentWeather.location.name}`
            weatherImg1.src = currentWeather.condition.icon
            message2.textContent = `Outside weather is ${currentWeather.condition.text}. It's currently ${currentWeather.temp_c}° C and there is ${currentWeather.precip_mm}% chance of Rain`
        })
        .catch((error) => {
            Promise.resolve(error).then((e) => {
                message1.textContent = `Error:`
                message2.textContent = `\tStatus: ${e.status}, Message: ${e.message}`
            })
        })


})