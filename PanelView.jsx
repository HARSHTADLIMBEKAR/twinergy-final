export default function PanelView({
  telemetry
}) {

  return (

    <div
      style={{

        marginTop: 72,

        height:
          "calc(100vh - 72px)",

        overflowY: "auto",

        background:
          "#0b1120",

        color: "white",

        padding: 24

      }}
    >

      <h1
        style={{
          marginBottom: 28
        }}
      >
        Panel-Level Digital Twin
      </h1>

      {/* ALL 4 INVERTERS */}
      {telemetry.map(inv => (

        <div
          key={inv.id}

          style={{

            marginBottom: 42,

            background:
              "#111827",

            borderRadius: 18,

            padding: 22,

            border:

              inv.severity ===
              "CRITICAL"

                ? "1px solid red"

                : "1px solid #1e293b"

          }}
        >

          {/* HEADER */}
          <div
            style={{

              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              marginBottom: 20

            }}
          >

            <div>

              <div
                style={{

                  fontSize: 24,

                  fontWeight: "bold"

                }}
              >
                INV-{inv.id}
              </div>

              <div
                style={{
                  color: "#94a3b8"
                }}
              >
                {inv.anomaly}
              </div>

            </div>

            <div
              style={{

                padding:
                  "8px 14px",

                borderRadius: 12,

                background:

                  inv.severity ===
                  "CRITICAL"

                    ? "#450a0a"

                    : inv.severity ===
                      "HIGH"

                    ? "#78350f"

                    : "#052e16",

                color: "white"

              }}
            >
              {inv.severity}
            </div>

          </div>

          {/* PANEL GRID */}
          <div
            style={{

              display: "grid",

              gridTemplateColumns:
                "repeat(12,1fr)",

              gap: 8

            }}
          >

            {Array.from({
              length: 48
            }).map((_, idx) => {

              let bg =
                "#2563eb";

              // SOILING
              if (
                inv.anomaly ===
                "SOILING" &&
                (
                  idx > 10 &&
                  idx < 20
                )
              ) {

                bg =
                  "linear-gradient(135deg,#1e293b,#9ca3af)";

              }

              // HOTSPOT
              if (
                inv.anomaly ===
                "THERMAL_DERATING" &&
                (
                  idx > 28 &&
                  idx < 34
                )
              ) {

                bg =
                  "linear-gradient(135deg,#ff6600,#ff0000)";

              }

              // MPPT LOSS
              if (
                inv.anomaly ===
                "MPPT_LOSS" &&
                (
                  idx % 7 === 0
                )
              ) {

                bg =
                  "#facc15";

              }

              // STRING MISMATCH
              if (
                inv.anomaly ===
                "STRING_MISMATCH" &&
                (
                  idx % 5 === 0
                )
              ) {

                bg =
                  "#38bdf8";

              }

              return (

                <div

                  key={idx}

                  style={{

                    aspectRatio:
                      "1 / 1",

                    borderRadius: 4,

                    background: bg,

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    boxShadow:

                      inv.anomaly ===
                      "THERMAL_DERATING" &&
                      idx > 28 &&
                      idx < 34

                        ? "0 0 12px rgba(255,0,0,0.7)"

                        : "none"

                  }}

                />

              );

            })}

          </div>

          {/* TELEMETRY */}
          <div
            style={{

              marginTop: 24,

              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",

              gap: 16

            }}
          >

            <Metric
              label="Power"
              value={`${inv.power.toFixed(1)} kW`}
            />

            <Metric
              label="Temperature"
              value={`${inv.temperature.toFixed(1)} °C`}
            />

            <Metric
              label="Efficiency"
              value={`${inv.efficiency.toFixed(1)}%`}
            />

            <Metric
              label="Risk Score"
              value={`${inv.riskScore}%`}
            />

          </div>

          {/* RECOMMENDATION */}
          <div
            style={{

              marginTop: 24,

              background:
                "#020617",

              padding: 18,

              borderRadius: 14,

              color: "#cbd5e1",

              lineHeight: 1.6

            }}
          >

            <div
              style={{

                marginBottom: 8,

                color: "#00ff99",

                fontWeight: "bold"

              }}
            >
              Recommended Action
            </div>

            {inv.recommendation}

          </div>

        </div>

      ))}

    </div>

  );

}

// ===== METRIC =====
function Metric({
  label,
  value
}) {

  return (

    <div
      style={{

        background:
          "#0f172a",

        padding: 16,

        borderRadius: 12

      }}
    >

      <div
        style={{
          color: "#94a3b8"
        }}
      >
        {label}
      </div>

      <div
        style={{

          marginTop: 8,

          fontSize: 20,

          fontWeight: "bold"

        }}
      >
        {value}
      </div>

    </div>

  );

}