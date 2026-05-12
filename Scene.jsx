import { Canvas, useFrame } from "@react-three/fiber";

import {
  OrbitControls,
  Html,
  useTexture
} from "@react-three/drei";

import { useEffect, useRef, useState } from "react";

import normalTexture from "../assets/textures/solar-panel.jpg";

import dirtyTexture from "../assets/textures/dirty-panel.jpg";

import {
  inverterData,
  updateTelemetry
} from "../data/telemetry";

// ===== SOLAR PANEL =====
function SolarPanel({
  position,
  anomaly
}) {

  const texture =
    useTexture(

      anomaly === "SOILING"

        ? dirtyTexture

        : normalTexture

    );

  const ref =
    useRef();

  useFrame(({ clock }) => {

    if (
      anomaly ===
      "THERMAL_DERATING" &&
      ref.current
    ) {

      ref.current.material.emissiveIntensity =

        Math.sin(
          clock.elapsedTime * 4
        ) * 0.5 + 1.5;

    }

  });

  return (

    <group position={position}>

      {/* STAND */}
      <mesh
        position={[0, -0.5, 0]}
      >

        <boxGeometry
          args={[0.06, 1, 0.06]}
        />

        <meshStandardMaterial
          color="#666"
        />

      </mesh>

      {/* PANEL */}
      <mesh

        ref={ref}

        rotation={[-Math.PI / 3, 0, 0]}

      >

        <boxGeometry
          args={[1.8, 0.08, 1]}
        />

        <meshStandardMaterial

          map={texture}

          color={

            anomaly ===
            "THERMAL_DERATING"

              ? "#ffb199"

            : anomaly ===
              "MPPT_LOSS"

              ? "#ffe680"

            : anomaly ===
              "STRING_MISMATCH"

              ? "#9ad6ff"

            : "white"
          }

          emissive={

            anomaly ===
            "THERMAL_DERATING"

              ? "#ff2200"

              : "#000000"
          }

          emissiveIntensity={

            anomaly ===
            "THERMAL_DERATING"

              ? 1.5

              : 0
          }

          metalness={0.6}

          roughness={0.25}

        />

      </mesh>

    </group>

  );
}

// ===== STRING CLUSTER =====
function StringCluster({
  position,
  anomaly,
  label
}) {

  return (

    <group position={position}>

      {Array.from({
        length: 8
      }).map((_, idx) => (

        <SolarPanel

          key={idx}

          position={[
            idx * 2,
            0,
            0
          ]}

          anomaly={anomaly}

        />

      ))}

      {/* LABEL */}
      <Html
        position={[6, 2, 0]}
        center
      >

        <div
          style={{

            background:
              "rgba(0,0,0,0.82)",

            padding:
              "6px 10px",

            borderRadius: 8,

            color: "white",

            fontSize: 11

          }}
        >
          {label}
        </div>

      </Html>

    </group>

  );
}

// ===== INVERTER =====
function Inverter({
  position,
  data
}) {

  return (

    <group position={position}>

      <mesh>

        <boxGeometry
          args={[1.2, 2.5, 0.8]}
        />

        <meshStandardMaterial
          color="#222"
        />

      </mesh>

      {/* STATUS LIGHT */}
      <mesh
        position={[0, 1.1, 0.45]}
      >

        <sphereGeometry
          args={[0.12, 32, 32]}
        />

        <meshStandardMaterial

          emissive={
            data.anomaly ===
            "THERMAL_DERATING"

              ? "red"

              : data.anomaly ===
                "SOILING"

              ? "orange"

              : data.anomaly ===
                "MPPT_LOSS"

              ? "#00bcd4"

              : data.anomaly ===
                "STRING_MISMATCH"

              ? "#eab308"

              : "lime"
          }

          emissiveIntensity={4}

          color={
            data.anomaly ===
            "THERMAL_DERATING"

              ? "red"

              : data.anomaly ===
                "SOILING"

              ? "orange"

              : data.anomaly ===
                "MPPT_LOSS"

              ? "#00bcd4"

              : data.anomaly ===
                "STRING_MISMATCH"

              ? "#eab308"

              : "lime"
          }

        />

      </mesh>

    </group>

  );
}

// ===== TELEMETRY LABEL =====
function TelemetryLabel({
  position,
  data
}) {

  return (

    <Html
      position={position}
      center
      distanceFactor={18}
    >

      <div
        style={{

          background:
            "rgba(0,0,0,0.84)",

          padding: 10,

          borderRadius: 10,

          minWidth: 140,

          color: "white",

          fontSize: 11,

          border:

            data.severity ===
            "CRITICAL"

              ? "1px solid red"

              : data.severity ===
                "HIGH"

              ? "1px solid orange"

              : "1px solid #00ff99"

        }}
      >

        <div>
          <b>INV-{data.id}</b>
        </div>

        <div>
          Power:
          {" "}
          {data.power.toFixed(0)} kW
        </div>

        <div>
          Temp:
          {" "}
          {data.temperature.toFixed(0)}°C
        </div>

        <div>
          Eff:
          {" "}
          {data.efficiency.toFixed(1)}%
        </div>

        <div>
          Risk:
          {" "}
          {data.riskScore}%
        </div>

        <div
          style={{
            marginTop: 5
          }}
        >
          {data.anomaly}
        </div>

      </div>

    </Html>

  );
}

