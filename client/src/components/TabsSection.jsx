import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TabsSection = () => {
  const [tabs, setTabs] = useState([]); // Store sensor tabs
  const [activeTab, setActiveTab] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch initial sensor data
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await fetch('https://iot.atenatech.ir/api/sensors');
        const sensors = await response.json();
        setTabs(sensors);
        if (sensors.length > 0) {
          fetchSensorData(sensors[0].id); // Fetch data for the first sensor by default
        }
      } catch (error) {
        console.error('Error fetching sensors:', error);
      }
    };
    fetchSensors();
  }, []);

  // Fetch data for a specific sensor
  const fetchSensorData = async (sensorId) => {
    try {
      const response = await fetch(`https://iot.atenatech.ir/api/sensor_data/${sensorId}`);
      const data = await response.json();

      // Process data for the chart
      const labels = data.map((entry) => new Date(entry.timestamp).toLocaleTimeString());
      const values = data.map((entry) => parseFloat(entry.message.match(/[\d.]+/)[0]));

      setChartData({
        labels,
        datasets: [
          {
            label: `Sensor ${sensorId} Data`,
            data: values,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
          },
        ],
      });

      setCurrentValue(values[values.length - 1]); // Set the latest value
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching data for sensor ${sensorId}:`, error);
    }
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
    fetchSensorData(tabs[index].id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
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
        {chartData ? <Line data={chartData} /> : <div>No data available</div>}
      </div>

      {/* Below Chart Section */}
      <div style={{ flex: 1, display: 'flex', padding: '1rem', borderTop: '1px solid #ccc' }}>
        {/* Left Section */}
        <div style={{ flex: 1, paddingRight: '1rem', borderRight: '1px solid #ccc' }}>
          <h4>{tabs[activeTab].name}</h4>
          <p>{tabs[activeTab].description}</p>
        </div>

        {/* Right Section */}
        <div style={{ flex: 4, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>Current Value: {currentValue}</div>
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
