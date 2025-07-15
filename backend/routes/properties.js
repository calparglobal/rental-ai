const express = require('express');
const router = express.Router();

// GET /api/properties - Get all available properties
router.get('/', async (req, res) => {
    try {
        const { city, type, min_price, max_price, bedrooms } = req.query;
        
        let sql = `
            SELECT p.*, u.first_name as owner_first_name, u.last_name as owner_last_name
            FROM properties p
            JOIN users u ON p.owner_id = u.id
            WHERE p.is_available = 1
        `;
        
        const params = [];
        
        // Add filters
        if (city) {
            sql += ' AND LOWER(p.city) LIKE LOWER(?)';
            params.push(`%${city}%`);
        }
        
        if (type) {
            sql += ' AND p.property_type = ?';
            params.push(type);
        }
        
        if (min_price) {
            sql += ' AND p.rent_amount >= ?';
            params.push(parseFloat(min_price));
        }
        
        if (max_price) {
            sql += ' AND p.rent_amount <= ?';
            params.push(parseFloat(max_price));
        }
        
        if (bedrooms) {
            sql += ' AND p.bedrooms = ?';
            params.push(parseInt(bedrooms));
        }
        
        sql += ' ORDER BY p.created_at DESC';
        
        const properties = await req.db.all(sql, params);
        
        // Parse JSON fields
        const formattedProperties = properties.map(property => ({
            ...property,
            amenities: property.amenities ? JSON.parse(property.amenities) : [],
            utilities_included: property.utilities_included ? JSON.parse(property.utilities_included) : [],
            images: property.images ? JSON.parse(property.images) : []
        }));
        
        res.json(formattedProperties);
    } catch (error) {
        console.error('Properties fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

// GET /api/properties/:id - Get single property
router.get('/:id', async (req, res) => {
    try {
        const property = await req.db.getPropertyById(req.params.id);
        
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        // Parse JSON fields
        const formattedProperty = {
            ...property,
            amenities: property.amenities ? JSON.parse(property.amenities) : [],
            utilities_included: property.utilities_included ? JSON.parse(property.utilities_included) : [],
            images: property.images ? JSON.parse(property.images) : []
        };
        
        res.json(formattedProperty);
    } catch (error) {
        console.error('Property fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch property' });
    }
});

// POST /api/properties - Create new property
router.post('/', async (req, res) => {
    try {
        const propertyData = req.body;
        
        // Validation
        if (!propertyData.title || !propertyData.rent_amount || !propertyData.address) {
            return res.status(400).json({ error: 'Missing required fields: title, rent_amount, address' });
        }
        
        const result = await req.db.createProperty(propertyData);
        
        // Fetch the created property
        const newProperty = await req.db.getPropertyById(result.id);
        
        res.status(201).json({
            message: 'Property created successfully',
            property: newProperty
        });
    } catch (error) {
        console.error('Property creation error:', error);
        res.status(500).json({ error: 'Failed to create property' });
    }
});

// PUT /api/properties/:id - Update property
router.put('/:id', async (req, res) => {
    try {
        const propertyId = req.params.id;
        const updates = req.body;
        
        // Check if property exists
        const existingProperty = await req.db.getPropertyById(propertyId);
        if (!existingProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        // Build update query dynamically
        const updateFields = [];
        const params = [];
        
        Object.keys(updates).forEach(key => {
            if (key !== 'id') {
                updateFields.push(`${key} = ?`);
                if (key === 'amenities' || key === 'utilities_included') {
                    params.push(JSON.stringify(updates[key]));
                } else {
                    params.push(updates[key]);
                }
            }
        });
        
        if (updateFields.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }
        
        updateFields.push('updated_at = CURRENT_TIMESTAMP');
        params.push(propertyId);
        
        const sql = `UPDATE properties SET ${updateFields.join(', ')} WHERE id = ?`;
        await req.db.run(sql, params);
        
        // Fetch updated property
        const updatedProperty = await req.db.getPropertyById(propertyId);
        
        res.json({
            message: 'Property updated successfully',
            property: updatedProperty
        });
    } catch (error) {
        console.error('Property update error:', error);
        res.status(500).json({ error: 'Failed to update property' });
    }
});

// DELETE /api/properties/:id - Delete property
router.delete('/:id', async (req, res) => {
    try {
        const propertyId = req.params.id;
        
        // Check if property exists
        const existingProperty = await req.db.getPropertyById(propertyId);
        if (!existingProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        await req.db.run('DELETE FROM properties WHERE id = ?', [propertyId]);
        
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Property deletion error:', error);
        res.status(500).json({ error: 'Failed to delete property' });
    }
});

module.exports = router;