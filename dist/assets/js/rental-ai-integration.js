/**
 * Rental AI - Backend Integration
 * Connects the dashboard to real database data
 */

(function() {
    'use strict';

    const API_BASE_URL = 'http://localhost:3001/api';

    // Utility function for API calls
    async function apiCall(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API call failed for ${endpoint}:`, error);
            return null;
        }
    }

    // Update dashboard statistics
    async function updateDashboardStats() {
        const stats = await apiCall('/dashboard/stats');
        if (!stats) return;

        console.log('📊 Dashboard Stats:', stats);

        // Update the dashboard cards with real data
        updateStatCard('.js-stats-properties', stats.totalProperties, 'Total Properties');
        updateStatCard('.js-stats-available', stats.availableProperties, 'Available Properties');
        updateStatCard('.js-stats-users', stats.totalUsers, 'Total Users');
        updateStatCard('.js-stats-leases', stats.activeLeases, 'Active Leases');
        updateStatCard('.js-stats-revenue', `$${stats.monthlyRevenue}`, 'Monthly Revenue');
    }

    // Update individual stat cards
    function updateStatCard(selector, value, label) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element) {
                element.textContent = value;
                // Also try to find nearby label element
                const labelElement = element.parentElement?.querySelector('.card-title, .text-muted, h6');
                if (labelElement && labelElement.textContent.includes('$') || labelElement.textContent.includes('Total')) {
                    labelElement.textContent = label;
                }
            }
        });

        // Also try to update by looking for text content patterns
        const allStatsElements = document.querySelectorAll('.card-body h2, .card-body .h2, .stats-chart + h2, .h1, h1');
        allStatsElements.forEach(element => {
            // Look for elements that seem to be stat values (numbers)
            if (element.textContent.match(/^\$?\d+\.?\d*[km]?$/)) {
                const card = element.closest('.card');
                if (card && card.querySelector('.card-title, h6')) {
                    const title = card.querySelector('.card-title, h6').textContent;
                    if (title.toLowerCase().includes('properties') && label.includes('Properties')) {
                        element.textContent = value;
                    } else if (title.toLowerCase().includes('users') && label.includes('Users')) {
                        element.textContent = value;
                    } else if (title.toLowerCase().includes('revenue') && label.includes('Revenue')) {
                        element.textContent = value;
                    }
                }
            }
        });
    }

    // Load and display real properties
    async function loadProperties() {
        const properties = await apiCall('/properties');
        if (!properties) return;

        console.log('🏠 Properties loaded:', properties.length);
        
        // Update property listings in the dashboard
        updatePropertyListings(properties);
        
        // Update charts with property data
        updatePropertyCharts(properties);
    }

    // Update property listings in the UI
    function updatePropertyListings(properties) {
        // Find property listing containers
        const listContainers = document.querySelectorAll('.list-group, .table tbody, .property-list');
        
        if (listContainers.length > 0) {
            listContainers.forEach(container => {
                // Clear existing content
                container.innerHTML = '';
                
                // Add real properties
                properties.slice(0, 5).forEach(property => {
                    const item = createPropertyListItem(property);
                    container.appendChild(item);
                });
            });
        }

        // Update any property cards
        updatePropertyCards(properties);
    }

    // Create property list item
    function createPropertyListItem(property) {
        const item = document.createElement('div');
        item.className = 'list-group-item d-flex align-items-center';
        item.innerHTML = `
            <div class="flex">
                <div class="h6 mb-0">${property.title}</div>
                <div class="text-muted">${property.city}, ${property.state}</div>
            </div>
            <div class="ml-auto">
                <div class="text-right">
                    <div class="text-success font-weight-bold">$${property.rent_amount}/mo</div>
                    <div class="text-muted small">${property.bedrooms}br, ${property.bathrooms}ba</div>
                </div>
            </div>
        `;
        return item;
    }

    // Update property cards in dashboard
    function updatePropertyCards(properties) {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            if (index < properties.length && card.querySelector('.card-title, h6')) {
                const property = properties[index];
                const title = card.querySelector('.card-title, h6');
                const body = card.querySelector('.card-text, p');
                
                if (title) title.textContent = property.title;
                if (body) body.textContent = `${property.city}, ${property.state} • $${property.rent_amount}/month`;
            }
        });
    }

    // Update charts with real property data
    function updatePropertyCharts(properties) {
        // Property distribution by type
        const typeDistribution = {};
        properties.forEach(prop => {
            typeDistribution[prop.property_type] = (typeDistribution[prop.property_type] || 0) + 1;
        });

        // Price ranges
        const priceRanges = {
            'Under $2000': 0,
            '$2000-$3000': 0,
            '$3000-$4000': 0,
            'Over $4000': 0
        };

        properties.forEach(prop => {
            const price = parseFloat(prop.rent_amount);
            if (price < 2000) priceRanges['Under $2000']++;
            else if (price < 3000) priceRanges['$2000-$3000']++;
            else if (price < 4000) priceRanges['$3000-$4000']++;
            else priceRanges['Over $4000']++;
        });

        console.log('📈 Property Type Distribution:', typeDistribution);
        console.log('💰 Price Range Distribution:', priceRanges);

        // Update existing doughnut charts with property data
        updateDoughnutCharts(typeDistribution, priceRanges);
    }

    // Update doughnut charts
    function updateDoughnutCharts(typeDistribution, priceRanges) {
        // Try to find and update existing Chart.js instances
        if (window.Chart) {
            Chart.helpers.each(Chart.instances, function(instance) {
                if (instance.chart.config.type === 'doughnut') {
                    // Update with property type data
                    instance.chart.data.labels = Object.keys(typeDistribution);
                    instance.chart.data.datasets[0].data = Object.values(typeDistribution);
                    instance.chart.update();
                }
            });
        }
    }

    // Add real-time status indicator
    function addStatusIndicator() {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        indicator.innerHTML = '🟢 Live Data Connected';
        document.body.appendChild(indicator);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            indicator.style.opacity = '0.7';
            indicator.innerHTML = '🔄 Live';
        }, 3000);
    }

    // Initialize real-time updates
    function startRealTimeUpdates() {
        // Update every 30 seconds
        setInterval(async () => {
            await updateDashboardStats();
            console.log('🔄 Dashboard updated with fresh data');
        }, 30000);
    }

    // Test API connectivity
    async function testApiConnection() {
        const health = await apiCall('/health');
        if (health) {
            console.log('✅ API Health Check:', health);
            return true;
        } else {
            console.error('❌ API connection failed');
            showApiError();
            return false;
        }
    }

    // Show API error message
    function showApiError() {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 9999;
            font-size: 14px;
        `;
        errorDiv.innerHTML = '⚠️ Backend API not connected. Using demo data.';
        document.body.appendChild(errorDiv);
    }

    // Main initialization function
    async function initRentalAI() {
        console.log('🚀 Initializing Rental AI Integration...');
        
        // Test API connection first
        const apiConnected = await testApiConnection();
        
        if (apiConnected) {
            // Load real data
            await updateDashboardStats();
            await loadProperties();
            
            // Add status indicator
            addStatusIndicator();
            
            // Start real-time updates
            startRealTimeUpdates();
            
            console.log('✅ Rental AI Integration complete!');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRentalAI);
    } else {
        // DOM is already ready
        setTimeout(initRentalAI, 1000); // Wait for other scripts to load
    }

})();