const data = require('./backend/seeders/general-automations.json');

function extractTools() {
    const tools = new Set();
    
    // Process each category
    data.categories.forEach(category => {
        // Get category name (first key in object)
        const categoryName = Object.keys(category)[0];
        const automations = category[categoryName];
        
        // Process each automation
        automations.forEach(automation => {
            // Add tools from main tools array
            if (automation.tools) {
                automation.tools.forEach(tool => tools.add(tool));
            }
            
            // Add tools from steps
            if (automation.steps) {
                automation.steps.forEach(step => {
                    if (step.tools) {
                        step.tools.forEach(tool => tools.add(tool));
                    }
                });
            }
        });
    });
    
    // Convert Set to sorted array
    return Array.from(tools).sort();
}

const uniqueTools = extractTools();
console.log('Unique Tools Used:');
uniqueTools.forEach(tool => console.log(tool));
console.log(`\nTotal number of unique tools: ${uniqueTools.length}`);
