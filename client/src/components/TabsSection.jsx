import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TabsSection = () => {
  const [tabs, setTabs] = useState([]); // Store sensor and controller tabs
  const [activeTab, setActiveTab] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch initial sensor and controller data
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const [sensorsResponse, controllersResponse] = await Promise.all([
          fetch('https://iot.atenatech.ir/api/sensors'),
          fetch('https://iot.atenatech.ir/api/controller/list'),
        ]);

        const sensors = await sensorsResponse.json();
        const controllers = await controllersResponse.json();

        const sensorTabs = sensors.map((sensor) => ({ ...sensor, type: 'sensor' }));
        const controllerTabs = controllers.map((controller) => ({ ...controller, type: 'controller' }));

        setTabs([...sensorTabs, ...controllerTabs]);

        if (sensorTabs.length > 0) {
          fetchSensorData(sensorTabs[0].id);
        }
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };
    fetchTabs();
  }, []);

  // Fetch data for a specific sensor
  const fetchSensorData = async (sensorId) => {
    try {
      const response = await fetch(`https://iot.atenatech.ir/api/sensor_data/${sensorId}`);
      const data = await response.json();

      const labels = data.map((entry) => new Date(entry.timestamp).toLocaleTimeString());
      const values = data.map((entry) => parseFloat(entry.value));

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

      setCurrentValue(values[values.length - 1]);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching data for sensor ${sensorId}:`, error);
    }
  };

  // Fetch and set data for a specific controller
  const fetchControllerData = async (controllerId) => {
    try {
      const response = await fetch(`https://iot.atenatech.ir/api/controller/${controllerId}`);
      const controller = await response.json();
      setCurrentValue(controller.value);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching data for controller ${controllerId}:`, error);
    }
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
    const selectedTab = tabs[index];
    if (selectedTab.type === 'sensor') {
      fetchSensorData(selectedTab.id);
    } else if (selectedTab.type === 'controller') {
      fetchControllerData(selectedTab.id);
    }
  };

  const updateControllerValue = async (controllerId, newValue) => {
    try {
      const controller = tabs.find((tab) => tab.id === controllerId);
      if (!controller) return;

      await fetch(`https://iot.atenatech.ir/api/controller/${controllerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...controller,
          value: newValue,
        }),
      });

      setCurrentValue(newValue);
    } catch (error) {
      console.error(`Error updating controller ${controllerId} value:`, error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const sensorsTabs = tabs.filter((tab) => tab.type === 'sensor');
  const controllersTabs = tabs.filter((tab) => tab.type === 'controller');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Sensors Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
          {sensorsTabs.map((tab, index) => (
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

        <div style={{ flex: 4, padding: '1rem' }}>
          {chartData ? <Line data={chartData} /> : <div>No data available</div>}
        </div>
      </div>

      {/* Controllers Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderTop: '1px solid #ccc' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
          {controllersTabs.map((tab, index) => (
            <div
              key={tab.id}
              onClick={() => handleTabChange(sensorsTabs.length + index)}
              style={{
                flex: 1,
                padding: '10px',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: activeTab === sensorsTabs.length + index ? '#ddd' : '#f4f4f4',
                borderBottom: activeTab === sensorsTabs.length + index ? '2px solid #007bff' : 'none',
              }}
            >
              {tab.name}
            </div>
          ))}
        </div>

        <div style={{ flex: 4, padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {activeTab >= sensorsTabs.length && (
            <div>
              <h4>{controllersTabs[activeTab - sensorsTabs.length].name}</h4>
              <p>{controllersTabs[activeTab - sensorsTabs.length].description}</p>
              <p>
                Min Value: {controllersTabs[activeTab - sensorsTabs.length].min_value}, Max Value: {controllersTabs[activeTab - sensorsTabs.length].max_value}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <button
                  onClick={() =>
                    updateControllerValue(
                      controllersTabs[activeTab - sensorsTabs.length].id,
                      Math.max(
                        controllersTabs[activeTab - sensorsTabs.length].min_value,
                        currentValue - 1
                      )
                    )
                  }
                  style={{ padding: '5px', fontSize: '1rem' }}
                >
                  -
                </button>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currentValue}</span>
                <button
                  onClick={() =>
                    updateControllerValue(
                      controllersTabs[activeTab - sensorsTabs.length].id,
                      Math.min(
                        controllersTabs[activeTab - sensorsTabs.length].max_value,
                        currentValue + 1
                      )
                    )
                  }
                  style={{ padding: '5px', fontSize: '1rem' }}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
