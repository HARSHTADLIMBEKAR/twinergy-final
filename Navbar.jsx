export default function Navbar({
  activeTab,
  setActiveTab
}) {

  const tabs = [
    "3D View",
    "Panel View",
    "Alerts",
    "Charts"
  ];

  return (

    <div
      style={{

        position: "fixed",

        top: 0,

        left: 0,

        width: "100%",

        height: 72,

        background:
          "rgba(8,12,20,0.96)",

        display: "flex",

        justifyContent:
          "space-between",

        alignItems: "center",

        padding: "0 25px",

        zIndex: 999,

        borderBottom:
          "1px solid #1e293b",

        backdropFilter:
          "blur(10px)"
      }}
    >

      {/* LOGO */}
      <div>

        <div
          style={{

            color: "#00ff99",

            fontSize: 24,

            fontWeight: "bold",

            letterSpacing: 1

          }}
        >
          TWINERGY
        </div>

        <div
          style={{

            color: "#94a3b8",

            fontSize: 11,

            marginTop: 2

          }}
        >
          Utility-Scale Solar Digital Twin
        </div>

      </div>

      {/* NAVIGATION */}
      <div
        style={{

          display: "flex",

          gap: 12,

          marginRight: 40

        }}
      >

        {tabs.map(tab => (

          <button

            key={tab}

            onClick={() =>
              setActiveTab(tab)
            }

            style={{

              padding:
                "10px 18px",

              borderRadius: 10,

              border:

                activeTab === tab

                  ? "1px solid #00ff99"

                  : "1px solid #334155",

              background:

                activeTab === tab

                  ? "rgba(0,255,153,0.12)"

                  : "#111827",

              color:

                activeTab === tab

                  ? "#00ff99"

                  : "#cbd5e1",

              cursor: "pointer",

              fontWeight: 600,

              transition: "0.3s",

              boxShadow:

                activeTab === tab

                  ? "0 0 15px rgba(0,255,153,0.35)"

                  : "none"

            }}
          >

            {tab}

          </button>

        ))}

      </div>

    </div>

  );
}