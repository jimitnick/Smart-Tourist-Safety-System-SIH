"use client"

import { useState } from "react"
import { ArrowLeft, AlertTriangle, Shield, Navigation, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TouristMapPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  // Mock data for safety zones
  const safetyZones = [
    { id: 1, name: "City Center", type: "safe", risk: "low", color: "bg-green-500" },
    { id: 2, name: "Tourist District", type: "safe", risk: "low", color: "bg-green-500" },
    { id: 3, name: "Forest Trail", type: "caution", risk: "medium", color: "bg-yellow-500" },
    { id: 4, name: "Remote Area", type: "restricted", risk: "high", color: "bg-red-500" },
  ]

  const currentLocation = {
    lat: 25.5788,
    lng: 91.8933,
    address: "Police Bazar, Shillong, Meghalaya",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/tourist">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Safety Map</h1>
            <p className="text-sm text-muted-foreground">Real-time zone monitoring</p>
          </div>
        </div>
      </header>

      <div className="relative">
        {/* Map Container - In a real app, this would be an actual map component */}
        <div className="h-96 bg-muted relative overflow-hidden">
          {/* Mock map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
            {/* Mock map elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse" />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white px-2 py-1 rounded shadow">
                You are here
              </div>
            </div>

            {/* Mock safety zones */}
            <div className="absolute top-20 left-20 w-16 h-16 bg-green-500/30 rounded-full border-2 border-green-500" />
            <div className="absolute top-32 right-24 w-20 h-20 bg-yellow-500/30 rounded-full border-2 border-yellow-500" />
            <div className="absolute bottom-20 left-16 w-12 h-12 bg-red-500/30 rounded-full border-2 border-red-500" />
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="secondary">
              <Layers className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary">
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current Location Info */}
        <Card className="mx-4 -mt-6 relative z-10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="flex-1">
                <div className="font-medium">Current Location</div>
                <div className="text-sm text-muted-foreground">{currentLocation.address}</div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Safe Zone
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Zones List */}
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Nearby Safety Zones</h2>

        <div className="space-y-3">
          {safetyZones.map((zone) => (
            <Card key={zone.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${zone.color}`} />
                  <div className="flex-1">
                    <div className="font-medium">{zone.name}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {zone.type} zone • {zone.risk} risk
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {zone.risk === "high" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    {zone.risk === "medium" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {zone.risk === "low" && <Shield className="h-4 w-4 text-green-500" />}
                    <Badge
                      variant={zone.risk === "high" ? "destructive" : zone.risk === "medium" ? "secondary" : "outline"}
                    >
                      {zone.risk}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Zone Legend */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Zone Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>Safe Zone - Low risk, well-monitored areas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span>Caution Zone - Medium risk, exercise caution</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span>Restricted Zone - High risk, avoid if possible</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
