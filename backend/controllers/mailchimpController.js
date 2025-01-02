const mailchimp = require('@mailchimp/mailchimp_marketing');
require('dotenv').config();

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX
});

// Map categories to their respective PDF links
const pdfLinks = {
  'Email Automation': process.env.EMAIL_AUTOMATION_PDF,
  'Social Media': process.env.SOCIAL_MEDIA_PDF,
  'Customer Service': process.env.CUSTOMER_SERVICE_PDF,
  'Data Entry': process.env.DATA_ENTRY_PDF,
  // Add more categories as needed
  default: process.env.DEFAULT_PDF
};

const addSubscriber = async (req, res) => {
  console.log('Received subscription request:', req.body);
  
  const { firstName, email, category } = req.body;

  if (!firstName || !email) {
    console.log('Missing required fields:', { firstName, email });
    return res.status(400).json({ 
      success: false,
      error: 'Name and email are required' 
    });
  }

  // Verify Mailchimp configuration
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_LIST_ID || !process.env.MAILCHIMP_SERVER_PREFIX) {
    console.error('Missing Mailchimp configuration');
    return res.status(500).json({
      success: false,
      error: 'Mailchimp configuration is incomplete'
    });
  }

  console.log('Starting Mailchimp API call with config:', {
    server: process.env.MAILCHIMP_SERVER_PREFIX,
    listId: process.env.MAILCHIMP_LIST_ID,
    hasApiKey: !!process.env.MAILCHIMP_API_KEY
  });

  try {
    console.log('Checking if member exists...');
    try {
      const existingMember = await mailchimp.lists.getListMember(
        process.env.MAILCHIMP_LIST_ID,
        Buffer.from(email.toLowerCase()).toString('hex')
      );

      console.log('Member exists, updating tags...');
      if (existingMember) {
        // Update existing member's tags and return PDF
        await mailchimp.lists.updateListMemberTags(
          process.env.MAILCHIMP_LIST_ID,
          Buffer.from(email.toLowerCase()).toString('hex'),
          {
            tags: [{ name: category, status: 'active' }]
          }
        );

        return res.status(200).json({
          success: true,
          message: 'Subscriber already exists. Updated tags.',
          pdfLink: pdfLinks[category] || pdfLinks.default
        });
      }
    } catch (err) {
      console.log('Member lookup error:', err.status);
      // Member doesn't exist, continue with adding new member
      if (err.status !== 404) {
        throw err;
      }
    }

    console.log('Adding new member to list...');
    // Add new member to list
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName
      },
      tags: [category]
    });

    console.log('Successfully added subscriber:', response.id, 'with category:', category);

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to the mailing list',
      id: response.id,
      pdfLink: pdfLinks[category] || pdfLinks.default
    });

  } catch (error) {
    console.error('Mailchimp error:', error.response?.body || error);
    
    // Handle specific error cases
    if (error.status === 400 && error.title === 'Member Exists') {
      return res.status(400).json({
        success: false,
        error: 'This email is already subscribed',
        details: error.detail
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error subscribing to mailing list',
      details: error.message
    });
  }
};

module.exports = {
  addSubscriber
};
