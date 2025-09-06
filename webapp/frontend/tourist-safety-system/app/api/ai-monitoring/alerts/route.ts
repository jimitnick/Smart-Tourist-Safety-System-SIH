import { type NextRequest, NextResponse } from "next/server"

// Mock AI alert generation
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const severity = searchParams.get("severity") || "all"
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Mock real-time AI alerts
  const alerts = [
    {
      id: "AI-2024-001",
      touristId: "TST-2024-001234",
      touristName: "John Smith",
      type: "location_drop_off",
      severity: "high",
      confidence: 0.92,
      description: "Sudden GPS signal loss in remote area",
      location: { lat: 25.5788, lng: 91.8933, address: "Elephant Falls Trail" },
      detectedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      status: "active",
      aiModel: "LocationAnomalyDetector v2.1",
      riskFactors: ["remote_location", "signal_loss", "solo_travel", "evening_time"],
    },
    {
      id: "AI-2024-002",
      touristId: "TST-2024-001235",
      touristName: "Maria Garcia",
      type: "behavior_anomaly",
      severity: "medium",
      confidence: 0.76,
      description: "Unusual movement pattern detected - rapid direction changes",
      location: { lat: 25.569, lng: 91.882, address: "Shillong Peak Road" },
      detectedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      status: "investigating",
      aiModel: "BehaviorAnalyzer v1.8",
      riskFactors: ["erratic_movement", "unfamiliar_area", "weather_conditions"],
    },
    {
      id: "AI-2024-003",
      touristId: "TST-2024-001236",
      touristName: "David Chen",
      type: "route_deviation",
      severity: "low",
      confidence: 0.68,
      description: "Minor deviation from planned itinerary",
      location: { lat: 25.575, lng: 91.89, address: "Ward Lake Area" },
      detectedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      status: "resolved",
      aiModel: "RoutePredictor v3.0",
      riskFactors: ["minor_deviation", "safe_area"],
    },
  ]

  const filteredAlerts = severity === "all" ? alerts : alerts.filter((alert) => alert.severity === severity)

  return NextResponse.json({
    alerts: filteredAlerts.slice(0, limit),
    total: filteredAlerts.length,
    timestamp: new Date().toISOString(),
  })
}
