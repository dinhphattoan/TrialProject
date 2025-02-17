import React, { useEffect, useState } from "react";

const API_BASE_URL = 'https://localhost:7121/WeatherForecast/api/v1'; 

interface Weather {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const WeatherRowComponent: React.FC<Weather> = ({ date, temperatureC, temperatureF, summary }) => {
    return (
        <tr> 
            <td>{date}</td>
            <td>{temperatureC}</td>
            <td>{temperatureF}</td>
            <td>{summary}</td>
        </tr>
    );
};

function WeatherComponent() {
    const [forecasts, setForecasts] = useState<Weather[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const populateWeatherData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(API_BASE_URL);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const data: Weather[] = await response.json();
                setForecasts(data);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        populateWeatherData(); 
    }, []); 

    const contents = loading ? (
        <p><em>Loading...</em></p>
    ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
        ) : (
                <>
                    <table className="table table-striped" aria-labelledby="tableLabel">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Temp. (C)</th>
                                <th>Temp. (F)</th>
                                <th>Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecasts.length > 0 ? ( // Simplified conditional rendering
                                forecasts.map((forecast, index) => ( // Add a unique key!
                                    <WeatherRowComponent key={index} {...forecast} /> // Spread props
                                ))
                            ) : (
                                <tr><td colSpan={4}>No forecast data available.</td></tr> // Span all columns
                            )}
                        </tbody>
                    </table>
        </>
        
    );

    return (
        <>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </>
            
    );
}

export default WeatherComponent;