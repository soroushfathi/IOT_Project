import React, { useState, useEffect } from "react";
import SensorTab from "./SensorTab";
import ControllerTab from "./ControllerTab";
import { fetchTabsData } from "../helpers/fetchHelper";

const Tabs = () => {
  const [tabs, setTabs] = useState({ sensors: [], controllers: [] });
  const [activeSensorTab, setActiveSensorTab] = useState(null);
  const [activeControllerTab, setActiveControllerTab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeTabs = async () => {
      const fetchedTabs = await fetchTabsData();
      setTabs(fetchedTabs);
      if (fetchedTabs.sensors.length > 0) {
        setActiveSensorTab(0);
      }
      setLoading(false);
    };

    initializeTabs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

      <SensorTab
        tabs={tabs.sensors}
        activeTab={activeSensorTab}
        onTabChange={setActiveSensorTab}
      />


      <ControllerTab
        tabs={tabs.controllers}
        activeTab={activeControllerTab}
        onTabChange={setActiveControllerTab}
      />
    </div>
  );
};

export default Tabs;
