import { type NextRequest, NextResponse } from "next/server"

// Automated E-FIR generation
export async function POST(request: NextRequest) {
  try {
    const { incidentId, touristId, incidentType, officerDetails } = await request.json()

    // Generate E-FIR number
    const efirNumber = `FIR-${new Date().getFullYear()}-${String(Date.now()).slice(-8)}`

    // Mock E-FIR data
    const efirData = {
      efirNumber,
      incidentId,
      touristId,
      generatedAt: new Date().toISOString(),
      status: "draft",
      incidentDetails: {
        type: incidentType,
        dateTime: new Date().toISOString(),
        location: "Elephant Falls Trail, Shillong, Meghalaya",
        description: "Tourist reported missing after panic button activation. Last known location recorded.",
        severity: "high",
      },
      touristInformation: {
        name: "John Smith",
        nationality: "United States",
        passportNumber: "US123456789",
        age: 32,
        emergencyContact: "Jane Smith (+1-555-0124)",
        lastKnownLocation: "25.5788°N, 91.8933°E",
        safetyScore: 85,
      },
      officerInformation: {
        name: officerDetails?.name || "Officer Rajesh Sharma",
        badgeNumber: officerDetails?.badgeNumber || "PS-2024-001",
        station: officerDetails?.station || "Shillong Police Station",
        contactNumber: officerDetails?.contact || "+91-364-2501234",
      },
      timeline: [
        {
          time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          event: "Tourist last seen at location",
          source: "GPS tracking",
        },
        {
          time: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          event: "Panic button activated",
          source: "Mobile app",
        },
        {
          time: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          event: "Emergency response initiated",
          source: "System",
        },
        {
          time: new Date().toISOString(),
          event: "E-FIR generation requested",
          source: "Officer",
        },
      ],
      evidence: [
        {
          type: "GPS Location Data",
          description: "Last known coordinates and movement pattern",
          timestamp: new Date().toISOString(),
        },
        {
          type: "Mobile App Logs",
          description: "Panic button activation and app usage history",
          timestamp: new Date().toISOString(),
        },
      ],
      legalSections: ["Section 365 - Kidnapping", "Section 174 - Missing Person Report"],
      priority: "urgent",
      investigatingOfficer: officerDetails?.name || "Officer Rajesh Sharma",
    }

    return NextResponse.json({
      success: true,
      message: "E-FIR generated successfully",
      efir: efirData,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate E-FIR" }, { status: 500 })
  }
}
