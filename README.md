
# Drone Tracing System

Live Demo: [https://drone-tracing-system.web.app/](https://drone-tracing-system.web.app/) there are no drones at the moment untill you install [drone backend WebSocket](https://github.com/Jehadov/drone-backend-WebSocket) and run the index.js  


![image alt](https://github.com/Jehadov/drone-tracing-system/blob/main/drone%20tracing%20system.png?raw=true)
This project provides a responsive dashboard for monitoring drones via WebSocket updates. Features include:

Real-time Drone Tracking: Shows live locations and paths of drones on an interactive Mapbox map.

Drone List: Displays all drones with details, including name, serial, registration, and status.

Dashboard: Counts total drones, allowed drones, and red drones; highlights the top 3 highest drones.

Flight Information: Hover over a drone to see altitude and flight duration in days, hours, and minutes.

Responsive Design: Works across desktops, tablets, and mobile devices.

Red Drone Counter: Always visible at the bottom-right, showing the number of non-allowed drones.

Tech Stack:

Frontend: React, Mapbox GL, CSS

Backend (WebSocket): Socket.IO

State Management: React hooks (useState, useEffect)

Usage:

Clone the repository

Install dependencies: npm install

Run the app: npm run dev

Ensure your backend WebSocket server is running

Goal:
This project demonstrates real-time data handling, responsive UI design, and clear visualization of drone activity for monitoring and analysis.
