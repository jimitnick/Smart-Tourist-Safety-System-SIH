"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock, User, Phone, AlertTriangle, FileText, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function IncidentDetailPage({ params }: { params: { id: string } }) {
  const [incidentStatus, setIncidentStatus] = useState("In Progress")
  const [responseNotes, setResponseNotes] = useState("")

  // Mock incident data
  const incident = {
    id: "INC-2024-001",
    type: "Panic Button",
    severity: "High",
    status: "In Progress",
    reportedAt: "2024-01-15 14:30:25",
    tourist: {
      id: "TST-2024-001234",
      name: "John Smith",
      nationality: "United States",
      phone: "+1-555-0123",
      emergencyContact: "Jane Smith (+1-555-0124)",
      safetyScore: 85,
    },
    location: {
      address: "Elephant Falls Trail, Shillong",
      coordinates: "25.5788°N, 91.8933°E",
      accuracy: "±5 meters",
      zone: "Medium Risk Zone",
    },
    timeline: [
      { time: "14:30:25", event: "Panic button activated", officer: "System" },
      { time: "14:30:30", event: "Emergency alert sent to authorities", officer: "System" },
      { time: "14:31:15", event: "Incident assigned to Officer Sharma", officer: "Dispatcher" },
      { time: "14:32:00", event: "Officer en route to location", officer: "Officer Sharma" },
      { time: "14:35:20", event: "Contact attempted with tourist", officer: "Officer Sharma" },
    ],
    assignedOfficer: "Officer Rajesh Sharma",
    responseTime: "4.2 minutes",
  }

  const handleStatusUpdate = () => {
    alert(`Status updated to: ${incidentStatus}`)
  }

  const generateEFIR = () => {
    alert("E-FIR generation initiated")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/authority">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Incident Details</h1>
              <p className="text-sm text-muted-foreground">Incident ID: {incident.id}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Incident Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    {incident.type}
                  </CardTitle>
                  <Badge variant="destructive">{incident.severity}</Badge>
                </div>
                <CardDescription>Reported on {incident.reportedAt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <Badge variant="default">{incident.status}</Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                    <div className="font-medium">{incident.responseTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Assigned Officer</div>
                    <div className="font-medium">{incident.assignedOfficer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Zone Type</div>
                    <div className="font-medium">{incident.location.zone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Address</div>
                    <div className="font-medium">{incident.location.address}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Coordinates</div>
                    <div className="font-mono text-sm">{incident.location.coordinates}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">GPS Accuracy</div>
                    <div className="text-sm">{incident.location.accuracy}</div>
                  </div>
                  {/* Mock map */}
                  <div className="h-48 bg-muted rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-destructive rounded-full border-2 border-white shadow-lg animate-pulse" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded text-xs">Incident Location</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Incident Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incident.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="text-sm text-muted-foreground w-20">{event.time}</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{event.event}</div>
                        <div className="text-xs text-muted-foreground">by {event.officer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tourist Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Tourist Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-medium">{incident.tourist.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Tourist ID</div>
                    <div className="font-mono text-sm">{incident.tourist.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Nationality</div>
                    <div>{incident.tourist.nationality}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-mono text-sm">{incident.tourist.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Emergency Contact</div>
                    <div className="text-sm">{incident.tourist.emergencyContact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Safety Score</div>
                    <Badge variant="outline">{incident.tourist.safetyScore}%</Badge>
                  </div>
                  <div className="pt-2 space-y-2">
                    <Button size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Tourist
                    </Button>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      View Full Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Response Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Update Status</label>
                    <Select value={incidentStatus} onValueChange={setIncidentStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Response Notes</label>
                    <Textarea
                      placeholder="Add response notes..."
                      value={responseNotes}
                      onChange={(e) => setResponseNotes(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button onClick={handleStatusUpdate} className="w-full">
                      Update Status
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Camera className="h-4 w-4 mr-2" />
                      Add Evidence
                    </Button>
                    <Button variant="outline" onClick={generateEFIR} className="w-full bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate E-FIR
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
