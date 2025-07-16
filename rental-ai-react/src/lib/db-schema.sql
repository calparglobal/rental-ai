-- Multi-Tenant SaaS Database Schema for Rental AI
-- Supports multiple rental business types: vehicles, equipment, properties, events, specialty items

-- ============================================================================
-- 1. PLATFORM LEVEL (Super Admin)
-- ============================================================================

-- Super Admins (Platform Management)
CREATE TABLE super_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  permissions JSONB DEFAULT '{"platform_management": true, "tenant_management": true, "user_management": true, "analytics": true}',
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tenants (Rental Business Organizations)
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  business_type VARCHAR(100) NOT NULL CHECK (business_type IN ('vehicle_rental', 'equipment_rental', 'property_rental', 'event_rental', 'specialty_rental')),
  subdomain VARCHAR(100) UNIQUE,
  custom_domain VARCHAR(255),
  plan_type VARCHAR(50) DEFAULT 'starter' CHECK (plan_type IN ('starter', 'professional', 'enterprise')),
  settings JSONB DEFAULT '{}',
  branding JSONB DEFAULT '{}',
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  address JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'trial')),
  trial_ends_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tenant Subscriptions
CREATE TABLE tenant_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  billing_details JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. TENANT LEVEL (Company/Business Entity)
-- ============================================================================

-- Updated Users table with tenant isolation
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manager', 'employee', 'viewer')),
  permissions JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending')),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tenant_id, email)
);

-- User Invitations
CREATE TABLE user_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  invited_by UUID REFERENCES users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. BUSINESS ASSETS (Tenant-Specific)
-- ============================================================================

-- Asset Categories (Vehicles, Equipment, Properties, etc.)
CREATE TABLE asset_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  business_type VARCHAR(100) NOT NULL,
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tenant_id, name)
);

-- Assets (Vehicles, Equipment, Properties, Event Items, etc.)
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES asset_categories(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  asset_type VARCHAR(100) NOT NULL,
  specifications JSONB DEFAULT '{}',
  pricing JSONB DEFAULT '{}',
  availability_status VARCHAR(50) DEFAULT 'available' CHECK (availability_status IN ('available', 'rented', 'maintenance', 'unavailable')),
  location JSONB DEFAULT '{}',
  images JSONB DEFAULT '[]',
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Updated Properties table with tenant isolation
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  property_type VARCHAR(100) NOT NULL,
  address JSONB NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) DEFAULT 'US',
  postal_code VARCHAR(20),
  rent_amount DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2),
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  square_feet INTEGER,
  amenities JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  is_available BOOLEAN DEFAULT true,
  availability_date DATE,
  lease_terms JSONB DEFAULT '{}',
  utilities_included JSONB DEFAULT '{}',
  pet_policy JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 4. CUSTOMER MANAGEMENT (Tenant-Specific)
-- ============================================================================

-- Customers (Renters, Lessees, etc.)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address JSONB DEFAULT '{}',
  identification JSONB DEFAULT '{}',
  emergency_contact JSONB DEFAULT '{}',
  notes TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blacklisted')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tenant_id, email)
);

-- ============================================================================
-- 5. RENTAL AGREEMENTS & CONTRACTS
-- ============================================================================

-- Rental Agreements (Contracts, Leases, etc.)
CREATE TABLE rental_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  asset_id UUID REFERENCES assets(id),
  property_id UUID REFERENCES properties(id),
  agreement_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'cancelled', 'expired')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  rental_amount DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2),
  terms_and_conditions TEXT,
  payment_schedule JSONB DEFAULT '{}',
  additional_charges JSONB DEFAULT '{}',
  signatures JSONB DEFAULT '{}',
  documents JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. FINANCIAL MANAGEMENT
-- ============================================================================

-- Transactions (Payments, Fees, etc.)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  agreement_id UUID REFERENCES rental_agreements(id),
  transaction_type VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method VARCHAR(100),
  payment_details JSONB DEFAULT '{}',
  description TEXT,
  due_date DATE,
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 7. SYSTEM TABLES
-- ============================================================================

-- Audit Logs (System-wide)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID,
  user_type VARCHAR(50), -- 'super_admin', 'tenant_user'
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100),
  resource_id UUID,
  changes JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 8. INDEXES FOR PERFORMANCE
-- ============================================================================

-- Tenant isolation indexes
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_properties_tenant_id ON properties(tenant_id);
CREATE INDEX idx_assets_tenant_id ON assets(tenant_id);
CREATE INDEX idx_customers_tenant_id ON customers(tenant_id);
CREATE INDEX idx_rental_agreements_tenant_id ON rental_agreements(tenant_id);
CREATE INDEX idx_transactions_tenant_id ON transactions(tenant_id);

-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_properties_availability ON properties(is_available);
CREATE INDEX idx_assets_availability ON assets(availability_status);
CREATE INDEX idx_rental_agreements_status ON rental_agreements(status);
CREATE INDEX idx_transactions_status ON transactions(status);

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tenant-scoped tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tenant isolation
-- Note: These will be implemented in the application layer for better flexibility

-- ============================================================================
-- 10. SAMPLE DATA FOR TESTING
-- ============================================================================

-- Insert sample tenants
INSERT INTO tenants (name, business_type, subdomain, contact_email, status) VALUES
('ABC Car Rentals', 'vehicle_rental', 'abc-cars', 'admin@abccarrentals.com', 'active'),
('XYZ Events', 'event_rental', 'xyz-events', 'admin@xyzevents.com', 'active'),
('Smith Properties', 'property_rental', 'smith-props', 'admin@smithproperties.com', 'active');

-- Insert sample super admin
INSERT INTO super_admins (email, password_hash, first_name, last_name) VALUES
('superadmin@rentalai.com', '$2b$10$example_hash', 'Super', 'Admin');