import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components for chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dummy data for charts
const chartsData = [
  {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Tab 1 Data',
        data: [10, 20, 30, 40, 50],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
      },
    ],
  },
  {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Tab 2 Data',
        data: [5, 15, 25, 35, 45],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
      },
    ],
  },
  {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Tab 3 Data',
        data: [15, 25, 20, 30, 40],
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
      },
    ],
  },
  {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Tab 4 Data',
        data: [25, 35, 45, 55, 65],
        borderColor: '#dc3545',
        backgroundColor: 'rgba(220, 53, 69, 0.2)',
      },
    ],
  },
];

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        {['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'].map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              flex: 1,
              padding: '10px',
              cursor: 'pointer',
              textAlign: 'center',
              backgroundColor: activeTab === index ? '#ddd' : '#f4f4f4',
              borderBottom: activeTab === index ? '2px solid #007bff' : 'none',
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      <div style={{ flexGrow: 1, padding: '1rem' }}>
        <Line data={chartsData[activeTab]} />
      </div>
    </div>
  );
};

export default TabsSection;
