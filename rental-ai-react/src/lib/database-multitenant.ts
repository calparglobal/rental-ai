import { sql } from '@vercel/postgres'
import bcrypt from 'bcryptjs'

// Check if we're in production and have database environment variables
const isProduction = process.env.NODE_ENV === 'production'
const hasDBConfig = process.env.POSTGRES_URL || process.env.DATABASE_URL

console.log('Multi-tenant database config check:', {
  isProduction,
  hasDBConfig: !!hasDBConfig,
  nodeEnv: process.env.NODE_ENV,
  hasPostgresUrl: !!process.env.POSTGRES_URL,
  hasDatabaseUrl: !!process.env.DATABASE_URL
})

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SuperAdmin {
  id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  permissions: string[]
  status: 'active' | 'inactive' | 'suspended'
  last_login?: Date
  created_at: Date
  updated_at: Date
}

export interface Tenant {
  id: string
  name: string
  business_type: 'vehicle_rental' | 'equipment_rental' | 'property_rental' | 'event_rental' | 'specialty_rental'
  subdomain: string
  custom_domain?: string
  plan_type: 'starter' | 'professional' | 'enterprise'
  settings: Record<string, any>
  branding: Record<string, any>
  contact_email: string
  contact_phone?: string
  address: Record<string, any>
  status: 'active' | 'inactive' | 'suspended' | 'trial'
  trial_ends_at?: Date
  created_at: Date
  updated_at: Date
}

export interface TenantUser {
  id: string
  tenant_id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  role: 'admin' | 'manager' | 'employee' | 'viewer'
  permissions: string[]
  status: 'active' | 'inactive' | 'suspended' | 'pending'
  last_login?: Date
  created_at: Date
  updated_at: Date
}

export interface Property {
  id: string
  tenant_id: string
  title: string
  description?: string
  property_type: string
  address: Record<string, any>
  city: string
  state: string
  country: string
  postal_code?: string
  rent_amount: number
  deposit_amount?: number
  bedrooms?: number
  bathrooms?: number
  square_feet?: number
  amenities: string[]
  images: string[]
  is_available: boolean
  availability_date?: Date
  lease_terms: Record<string, any>
  utilities_included: Record<string, any>
  pet_policy: Record<string, any>
  created_at: Date
  updated_at: Date
}

export interface Customer {
  id: string
  tenant_id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  address: Record<string, any>
  identification: Record<string, any>
  emergency_contact: Record<string, any>
  notes?: string
  status: 'active' | 'inactive' | 'blacklisted'
  created_at: Date
  updated_at: Date
}

export interface DashboardStats {
  totalProperties: number
  availableProperties: number
  totalUsers: number
  totalCustomers: number
  monthlyRevenue: number
  activeAgreements: number
}

// ============================================================================
// DATABASE INITIALIZATION
// ============================================================================

export async function testConnection() {
  try {
    console.log('Testing multi-tenant database connection...')
    const result = await sql`SELECT 1 as test`
    console.log('Database connection successful:', result.rows)
    return true
  } catch (error) {
    console.error('Database connection test failed:', error)
    throw error
  }
}

export async function initMultiTenantDatabase() {
  try {
    console.log('Starting multi-tenant database initialization...')
    
    // Test connection first
    await testConnection()
    
    // Create super_admins table
    await sql`
      CREATE TABLE IF NOT EXISTS super_admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        permissions JSONB DEFAULT '["platform_management", "tenant_management", "user_management", "system_analytics"]',
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create tenants table
    await sql`
      CREATE TABLE IF NOT EXISTS tenants (
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
      )
    `

    // Create updated users table with tenant isolation
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
        email VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manager', 'employee', 'viewer')),
        permissions JSONB DEFAULT '[]',
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending')),
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(tenant_id, email)
      )
    `

    // Create updated properties table with tenant isolation
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
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
      )
    `

    // Create customers table
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
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
      )
    `

    // Create indexes for performance
    await sql`CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_properties_tenant_id ON properties(tenant_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_customers_tenant_id ON customers(tenant_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_properties_availability ON properties(is_available)`
    await sql`CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON tenants(subdomain)`

    // Insert sample data if tables are empty
    const superAdminCount = await sql`SELECT COUNT(*) FROM super_admins`
    if (superAdminCount.rows[0].count === '0') {
      await insertSampleData()
    }

    console.log('Multi-tenant database initialized successfully')
  } catch (error) {
    console.error('Multi-tenant database initialization error:', error)
    throw error
  }
}

