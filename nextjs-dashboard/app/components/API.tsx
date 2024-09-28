import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function WeatherControl() {
    const CallWeatherForecast = async () => {
        try {
    
            // Make a GET request to the weather forecast API
    
            const response = await axios.get('https://localhost:7031/weatherforecast');
    
    
            console.log(response.data);  // Log the data received from the API
        } 
  
        catch (error) {
    
            console.error('Error calling Weather Forecast API', error);
        }

    };
    return (
        <div>
            <button onClick={CallWeatherForecast}>Get Weather Forecast</button>
        </div>
    ); 
}
