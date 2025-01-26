import React from 'react';
// import TabsSection from './components/TabsSection';
import Tabs from './components/Tabs';
import Chat from './components/Chat';
import './App.css';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const App = () => {
  return (
    <div className="app-container">
      <div className="tabs-section">
        {/* <TabsSection /> */}
        <Tabs />
      </div>
      <div className="chat-section">
        <Chat />
      </div>
    </div>
  );
};

export default App;
