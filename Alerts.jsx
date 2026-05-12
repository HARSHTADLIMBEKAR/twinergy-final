export default function Alerts({
  telemetry
}) {

  const alerts =

    telemetry.filter(

      inv =>
        inv.anomaly !==
        "NORMAL"

    );

  // ===== CONTROLLABILITY =====
  function getControlType(
    anomaly
  ) {

    if (
      anomaly ===
      "SOILING"
    ) {

      return "Controllable";

    }

    if (
      anomaly ===
      "MPPT_LOSS"
    ) {

      return "Controllable";

    }

    return "Uncontrollable";

  }

  // ===== PRIORITY =====
  function getPriority(
    severity
  ) {

    if (
      severity ===
      "CRITICAL"
    ) {

      return "Critical";

    }

    if (
      severity ===
      "HIGH"
    ) {

      return "High";

    }

    return "Low";

  }

  // ===== RESPONSE TIME =====
  function getResponseTime(
    severity
  ) {

    if (
      severity ===
      "CRITICAL"
    ) {

      return "Immediate (< 15 min)";

    }

    if (
      severity ===
      "HIGH"
    ) {

      return "Within 1 hour";

    }

    return "Within 24 hours";

  }

  return (

    <div
      style={{

        marginTop: 72,

        height:
          "calc(100vh - 72px)",

        overflowY: "auto",

        background:
          "#020617",

        color: "white",

        padding: 24

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

          marginBottom: 28

        }}
      >

        <h1>
          Smart Alert Center
        </h1>

        <div
          style={{
            color: "#94a3b8"
          }}
        >
          Active Alerts:
          {" "}
          {alerts.length}
        </div>

      </div>

      {/* NO ALERTS */}
      {alerts.length === 0 && (

        <div
          style={{
            color: "#00ff99"
          }}
        >
          All systems operating normally.
        </div>

      )}

      {/* ALERT LIST */}
      {alerts.map(inv => (

        <div

          key={inv.id}

          style={{

            background:
              "#111827",

            borderRadius: 16,

            padding: 22,

            marginBottom: 20,

            borderLeft:

              inv.severity ===
              "CRITICAL"

                ? "8px solid red"

                : inv.severity ===
                  "HIGH"

                ? "8px solid orange"

                : "8px solid #eab308"

          }}
        >

          {/* TOP */}
          <div
            style={{

              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              flexWrap: "wrap",

              gap: 12

            }}
          >

            <div>

              <div
                style={{

                  fontSize: 22,

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

            {/* BADGES */}
            <div
              style={{

                display: "flex",

                gap: 10,

                flexWrap: "wrap"

              }}
            >

              {/* PRIORITY */}
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

                    : "#422006",

                  color: "white"

                }}
              >
                {getPriority(
                  inv.severity
                )}
              </div>

              {/* CONTROL */}
              <div
                style={{

                  padding:
                    "8px 14px",

                  borderRadius: 12,

                  background:

                    getControlType(
                      inv.anomaly
                    ) ===
                    "Controllable"

                      ? "#052e16"

                      : "#1e1b4b",

                  color: "white"

                }}
              >
                {
                  getControlType(
                    inv.anomaly
                  )
                }
              </div>

            </div>

          </div>

          {/* METRICS */}
          <div
            style={{

              marginTop: 22,

              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",

              gap: 14

            }}
          >

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

            <Metric
              label="Estimated Loss"
              value={`${inv.estimatedLoss}%`}
            />

          </div>

          {/* RESPONSE */}
          <div
            style={{

              marginTop: 22,

              background:
                "#0f172a",

              padding: 18,

              borderRadius: 14

            }}
          >

            <div
              style={{

                color: "#00ff99",

                marginBottom: 8,

                fontWeight: "bold"

              }}
            >
              Recommended Action
            </div>

            <div
              style={{

                color: "#cbd5e1",

                lineHeight: 1.6

              }}
            >
              {inv.recommendation}
            </div>

            {/* RESPONSE TIME */}
            <div
              style={{

                marginTop: 14,

                color: "#facc15"

              }}
            >
              Recommended Response:
              {" "}
              {
                getResponseTime(
                  inv.severity
                )
              }
            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

// ===== METRIC CARD =====
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