// ===== SOLAR FARM =====
function SolarFarm() {

  return (

    <>

      {inverterData.map(
        (inv, row) => (

          <group key={inv.id}>

            {/* 12 STRING GROUPS */}
            {Array.from({
              length: 12
            }).map((_, stringIdx) => (

              <StringCluster

                key={stringIdx}

                position={[

                  (stringIdx % 4) * 18 - 30,

                  1.5,

                  row * 32 +
                  Math.floor(stringIdx / 4) * 6

                ]}

                anomaly={

                  inv.anomaly ===
                  "SOILING"

                    ? (
                        stringIdx === 2 ||
                        stringIdx === 5
                      )

                      ? "SOILING"

                      : "NORMAL"

                  : inv.anomaly ===
                    "THERMAL_DERATING"

                    ? (
                        stringIdx === 7
                      )

                      ? "THERMAL_DERATING"

                      : "NORMAL"

                  : inv.anomaly ===
                    "STRING_MISMATCH"

                    ? (
                        stringIdx === 4 ||
                        stringIdx === 9
                      )

                      ? "STRING_MISMATCH"

                      : "NORMAL"

                  : inv.anomaly ===
                    "MPPT_LOSS"

                    ? (
                        stringIdx === 1 ||
                        stringIdx === 10
                      )

                      ? "MPPT_LOSS"

                      : "NORMAL"

                  : "NORMAL"

                }

                label={`SG-${stringIdx + 1}`}

              />

            ))}

            {/* INVERTER */}
            <Inverter

              position={[
                46,
                1.2,
                row * 32 + 6
              ]}

              data={inv}

            />

            {/* TELEMETRY */}
            <TelemetryLabel

              position={[
                46,
                4,
                row * 32 + 6
              ]}

              data={inv}

            />

          </group>

        )
      )}

    </>

  );
}

// ===== GROUND =====
function Ground() {

  return (

    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
    >

      <planeGeometry
        args={[1200, 1200]}
      />

      <meshStandardMaterial
        color="#7c9a4d"
      />

    </mesh>

  );
}

// ===== MAIN =====
export default function Scene() {

  const [, setTick] =
    useState(0);

  const [
    inspectionMode,
    setInspectionMode
  ] = useState(false);

  useEffect(() => {

    const interval =
      setInterval(() => {

        updateTelemetry();

        setTick(v => v + 1);

      }, 2000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <>

      {/* MODE SWITCH */}
      <button

        onClick={() =>

          setInspectionMode(
            !inspectionMode
          )

        }

        style={{

          position: "fixed",

          top: 82,

          left: 20,

          zIndex: 1000,

          background: "#111827",

          color: "#00ff99",

          border:
            "1px solid #00ff99",

          padding: "10px 18px",

          borderRadius: 10,

          cursor: "pointer"

        }}

      >

        {

          inspectionMode

            ? "Plant Overview"

            : "Inspection Mode"

        }

      </button>

      <Canvas

        dpr={[1, 1.2]}

        gl={{

          antialias: false,

          powerPreference:
            "high-performance"

        }}

        style={{

          width: "100vw",

          height:
            "calc(100vh - 72px)",

          marginTop: "72px",

          background:
            "linear-gradient(#87CEEB,#dff5ff)"

        }}

        camera={{

          position:

            inspectionMode

              ? [-20, 10, 30]

              : [-80, 50, 180],

          fov: 45

        }}

      >

        {/* LIGHT */}
        <ambientLight
          intensity={1}
        />

        <directionalLight

          position={[20, 20, 10]}

          intensity={1}

        />

        {/* CONTROLS */}
        <OrbitControls

          target={

            inspectionMode

              ? [0, 0, 80]

              : [0, 0, 60]

          }

          enablePan={true}

          enableZoom={true}

          enableRotate={true}

          maxPolarAngle={
            Math.PI / 2.05
          }

          minDistance={
            inspectionMode
              ? 3
              : 30
          }

          maxDistance={
            inspectionMode
              ? 120
              : 420
          }

          zoomSpeed={1.2}

          rotateSpeed={0.7}

          panSpeed={1.4}

        />

        {/* GROUND */}
        <Ground />

        {/* DIGITAL TWIN */}
        <SolarFarm />

      </Canvas>

    </>

  );
}