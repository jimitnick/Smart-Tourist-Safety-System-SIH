import { type NextRequest, NextResponse } from "next/server"

// Emergency SOS alert handler
export async function POST(request: NextRequest) {
  try {
    const { touristId, location, emergencyType, additionalInfo } = await request.json()

    // Generate unique emergency ID
    const emergencyId = `EMG-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

    // Mock emergency response data
    const emergencyResponse = {
      emergencyId,
      touristId,
      status: "active",
      priority: "high",
      emergencyType: emergencyType || "panic_button",
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy || 5,
        address: location.address || "Location being determined...",
        timestamp: new Date().toISOString(),
      },
      alertTime: new Date().toISOString(),
      estimatedResponseTime: "8-12 minutes",
      assignedUnits: [
        {
          unitId: "POLICE-001",
          type: "Police Patrol",
          officer: "Officer Rajesh Sharma",
          distance: "2.3 km",
          eta: "8 minutes",
          status: "dispatched",
        },
        {
          unitId: "MEDICAL-001",
          type: "Medical Emergency",
          officer: "Dr. Priya Singh",
          distance: "3.1 km",
          eta: "12 minutes",
          status: "standby",
        },
      ],
      notificationsSent: {
        authorities: ["Local Police", "Tourist Helpline", "Emergency Services"],
        emergencyContacts: ["Primary Contact", "Secondary Contact"],
        timestamp: new Date().toISOString(),
      },
      escalationLevel: 1,
      additionalInfo: additionalInfo || null,
    }

    // In a real system, this would:
    // 1. Store emergency in database
    // 2. Send real-time alerts to authorities
    // 3. Notify emergency contacts
    // 4. Dispatch nearest response units
    // 5. Start tracking and coordination

    return NextResponse.json({
      success: true,
      message: "Emergency alert activated successfully",
      emergency: emergencyResponse,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process emergency alert" }, { status: 500 })
  }
}
