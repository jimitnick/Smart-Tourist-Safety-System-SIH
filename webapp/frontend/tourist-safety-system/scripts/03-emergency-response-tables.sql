-- Emergency response system tables

-- Emergency alerts and SOS incidents
CREATE TABLE IF NOT EXISTS emergency_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    emergency_id VARCHAR(50) UNIQUE NOT NULL,
    tourist_id VARCHAR(50) REFERENCES tourist_ids(tourist_id),
    alert_type VARCHAR(50) NOT NULL, -- 'panic_button', 'missing_person', 'medical_emergency', 'accident'
    priority_level VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'responding', 'resolved', 'closed'
    location_data JSONB NOT NULL,
    alert_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    response_timestamp TIMESTAMP WITH TIME ZONE,
    resolution_timestamp TIMESTAMP WITH TIME ZONE,
    additional_info TEXT,
    escalation_level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency response units
CREATE TABLE IF NOT EXISTS response_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id VARCHAR(50) UNIQUE NOT NULL,
    unit_type VARCHAR(50) NOT NULL, -- 'police', 'medical', 'fire', 'search_rescue', 'traffic'
    unit_name VARCHAR(100) NOT NULL,
    officer_in_charge VARCHAR(255),
    contact_number VARCHAR(20),
    base_location JSONB,
    current_location JSONB,
    status VARCHAR(20) DEFAULT 'available', -- 'available', 'dispatched', 'on_site', 'returning', 'maintenance'
    capacity INTEGER DEFAULT 1,
    equipment JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency response assignments
CREATE TABLE IF NOT EXISTS emergency_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    emergency_id VARCHAR(50) REFERENCES emergency_alerts(emergency_id),
    unit_id VARCHAR(50) REFERENCES response_units(unit_id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    dispatched_at TIMESTAMP WITH TIME ZONE,
    arrived_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    estimated_arrival_time TIMESTAMP WITH TIME ZONE,
    actual_response_time_minutes INTEGER,
    assignment_status VARCHAR(20) DEFAULT 'assigned', -- 'assigned', 'dispatched', 'en_route', 'on_site', 'completed'
    notes TEXT
);

-- E-FIR (Electronic First Information Report) records
CREATE TABLE IF NOT EXISTS efir_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    efir_number VARCHAR(50) UNIQUE NOT NULL,
    emergency_id VARCHAR(50) REFERENCES emergency_alerts(emergency_id),
    incident_id VARCHAR(50),
    tourist_id VARCHAR(50) REFERENCES tourist_ids(tourist_id),
    filing_officer VARCHAR(255) NOT NULL,
    officer_badge_number VARCHAR(50),
    police_station VARCHAR(255),
    incident_type VARCHAR(100) NOT NULL,
    incident_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    incident_location JSONB NOT NULL,
    incident_description TEXT NOT NULL,
    legal_sections TEXT[],
    evidence_collected JSONB,
    witness_information JSONB,
    investigation_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'under_investigation', 'completed', 'closed'
    priority VARCHAR(20) DEFAULT 'medium',
    filed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency contact notifications
CREATE TABLE IF NOT EXISTS emergency_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    emergency_id VARCHAR(50) REFERENCES emergency_alerts(emergency_id),
    notification_type VARCHAR(50) NOT NULL, -- 'sms', 'email', 'call', 'push_notification'
    recipient_type VARCHAR(50) NOT NULL, -- 'emergency_contact', 'authority', 'response_unit'
    recipient_contact VARCHAR(255) NOT NULL,
    message_content TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivery_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'failed'
    delivery_timestamp TIMESTAMP WITH TIME ZONE,
    retry_count INTEGER DEFAULT 0
);

-- Emergency coordination logs
CREATE TABLE IF NOT EXISTS emergency_coordination_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    emergency_id VARCHAR(50) REFERENCES emergency_alerts(emergency_id),
    log_type VARCHAR(50) NOT NULL, -- 'dispatch', 'update', 'communication', 'status_change'
    officer_id VARCHAR(50),
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB
);

-- Insert sample response units
INSERT INTO response_units (unit_id, unit_type, unit_name, officer_in_charge, contact_number, base_location, equipment) VALUES
('POLICE-001', 'police', 'Police Patrol Unit 1', 'Officer Rajesh Sharma', '+91-364-2501234', '{"address": "Shillong Police Station", "lat": 25.5788, "lng": 91.8933}', '["radio", "first_aid", "emergency_kit"]'),
('POLICE-002', 'police', 'Police Patrol Unit 2', 'Officer Priya Kumar', '+91-364-2501235', '{"address": "City Center Beat", "lat": 25.5700, "lng": 91.8800}', '["radio", "first_aid", "emergency_kit"]'),
('MEDICAL-001', 'medical', 'Emergency Medical Team 1', 'Dr. Priya Singh', '+91-364-2501240', '{"address": "Civil Hospital Shillong", "lat": 25.5750, "lng": 91.8850}', '["ambulance", "medical_equipment", "oxygen", "defibrillator"]'),
('MEDICAL-002', 'medical', 'Emergency Medical Team 2', 'Dr. Amit Sharma', '+91-364-2501241', '{"address": "NEIGRIHMS", "lat": 25.5800, "lng": 91.9000}', '["ambulance", "medical_equipment", "oxygen", "defibrillator"]'),
('SEARCH-001', 'search_rescue', 'Search & Rescue Team 1', 'Team Leader Ravi Patel', '+91-364-2501250', '{"address": "Fire Station Shillong", "lat": 25.5720, "lng": 91.8900}', '["rescue_equipment", "ropes", "communication_devices", "first_aid"]'),
('FIRE-001', 'fire', 'Fire Emergency Unit 1', 'Fire Officer Das', '+91-364-2501260', '{"address": "Fire Station Shillong", "lat": 25.5720, "lng": 91.8900}', '["fire_truck", "water_pump", "rescue_tools", "breathing_apparatus"]');

-- Create indexes for emergency response
CREATE INDEX IF NOT EXISTS idx_emergency_alerts_tourist_id ON emergency_alerts(tourist_id);
CREATE INDEX IF NOT EXISTS idx_emergency_alerts_status ON emergency_alerts(status);
CREATE INDEX IF NOT EXISTS idx_emergency_alerts_priority ON emergency_alerts(priority_level);
CREATE INDEX IF NOT EXISTS idx_emergency_assignments_emergency_id ON emergency_assignments(emergency_id);
CREATE INDEX IF NOT EXISTS idx_response_units_status ON response_units(status);
CREATE INDEX IF NOT EXISTS idx_efir_records_emergency_id ON efir_records(emergency_id);
CREATE INDEX IF NOT EXISTS idx_emergency_notifications_emergency_id ON emergency_notifications(emergency_id);
