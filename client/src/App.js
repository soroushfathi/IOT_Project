import React from 'react';
import TabsSection from './components/TabsSection';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="tabs-section">
        <TabsSection />
      </div>
      <div className="chat-section">
        <Chat />
      </div>
    </div>
  );
};

export default App;
