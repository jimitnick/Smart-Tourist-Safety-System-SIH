"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, MapPin, Clock, Phone, Car, Users, FileText, Radio, Navigation, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

interface EmergencyAlert {
  id: string
  touristId: string
  touristName: string
  type: string
  priority: string
  status: string
  location: {
    address: string
    coordinates: string
    accuracy: string
  }
  alertTime: string
  responseTime?: string
  assignedUnits: Array<{
    unitId: string
    type: string
    officer: string
    distance: string
    eta: string
    status: string
  }>
}

export default function EmergencyDispatchPage() {
  const [activeEmergencies, setActiveEmergencies] = useState<EmergencyAlert[]>([])
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null)
  const [dispatchNotes, setDispatchNotes] = useState("")
  const router = useRouter();
  useEffect(() => {
    // Mock active emergencies
    setActiveEmergencies([
      {
        id: "EMG-2024-001234",
        touristId: "TST-2024-001234",
        touristName: "John Smith",
        type: "Panic Button",
        priority: "Critical",
        status: "Active",
        location: {
          address: "Elephant Falls Trail, Shillong",
          coordinates: "25.5788°N, 91.8933°E",
          accuracy: "±5 meters",
        },
        alertTime: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        assignedUnits: [
          {
            unitId: "POLICE-001",
            type: "Police Patrol",
            officer: "Officer Sharma",
            distance: "2.3 km",
            eta: "6 minutes",
            status: "En Route",
          },
          {
            unitId: "MEDICAL-001",
            type: "Medical Team",
            officer: "Dr. Singh",
            distance: "3.1 km",
            eta: "10 minutes",
            status: "Dispatched",
          },
        ],
      },
      {
        id: "EMG-2024-001235",
        touristId: "TST-2024-001235",
        touristName: "Maria Garcia",
        type: "Missing Person",
        priority: "High",
        status: "Investigating",
        location: {
          address: "Shillong Peak Area",
          coordinates: "25.569°N, 91.882°E",
          accuracy: "±10 meters",
        },
        alertTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        responseTime: "12 minutes",
        assignedUnits: [
          {
            unitId: "SEARCH-001",
            type: "Search Team",
            officer: "Team Leader Patel",
            distance: "1.8 km",
            eta: "On Site",
            status: "On Site",
          },
        ],
      },
    ])
  }, [])

  const handleDispatchUnit = (emergencyId: string, unitType: string) => {
    alert(`Dispatching ${unitType} to emergency ${emergencyId}`)
  }

  const handleGenerateEFIR = async (emergencyId: string) => {
    try {
      const response = await fetch("/api/emergency/efir/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incidentId: emergencyId,
          touristId: "TST-2024-001234",
          incidentType: "missing_person",
          officerDetails: {
            name: "Officer Rajesh Sharma",
            badgeNumber: "PS-2024-001",
            station: "Shillong Police Station",
          },
        }),
      })
      const data = await response.json()
      if (data.success) {
        alert(`E-FIR generated successfully: ${data.efir.efirNumber}`)
      }
    } catch (error) {
      alert("Failed to generate E-FIR")
    }
  }

  const emergencyStats = {
    activeEmergencies: 2,
    unitsDeployed: 3,
    averageResponseTime: "8.5 minutes",
    resolvedToday: 5,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Radio className="h-8 w-8 text-destructive" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Emergency Dispatch Center</h1>
                <p className="text-sm text-muted-foreground">Real-time emergency response coordination</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => {router.push("/authority")}}>Go to Authority Dashboard</Button>
              <div className="text-right text-sm">
                <div className="font-medium text-destructive">EMERGENCY MODE ACTIVE</div>
                <div className="text-muted-foreground">All units on standby</div>
              </div>
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Emergency Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Emergencies</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{emergencyStats.activeEmergencies}</div>
              <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Units Deployed</CardTitle>
              <Car className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{emergencyStats.unitsDeployed}</div>
              <p className="text-xs text-muted-foreground">Currently responding</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{emergencyStats.averageResponseTime}</div>
              <p className="text-xs text-muted-foreground">Target: &lt;10 minutes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{emergencyStats.resolvedToday}</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Emergencies</TabsTrigger>
            <TabsTrigger value="dispatch">Dispatch Units</TabsTrigger>
            <TabsTrigger value="coordination">Coordination</TabsTrigger>
            <TabsTrigger value="reports">Reports & E-FIR</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeEmergencies.map((emergency) => (
                <Card key={emergency.id} className="border-l-4 border-l-destructive">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        {emergency.type}
                      </CardTitle>
                      <Badge variant="destructive">{emergency.priority}</Badge>
                    </div>
                    <CardDescription>Emergency ID: {emergency.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Tourist</div>
                          <div>{emergency.touristName}</div>
                          <div className="text-muted-foreground">{emergency.touristId}</div>
                        </div>
                        <div>
                          <div className="font-medium">Status</div>
                          <Badge variant={emergency.status === "Active" ? "destructive" : "secondary"}>
                            {emergency.status}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-1">Location</div>
                        <div className="text-sm">{emergency.location.address}</div>
                        <div className="text-xs text-muted-foreground">{emergency.location.coordinates}</div>
                      </div>

                      <div>
                        <div className="font-medium text-sm mb-2">Assigned Units</div>
                        <div className="space-y-2">
                          {emergency.assignedUnits.map((unit, index) => (
                            <div key={index} className="flex items-center justify-between text-sm border rounded p-2">
                              <div>
                                <div className="font-medium">{unit.type}</div>
                                <div className="text-muted-foreground">{unit.officer}</div>
                              </div>
                              <div className="text-right">
                                <div>{unit.eta}</div>
                                <Badge variant="outline" className="text-xs">
                                  {unit.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleDispatchUnit(emergency.id, "Additional Unit")}>
                          <Car className="h-4 w-4 mr-2" />
                          Dispatch
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGenerateEFIR(emergency.id)}
                          className="bg-transparent"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          E-FIR
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dispatch" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Response Units</CardTitle>
                <CardDescription>Deploy emergency response units to active incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      unitId: "POLICE-002",
                      type: "Police Patrol",
                      officer: "Officer Kumar",
                      status: "Available",
                      location: "City Center",
                      eta: "5 minutes",
                    },
                    {
                      unitId: "MEDICAL-002",
                      type: "Medical Emergency",
                      officer: "Dr. Sharma",
                      status: "Available",
                      location: "Hospital Base",
                      eta: "8 minutes",
                    },
                    {
                      unitId: "SEARCH-002",
                      type: "Search & Rescue",
                      officer: "Team Leader Roy",
                      status: "Available",
                      location: "Fire Station",
                      eta: "12 minutes",
                    },
                    {
                      unitId: "TRAFFIC-001",
                      type: "Traffic Control",
                      officer: "Officer Das",
                      status: "Available",
                      location: "Police Bazar",
                      eta: "3 minutes",
                    },
                  ].map((unit, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{unit.type}</div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {unit.status}
                            </Badge>
                          </div>
                          <div className="text-sm">
                            <div>{unit.officer}</div>
                            <div className="text-muted-foreground">{unit.unitId}</div>
                          </div>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{unit.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>ETA: {unit.eta}</span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full">
                            <Radio className="h-4 w-4 mr-2" />
                            Dispatch Unit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coordination" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Coordination</CardTitle>
                  <CardDescription>Coordinate response efforts and communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Select Emergency</label>
                      <Select value={selectedEmergency || ""} onValueChange={setSelectedEmergency}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose active emergency" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeEmergencies.map((emergency) => (
                            <SelectItem key={emergency.id} value={emergency.id}>
                              {emergency.id} - {emergency.touristName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Coordination Notes</label>
                      <Textarea
                        placeholder="Add coordination notes, updates, or instructions..."
                        value={dispatchNotes}
                        onChange={(e) => setDispatchNotes(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Radio className="h-4 w-4 mr-2" />
                        Broadcast Update
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        Team Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication Log</CardTitle>
                  <CardDescription>Recent coordination messages and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        time: "14:35",
                        sender: "Dispatch Center",
                        message: "Unit POLICE-001 en route to Elephant Falls",
                        type: "dispatch",
                      },
                      {
                        time: "14:33",
                        sender: "Officer Sharma",
                        message: "Received emergency alert, proceeding to location",
                        type: "response",
                      },
                      {
                        time: "14:30",
                        sender: "System",
                        message: "Emergency alert EMG-2024-001234 activated",
                        type: "alert",
                      },
                    ].map((log, index) => (
                      <div key={index} className="border-l-2 border-primary pl-3 text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{log.sender}</span>
                          <span className="text-muted-foreground">{log.time}</span>
                          <Badge variant="outline" className="text-xs">
                            {log.type}
                          </Badge>
                        </div>
                        <div>{log.message}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Reports & E-FIR Generation</CardTitle>
                <CardDescription>Generate official reports and E-FIR documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <FileText className="h-6 w-6" />
                    <span>Generate E-FIR</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Clock className="h-6 w-6" />
                    <span>Response Time Report</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Users className="h-6 w-6" />
                    <span>Unit Performance</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <AlertTriangle className="h-6 w-6" />
                    <span>Incident Summary</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Navigation className="h-6 w-6" />
                    <span>Location Analysis</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Shield className="h-6 w-6" />
                    <span>Safety Assessment</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
