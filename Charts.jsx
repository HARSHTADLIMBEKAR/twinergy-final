export default function Charts({
  telemetry,
  metrics
}) {

  // ===== LOSS ANALYSIS =====
  const losses =

    telemetry.map(inv => ({

      id: inv.id,

      loss:
        (
          100 -
          (inv.power /
            inv.expected) * 100
        ).toFixed(1)

    }));

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

      {/* HEADER */}
      <div
        style={{

          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          marginBottom: 28,

          flexWrap: "wrap"

        }}
      >

        <h1>
          Operational Analytics
        </h1>

        <div
          style={{
            color: "#94a3b8"
          }}
        >
          AI-Driven Plant Insights
        </div>

      </div>

      {/* TOP METRICS */}
      <div
        style={{

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",

          gap: 18

        }}
      >

        <MetricCard

          title="Plant Utilization"

          value={`${metrics.utilizationRate}%`}

          color="#00ff99"

        />

        <MetricCard

          title="Total Power"

          value={`${metrics.totalPower} kW`}

          color="#38bdf8"

        />

        <MetricCard

          title="Critical Assets"

          value={metrics.criticalCount}

          color="#ff4444"

        />

        <MetricCard

          title="Estimated Loss"

          value={`${metrics.totalLoss}%`}

          color="#facc15"

        />

      </div>

      {/* POWER PERFORMANCE */}
      <SectionTitle
        title="Power Performance"
      />

      {telemetry.map(inv => {

        const ratio =

          (inv.power /
            inv.expected) * 100;

        return (

          <div

            key={inv.id}

            style={{

              background:
                "#111827",

              padding: 18,

              borderRadius: 14,

              marginBottom: 16

            }}
          >

            <div
              style={{

                display: "flex",

                justifyContent:
                  "space-between",

                marginBottom: 10

              }}
            >

              <div>
                INV-{inv.id}
              </div>

              <div>
                {ratio.toFixed(1)}%
              </div>

            </div>

            {/* BAR */}
            <div
              style={{

                height: 16,

                background:
                  "#1e293b",

                borderRadius: 30,

                overflow: "hidden"

              }}
            >

              <div
                style={{

                  width:
                    `${ratio}%`,

                  height: "100%",

                  background:

                    ratio < 60

                      ? "#ef4444"

                    : ratio < 80

                      ? "#facc15"

                    : "#00ff99"

                }}
              />

            </div>

          </div>

        );

      })}

      {/* THERMAL ANALYSIS */}
      <SectionTitle
        title="Thermal Risk Analysis"
      />

      <div
        style={{

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",

          gap: 18

        }}
      >

        {telemetry.map(inv => (

          <div

            key={inv.id}

            style={{

              background:
                "#111827",

              padding: 20,

              borderRadius: 14

            }}
          >

            <div
              style={{
                marginBottom: 14
              }}
            >
              INV-{inv.id}
            </div>

            {/* TEMP CIRCLE */}
            <div
              style={{

                width: 120,

                height: 120,

                borderRadius: "50%",

                margin: "auto",

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                background:

                  inv.temperature >
                  85

                    ? "#7f1d1d"

                  : inv.temperature >
                    70

                    ? "#78350f"

                    : "#052e16",

                fontSize: 26,

                fontWeight: "bold"

              }}
            >
              {inv.temperature.toFixed(0)}°
            </div>

            <div
              style={{

                marginTop: 18,

                textAlign: "center",

                color: "#94a3b8"

              }}
            >
              {inv.anomaly}
            </div>

          </div>

        ))}

      </div>

      {/* LOSS BREAKDOWN */}
      <SectionTitle
        title="Generation Loss Breakdown"
      />

      {losses.map(item => (

        <div

          key={item.id}

          style={{

            marginBottom: 16

          }}
        >

          <div
            style={{

              display: "flex",

              justifyContent:
                "space-between",

              marginBottom: 8

            }}
          >

            <div>
              INV-{item.id}
            </div>

            <div>
              {item.loss}%
            </div>

          </div>

          <div
            style={{

              height: 14,

              background:
                "#1e293b",

              borderRadius: 30,

              overflow: "hidden"

            }}
          >

            <div
              style={{

                width:
                  `${item.loss}%`,

                height: "100%",

                background:
                  "#ff4444"

              }}
            />

          </div>

        </div>

      ))}

    </div>

  );

}

// ===== SECTION TITLE =====
function SectionTitle({
  title
}) {

  return (

    <h2
      style={{

        marginTop: 36,

        marginBottom: 18,

        color: "#00ff99"

      }}
    >
      {title}
    </h2>

  );

}

// ===== METRIC CARD =====
function MetricCard({
  title,
  value,
  color
}) {

  return (

    <div
      style={{

        background:
          "#111827",

        padding: 22,

        borderRadius: 16

      }}
    >

      <div
        style={{
          color: "#94a3b8"
        }}
      >
        {title}
      </div>

      <div
        style={{

          marginTop: 14,

          fontSize: 30,

          fontWeight: "bold",

          color

        }}
      >
        {value}
      </div>

    </div>

  );

}