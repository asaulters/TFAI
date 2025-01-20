const mailchimp = require('@mailchimp/mailchimp_marketing');
const crypto = require('crypto');
require('dotenv').config();

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX // e.g. "us9"
});

// Map categories to their respective PDF links (example)
const pdfLinks = {
  'Email Automation': process.env.EMAIL_AUTOMATION_PDF,
  'Social Media': process.env.SOCIAL_MEDIA_PDF,
  'Customer Service': process.env.CUSTOMER_SERVICE_PDF,
  'Data Entry': process.env.DATA_ENTRY_PDF,
  // Add more categories as needed
  default: process.env.DEFAULT_PDF
};

function createMd5Hash(str) {
  // Lowercase the string, then run through MD5
  return crypto.createHash('md5').update(str.toLowerCase()).digest('hex');
}

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

  // Check Mailchimp configuration
  if (!process.env.MAILCHIMP_API_KEY || 
      !process.env.MAILCHIMP_LIST_ID || 
      !process.env.MAILCHIMP_SERVER_PREFIX) {
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
    // Generate MD5 hash of email manually
    const subscriberHash = createMd5Hash(email);

    // Split category string into an array of tags
    const tags = category.split(',').map(tag => tag.trim());

    // Use PUT to create or update member in Mailchimp
    console.log('Setting list member...');
    const response = await mailchimp.lists.setListMember(
      process.env.MAILCHIMP_LIST_ID,
      subscriberHash,
      {
        // Force the user to be subscribed
        status: 'subscribed',
        status_if_new: 'subscribed',
        email_address: email,
        merge_fields: {
          FNAME: firstName
        },
        // Attach the tags (e.g., ["Marketing Automation", "Email Marketing", "Customer Engagement"])
        tags: tags
      }
    );

    console.log('Successfully set member:', response.id);
    return res.status(200).json({
      success: true,
      message: 'Successfully processed subscription',
      pdfLink: pdfLinks[category] || pdfLinks.default
    });

  } catch (err) {
    console.error('Mailchimp API Error:', {
      status: err.status,
      response: err.response?.body,
      message: err.message
    });

    // If it's a Member Exists error, user is already on the list
    if (err.status === 400 && err.response?.body?.title === 'Member Exists') {
      console.log('Member exists, returning PDF...');
      return res.status(200).json({
        success: true,
        message: 'Member exists. Returning PDF.',
        pdfLink: pdfLinks[category] || pdfLinks.default
      });
    }

    // Authentication issues
    if (err.status === 401 || err.status === 403) {
      return res.status(500).json({
        success: false,
        error: 'Authentication failed with Mailchimp',
        details: err.response?.body?.detail || err.message
      });
    }

    // Rate limiting
    if (err.status === 429) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests to Mailchimp',
        details: 'Please try again later'
      });
    }

    // For any other error, still return the PDF if possible
    console.log('Returning PDF despite error...');
    return res.status(200).json({
      success: true,
      message: 'Subscription status uncertain, but providing PDF',
      pdfLink: pdfLinks[category] || pdfLinks.default
    });
  }
};

module.exports = { addSubscriber };
