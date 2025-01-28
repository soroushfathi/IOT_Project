# **Smart Greenhouse Management System**

## **Table of Contents**
1. [Abstract](#abstract)  
2. [Phase 1: Sensors and Connections](#phase-1-sensors-and-connections)  
3. [Phase 2: Edge Server](#phase-2-edge-server)  
4. [Phase 3: Backend & Retrieval-Augmented Generation (RAG)](#phase-3-backend--rag)  
5. [Phase 4: Client](#phase-4-client)  

---

## **Abstract**  
The **Smart Greenhouse Management System** is an IoT-based solution designed to optimize and automate greenhouse operations. It incorporates sensors to monitor environmental factors such as temperature, light, CO2 levels, and water, alongside controllers for managing these variables. The project is divided into four phases:
1. Establishing hardware connections for sensors and controllers.
2. Creating an edge server for real-time data collection and initial processing.
3. Developing a backend system with a Retrieval-Augmented Generation (RAG) module for intelligent decision-making and question answering.
4. Building a user-friendly client application for monitoring and control.

---

## **Phase 1: Sensors and Connections**  
This phase focuses on hardware integration and data acquisition:  
- **Sensors:** Collect real-time data on temperature, soil moisture, light intensity, CO2 levels, pH, and water levels.  
- **Controllers:** Manage systems like irrigation, lighting, and ventilation.  
- **Microcontroller:** Acts as a central hub, communicating with sensors and controllers.  
- **Socket Connection:** Sends data to the server for further processing.  

---

## **Phase 2: Edge Server**  
The edge server bridges the gap between hardware and the backend system:  
- **Data Processing:** Pre-processes sensor data locally to reduce network bandwidth usage.  
- **Alerts:** Generates preliminary alerts for critical conditions.  
- **Communication:** Sends processed data to the central backend server.  

---

## **Phase 3: Backend & Retrieval-Augmented Generation (RAG)**  
The backend is the heart of the system, ensuring seamless integration and intelligent operations:  
- **Data Management:** Stores and processes data from the edge server using a robust database.  
- **RAG Module:** Leverages farming documentation to answer farmers' questions and recommend actions.  
- **Automation:** Issues commands to controllers (e.g., adjust temperature or irrigation schedules).  
- **API Services:** Provides endpoints for client applications to interact with the system.  

---

## **Phase 4: Client**  
The client application ensures user accessibility and control:  
- **Set-up & Installation:**
  - use `npm` `install` command in client directory to install needed packages.
  - use `npm` `start` to launch the client.
  - freely use the client.
- **Dashboard Layout:**
  1. **Sensor Tabs:** consists of historical data of sensor, its name and description.
  2. **Controller Tabs:** includes each controllers name and description, also the controller value can be manipulated with buttons in its range.
  3. **Chat Section:**  uses historical data and given prompt to analysis the current state of greenhouse.
- **File Structure:** 
  - directory structure:
    ```
    client/                 
    ├── node_modules/      
    ├── public/          
    ├── src/
    │   ├── components/
    |   ├── Chat.js
    |   ├── ControllerTab.js
    |   ├── SensorTab.js
    |   ├── Tabs.js
    |   ├── helpers/
    |       ├── fetchHelper.js
    │   ├── App.js         
    │   ├── index.js       
    │   ├── ...
    |   ├── ...
    ├── ...
    ├── package-lock.json
    ├── package.json
    ``` 
  - **App.js:** main entry of where other components will be included in.
  - **Chat.js:** responsible for chat section on right side, it uses fetch requests of `fetchHelper.js`.
  - **ControllerTab.js:** includes all Controllers available in bottom left section, it shows name description and enables controls for that controller.
  - **SensorTab.js:** includes all available Sensors on upper left section, it shows historical data of sensors.
  - **Tabs.js:** includes SensorTab.js and ControllerTab.js as one whole section which is located in left of chat section.
  - **fetchHelper.js:** includes all fetch requests needed for app:
    1. `get` Sensors & Controllers data
    2. `get` Sensor data
    3. `get` Controller data
    4. `update` Controller data
    5. `post` Sends Chat data 
