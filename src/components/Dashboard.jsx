import React from "react";

function Dashboard({ droneList = {} }) {
  const drones = Object.values(droneList);
  const totalDrones = drones.length;
  const allowedDrones = drones.filter(d => (d.properties?.registration || "").startsWith("SD-B")).length;
  const redDrones = totalDrones - allowedDrones;

  // Top 3 highest drones
  const top3 = drones
    .sort((a, b) => (b.properties?.altitude || 0) - (a.properties?.altitude || 0))
    .slice(0, 3);

  return (
    <div className="dashboard">
      <h3> Drone Dashboard</h3>
      <p>Total Drones: <b>{totalDrones}</b></p>
      <p style={{ color: "green" }}>Allowed Drones: <b>{allowedDrones}</b></p>
      <p style={{ color: "red" }}>Red Drones: <b>{redDrones}</b></p>
      <hr />
      <h4>Top 3 Highest Drones</h4>
      <ul>
        {top3.map(d => (
          <li key={d.properties?.serial}>
            {d.properties?.Name} ({d.properties?.altitude} m)
          </li>
        ))}
      </ul>

      {/* Responsive CSS */}
      <style>
        {`
          .dashboard {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            min-width: 200px;
            font-family: Arial, sans-serif;
          }

          .dashboard h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
          }

          .dashboard p {
            margin: 5px 0;
            font-size: 16px;
          }

          .dashboard h4 {
            margin: 5px 0;
            font-size: 16px;
          }

          .dashboard ul {
            padding-left: 15px;
            margin: 0;
            font-size: 14px;
          }

          /* Mobile responsive */
          @media (max-width: 768px) {
            .dashboard {
              top: 10px;
              right: 10px;
              padding: 10px;
              min-width: 150px;
            }

            .dashboard h3 {
              font-size: 16px;
            }

            .dashboard p {
              font-size: 12px;
            }

            .dashboard h4 {
              font-size: 14px;
            }

            .dashboard ul {
              font-size: 11px;
              padding-left: 10px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Dashboard;
