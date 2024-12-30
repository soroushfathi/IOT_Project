// mockData.js

const mockData = {
  tabs: [
    {
      name: "Tab 1",
      chart: {
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
      sensor: {
        name: "Sensor 1",
        description: "Description of Sensor 1, explaining its functionality and purpose.",
        current: 50,
      },
    },
    {
      name: "Tab 2",
      chart: {
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
      sensor: {
        name: "Sensor 2",
        description: "Description of Sensor 2, highlighting its key attributes and usage.",
        current: 30,
      },
    },
    {
      name: "Tab 3",
      chart: {
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
      sensor: {
        name: "Sensor 3",
        description: "Details about Sensor 3 and its practical applications.",
        current: 40,
      },
    },
    {
      name: "Tab 4",
      chart: {
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
      sensor: {
        name: "Sensor 4",
        description: "Critical information about Sensor 4 and its operations.",
        current: 60,
      },
    },
  ],
  timeframes: ['1 Hour', '6 Hours', '12 Hours', '24 Hours'],
};

export default mockData;
