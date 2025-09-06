-- Creating database schema for Smart Tourist Safety System

-- Digital Tourist IDs table
CREATE TABLE IF NOT EXISTS tourist_ids (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tourist_id VARCHAR(50) UNIQUE NOT NULL,
    passport_number VARCHAR(50),
    aadhaar_number VARCHAR(12),
    full_name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(255),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    entry_point VARCHAR(255),
    trip_start_date DATE NOT NULL,
    trip_end_date DATE NOT NULL,
    itinerary JSONB,
    status VARCHAR(20) DEFAULT 'active',
    blockchain_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tourist locations tracking table
CREATE TABLE IF NOT EXISTS tourist_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tourist_id VARCHAR(50) REFERENCES tourist_ids(tourist_id),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy DECIMAL(5, 2),
    altitude DECIMAL(8, 2),
    speed DECIMAL(5, 2),
    heading DECIMAL(5, 2),
    location_source VARCHAR(20) DEFAULT 'gps',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_safe_zone BOOLEAN DEFAULT true,
    risk_level VARCHAR(20) DEFAULT 'low'
);

-- Safety zones and geo-fencing
CREATE TABLE IF NOT EXISTS safety_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_name VARCHAR(255) NOT NULL,
    zone_type VARCHAR(50) NOT NULL, -- 'safe', 'restricted', 'high-risk', 'emergency'
    coordinates JSONB NOT NULL, -- GeoJSON polygon
    risk_level VARCHAR(20) DEFAULT 'low',
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency incidents table
CREATE TABLE IF NOT EXISTS emergency_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id VARCHAR(50) UNIQUE NOT NULL,
    tourist_id VARCHAR(50) REFERENCES tourist_ids(tourist_id),
    incident_type VARCHAR(50) NOT NULL, -- 'panic_button', 'anomaly_detected', 'missing_person'
    severity VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,
    status VARCHAR(20) DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    assigned_officer VARCHAR(255),
    response_time_minutes INTEGER,
    notes TEXT
);

-- Tourist safety scores
CREATE TABLE IF NOT EXISTS tourist_safety_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tourist_id VARCHAR(50) REFERENCES tourist_ids(tourist_id),
    score INTEGER CHECK (score >= 0 AND score <= 100),
    factors JSONB, -- JSON object with score factors
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI anomaly detections
CREATE TABLE IF NOT EXISTS anomaly_detections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tourist_id VARCHAR(50) REFERENCES tourist_ids(tourist_id),
    anomaly_type VARCHAR(50) NOT NULL, -- 'location_drop', 'route_deviation', 'prolonged_inactivity'
    confidence_score DECIMAL(3, 2), -- 0.00 to 1.00
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    location_data JSONB,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'investigating', 'false_positive', 'confirmed'
    investigated_by VARCHAR(255),
    investigation_notes TEXT
);

-- Authority users table
CREATE TABLE IF NOT EXISTS authority_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    department VARCHAR(100), -- 'police', 'tourism', 'emergency_services'
    role VARCHAR(50), -- 'officer', 'supervisor', 'admin'
    jurisdiction JSONB, -- Geographic areas they cover
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tourist_locations_tourist_id ON tourist_locations(tourist_id);
CREATE INDEX IF NOT EXISTS idx_tourist_locations_timestamp ON tourist_locations(timestamp);
CREATE INDEX IF NOT EXISTS idx_emergency_incidents_tourist_id ON emergency_incidents(tourist_id);
CREATE INDEX IF NOT EXISTS idx_emergency_incidents_status ON emergency_incidents(status);
CREATE INDEX IF NOT EXISTS idx_anomaly_detections_tourist_id ON anomaly_detections(tourist_id);
CREATE INDEX IF NOT EXISTS idx_anomaly_detections_status ON anomaly_detections(status);

-- Create spatial index for location-based queries (if PostGIS is available)
-- CREATE INDEX IF NOT EXISTS idx_tourist_locations_geom ON tourist_locations USING GIST (ST_Point(longitude, latitude));
