"use client"

import { useState, useEffect } from "react"
import { Brain, AlertTriangle, TrendingUp, Activity, Zap, Eye, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AIAlert {
  id: string
  touristId: string
  touristName: string
  type: string
  severity: string
  confidence: number
  description: string
  location: {
    lat: number
    lng: number
    address: string
  }
  detectedAt: string
  status: string
  aiModel: string
  riskFactors: string[]
}

export default function AIMonitoringPage() {
  const [alerts, setAlerts] = useState<AIAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  useEffect(() => {
    fetchAlerts()
    // Set up real-time updates
    const interval = setInterval(fetchAlerts, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [selectedSeverity])

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`/api/ai-monitoring/alerts?severity=${selectedSeverity}&limit=20`)
      const data = await response.json()
      setAlerts(data.alerts)
    } catch (error) {
      console.error("Failed to fetch AI alerts:", error)
    } finally {
      setLoading(false)
    }
  }

  const aiStats = {
    activeModels: 5,
    alertsToday: 23,
    accuracyRate: 94.2,
    processingSpeed: 1.2,
    touristsMonitored: 892,
    anomaliesDetected: 15,
  }

  const modelPerformance = [
    { name: "LocationAnomalyDetector", version: "v2.1", accuracy: 96.8, status: "active" },
    { name: "BehaviorAnalyzer", version: "v1.8", accuracy: 92.4, status: "active" },
    { name: "RoutePredictor", version: "v3.0", accuracy: 89.7, status: "active" },
    { name: "RiskAssessment", version: "v2.5", accuracy: 94.1, status: "active" },
    { name: "EmergencyDetector", version: "v1.9", accuracy: 98.2, status: "active" },
  ]

  const handleInvestigateAlert = (alertId: string) => {
    alert(`Investigating alert ${alertId}`)
  }

  const handleDismissAlert = (alertId: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Monitoring System</h1>
                <p className="text-sm text-muted-foreground">Real-time anomaly detection and behavioral analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="font-medium">System Status: Active</div>
                <div className="text-muted-foreground">Last updated: Just now</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* AI Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Models</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{aiStats.activeModels}</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts Today</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{aiStats.alertsToday}</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{aiStats.accuracyRate}%</div>
              <Progress value={aiStats.accuracyRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing Speed</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{aiStats.processingSpeed}s</div>
              <p className="text-xs text-muted-foreground">Average response time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tourists Monitored</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{aiStats.touristsMonitored}</div>
              <p className="text-xs text-muted-foreground">Real-time tracking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{aiStats.anomaliesDetected}</div>
              <p className="text-xs text-muted-foreground">Requiring attention</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Real-time AI Alerts</CardTitle>
                    <CardDescription>Anomalies detected by AI monitoring systems</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severity</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={fetchAlerts}>
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading AI alerts...</div>
                ) : (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <Card key={alert.id} className="border-l-4 border-l-destructive">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant={
                                    alert.severity === "high"
                                      ? "destructive"
                                      : alert.severity === "medium"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {alert.severity.toUpperCase()}
                                </Badge>
                                <Badge variant="outline">{Math.round(alert.confidence * 100)}% confidence</Badge>
                                <Badge variant="outline" className="text-xs">
                                  {alert.aiModel}
                                </Badge>
                              </div>
                              <h4 className="font-semibold mb-1">{alert.description}</h4>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Tourist:</span>
                                  <span>
                                    {alert.touristName} ({alert.touristId})
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{alert.location.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(alert.detectedAt).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1 flex-wrap">
                                  <span className="font-medium">Risk Factors:</span>
                                  {alert.riskFactors.map((factor, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {factor.replace("_", " ")}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                              <Button
                                size="sm"
                                onClick={() => handleInvestigateAlert(alert.id)}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Investigate
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDismissAlert(alert.id)}
                                className="bg-transparent"
                              >
                                Dismiss
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {alerts.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No alerts found for the selected criteria
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Performance</CardTitle>
                <CardDescription>Status and accuracy metrics for deployed AI models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelPerformance.map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{model.name}</h4>
                          <Badge variant="outline">{model.version}</Badge>
                          <Badge variant={model.status === "active" ? "default" : "secondary"}>{model.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Accuracy: {model.accuracy}%</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress value={model.accuracy} className="w-24" />
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Configure
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
                  <CardTitle>Detection Patterns</CardTitle>
                  <CardDescription>AI anomaly detection trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                      <div>Detection pattern chart</div>
                      <div className="text-sm">Showing 24-hour trend analysis</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Anomaly Categories</CardTitle>
                  <CardDescription>Breakdown of detected anomaly types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Route Deviation", count: 8, percentage: 35 },
                      { type: "Location Drop-off", count: 6, percentage: 26 },
                      { type: "Behavior Anomaly", count: 5, percentage: 22 },
                      { type: "Prolonged Inactivity", count: 4, percentage: 17 },
                    ].map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category.type}</span>
                          <span>{category.count} detected</span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Monitoring Configuration</CardTitle>
                <CardDescription>Adjust AI model parameters and alert thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Alert Thresholds</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">High Risk Threshold</label>
                        <div className="mt-1">
                          <Progress value={85} className="h-2" />
                          <div className="text-xs text-muted-foreground mt-1">85% confidence</div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Medium Risk Threshold</label>
                        <div className="mt-1">
                          <Progress value={65} className="h-2" />
                          <div className="text-xs text-muted-foreground mt-1">65% confidence</div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Low Risk Threshold</label>
                        <div className="mt-1">
                          <Progress value={45} className="h-2" />
                          <div className="text-xs text-muted-foreground mt-1">45% confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Model Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Real-time Processing</div>
                          <div className="text-sm text-muted-foreground">Enable continuous monitoring</div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Auto-escalation</div>
                          <div className="text-sm text-muted-foreground">Automatically escalate high-risk alerts</div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Learning Mode</div>
                          <div className="text-sm text-muted-foreground">Continuously improve model accuracy</div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Active
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
