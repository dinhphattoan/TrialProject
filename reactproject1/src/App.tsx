import React from 'react';
import Layout from './components/Layout';
import { AppBar } from '@mui/material';
import WeatherComponent from './components/Weather';

const App: React.FC = () => {
    return (
        <Layout>
            <WeatherComponent/>
        </Layout>
    );
};

export default App;