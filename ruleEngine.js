// ===== RULE-BASED INFERENCE ENGINE =====

export function analyzeInverter(inv) {

  let anomaly = "NORMAL";

  let severity = "LOW";

  let recommendation =
    "Operating within normal conditions.";

  let riskScore = 5;

  let estimatedLoss = 0;

  const powerRatio =
    inv.power / inv.expected;

  // ===== THERMAL DERATING =====
  if (
    inv.temperature > 85 &&
    powerRatio < 0.55
  ) {

    anomaly =
      "THERMAL_DERATING";

    severity =
      "CRITICAL";

    riskScore = 92;

    estimatedLoss =
      ((1 - powerRatio) * 100)
      .toFixed(1);

    recommendation =
      "Inspect cooling system, check ventilation and reduce thermal load immediately.";

  }

  // ===== SOILING =====
  else if (
    powerRatio < 0.78 &&
    inv.temperature < 75
  ) {

    anomaly =
      "SOILING";

    severity =
      "MEDIUM";

    riskScore = 63;

    estimatedLoss =
      ((1 - powerRatio) * 100)
      .toFixed(1);

    recommendation =
      "Panel cleaning recommended due to generation degradation.";

  }

  // ===== MPPT LOSS =====
  else if (
    inv.efficiency < 90 &&
    powerRatio > 0.75
  ) {

    anomaly =
      "MPPT_LOSS";

    severity =
      "HIGH";

    riskScore = 71;

    estimatedLoss =
      ((1 - powerRatio) * 100)
      .toFixed(1);

    recommendation =
      "Inspect MPPT tracking and DC-side instability.";

  }

  // ===== STRING MISMATCH =====
  else if (
    inv.efficiency < 94 &&
    inv.temperature > 65
  ) {

    anomaly =
      "STRING_MISMATCH";

    severity =
      "MEDIUM";

    riskScore = 58;

    estimatedLoss =
      ((1 - powerRatio) * 100)
      .toFixed(1);

    recommendation =
      "Check string balancing and combiner connections.";

  }

  return {

    ...inv,

    anomaly,

    severity,

    recommendation,

    riskScore,

    estimatedLoss

  };

}