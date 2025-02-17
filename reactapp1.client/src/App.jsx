import { useEffect, useState } from 'react';
import './App.css';

import Layout from './components/Layout';

let API_BASE_URL = 'weatherforecast/api/v1'

function App() {
    const [forecasts, setForecasts] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function populateWeatherData() {
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch(API_BASE_URL);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const data = await response.json();
                setForecasts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
        populateWeatherData();
    }, []);

    const contents = loading ? (
        <p><em>Loading...</em></p>
    ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
    ) : forecasts && forecasts.length > 0 ? (
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

                {forecasts.map(forecast =>

                    <tr key={forecast.date}>

                        <td>{forecast.date}</td>

                        <td>{forecast.temperatureC}</td>

                        <td>{forecast.temperatureF}</td>

                        <td>{forecast.summary}</td>

                    </tr>

                )}

            </tbody>
        </table>
    ) : (
        <p>No forecast data available.</p> 
    );

    return (
        <Layout>
            
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </Layout>
    );
}

export default App;