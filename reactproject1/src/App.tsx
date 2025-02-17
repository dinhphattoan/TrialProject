import { useState } from 'react'
import WeatherComponent from './components/Weather'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <WeatherComponent />

    </>
  )
}

export default App
