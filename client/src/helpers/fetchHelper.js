export const fetchTabsData = async () => {
  try {
    const [sensorsResponse, controllersResponse] = await Promise.all([
      fetch("https://iot.atenatech.ir/api/sensors"),
      fetch("https://iot.atenatech.ir/api/controller/list"),
    ]);

    const sensors = await sensorsResponse.json();
    const controllers = await controllersResponse.json();

    const sensorTabs = sensors.map((sensor) => ({ ...sensor, type: "sensor" }));
    const controllerTabs = controllers.map((controller) => ({ ...controller, type: "controller" }));

    return { sensors: sensorTabs, controllers: controllerTabs };
  } catch (error) {
    console.error("Error fetching tabs:", error);
    return { sensors: [], controllers: [] };
  }
};

export const fetchSensorData = async (sensorId, setChartData, setCurrentValue) => {
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
          borderColor: "#007bff",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
        },
      ],
    });

    setCurrentValue(values[values.length - 1]);
  } catch (error) {
    console.error("Error fetching sensor data:", error);
  }
};

export const fetchControllerData = async (controllerId, setCurrentValue) => {
  try {
    const response = await fetch(`https://iot.atenatech.ir/api/controller/${controllerId}`);
    const controller = await response.json();
    setCurrentValue(controller.value);
  } catch (error) {
    console.error("Error fetching controller data:", error);
  }
};

export const updateControllerValue = async (controllerId, newValue, setCurrentValue) => {
  try {
    const controller = await fetch(`https://iot.atenatech.ir/api/controller/${controllerId}`).then((res) => res.json());
    await fetch(`https://iot.atenatech.ir/api/controller/${controllerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...controller, value: newValue }),
    });

    setCurrentValue(newValue);
  } catch (error) {
    console.error("Error updating controller value:", error);
  }
};

export const fetchChatResponse = async (query) => {
  try {
    const response = await fetch("https://iot.atenatech.ir/api/chat/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching chat response:", error);
    return "Error: Unable to fetch response.";
  }
};