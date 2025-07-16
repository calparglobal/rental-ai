/**
 * Rental AI - Authentication Middleware
 * Protects dashboard pages and manages user sessions
 */

(function() {
    'use strict';

    // Check if user is authenticated
    function checkAuthentication() {
        const token = localStorage.getItem('rental_ai_token');
        const user = localStorage.getItem('rental_ai_user');

        // If no token or user data, redirect to login
        if (!token || !user) {
            redirectToLogin();
            return false;
        }

        try {
            const userData = JSON.parse(user);
            console.log('✅ Authenticated user:', userData);
            
            // Update UI with user info
            updateUserInterface(userData);
            
            return true;
        } catch (error) {
            console.error('❌ Invalid user data:', error);
            clearAuthData();
            redirectToLogin();
            return false;
        }
    }

    // Redirect to login page
    function redirectToLogin() {
        console.log('🔒 Redirecting to login...');
        window.location.href = 'rental-login.html';
    }

    // Clear authentication data
    function clearAuthData() {
        localStorage.removeItem('rental_ai_token');
        localStorage.removeItem('rental_ai_user');
    }

    // Update UI with authenticated user info
    function updateUserInterface(user) {
        // Update user name in sidebar/navbar
        const userElements = document.querySelectorAll('.user-name, .username, [data-user-name]');
        userElements.forEach(element => {
            element.textContent = `${user.first_name} ${user.last_name}`;
        });

        // Update user email
        const emailElements = document.querySelectorAll('.user-email, [data-user-email]');
        emailElements.forEach(element => {
            element.textContent = user.email;
        });

        // Update user role badge
        const roleElements = document.querySelectorAll('.user-role, [data-user-role]');
        roleElements.forEach(element => {
            element.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
            
            // Add role-specific styling
            element.className = element.className.replace(/badge-\w+/, '');
            if (user.role === 'owner') {
                element.classList.add('badge-primary');
            } else if (user.role === 'tenant') {
                element.classList.add('badge-success');
            } else if (user.role === 'admin') {
                element.classList.add('badge-danger');
            }
        });

        // Show/hide features based on user role
        updateRoleBasedFeatures(user.role);

        // Add user info to header if not present
        addUserInfoToHeader(user);
    }

    // Show/hide features based on user role
    function updateRoleBasedFeatures(role) {
        // Hide admin-only features for non-admins
        const adminElements = document.querySelectorAll('.admin-only, [data-role="admin"]');
        adminElements.forEach(element => {
            if (role !== 'admin') {
                element.style.display = 'none';
            }
        });

        // Hide owner-only features for non-owners
        const ownerElements = document.querySelectorAll('.owner-only, [data-role="owner"]');
        ownerElements.forEach(element => {
            if (role !== 'owner') {
                element.style.display = 'none';
            }
        });

        // Hide tenant-only features for non-tenants
        const tenantElements = document.querySelectorAll('.tenant-only, [data-role="tenant"]');
        tenantElements.forEach(element => {
            if (role !== 'tenant') {
                element.style.display = 'none';
            }
        });
    }

    // Add user info to header
    function addUserInfoToHeader(user) {
        // Find header user area
        const headerUserArea = document.querySelector('.navbar .dropdown-toggle, .header-user, .user-dropdown');
        
        if (headerUserArea && !headerUserArea.querySelector('.auth-user-info')) {
            const userInfo = document.createElement('div');
            userInfo.className = 'auth-user-info d-flex align-items-center';
            userInfo.innerHTML = `
                <div class="avatar avatar-xs mr-2">
                    <span class="avatar-title rounded-circle bg-primary">
                        ${user.first_name.charAt(0)}${user.last_name.charAt(0)}
                    </span>
                </div>
                <div class="flex-column d-none d-md-flex">
                    <span class="navbar-text small mb-0">${user.first_name} ${user.last_name}</span>
                    <span class="navbar-text text-muted small">${user.role}</span>
                </div>
            `;
            
            headerUserArea.innerHTML = '';
            headerUserArea.appendChild(userInfo);
        }

        // Add logout functionality
        addLogoutFunctionality();
    }

    // Add logout functionality
    function addLogoutFunctionality() {
        // Remove existing logout listeners
        document.removeEventListener('click', handleLogoutClick);
        
        // Add logout listener
        document.addEventListener('click', handleLogoutClick);

        // Add logout button if not present
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu && !dropdownMenu.querySelector('.logout-btn')) {
            const logoutItem = document.createElement('a');
            logoutItem.className = 'dropdown-item logout-btn';
            logoutItem.href = '#';
            logoutItem.innerHTML = '<i class="material-icons mr-2">logout</i> Logout';
            
            dropdownMenu.appendChild(document.createElement('div')).className = 'dropdown-divider';
            dropdownMenu.appendChild(logoutItem);
        }
    }

    // Handle logout clicks
    function handleLogoutClick(event) {
        if (event.target.closest('.logout-btn, [data-action="logout"]')) {
            event.preventDefault();
            logout();
        }
    }

    // Logout function
    function logout() {
        if (confirm('Are you sure you want to logout?')) {
            console.log('👋 Logging out...');
            clearAuthData();
            
            // Show logout message
            const logoutDiv = document.createElement('div');
            logoutDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                z-index: 9999;
                text-align: center;
            `;
            logoutDiv.innerHTML = `
                <div class="text-success mb-2">
                    <i class="fas fa-check-circle" style="font-size: 24px;"></i>
                </div>
                <div>Logged out successfully!</div>
            `;
            document.body.appendChild(logoutDiv);
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = 'rental-login.html';
            }, 1000);
        }
    }

    // Add authentication status indicator
    function addAuthIndicator() {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 11px;
            z-index: 9999;
            opacity: 0.8;
        `;
        indicator.innerHTML = '🔐 Authenticated';
        document.body.appendChild(indicator);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            indicator.style.opacity = '0.4';
        }, 3000);
    }

    // Validate token with server (optional)
    async function validateTokenWithServer() {
        const token = localStorage.getItem('rental_ai_token');
        if (!token) return false;

        try {
            const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3001/api' : '/api';
            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.log('❌ Token validation failed with status:', response.status);
                // Don't automatically redirect - let the calling code decide
                return false;
            }

            console.log('✅ Token validated with server');
            return true;
        } catch (error) {
            console.log('⚠️ Could not validate token with server:', error.message);
            // Don't redirect on network error, allow offline usage
            return true;
        }
    }

    // Initialize authentication check
    function initAuth() {
        console.log('🔐 Initializing authentication...');
        
        // Check if we're on a login/signup page
        const currentPage = window.location.pathname;
        if (currentPage.includes('rental-login.html') || currentPage.includes('rental-signup.html') || currentPage.includes('test-auth.html')) {
            console.log('📝 On auth page, skipping auth check');
            return;
        }

        // Check authentication
        const isAuthenticated = checkAuthentication();
        
        if (isAuthenticated) {
            addAuthIndicator();
            
            // Optionally validate with server (non-blocking)
            setTimeout(async () => {
                const isValid = await validateTokenWithServer();
                if (!isValid) {
                    console.log('⚠️ Server validation failed, but keeping local session');
                }
            }, 2000);
        } else {
            // Not authenticated - hide page content and show loading
            console.log('❌ Not authenticated, blocking page access');
            hidePageContent();
            redirectToLogin();
        }
    }

    // Hide page content while redirecting
    function hidePageContent() {
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px;">
                        <i style="font-size: 48px; color: #007bff;">🔒</i>
                    </div>
                    <h3 style="margin: 0 0 10px 0; color: #333;">Authentication Required</h3>
                    <p style="margin: 0; color: #666;">Redirecting to login...</p>
                    <div style="margin-top: 20px;">
                        <div style="
                            width: 40px;
                            height: 40px;
                            border: 4px solid #f3f3f3;
                            border-top: 4px solid #007bff;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                            margin: 0 auto;
                        "></div>
                    </div>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuth);
    } else {
        // DOM is already ready
        initAuth();
    }

    // Expose logout function globally
    window.rentalAILogout = logout;

})();