async function insertSampleData() {
  try {
    console.log('Inserting sample multi-tenant data...')
    
    // Insert super admin
    const hashedPassword = await bcrypt.hash('admin123', 10)
    await sql`
      INSERT INTO super_admins (email, password_hash, first_name, last_name) VALUES
      ('superadmin@rentalai.com', ${hashedPassword}, 'Super', 'Admin')
    `

    // Insert sample tenants
    const tenantResults = await sql`
      INSERT INTO tenants (name, business_type, subdomain, contact_email, status) VALUES
      ('ABC Car Rentals', 'vehicle_rental', 'abc-cars', 'admin@abccarrentals.com', 'active'),
      ('XYZ Events', 'event_rental', 'xyz-events', 'admin@xyzevents.com', 'active'),
      ('Smith Properties', 'property_rental', 'smith-props', 'admin@smithproperties.com', 'active')
      RETURNING id, name, business_type
    `

    // Insert sample users for each tenant
    const userPassword = await bcrypt.hash('password123', 10)
    for (const tenant of tenantResults.rows) {
      await sql`
        INSERT INTO users (tenant_id, email, password_hash, first_name, last_name, role, permissions) VALUES
        (${tenant.id}, ${`admin@${tenant.name.toLowerCase().replace(/\s+/g, '')}.com`}, ${userPassword}, 'Admin', 'User', 'admin', '["tenant_admin", "asset_management", "customer_management"]'),
        (${tenant.id}, ${`manager@${tenant.name.toLowerCase().replace(/\s+/g, '')}.com`}, ${userPassword}, 'Manager', 'User', 'manager', '["asset_management", "customer_management"]')
      `

      // Insert sample properties for property rental tenant
      if (tenant.business_type === 'property_rental') {
        await sql`
          INSERT INTO properties (tenant_id, title, description, property_type, address, city, state, rent_amount, bedrooms, bathrooms, is_available) VALUES
          (${tenant.id}, 'Modern Downtown Apartment', 'Beautiful 2BR apartment in downtown', 'apartment', '{"street": "123 Main St", "unit": "4A"}', 'San Francisco', 'CA', 3500, 2, 2, true),
          (${tenant.id}, 'Cozy Studio Near Campus', 'Perfect for students', 'studio', '{"street": "456 College Ave"}', 'Berkeley', 'CA', 1800, 0, 1, true),
          (${tenant.id}, 'Family House with Garden', 'Spacious family home', 'house', '{"street": "789 Oak Dr"}', 'Austin', 'TX', 2800, 4, 3, true)
        `
      }

      // Insert sample customers
      await sql`
        INSERT INTO customers (tenant_id, first_name, last_name, email, phone, status) VALUES
        (${tenant.id}, 'John', 'Doe', ${`john.doe@${tenant.name.toLowerCase().replace(/\s+/g, '')}.com`}, '(555) 123-4567', 'active'),
        (${tenant.id}, 'Jane', 'Smith', ${`jane.smith@${tenant.name.toLowerCase().replace(/\s+/g, '')}.com`}, '(555) 987-6543', 'active')
      `
    }

    console.log('Sample multi-tenant data inserted successfully')
  } catch (error) {
    console.error('Sample data insertion error:', error)
    throw error
  }
}

// ============================================================================
// SUPER ADMIN OPERATIONS
// ============================================================================

export async function authenticateSuperAdmin(email: string, password: string): Promise<SuperAdmin | null> {
  try {
    const result = await sql`
      SELECT * FROM super_admins WHERE email = ${email} AND status = 'active'
    `
    
    if (result.rows.length === 0) {
      return null
    }
    
    const superAdmin = result.rows[0] as any
    const passwordMatch = await bcrypt.compare(password, superAdmin.password_hash)
    
    if (!passwordMatch) {
      return null
    }
    
    // Update last login
    await sql`
      UPDATE super_admins SET last_login = CURRENT_TIMESTAMP WHERE id = ${superAdmin.id}
    `
    
    return {
      ...superAdmin,
      permissions: superAdmin.permissions || []
    }
  } catch (error) {
    console.error('Super admin authentication error:', error)
    throw error
  }
}

export async function getAllTenants(): Promise<Tenant[]> {
  try {
    const result = await sql`
      SELECT * FROM tenants ORDER BY created_at DESC
    `
    return result.rows as Tenant[]
  } catch (error) {
    console.error('Get all tenants error:', error)
    throw error
  }
}

export async function getTenantById(tenantId: string): Promise<Tenant | null> {
  try {
    const result = await sql`
      SELECT * FROM tenants WHERE id = ${tenantId}
    `
    return result.rows.length > 0 ? result.rows[0] as Tenant : null
  } catch (error) {
    console.error('Get tenant by ID error:', error)
    throw error
  }
}

// ============================================================================
// TENANT USER OPERATIONS
// ============================================================================

