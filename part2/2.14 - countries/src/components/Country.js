import { useState } from 'react'

const Country = ({ countries }) => {
    const [showDesCountry, setShowDesCountry] = useState(false)
    const [showDesWeather, setShowDesWeather] = useState(false)
    const [selected, setSelected] = useState({})
    const [weather, setWeather] = useState({})
    //const url = `weather/current?access_key=${process.env.REACT_APP_API_KEY}&query=`
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=`
    const handleClick = async (country) => {
        
        await fetch(url + country.capital)
                   .then(async response => {
                        const info = await response.json()
                        //if response of weather api fails, it doesnt show html of weather
                        if(Object.prototype.hasOwnProperty.call(info, 'current')){
                            setWeather(info)
                            setShowDesWeather(true)
                        }
                        setSelected(country)
                        setShowDesCountry(true)
                        
                    })
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length <= 10 && countries.length >= 1) {
         const showCountry = (!showDesCountry) ? "" : (       
        <>
            <h2>{selected.name.common}</h2>
            <p>Capital: {selected.capital}</p>
            <p>Population: {selected.population}</p>

            <h3>Languages</h3>
            <ul>
                {Object.values(selected.languages).map((language) =>
                    <li key={language}>  {language} </li>
                )}
            </ul>
            <img width="150px" height="100px" src={selected.flags.png} />
        </>)

        const showWeather =  (!showDesWeather) ? "" : (       
            <>
                <h3>Weather in {selected.name.common}</h3>
                <p>Temperature: {weather.current.temperature} celcius</p>
                <img width="150px" height="100px" src={weather.current.weather_icons[0]} />
                <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </>)
        return (
            <>
                {countries.map((country, i) =>
                    <div key={i}>
                        {country.name.official} <button onClick={() => handleClick(country)}>Show</button>
                    </div>
                )}
                {showCountry}
                {showWeather}
            </>
        )
    }


}

export default Country;