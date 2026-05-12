import { useState, useEffect } from "react";
import { inverterData, getPlantMetrics } from "../data/telemetry";

export default function TelemetryHUD() {
  const [metrics, setMetrics] = useState(getPlantMetrics());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getPlantMetrics());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (anomaly) => {
    if (anomaly === "HOTSPOT") return "#ff3333";
    if (anomaly === "SOILING") return "#ff9800";
    return "#00dd33";
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      color: "#00ff00",
      padding: "20px",
      borderRadius: "8px",
      fontFamily: "monospace",
      fontSize: "12px",
      border: "2px solid #00ff00",
      maxWidth: "350px",
      zIndex: 100,
      boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)"
    }}>
      {/* Plant Header */}
      <div style={{
        fontSize: "14px",
        fontWeight: "bold",
        marginBottom: "12px",
        paddingBottom: "8px",
        borderBottom: "1px solid #00ff00",
        color: "#00ffff"
      }}>
        🔋 1.2 MW Solar Plant - Digital Twin
      </div>

      {/* Main Metrics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
        <div>
          <div style={{ color: "#888", fontSize: "10px" }}>POWER OUTPUT</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#00ff00" }}>
            {metrics.totalPower} kW
          </div>
          <div style={{ color: "#666", fontSize: "10px" }}>
            Cap: {metrics.plantCapacity} kW
          </div>
        </div>

        <div>
          <div style={{ color: "#888", fontSize: "10px" }}>UTILIZATION</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: metrics.utilizationRate > 80 ? "#00ff00" : "#ffaa00" }}>
            {metrics.utilizationRate}%
          </div>
          <div style={{ color: "#666", fontSize: "10px" }}>
            Efficiency
          </div>
        </div>

        <div>
          <div style={{ color: "#888", fontSize: "10px" }}>AVG TEMP</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: metrics.avgTemp > 70 ? "#ff6600" : "#00ff00" }}>
            {metrics.avgTemp}°C
          </div>
          <div style={{ color: "#666", fontSize: "10px" }}>
            System Health
          </div>
        </div>

        <div>
          <div style={{ color: "#888", fontSize: "10px" }}>ANOMALIES</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: metrics.anomalyCount > 0 ? "#ff3333" : "#00ff00" }}>
            {metrics.anomalyCount}/{inverterData.length}
          </div>
          <div style={{ color: "#666", fontSize: "10px" }}>
            Active Issues
          </div>
        </div>
      </div>

      {/* Inverter Status List */}
      <div style={{
        paddingTop: "10px",
        borderTop: "1px solid #00ff00",
        maxHeight: "200px",
        overflowY: "auto"
      }}>
        <div style={{ color: "#00ffff", fontSize: "11px", marginBottom: "8px", fontWeight: "bold" }}>
          INVERTER STATUS:
        </div>
        {inverterData.map((inv) => (
          <div key={inv.id} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 0",
            fontSize: "11px",
            borderBottom: "1px solid rgba(0, 255, 0, 0.2)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
              <span style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: getStatusColor(inv.anomaly),
                boxShadow: `0 0 8px ${getStatusColor(inv.anomaly)}`
              }} />
              <span>INV-{inv.id}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div>{inv.power.toFixed(0)} kW</div>
              <div style={{ color: "#888", fontSize: "10px" }}>{inv.temperature.toFixed(0)}°C</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "10px",
        paddingTop: "8px",
        borderTop: "1px solid #00ff00",
        fontSize: "10px",
        color: "#666",
        textAlign: "center"
      }}>
        ↻ Live Feed | Industrial Grade
      </div>
    </div>
  );
}
