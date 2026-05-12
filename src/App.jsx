import {
  useEffect,
  useState
} from "react";

import Navbar from "./components/Navbar";

import Scene from "./components/Scene";

import Alerts from "./components/Alerts";

import Charts from "./components/Charts";

import PanelView from "./components/PanelView";

import TelemetryHUD from "./components/TelemetryHUD";

import {

  inverterData as initialData,

  updateTelemetry,

  getPlantMetrics

} from "./data/telemetry";

export default function App() {

  // ===== ACTIVE TAB =====
  const [
    activeTab,
    setActiveTab
  ] = useState("3D View");

  // ===== CENTRALIZED TELEMETRY =====
  const [
    telemetry,
    setTelemetry
  ] = useState(
    [...initialData]
  );

  // ===== CENTRALIZED METRICS =====
  const [
    metrics,
    setMetrics
  ] = useState(
    getPlantMetrics()
  );

  // ===== INCIDENT POPUP =====
  const [
    incident,
    setIncident
  ] = useState(null);

  // ===== CENTRAL REAL-TIME ENGINE =====
  useEffect(() => {

    const interval =
      setInterval(() => {

        // UPDATE ENGINE
        updateTelemetry();

        // REFRESH CENTRAL STATE
        const updatedData =
          [...initialData];

        setTelemetry(
          updatedData
        );

        setMetrics(
          getPlantMetrics()
        );

        // ===== SMART ALERT THROTTLING =====
        const critical =
          updatedData.find(

            inv =>

              inv.severity ===
              "CRITICAL"

          );

        const now =
          Date.now();

        // SEND ONLY EVERY 30 SEC
        if (

          critical &&

          (
            !window.lastCriticalAlert ||

            now -
            window.lastCriticalAlert >
            30000
          )

        ) {

          window.lastCriticalAlert =
            now;

          setIncident({

            id: critical.id,

            anomaly:
              critical.anomaly,

            message:
              critical.recommendation

          });

        }

      }, 5000); // 5 SECOND TELEMETRY REFRESH

    return () =>
      clearInterval(interval);

  }, []);

  // ===== AUTO HIDE INCIDENT =====
  useEffect(() => {

    if (!incident)
      return;

    const timeout =
      setTimeout(() => {

        setIncident(null);

      }, 5000);

    return () =>
      clearTimeout(timeout);

  }, [incident]);

  return (

    <div>

      {/* NAVBAR */}
      <Navbar

        activeTab={activeTab}

        setActiveTab={setActiveTab}

      />

      {/* INCIDENT POPUP */}
      {incident && (

        <div
          style={{

            position: "fixed",

            top: 92,

            right: 20,

            zIndex: 9999,

            background:
              "rgba(20,0,0,0.96)",

            border:
              "1px solid red",

            borderRadius: 16,

            padding: 20,

            width: 340,

            boxShadow:
              "0 0 25px rgba(255,0,0,0.45)"

          }}
        >

          {/* TITLE */}
          <div
            style={{

              color: "#ff4444",

              fontWeight: "bold",

              fontSize: 20,

              marginBottom: 10

            }}
          >
            ⚠ Critical Incident
          </div>

          {/* INCIDENT */}
          <div
            style={{
              color: "white"
            }}
          >
            INV-{incident.id}
            {" "}
            :
            {" "}
            {incident.anomaly}
          </div>

          {/* MESSAGE */}
          <div
            style={{

              marginTop: 12,

              color: "#cbd5e1",

              lineHeight: 1.6

            }}
          >
            {incident.message}
          </div>

          {/* FOOTER */}
          <div
            style={{

              marginTop: 16,

              color: "#94a3b8",

              fontSize: 12

            }}
          >
            AI Rule Engine Triggered
          </div>

        </div>

      )}

      {/* ===== 3D VIEW ===== */}
      {activeTab ===
        "3D View" && (

        <>

          <Scene
            telemetry={telemetry}
          />

          <TelemetryHUD

            telemetry={telemetry}

            metrics={metrics}

          />

        </>

      )}

      {/* ===== PANEL VIEW ===== */}
      {activeTab ===
        "Panel View" && (

        <PanelView
          telemetry={telemetry}
        />

      )}

      {/* ===== ALERTS ===== */}
      {activeTab ===
        "Alerts" && (

        <Alerts
          telemetry={telemetry}
        />

      )}

      {/* ===== CHARTS ===== */}
      {activeTab ===
        "Charts" && (

        <Charts

          telemetry={telemetry}

          metrics={metrics}

        />

      )}

    </div>

  );

}