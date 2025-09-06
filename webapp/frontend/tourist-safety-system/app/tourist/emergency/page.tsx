"use client"

import { useState } from "react"
import { ArrowLeft, Phone, MapPin, User, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function EmergencyPage() {
  const [emergencyActive, setEmergencyActive] = useState(false)

  const emergencyContacts = [
    { name: "Local Police", number: "100", type: "police", available: true },
    { name: "Tourist Helpline", number: "1363", type: "tourism", available: true },
    { name: "Medical Emergency", number: "108", type: "medical", available: true },
    { name: "Fire Department", number: "101", type: "fire", available: true },
  ]

  const personalContacts = [
    { name: "Emergency Contact", number: "+1-555-0123", relation: "Family" },
    { name: "Hotel Reception", number: "+91-364-2501234", relation: "Accommodation" },
  ]

  const handleEmergencyCall = (number: string, name: string) => {
    // In a real app, this would initiate a call
    alert(`Calling ${name} at ${number}`)
  }

  const activateEmergency = () => {
    setEmergencyActive(true)
    // This would trigger all emergency protocols
    setTimeout(() => setEmergencyActive(false), 5000) // Auto-reset for demo
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
            <h1 className="text-lg font-bold text-foreground">Emergency</h1>
            <p className="text-sm text-muted-foreground">Quick access to help</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Emergency Status */}
        {emergencyActive && (
          <Card className="border-destructive bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
                <div>
                  <div className="font-bold text-destructive">Emergency Alert Active</div>
                  <div className="text-sm text-muted-foreground">
                    Authorities have been notified. Help is on the way.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Emergency Button */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency SOS
            </CardTitle>
            <CardDescription>Activate emergency protocol - alerts all authorities and contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={activateEmergency}
              disabled={emergencyActive}
              className="w-full h-20 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xl font-bold"
              size="lg"
            >
              {emergencyActive ? (
                <>
                  <Clock className="h-6 w-6 mr-2 animate-spin" />
                  EMERGENCY ACTIVE
                </>
              ) : (
                <>
                  <Phone className="h-6 w-6 mr-2" />
                  ACTIVATE SOS
                </>
              )}
            </Button>
            <div className="mt-3 text-xs text-muted-foreground text-center">
              This will send your location to authorities and emergency contacts
            </div>
          </CardContent>
        </Card>

        {/* Emergency Services */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Services</CardTitle>
            <CardDescription>Direct contact with local emergency services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.number}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleEmergencyCall(contact.number, contact.name)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personal Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Contacts</CardTitle>
            <CardDescription>Your registered emergency contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {personalContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {contact.number} • {contact.relation}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleEmergencyCall(contact.number, contact.name)}>
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Current Location
            </CardTitle>
            <CardDescription>This location will be shared in emergency situations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="font-medium">Police Bazar, Shillong, Meghalaya</div>
              <div className="text-sm text-muted-foreground">Coordinates: 25.5788°N, 91.8933°E</div>
              <div className="text-sm text-muted-foreground">Accuracy: ±5 meters • Updated: Just now</div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Safety Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Keep your phone charged and location services enabled</div>
              <div>• Inform someone about your travel plans</div>
              <div>• Stay in well-lit, populated areas after dark</div>
              <div>• Keep emergency numbers easily accessible</div>
              <div>• Trust your instincts - if something feels wrong, seek help</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
