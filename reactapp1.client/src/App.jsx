import { useEffect, useState } from 'react';
import './App.css';

function Button({ countIndex, onButtonClick }) {
    const [count, setCount] = useState(0);
    const [incrementCheck, setIncrementCheck] = useState(false);

    const handleCheckboxChange = (event) => {
        setIncrementCheck(event.target.checked);
    };

    const handleButtonClick = () => {
        let newCount = count; // Store the new count temporarily
        if (incrementCheck) {
            newCount = count + 1;
            setCount(newCount); // Update the local count
        }
        onButtonClick(countIndex, newCount); // Call the parent's callback with the new count
    };

    return (
        <>
            <input
                type="checkbox"
                defaultChecked={incrementCheck}
                onChange={handleCheckboxChange}
            />{' '}
            <button onClick={handleButtonClick}>
                Click me!
            </button>
        </>
    );
}

function App() {
    const [forecasts, setForecasts] = useState();
    const [buttonCounts, setButtonCounts] = useState([0]); // State for button counts

    useEffect(() => {
        populateWeatherData();
    }, []);

    const handleButtonClick = (index, count) => {
        const updatedCounts = [...buttonCounts];
        updatedCounts[index] = count;
        setButtonCounts(updatedCounts);
        console.log("Button counts:", updatedCounts); // Now you can see the counts
        // Here you can use the count to affect the weather data display if needed
    };

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
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
        </table>;

    return (
        <div>
            <Button countIndex={0} onButtonClick={handleButtonClick} /> {/* Pass the callback */}
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast/api/v1');
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }
}

export default App;