export async function authenticateTenantUser(email: string, password: string, tenantId?: string): Promise<TenantUser | null> {
  try {
    let query = sql`
      SELECT u.*, t.subdomain FROM users u 
      JOIN tenants t ON u.tenant_id = t.id
      WHERE u.email = ${email} AND u.status = 'active' AND t.status = 'active'
    `
    
    if (tenantId) {
      query = sql`
        SELECT u.*, t.subdomain FROM users u 
        JOIN tenants t ON u.tenant_id = t.id
        WHERE u.email = ${email} AND u.tenant_id = ${tenantId} AND u.status = 'active' AND t.status = 'active'
      `
    }
    
    const result = await query
    
    if (result.rows.length === 0) {
      return null
    }
    
    const user = result.rows[0] as any
    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    
    if (!passwordMatch) {
      return null
    }
    
    // Update last login
    await sql`
      UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ${user.id}
    `
    
    return {
      ...user,
      permissions: user.permissions || []
    }
  } catch (error) {
    console.error('Tenant user authentication error:', error)
    throw error
  }
}

export async function createTenantUser(userData: {
  tenant_id: string
  email: string
  password: string
  first_name: string
  last_name: string
  role: string
  permissions?: string[]
}): Promise<TenantUser> {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    
    const result = await sql`
      INSERT INTO users (tenant_id, email, password_hash, first_name, last_name, role, permissions)
      VALUES (${userData.tenant_id}, ${userData.email}, ${hashedPassword}, ${userData.first_name}, ${userData.last_name}, ${userData.role}, ${JSON.stringify(userData.permissions || [])})
      RETURNING *
    `
    
    return {
      ...result.rows[0],
      permissions: result.rows[0].permissions || []
    } as TenantUser
  } catch (error) {
    console.error('Tenant user creation error:', error)
    throw error
  }
}

// ============================================================================
// TENANT-SCOPED OPERATIONS
// ============================================================================

export async function getTenantProperties(tenantId: string): Promise<Property[]> {
  try {
    const result = await sql`
      SELECT * FROM properties WHERE tenant_id = ${tenantId} ORDER BY created_at DESC
    `
    return result.rows as Property[]
  } catch (error) {
    console.error('Get tenant properties error:', error)
    throw error
  }
}

export async function getTenantCustomers(tenantId: string): Promise<Customer[]> {
  try {
    const result = await sql`
      SELECT * FROM customers WHERE tenant_id = ${tenantId} ORDER BY created_at DESC
    `
    return result.rows as Customer[]
  } catch (error) {
    console.error('Get tenant customers error:', error)
    throw error
  }
}

export async function getTenantDashboardStats(tenantId: string): Promise<DashboardStats> {
  try {
    const [propertiesResult, availableResult, usersResult, customersResult] = await Promise.all([
      sql`SELECT COUNT(*) FROM properties WHERE tenant_id = ${tenantId}`,
      sql`SELECT COUNT(*) FROM properties WHERE tenant_id = ${tenantId} AND is_available = true`,
      sql`SELECT COUNT(*) FROM users WHERE tenant_id = ${tenantId}`,
      sql`SELECT COUNT(*) FROM customers WHERE tenant_id = ${tenantId}`
    ])
    
    return {
      totalProperties: parseInt(propertiesResult.rows[0].count),
      availableProperties: parseInt(availableResult.rows[0].count),
      totalUsers: parseInt(usersResult.rows[0].count),
      totalCustomers: parseInt(customersResult.rows[0].count),
      monthlyRevenue: 15400, // Mock value for now
      activeAgreements: 24 // Mock value for now
    }
  } catch (error) {
    console.error('Tenant dashboard stats error:', error)
    throw error
  }
}

// ============================================================================
// TENANT MANAGEMENT
// ============================================================================

export async function createTenant(tenantData: {
  name: string
  business_type: string
  subdomain: string
  contact_email: string
  contact_phone?: string
  plan_type?: string
}): Promise<Tenant> {
  try {
    const result = await sql`
      INSERT INTO tenants (name, business_type, subdomain, contact_email, contact_phone, plan_type)
      VALUES (${tenantData.name}, ${tenantData.business_type}, ${tenantData.subdomain}, ${tenantData.contact_email}, ${tenantData.contact_phone || null}, ${tenantData.plan_type || 'starter'})
      RETURNING *
    `
    
    return result.rows[0] as Tenant
  } catch (error) {
    console.error('Tenant creation error:', error)
    throw error
  }
}

export async function getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
  try {
    const result = await sql`
      SELECT * FROM tenants WHERE subdomain = ${subdomain} AND status = 'active'
    `
    return result.rows.length > 0 ? result.rows[0] as Tenant : null
  } catch (error) {
    console.error('Get tenant by subdomain error:', error)
    throw error
  }
}