import './style.css'
import WeatherCard from './weathercard'
import React, { useState, useEffect } from 'react'

const Temp = () => {
    const [searchValue, setSearchValue] = useState('pune')
    const [tempInfo, setTempInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)


    const getWeatherInfo = async () => {
        setIsLoading(true)
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=4cda5a7324171e40c453d6bcc0468de6`

            const res = await fetch(url)
            const data = await res.json()
            console.log('data', data)
            setIsLoading(false)
            localStorage.setItem('localSearchValue', JSON.stringify(`${searchValue}`))

            const { main: weathermood } = data.weather[0]
            const { temp, pressure, humidity } = data.main
            const { name } = data
            const { speed } = data.wind
            const { country, sunset } = data.sys

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }

            setTempInfo(myNewWeatherInfo)
        }
         catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getWeatherInfo()
        }, 400)
        const localValue = JSON.parse(localStorage.getItem('localSearchValue'))
        setSearchValue(localValue)
    }, [])

    if (isLoading) {
        return (
            <div>
                <h1 style={{ color: 'white' }}>Loading...</h1>
            </div>
        )
    }


    return (
        <>
            <div className='wrap'>
                <div className="search">

                    {/* Input to enter the city name */}
                    <input type="search"
                        placeholder='search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }
                        }
                    />

                    {/* Search Button */}
                    <button
                        className='searchButton'
                        type='button'
                        onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>

            {/* Our temp card */}
            <WeatherCard tempInfo={tempInfo} />
        </>
    )
}

export default Temp
