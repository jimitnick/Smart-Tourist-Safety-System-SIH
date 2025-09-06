"use client"

import { useState } from "react"
import {
  Shield,
  Users,
  AlertTriangle,
  MapPin,
  Clock,
  TrendingUp,
  FileText,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function AuthorityDashboard() {
  const router = useRouter();
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [activeIncidents, setActiveIncidents] = useState(3)

  // Mock data
  const dashboardStats = {
    totalTourists: 1247,
    activeTourists: 892,
    safeZoneTourists: 834,
    highRiskTourists: 13,
    activeIncidents: 3,
    resolvedToday: 7,
    averageResponseTime: 4.2,
    safetyScore: 87,
  }

  const recentIncidents = [
    {
      id: "INC-2024-001",
      type: "Panic Button",
      tourist: "John Smith (TST-2024-001234)",
      location: "Elephant Falls Trail",
      severity: "High",
      status: "In Progress",
      time: "2 min ago",
      officer: "Officer Sharma",
    },
    {
      id: "INC-2024-002",
      type: "Route Deviation",
      tourist: "Maria Garcia (TST-2024-001235)",
      location: "Shillong Peak Area",
      severity: "Medium",
      status: "Investigating",
      time: "15 min ago",
      officer: "Officer Patel",
    },
    {
      id: "INC-2024-003",
      type: "Zone Alert",
      tourist: "David Chen (TST-2024-001236)",
      location: "Restricted Forest Area",
      severity: "Medium",
      status: "Resolved",
      time: "1 hour ago",
      officer: "Officer Singh",
    },
  ]

  const touristLocations = [
    { zone: "City Center", count: 342, risk: "Low", color: "bg-green-500" },
    { zone: "Tourist District", count: 289, risk: "Low", color: "bg-green-500" },
    { zone: "Scenic Routes", count: 203, risk: "Medium", color: "bg-yellow-500" },
    { zone: "Remote Areas", count: 58, risk: "High", color: "bg-red-500" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Authority Dashboard</h1>
                <p className="text-sm text-muted-foreground">Tourist Safety Monitoring & Response System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => {router.push("/authority/ai-monitoring")}}>AI Monitoring</Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts (3)
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="text-sm text-muted-foreground">
                Officer: Rajesh Sharma
                <br />
                Department: Tourism Police
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tourists</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dashboardStats.activeTourists}</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{dashboardStats.activeIncidents}</div>
              <p className="text-xs text-muted-foreground">-2 from last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dashboardStats.averageResponseTime}m</div>
              <p className="text-xs text-muted-foreground">-0.8m improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dashboardStats.safetyScore}%</div>
              <Progress value={dashboardStats.safetyScore} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="tourists">Tourists</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tourist Distribution Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Tourist Distribution</CardTitle>
                  <CardDescription>Real-time location clusters by safety zones</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mock map visualization */}
                  <div className="h-64 bg-muted rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                      {/* Mock heat map dots */}
                      <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-green-500/60 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-green-500/60 rounded-full" />
                      <div className="absolute top-3/4 right-1/3 w-6 h-6 bg-yellow-500/60 rounded-full" />
                      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-red-500/60 rounded-full" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded text-xs">
                      Live Heat Map - Updated every 30s
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {touristLocations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${location.color}`} />
                          <span className="text-sm">{location.zone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{location.count}</span>
                          <Badge
                            variant={
                              location.risk === "High"
                                ? "destructive"
                                : location.risk === "Medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {location.risk}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Incidents</CardTitle>
                  <CardDescription>Latest safety alerts and responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentIncidents.slice(0, 3).map((incident, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <AlertTriangle
                          className={`h-5 w-5 mt-0.5 ${
                            incident.severity === "High"
                              ? "text-red-500"
                              : incident.severity === "Medium"
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{incident.type}</span>
                            <Badge
                              variant={
                                incident.severity === "High"
                                  ? "destructive"
                                  : incident.severity === "Medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {incident.severity}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{incident.tourist}</div>
                          <div className="text-sm text-muted-foreground">{incident.location}</div>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span>Status: {incident.status}</span>
                            <span>{incident.time}</span>
                            <span>Officer: {incident.officer}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Incidents
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Incident Management</CardTitle>
                    <CardDescription>Monitor and respond to tourist safety incidents</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input placeholder="Search incidents..." className="max-w-sm" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severity</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-lg">
                    <div className="grid grid-cols-7 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
                      <div>Incident ID</div>
                      <div>Type</div>
                      <div>Tourist</div>
                      <div>Location</div>
                      <div>Severity</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    {recentIncidents.map((incident, index) => (
                      <div key={index} className="grid grid-cols-7 gap-4 p-4 border-b last:border-b-0 text-sm">
                        <div className="font-mono">{incident.id}</div>
                        <div>{incident.type}</div>
                        <div className="truncate">{incident.tourist}</div>
                        <div className="truncate">{incident.location}</div>
                        <div>
                          <Badge
                            variant={
                              incident.severity === "High"
                                ? "destructive"
                                : incident.severity === "Medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {incident.severity}
                          </Badge>
                        </div>
                        <div>
                          <Badge variant={incident.status === "Resolved" ? "outline" : "default"}>
                            {incident.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          {incident.status !== "Resolved" && <Button size="sm">Respond</Button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tourists" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tourist Records</CardTitle>
                    <CardDescription>Digital ID records and location history</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Search by ID or name..." className="w-64" />
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
                    <div>Tourist ID</div>
                    <div>Name</div>
                    <div>Nationality</div>
                    <div>Current Location</div>
                    <div>Safety Score</div>
                    <div>Actions</div>
                  </div>
                  {[
                    {
                      id: "TST-2024-001234",
                      name: "John Smith",
                      nationality: "USA",
                      location: "City Center",
                      score: 92,
                    },
                    {
                      id: "TST-2024-001235",
                      name: "Maria Garcia",
                      nationality: "Spain",
                      location: "Tourist District",
                      score: 78,
                    },
                    {
                      id: "TST-2024-001236",
                      name: "David Chen",
                      nationality: "Canada",
                      location: "Scenic Route",
                      score: 85,
                    },
                    {
                      id: "TST-2024-001237",
                      name: "Sarah Johnson",
                      nationality: "UK",
                      location: "Hotel Area",
                      score: 94,
                    },
                  ].map((tourist, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 p-4 border-b last:border-b-0 text-sm">
                      <div className="font-mono">{tourist.id}</div>
                      <div className="font-medium">{tourist.name}</div>
                      <div>{tourist.nationality}</div>
                      <div>{tourist.location}</div>
                      <div>
                        <Badge
                          variant={tourist.score >= 90 ? "default" : tourist.score >= 70 ? "secondary" : "destructive"}
                        >
                          {tourist.score}%
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Safety Trends</CardTitle>
                  <CardDescription>Tourist safety metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                      <div>Safety trend chart would appear here</div>
                      <div className="text-sm">Showing improvement over last 30 days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Incident Categories</CardTitle>
                  <CardDescription>Breakdown of incident types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Panic Button", count: 12, percentage: 35 },
                      { type: "Route Deviation", count: 8, percentage: 24 },
                      { type: "Zone Alert", count: 7, percentage: 21 },
                      { type: "Missing Person", count: 4, percentage: 12 },
                      { type: "Medical Emergency", count: 3, percentage: 8 },
                    ].map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category.type}</span>
                          <span>{category.count} incidents</span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
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
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Create detailed reports and E-FIR documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <FileText className="h-6 w-6" />
                    <span>Daily Safety Report</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <AlertTriangle className="h-6 w-6" />
                    <span>Incident Summary</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Users className="h-6 w-6" />
                    <span>Tourist Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <MapPin className="h-6 w-6" />
                    <span>Zone Risk Assessment</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Clock className="h-6 w-6" />
                    <span>Response Time Analysis</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 border-destructive text-destructive bg-transparent"
                  >
                    <FileText className="h-6 w-6" />
                    <span>Generate E-FIR</span>
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
