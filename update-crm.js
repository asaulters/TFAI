const fs = require('fs');

// Read the data file
const filePath = './backend/seeders/data.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Function to update CRM references to HubSpot
function updateCRMReferences(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => {
            if (typeof item === 'string') {
                // Check for various CRM patterns
                if (
                    item === 'CRM' || 
                    item === 'CRM System' ||
                    /CRM\s+System/i.test(item) ||
                    /CRM\s+Tools/i.test(item) ||
                    item.includes('CRM')
                ) {
                    return 'HubSpot';
                }
                return item;
            }
            return updateCRMReferences(item);
        });
    } else if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
            obj[key] = updateCRMReferences(obj[key]);
        });
    }
    return obj;
}

// Process the data
const updatedData = updateCRMReferences(data);

// Write the updated data back to file
fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

console.log('Successfully updated CRM references to HubSpot');
