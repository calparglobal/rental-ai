import jwt from 'jsonwebtoken'

// JWT Payload interfaces
export interface SuperAdminJWTPayload {
  user_id: number
  email: string
  user_type: 'super_admin'
  permissions: string[]
  exp: number
  iat: number
}

export interface TenantUserJWTPayload {
  user_id: number
  tenant_id: number
  email: string
  user_type: 'tenant_user'
  role: string
  permissions: string[]
  exp: number
  iat: number
}

export type JWTPayload = SuperAdminJWTPayload | TenantUserJWTPayload

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'rental-ai-jwt-secret-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'

// Token Generation
export function generateSuperAdminToken(payload: {
  user_id: number
  email: string
  permissions: string[]
}): string {
  const tokenPayload: Omit<SuperAdminJWTPayload, 'exp' | 'iat'> = {
    user_id: payload.user_id,
    email: payload.email,
    user_type: 'super_admin',
    permissions: payload.permissions
  }

  return jwt.sign(tokenPayload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'rental-ai-platform',
    audience: 'super-admin'
  })
}

export function generateTenantUserToken(payload: {
  user_id: number
  tenant_id: number
  email: string
  role: string
  permissions: string[]
}): string {
  const tokenPayload: Omit<TenantUserJWTPayload, 'exp' | 'iat'> = {
    user_id: payload.user_id,
    tenant_id: payload.tenant_id,
    email: payload.email,
    user_type: 'tenant_user',
    role: payload.role,
    permissions: payload.permissions
  }

  return jwt.sign(tokenPayload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'rental-ai-platform',
    audience: 'tenant-user'
  })
}

// Token Verification
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Token Extraction from Request
export function extractTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) return null

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader
  return token
}

// Permission Checking
export function hasPermission(payload: JWTPayload, permission: string): boolean {
  return payload.permissions.includes(permission) || payload.permissions.includes('*')
}

export function isSuperAdmin(payload: JWTPayload): payload is SuperAdminJWTPayload {
  return payload.user_type === 'super_admin'
}

export function isTenantUser(payload: JWTPayload): payload is TenantUserJWTPayload {
  return payload.user_type === 'tenant_user'
}

// Tenant Context Validation
export function validateTenantAccess(payload: JWTPayload, requestedTenantId: number): boolean {
  // Super admins can access any tenant
  if (isSuperAdmin(payload)) {
    return true
  }

  // Tenant users can only access their own tenant
  if (isTenantUser(payload)) {
    return payload.tenant_id === requestedTenantId
  }

  return false
}

// Role-based Access Control
export const PERMISSIONS = {
  // Super Admin Permissions
  PLATFORM_MANAGEMENT: 'platform_management',
  TENANT_MANAGEMENT: 'tenant_management',
  USER_MANAGEMENT: 'user_management',
  SYSTEM_ANALYTICS: 'system_analytics',
  SUPPORT_ACCESS: 'support_access',

  // Tenant User Permissions
  TENANT_ADMIN: 'tenant_admin',
  ASSET_MANAGEMENT: 'asset_management',
  CUSTOMER_MANAGEMENT: 'customer_management',
  AGREEMENT_MANAGEMENT: 'agreement_management',
  FINANCIAL_MANAGEMENT: 'financial_management',
  REPORTING: 'reporting',
  USER_INVITE: 'user_invite',

  // General Permissions
  READ_ONLY: 'read_only',
  WRITE_ACCESS: 'write_access',
  DELETE_ACCESS: 'delete_access'
} as const

export const ROLE_PERMISSIONS = {
  // Super Admin Roles
  super_admin: [
    PERMISSIONS.PLATFORM_MANAGEMENT,
    PERMISSIONS.TENANT_MANAGEMENT,
    PERMISSIONS.USER_MANAGEMENT,
    PERMISSIONS.SYSTEM_ANALYTICS,
    PERMISSIONS.SUPPORT_ACCESS
  ],

  // Tenant User Roles
  admin: [
    PERMISSIONS.TENANT_ADMIN,
    PERMISSIONS.ASSET_MANAGEMENT,
    PERMISSIONS.CUSTOMER_MANAGEMENT,
    PERMISSIONS.AGREEMENT_MANAGEMENT,
    PERMISSIONS.FINANCIAL_MANAGEMENT,
    PERMISSIONS.REPORTING,
    PERMISSIONS.USER_INVITE,
    PERMISSIONS.WRITE_ACCESS,
    PERMISSIONS.DELETE_ACCESS
  ],
  
  manager: [
    PERMISSIONS.ASSET_MANAGEMENT,
    PERMISSIONS.CUSTOMER_MANAGEMENT,
    PERMISSIONS.AGREEMENT_MANAGEMENT,
    PERMISSIONS.FINANCIAL_MANAGEMENT,
    PERMISSIONS.REPORTING,
    PERMISSIONS.WRITE_ACCESS
  ],
  
  employee: [
    PERMISSIONS.ASSET_MANAGEMENT,
    PERMISSIONS.CUSTOMER_MANAGEMENT,
    PERMISSIONS.AGREEMENT_MANAGEMENT,
    PERMISSIONS.WRITE_ACCESS
  ],
  
  viewer: [
    PERMISSIONS.READ_ONLY
  ]
} as const

export function getRolePermissions(role: string): string[] {
  return ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || [PERMISSIONS.READ_ONLY]
}