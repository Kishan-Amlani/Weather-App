import axios from "axios"

const getCityCoordinates = async (city) => {
    try {
        let lat, lon
        const option = {
            method: 'GET',
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
            params: { access_token: 'pk.eyJ1IjoiZmIxMDAiLCJhIjoiY2t3ZGFuNWRtNHFseTJwbXEyMDc4cXY2ciJ9.PfSVShPKKhJ1iqBPHeQ2VQ', limit: 1 }
        }
        const response = await axios.request(option)
            .then((response) => {
                if (response.data.features.length > 0) {
                    lat = response.data.features[0].center[1]
                    lon = response.data.features[0].center[0]
                }
                return ({ lat, lon })
            })
        return response
    } catch (error) {
        throw error
    }
}

const getCurrentWeather = async (cityCoordinates) => {
    try {
        const option = {
            method: 'GET',
            url: 'https://api.weatherapi.com/v1/current.json',
            params: { key: 'de5419377ab74464b4870009212511', q: `${cityCoordinates.lat},${cityCoordinates.lon}` }
        }
        const response = await axios.request(option)
            .then((response) => {
                const currentWeather = response.data
                return currentWeather
                // console.log(`It is currently ${currentWeather.current.temp_c}° C in ${currentWeather.location.name}.`)
            })
        return response        
    } catch (error) {
        throw error
    }
}

export { getCityCoordinates, getCurrentWeather }