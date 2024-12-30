import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import mockData from './mockData';

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentValue, setCurrentValue] = useState(mockData.tabs[0].sensor.current); // Initialize from mock data

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentValue(mockData.tabs[index].sensor.current); // Update current value when tab changes
  };

  const activeTabData = mockData.tabs[activeTab];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        {mockData.tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleTabChange(index)}
            style={{
              flex: 1,
              padding: '10px',
              cursor: 'pointer',
              textAlign: 'center',
              backgroundColor: activeTab === index ? '#ddd' : '#f4f4f4',
              borderBottom: activeTab === index ? '2px solid #007bff' : 'none',
            }}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div style={{ flex: 4, padding: '1rem' }}>
        <Line data={activeTabData.chart} />
      </div>

      {/* Below Chart Section */}
      <div style={{ flex: 1, display: 'flex', padding: '1rem', borderTop: '1px solid #ccc' }}>
        {/* Left Section */}
        <div style={{ flex: 1, paddingRight: '1rem', borderRight: '1px solid #ccc' }}>
          <h4>{activeTabData.sensor.name}</h4>
          <p>{activeTabData.sensor.description}</p>
        </div>

        {/* Right Section */}
        <div style={{ flex: 4, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <label htmlFor="timeframe" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Timeframe
            </label>
            <select id="timeframe" style={{ width: '100%', padding: '0.5rem' }}>
              {mockData.timeframes.map((timeframe, index) => (
                <option key={index} value={timeframe}>
                  {timeframe}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            <button
              onClick={() => setCurrentValue((prev) => Math.max(0, prev - 1))}
              style={{ padding: '0.5rem', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              -
            </button>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{currentValue}</div>
            <button
              onClick={() => setCurrentValue((prev) => prev + 1)}
              style={{ padding: '0.5rem', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
