-- Rental AI Database Schema
-- SQLite Database for Development

-- Users table (property owners, tenants, admins)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role TEXT CHECK(role IN ('owner', 'tenant', 'admin')) DEFAULT 'tenant',
    profile_image VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    property_type TEXT CHECK(property_type IN ('apartment', 'house', 'condo', 'studio', 'room')) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zipcode VARCHAR(20) NOT NULL,
    country VARCHAR(50) DEFAULT 'US',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    bedrooms INTEGER DEFAULT 0,
    bathrooms DECIMAL(3,1) DEFAULT 0,
    square_feet INTEGER,
    rent_amount DECIMAL(10, 2) NOT NULL,
    security_deposit DECIMAL(10, 2),
    available_from DATE,
    is_available BOOLEAN DEFAULT TRUE,
    furnished BOOLEAN DEFAULT FALSE,
    pets_allowed BOOLEAN DEFAULT FALSE,
    smoking_allowed BOOLEAN DEFAULT FALSE,
    utilities_included TEXT, -- JSON string of included utilities
    amenities TEXT, -- JSON string of amenities
    images TEXT, -- JSON string of image URLs
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Rental applications
CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    tenant_id INTEGER NOT NULL,
    status TEXT CHECK(status IN ('pending', 'approved', 'rejected', 'withdrawn')) DEFAULT 'pending',
    application_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    move_in_date DATE,
    income_amount DECIMAL(10, 2),
    employment_info TEXT, -- JSON string
    reference_info TEXT, -- JSON string
    additional_notes TEXT,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id)
);

-- Active leases/rentals
CREATE TABLE IF NOT EXISTS leases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    tenant_id INTEGER NOT NULL,
    application_id INTEGER,
    lease_start DATE NOT NULL,
    lease_end DATE NOT NULL,
    monthly_rent DECIMAL(10, 2) NOT NULL,
    security_deposit DECIMAL(10, 2),
    status TEXT CHECK(status IN ('active', 'expired', 'terminated')) DEFAULT 'active',
    lease_document VARCHAR(255), -- PDF file path
    signed_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id),
    FOREIGN KEY (application_id) REFERENCES applications(id)
);

-- Rent payments
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lease_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    due_date DATE NOT NULL,
    payment_method TEXT CHECK(payment_method IN ('credit_card', 'bank_transfer', 'check', 'cash')) NOT NULL,
    status TEXT CHECK(status IN ('pending', 'completed', 'failed', 'late')) DEFAULT 'pending',
    late_fee DECIMAL(10, 2) DEFAULT 0,
    transaction_id VARCHAR(255),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lease_id) REFERENCES leases(id)
);

-- Maintenance requests
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    tenant_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority TEXT CHECK(priority IN ('low', 'medium', 'high', 'emergency')) DEFAULT 'medium',
    category TEXT CHECK(category IN ('plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'other')) NOT NULL,
    status TEXT CHECK(status IN ('open', 'in_progress', 'completed', 'closed')) DEFAULT 'open',
    images TEXT, -- JSON string of image URLs
    assigned_to VARCHAR(255), -- Contractor/maintenance person
    estimated_cost DECIMAL(10, 2),
    actual_cost DECIMAL(10, 2),
    completed_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id)
);

-- AI-powered rental insights and analytics
CREATE TABLE IF NOT EXISTS rental_insights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    insight_type TEXT CHECK(insight_type IN ('price_suggestion', 'market_analysis', 'tenant_score', 'maintenance_prediction')) NOT NULL,
    data TEXT NOT NULL, -- JSON string with insight data
    confidence_score DECIMAL(3, 2), -- 0.00 to 1.00
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Property views and inquiries tracking
CREATE TABLE IF NOT EXISTS property_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    viewer_ip VARCHAR(45),
    viewer_id INTEGER, -- If logged in user
    view_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(100), -- 'website', 'mobile_app', etc.
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (viewer_id) REFERENCES users(id)
);

-- Messages between owners and tenants
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    property_id INTEGER,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Insert sample data for development
INSERT INTO users (email, password_hash, first_name, last_name, phone, role) VALUES 
('owner@example.com', '$2a$10$dummy.hash.here', 'John', 'Smith', '555-0123', 'owner'),
('tenant@example.com', '$2a$10$dummy.hash.here', 'Jane', 'Doe', '555-0456', 'tenant'),
('admin@example.com', '$2a$10$dummy.hash.here', 'Admin', 'User', '555-0789', 'admin');

INSERT INTO properties (owner_id, title, description, property_type, address, city, state, zipcode, bedrooms, bathrooms, square_feet, rent_amount, security_deposit, available_from, amenities) VALUES 
(1, 'Modern Downtown Apartment', 'Beautiful 2-bedroom apartment in the heart of downtown with city views.', 'apartment', '123 Main St, Unit 4B', 'San Francisco', 'CA', '94102', 2, 2, 1200, 3500.00, 3500.00, '2025-08-01', '["gym", "pool", "parking", "laundry"]'),
(1, 'Cozy Studio Near Campus', 'Perfect for students, walking distance to university.', 'studio', '456 College Ave', 'Berkeley', 'CA', '94704', 0, 1, 500, 1800.00, 1800.00, '2025-07-15', '["wifi", "furnished", "utilities_included"]');