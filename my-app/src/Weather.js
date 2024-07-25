import React, { useState } from 'react';
import axios from 'axios';

export default function Weather() {
    // State for storing the city name input
    const [city, setCity] = useState('');
    // State for storing weather data from the API
    const [weather, setWeather] = useState(null);
    // State for storing error messages
    const [error, setError] = useState('');

    // Handler for input changes
    const handleCityChange = (event) => {
        setCity(event.target.value);
        // Clear any previous error messages when input changes
        setError('');
    };

    // Function to validate that the city name contains only letters and spaces
    const isValidCityName = (name) => {
        return /^[a-zA-Z\s]+$/.test(name);
    };

    // Function to fetch weather data from the API
    const fetchWeather = async () => {
        // Check if the city input is empty
        if (!city) {
            alert('Please enter a city name');
            return;
        }

        // Check if the city name is valid
        if (!isValidCityName(city)) {
            alert('City name should only contain letters and spaces');
            return;
        }

        // Clear previous weather data before making a new request
        setWeather(null);
        setError('');

        try {
            // Make an API request to fetch weather data
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=de8f13a67ff878a42dd9c2628f8d581a`);
            // Check if the API response is successful
            if (response.data.cod !== 200) {
                setError('No data found for the provided city name');
                setWeather(null);
            } else {
                // Set weather data and clear error message
                setWeather(response);
                setError('');
            }
        } catch (error) {
            // Handle any errors that occur during the API request
            console.log("Error fetching weather data", error);
            setError('Error fetching weather data');
        }
    };

    // Handler for the button click event
    const handleClick = () => {
        fetchWeather();
    };

    return (
        <div className='weather-container'>
            {/* Page heading */}
            <h1 className='page-heading'>Weather App</h1>

            {/* Input field for entering the city name */}
            <input
                type='text'
                placeholder='Enter City Name'
                value={city}
                onChange={handleCityChange}
            />
            <br />
            {/* Button to trigger weather data fetch */}
            <button onClick={handleClick}>Get Weather</button>
            
            {/* Display error messages if any */}
            {error && <div className='error-message'>{error}</div>}

            {/* Display weather information if available */}
            {weather && (
                <div className='weather-info'>
                    <h3>{weather.data.name}</h3>
                    <p>Temp is {weather.data.main.temp} K</p>
                    <p>{weather.data.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}
