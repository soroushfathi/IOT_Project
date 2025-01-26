import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchSensorData } from "../helpers/fetchHelper";

const SensorTab = ({ tabs, activeTab, onTabChange }) => {
  const [chartData, setChartData] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    if (activeTab !== null && tabs[activeTab]) {
      fetchSensorData(tabs[activeTab].id, setChartData, setCurrentValue);
    }
  }, [activeTab, tabs]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            onClick={() => onTabChange(index)}
            style={{
              flex: 1,
              padding: "10px",
              cursor: "pointer",
              textAlign: "center",
              backgroundColor: activeTab === index ? "#ddd" : "#f4f4f4",
              borderBottom: activeTab === index ? "2px solid #007bff" : "none",
            }}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div style={{ flex: 4, padding: "1rem" }}>
        {chartData ? <Line data={chartData} /> : <div>No data available</div>}
      </div>
    </div>
  );
};

export default SensorTab;
