"use client"

import { useState } from "react"
import { Shield, MapPin, Phone, User, Settings, AlertTriangle, Navigation, Battery, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

export default function TouristApp() {
  const [safetyScore, setSafetyScore] = useState(85)
  const [isTracking, setIsTracking] = useState(true)
  const [currentZone, setCurrentZone] = useState("Safe Zone")
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [isOnline, setIsOnline] = useState(true)

  // Mock tourist data
  const touristData = {
    id: "TST-2024-001234",
    name: "John Smith",
    nationality: "United States",
    validUntil: "2024-12-15",
    emergencyContact: "+1-555-0123",
  }

  const handlePanicButton = () => {
    // This would trigger emergency protocols
    alert("Emergency alert sent! Help is on the way.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Status Bar */}
      <div className="bg-primary text-primary-foreground px-4 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-red-400"}`} />
          <span>{isOnline ? "Online" : "Offline"}</span>
          <Wifi className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2">
          <Battery className="h-4 w-4" />
          <span>{batteryLevel}%</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Tourist Safety</h1>
              <p className="text-sm text-muted-foreground">Stay Safe, Travel Smart</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Safety Score Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Safety Score</CardTitle>
              <Badge variant={safetyScore >= 80 ? "default" : safetyScore >= 60 ? "secondary" : "destructive"}>
                {safetyScore >= 80 ? "Excellent" : safetyScore >= 60 ? "Good" : "Caution"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{safetyScore}/100</span>
                <span className="text-sm text-muted-foreground">Updated 2 min ago</span>
              </div>
              <Progress value={safetyScore} className="h-2" />
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-medium">Location</div>
                  <div className="text-green-600">Safe</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Activity</div>
                  <div className="text-green-600">Normal</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Time</div>
                  <div className="text-yellow-600">Evening</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Location & Zone */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{currentZone}</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Safe Zone
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">Shillong, Meghalaya, India</div>
              <div className="flex items-center gap-2 text-sm">
                <Navigation className="h-4 w-4 text-primary" />
                <span>Last updated: Just now</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Panic Button */}
        <Card className="border-destructive/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Emergency
            </CardTitle>
            <CardDescription>Press and hold for 3 seconds to send emergency alert</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handlePanicButton}
              className="w-full h-16 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg font-bold"
              size="lg"
            >
              <Phone className="h-6 w-6 mr-2" />
              SOS - EMERGENCY
            </Button>
            <div className="mt-3 text-xs text-muted-foreground text-center">
              This will alert local authorities and your emergency contacts
            </div>
          </CardContent>
        </Card>

        {/* Digital Tourist ID */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Digital Tourist ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">ID Number</span>
                <span className="font-mono text-sm">{touristData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium">{touristData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Nationality</span>
                <span className="text-sm">{touristData.nationality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Valid Until</span>
                <span className="text-sm">{touristData.validUntil}</span>
              </div>
              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Show QR Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Privacy Settings</CardTitle>
            <CardDescription>Control how your location data is used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Real-time Tracking</div>
                  <div className="text-sm text-muted-foreground">Share location with authorities</div>
                </div>
                <Switch checked={isTracking} onCheckedChange={setIsTracking} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Family Sharing</div>
                  <div className="text-sm text-muted-foreground">Share location with emergency contacts</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
            <MapPin className="h-6 w-6" />
            <span className="text-sm">View Map</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
            <Phone className="h-6 w-6" />
            <span className="text-sm">Contacts</span>
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="grid grid-cols-4 gap-1">
          <Button variant="ghost" className="h-16 flex-col gap-1 rounded-none">
            <Shield className="h-5 w-5" />
            <span className="text-xs">Safety</span>
          </Button>
          <Button variant="ghost" className="h-16 flex-col gap-1 rounded-none">
            <MapPin className="h-5 w-5" />
            <span className="text-xs">Map</span>
          </Button>
          <Button variant="ghost" className="h-16 flex-col gap-1 rounded-none">
            <Phone className="h-5 w-5" />
            <span className="text-xs">Emergency</span>
          </Button>
          <Button variant="ghost" className="h-16 flex-col gap-1 rounded-none">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>

      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-16" />
    </div>
  )
}
