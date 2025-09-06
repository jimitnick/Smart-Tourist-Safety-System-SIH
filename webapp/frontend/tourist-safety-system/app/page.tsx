import { Shield, MapPin, Users, AlertTriangle, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Tourist Safety System</h1>
                <p className="text-sm text-muted-foreground">Smart Monitoring & Emergency Response</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Language
              </Button>
              <Button size="sm">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Your Safety is Our Priority</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Advanced AI-powered monitoring system ensuring tourist safety with real-time tracking, emergency response,
            and secure digital identification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Shield className="h-5 w-5 mr-2" />
              Get Digital Tourist ID
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="h-5 w-5 mr-2" />
              Emergency Contacts
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Comprehensive Safety Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Digital Tourist ID</CardTitle>
                <CardDescription>
                  Secure blockchain-based identification with KYC verification and trip details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Instant ID generation at entry points</li>
                  <li>• Secure blockchain verification</li>
                  <li>• Emergency contact integration</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Geo-Fencing</CardTitle>
                <CardDescription>
                  Real-time location monitoring with safety zone alerts and risk assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• High-risk zone warnings</li>
                  <li>• Route deviation alerts</li>
                  <li>• Safety score tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-secondary mb-2" />
                <CardTitle>Emergency Response</CardTitle>
                <CardDescription>
                  Instant SOS alerts with live location sharing to authorities and contacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• One-tap panic button</li>
                  <li>• Automatic E-FIR generation</li>
                  <li>• Multi-language support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Authority Dashboard</CardTitle>
                <CardDescription>Real-time monitoring dashboard for tourism departments and police</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Tourist heat maps</li>
                  <li>• Incident management</li>
                  <li>• Analytics and reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>AI Anomaly Detection</CardTitle>
                <CardDescription>
                  Advanced AI monitoring for unusual patterns and potential safety risks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Behavior pattern analysis</li>
                  <li>• Missing person detection</li>
                  <li>• Predictive risk assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Phone className="h-10 w-10 text-secondary mb-2" />
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>
                  Round-the-clock multilingual support for tourists and emergency services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 10+ Indian languages</li>
                  <li>• Voice emergency access</li>
                  <li>• Accessibility features</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Travel Safely?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of tourists who trust our advanced safety monitoring system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Download Mobile App
            </Button>
            <Button size="lg" variant="outline">
              Authority Login
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">Tourist Safety System</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
