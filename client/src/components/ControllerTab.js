import React, { useState } from "react";
import { fetchControllerData, updateControllerValue } from "../helpers/fetchHelper";

const ControllerTab = ({ tabs, activeTab, onTabChange }) => {
  const [currentValue, setCurrentValue] = useState(null);

  const handleControllerChange = (controllerId, newValue) => {
    updateControllerValue(controllerId, newValue, setCurrentValue);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", borderTop: "1px solid #ccc" }}>
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            onClick={() => {
              onTabChange(index);
              fetchControllerData(tab.id, setCurrentValue);
            }}
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
      {activeTab !== null && tabs[activeTab] && (
        <div style={{ flex: 4, padding: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div>
            <h4>{tabs[activeTab].name}</h4>
            <p>{tabs[activeTab].description}</p>
            <p>
              Min Value: {tabs[activeTab].min_value}, Max Value: {tabs[activeTab].max_value}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <button
                onClick={() =>
                  handleControllerChange(
                    tabs[activeTab].id,
                    Math.max(tabs[activeTab].min_value, currentValue - 1)
                  )
                }
                style={{ padding: "5px", fontSize: "1rem" }}
              >
                -
              </button>
              <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{currentValue}</span>
              <button
                onClick={() =>
                  handleControllerChange(
                    tabs[activeTab].id,
                    Math.min(tabs[activeTab].max_value, currentValue + 1)
                  )
                }
                style={{ padding: "5px", fontSize: "1rem" }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControllerTab;
