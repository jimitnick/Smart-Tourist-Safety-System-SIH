-- Additional tables for AI monitoring system

-- AI model configurations
CREATE TABLE IF NOT EXISTS ai_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(20) NOT NULL,
    model_type VARCHAR(50) NOT NULL, -- 'anomaly_detection', 'risk_prediction', 'behavior_analysis'
    accuracy_rate DECIMAL(5, 2),
    confidence_threshold DECIMAL(3, 2) DEFAULT 0.70,
    is_active BOOLEAN DEFAULT true,
    parameters JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(model_name, model_version)
);

-- AI predictions and risk assessments
CREATE TABLE IF NOT EXISTS ai_risk_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tourist_id VARCHAR(50) REFERENCES tourist_ids(tourist_id),
    model_id UUID REFERENCES ai_models(id),
    current_risk_score INTEGER CHECK (current_risk_score >= 0 AND current_risk_score <= 100),
    predicted_risk_score INTEGER CHECK (predicted_risk_score >= 0 AND predicted_risk_score <= 100),
    confidence_level DECIMAL(3, 2),
    risk_factors JSONB,
    recommendations JSONB,
    prediction_window_hours INTEGER DEFAULT 2,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI alert configurations
CREATE TABLE IF NOT EXISTS ai_alert_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_name VARCHAR(100) NOT NULL,
    anomaly_type VARCHAR(50) NOT NULL,
    severity_threshold VARCHAR(20) DEFAULT 'medium',
    confidence_threshold DECIMAL(3, 2) DEFAULT 0.70,
    auto_escalate BOOLEAN DEFAULT false,
    notification_channels JSONB, -- email, sms, dashboard
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI learning feedback
CREATE TABLE IF NOT EXISTS ai_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    anomaly_id UUID REFERENCES anomaly_detections(id),
    prediction_id UUID REFERENCES ai_risk_predictions(id),
    feedback_type VARCHAR(20) NOT NULL, -- 'true_positive', 'false_positive', 'true_negative', 'false_negative'
    officer_id VARCHAR(50),
    feedback_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default AI models
INSERT INTO ai_models (model_name, model_version, model_type, accuracy_rate, confidence_threshold, parameters) VALUES
('LocationAnomalyDetector', 'v2.1', 'anomaly_detection', 96.8, 0.75, '{"max_deviation_km": 5, "time_window_minutes": 30}'),
('BehaviorAnalyzer', 'v1.8', 'behavior_analysis', 92.4, 0.70, '{"pattern_window_hours": 24, "deviation_threshold": 0.6}'),
('RoutePredictor', 'v3.0', 'risk_prediction', 89.7, 0.65, '{"prediction_horizon_hours": 4, "route_confidence": 0.8}'),
('RiskAssessment', 'v2.5', 'risk_prediction', 94.1, 0.80, '{"risk_factors": ["location", "time", "weather", "behavior"]}'),
('EmergencyDetector', 'v1.9', 'anomaly_detection', 98.2, 0.90, '{"emergency_patterns": ["panic_button", "sudden_stop", "help_keywords"]}'
);

-- Insert default alert rules
INSERT INTO ai_alert_rules (rule_name, anomaly_type, severity_threshold, confidence_threshold, auto_escalate, notification_channels) VALUES
('High Risk Location Alert', 'location_drop_off', 'high', 0.85, true, '["dashboard", "sms", "email"]'),
('Behavior Anomaly Alert', 'behavior_anomaly', 'medium', 0.75, false, '["dashboard", "email"]'),
('Route Deviation Alert', 'route_deviation', 'medium', 0.70, false, '["dashboard"]'),
('Emergency Pattern Alert', 'emergency_detected', 'high', 0.90, true, '["dashboard", "sms", "email", "call"]'),
('Prolonged Inactivity Alert', 'prolonged_inactivity', 'low', 0.60, false, '["dashboard"]');

-- Create indexes for AI monitoring
CREATE INDEX IF NOT EXISTS idx_ai_risk_predictions_tourist_id ON ai_risk_predictions(tourist_id);
CREATE INDEX IF NOT EXISTS idx_ai_risk_predictions_created_at ON ai_risk_predictions(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_anomaly_id ON ai_feedback(anomaly_id);
CREATE INDEX IF NOT EXISTS idx_ai_models_active ON ai_models(is_active);
