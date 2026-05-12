import {
  analyzeInverter
} from "./ruleEngine";

// ===== RAW INVERTER TELEMETRY =====
export let inverterData = [

  {
    id: 1,
    power: 285,
    expected: 300,
    temperature: 48,
    efficiency: 98
  },

  {
    id: 2,
    power: 215,
    expected: 300,
    temperature: 68,
    efficiency: 89
  },

  {
    id: 3,
    power: 255,
    expected: 300,
    temperature: 72,
    efficiency: 86
  },

  {
    id: 4,
    power: 145,
    expected: 300,
    temperature: 94,
    efficiency: 74
  }

];

// ===== UPDATE TELEMETRY =====
export function updateTelemetry() {

  inverterData =
    inverterData.map(inv => {

      // TIME-BASED FLUCTUATION
      const solarWave =

        Math.sin(
          Date.now() / 10000
        ) * 0.04;

      // RANDOM ENVIRONMENTAL CHANGE
      const randomVariation =

        (Math.random() - 0.5)
        * 0.06;

      const fluxFactor =

        1 +
        solarWave +
        randomVariation;

      // UPDATE POWER
      let power =

        inv.expected *
        fluxFactor;

      // FAULT CONDITIONS
      if (inv.id === 2) {

        power *= 0.72;

      }

      if (inv.id === 3) {

        power *= 0.84;

      }

      if (inv.id === 4) {

        power *= 0.48;

      }

      // TEMPERATURE MODEL
      let temperature =

        34 +
        (power / inv.expected) * 50 +
        (Math.random() * 4);

      // FORCE THERMAL ISSUE
      if (inv.id === 4) {

        temperature += 35;

      }

      // EFFICIENCY MODEL
      let efficiency =

        98 -
        ((inv.expected - power)
        / inv.expected) * 25;

      efficiency =
        Math.max(
          65,
          Math.min(99, efficiency)
        );

      // INTELLIGENT ANALYSIS
      return analyzeInverter({

        ...inv,

        power,

        temperature,

        efficiency

      });

    });

}

// ===== INITIAL ANALYSIS =====
inverterData =
  inverterData.map(
    analyzeInverter
  );

// ===== PLANT METRICS =====
export function getPlantMetrics() {

  const totalPower =

    inverterData.reduce(
      (sum, inv) =>
        sum + inv.power,
      0
    );

  const avgTemp =

    inverterData.reduce(
      (sum, inv) =>
        sum + inv.temperature,
      0
    ) / inverterData.length;

  const avgEfficiency =

    inverterData.reduce(
      (sum, inv) =>
        sum + inv.efficiency,
      0
    ) / inverterData.length;

  const anomalyCount =

    inverterData.filter(

      inv =>
        inv.anomaly !==
        "NORMAL"

    ).length;

  const criticalCount =

    inverterData.filter(

      inv =>
        inv.severity ===
        "CRITICAL"

    ).length;

  const totalLoss =

    inverterData.reduce(

      (sum, inv) =>

        sum +
        Number(inv.estimatedLoss),

      0

    );

  return {

    totalPower:
      totalPower.toFixed(1),

    avgTemp:
      avgTemp.toFixed(1),

    avgEfficiency:
      avgEfficiency.toFixed(1),

    anomalyCount,

    criticalCount,

    totalLoss:
      totalLoss.toFixed(1),

    plantCapacity: 1200,

    utilizationRate:

      (
        (totalPower / 1200)
        * 100
      ).toFixed(1)

  };

}