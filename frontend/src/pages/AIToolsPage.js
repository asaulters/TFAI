import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ToolCard from '../components/tools/ToolCard';
import ToolModal from '../components/tools/ToolModal';
import './AIToolsPage.css';

const AIToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [searchParams] = useSearchParams();

  const tools = useMemo(() => [
    {
      name: 'Zapier',
      description: 'Connect your apps and automate workflows',
      category: 'Automation Platform',
      icon: '/icons/zapier.png', // You'll need to add these icons to your public folder
      details: {
        overview: 'Zapier is a web automation tool that connects your favorite apps and automates workflows.',
        features: [
          'Connect 5000+ apps',
          'No-code automation builder',
          'Multi-step workflows (Zaps)',
          'Automated tasks',
          'Custom integrations'
        ],
        useCases: [
          'Email marketing automation',
          'Lead management',
          'Data synchronization',
          'Document creation',
          'Social media management'
        ],
        pricing: {
          free: 'Free plan: 100 tasks/month',
          starter: 'Starter: $19.99/month',
          professional: 'Professional: $49/month',
          team: 'Team: $299/month'
        },
        pros: [
          'Easy to use interface',
          'Wide range of integrations',
          'No coding required',
          'Reliable automation'
        ],
        cons: [
          'Can be expensive for high volume',
          'Limited customization in free plan',
          'Some complex setups require technical knowledge'
        ]
      }
    },
    {
      name: 'Make',
      description: 'Visual automation platform for connecting apps and automating workflows',
      category: 'Automation Platform',
      icon: '/icons/make.png',
      details: {
        overview: 'Make (formerly Integromat) is a powerful automation platform that lets you connect apps and automate workflows in minutes.',
        features: [
          'Visual workflow builder',
          'Thousands of app integrations',
          'Real-time execution',
          'Advanced scheduling',
          'Error handling'
        ],
        useCases: [
          'Data synchronization',
          'Process automation',
          'API integrations',
          'Document processing',
          'Custom workflows'
        ],
        pricing: {
          free: 'Free: 1,000 operations/month',
          basic: 'Basic: $9/month',
          standard: 'Standard: $16/month',
          pro: 'Pro: $29/month'
        },
        pros: [
          'Visual workflow builder',
          'Powerful features',
          'Large app directory',
          'Detailed logging',
          'Good value for money'
        ],
        cons: [
          'Learning curve for complex scenarios',
          'Limited operations in free plan',
          'Some features only in paid plans'
        ],
        registrationUrl: 'https://www.make.com/en/register?pc=taskflowai'
      }
    },
    {
      name: 'MidJourney AI',
      description: 'Advanced AI image generation and manipulation tool',
      category: 'AI Image Generation',
      icon: '/icons/midjourney.png',
      details: {
        overview: 'MidJourney is an AI-powered tool that generates high-quality images from text descriptions, ideal for creative and professional visualization.',
        features: [
          'Text-to-image generation',
          'Style customization',
          'High-resolution output',
          'Artistic variations',
          'Discord integration'
        ],
        useCases: [
          'Concept art creation',
          'Marketing visuals',
          'Product visualization',
          'Brand asset generation',
          'Creative inspiration'
        ],
        pricing: {
          basic: 'Basic: $10/month',
          standard: 'Standard: $30/month',
          pro: 'Pro: $60/month',
          mega: 'Mega: $120/month'
        },
        pros: [
          'High-quality output',
          'Versatile style options',
          'Active community',
          'Regular updates',
          'Discord integration'
        ],
        cons: [
          'Learning curve for prompts',
          'Queue times during peak hours',
          'Limited direct editing',
          'Requires Discord usage'
        ]
      }
    },
    {
      name: 'Airtable',
      description: 'Flexible database and spreadsheet hybrid platform',
      category: 'Database & Project Management',
      icon: '/icons/airtable.png',
      details: {
        overview: 'Airtable is a cloud collaboration service that combines the functionality of a database with the familiarity of a spreadsheet.',
        features: [
          'Custom views (Grid, Kanban, Calendar)',
          'Rich field types',
          'Automation capabilities',
          'API access',
          'Integration options'
        ],
        useCases: [
          'Project management',
          'Content calendar',
          'Inventory tracking',
          'CRM',
          'Event planning'
        ],
        pricing: {
          free: 'Free: Basic features',
          plus: 'Plus: $10/user/month',
          pro: 'Pro: $20/user/month',
          enterprise: 'Enterprise: Custom pricing'
        },
        pros: [
          'Highly customizable',
          'User-friendly interface',
          'Powerful automation',
          'Multiple view options',
          'Rich integration ecosystem'
        ],
        cons: [
          'Can be expensive for larger teams',
          'Learning curve for advanced features',
          'Limited record counts in lower tiers'
        ]
      }
    },
    {
      name: 'Twilio',
      description: 'Cloud communications platform for messaging, voice, and video',
      category: 'Communications API',
      icon: '/icons/twilio.png',
      details: {
        overview: 'Twilio enables businesses to add communication capabilities like voice, video, and messaging to their applications.',
        features: [
          'SMS/MMS capabilities',
          'Voice calling',
          'Video conferencing',
          'WhatsApp integration',
          'Email API'
        ],
        useCases: [
          'Customer notifications',
          'Two-factor authentication',
          'Appointment reminders',
          'Customer support',
          'Marketing campaigns'
        ],
        pricing: {
          payAsYouGo: 'Pay-as-you-go pricing',
          sms: 'SMS: From $0.0075/message',
          voice: 'Voice: From $0.0085/minute',
          whatsapp: 'WhatsApp: Custom pricing'
        },
        pros: [
          'Reliable infrastructure',
          'Extensive documentation',
          'Global reach',
          'Flexible API',
          'Strong security'
        ],
        cons: [
          'Complex pricing structure',
          'Technical expertise required',
          'Can be expensive at scale'
        ]
      }
    },
    {
      name: 'Mailchimp',
      description: 'Email marketing and automation platform',
      category: 'Marketing Automation',
      icon: '/icons/mailchimp.png',
      details: {
        overview: 'Mailchimp is an all-in-one marketing platform that helps businesses manage and talk to their customers, website visitors, and other interested parties.',
        features: [
          'Email campaign builder',
          'Marketing automation',
          'Landing page creator',
          'Customer journey builder',
          'Analytics and reporting'
        ],
        useCases: [
          'Email newsletters',
          'Automated marketing campaigns',
          'Customer segmentation',
          'A/B testing',
          'Lead generation'
        ],
        pricing: {
          free: 'Free: Up to 500 contacts',
          essentials: 'Essentials: From $11/month',
          standard: 'Standard: From $17/month',
          premium: 'Premium: From $299/month'
        },
        pros: [
          'User-friendly interface',
          'Comprehensive analytics',
          'Strong automation features',
          'Integration capabilities',
          'Free plan available'
        ],
        cons: [
          'Can get expensive with large lists',
          'Limited template customization',
          'Complex pricing structure'
        ]
      }
    },
    {
      name: 'Asana',
      description: 'Project and task management platform',
      category: 'Project Management',
      icon: '/icons/asana.png',
      details: {
        overview: 'Asana is a web and mobile application designed to help teams organize, track, and manage their work.',
        features: [
          'Task management',
          'Project timelines',
          'Team collaboration',
          'Custom workflows',
          'Integration options'
        ],
        useCases: [
          'Project tracking',
          'Team coordination',
          'Work requests',
          'Process management',
          'Goal tracking'
        ],
        pricing: {
          free: 'Basic: Free for up to 15 users',
          premium: 'Premium: $10.99/user/month',
          business: 'Business: $24.99/user/month',
          enterprise: 'Enterprise: Custom pricing'
        },
        pros: [
          'Intuitive interface',
          'Multiple project views',
          'Strong collaboration features',
          'Customizable workflows',
          'Mobile app available'
        ],
        cons: [
          'Can be overwhelming for small teams',
          'Limited free plan features',
          'Learning curve for advanced features'
        ]
      }
    },
    {
      name: 'SurveyMonkey',
      description: 'Online survey and feedback platform',
      category: 'Customer Feedback',
      icon: '/icons/surveymonkey.png',
      details: {
        overview: 'SurveyMonkey is an online survey development cloud-based software service that helps create, send and analyze surveys.',
        features: [
          'Survey builder',
          'Template library',
          'Skip logic',
          'Data analysis',
          'Integration capabilities'
        ],
        useCases: [
          'Customer feedback',
          'Market research',
          'Employee engagement',
          'Event planning',
          'Academic research'
        ],
        pricing: {
          basic: 'Basic: Free',
          advantage: 'Advantage: $32/month',
          premier: 'Premier: $99/month',
          enterprise: 'Enterprise: Custom pricing'
        },
        pros: [
          'Easy to use',
          'Professional templates',
          'Advanced logic options',
          'Comprehensive analytics',
          'Multiple language support'
        ],
        cons: [
          'Limited features in free plan',
          'Relatively expensive',
          'Basic customization options'
        ]
      }
    },
    {
      name: 'Typeform',
      description: 'Conversational forms and surveys platform',
      category: 'Forms & Surveys',
      icon: '/icons/typeform.png',
      details: {
        overview: 'Typeform creates conversational forms and surveys that engage users through a dynamic, one-question-at-a-time interface.',
        features: [
          'Conversational interface',
          'Logic jumps',
          'Custom design options',
          'Hidden fields',
          'API integration'
        ],
        useCases: [
          'Lead generation',
          'Customer feedback',
          'Job applications',
          'Quiz creation',
          'Registration forms'
        ],
        pricing: {
          free: 'Basic: Free',
          plus: 'Plus: $25/month',
          business: 'Business: $50/month',
          enterprise: 'Enterprise: Custom pricing'
        },
        pros: [
          'Beautiful design',
          'Engaging user experience',
          'Easy to use',
          'Mobile responsive',
          'Strong integration options'
        ],
        cons: [
          'Limited responses in free plan',
          'Can be expensive for high volume',
          'Limited export options in basic plans'
        ]
      }
    },
    {
      name: 'JotForm',
      description: 'Online form builder and data collection platform',
      category: 'Forms & Data Collection',
      icon: '/icons/jotform.png',
      details: {
        overview: 'JotForm is a form builder that helps you create and publish online forms, collect responses, and analyze data.',
        features: [
          'Drag-and-drop form builder',
          'Payment integration',
          'Form templates',
          'Mobile forms',
          'HIPAA compliance'
        ],
        useCases: [
          'Contact forms',
          'Payment collection',
          'Registration forms',
          'Surveys',
          'Application forms'
        ],
        pricing: {
          starter: 'Starter: Free',
          bronze: 'Bronze: $29/month',
          silver: 'Silver: $39/month',
          gold: 'Gold: $99/month'
        },
        pros: [
          'Easy to use',
          'Extensive template library',
          'Strong integration options',
          'Payment processing',
          'Mobile-friendly'
        ],
        cons: [
          'Form submission limits',
          'Storage limits in lower tiers',
          'Some features only in paid plans'
        ]
      }
    },
    {
      name: 'Slack',
      description: 'Business communication and collaboration platform',
      category: 'Team Communication',
      icon: '/icons/slack.png',
      details: {
        overview: 'Slack is a messaging app for business that connects people to the information they need by bringing people together to work as one unified team.',
        features: [
          'Channel-based messaging',
          'File sharing',
          'App integration',
          'Voice and video calls',
          'Search functionality'
        ],
        useCases: [
          'Team communication',
          'Project coordination',
          'Remote work',
          'Client collaboration',
          'Company announcements'
        ],
        pricing: {
          free: 'Free: Basic features',
          pro: 'Pro: $7.25/user/month',
          business: 'Business+: $12.50/user/month',
          enterprise: 'Enterprise Grid: Custom pricing'
        },
        pros: [
          'Intuitive interface',
          'Powerful search',
          'Rich integration options',
          'Good file sharing',
          'Cross-platform support'
        ],
        cons: [
          'Can be distracting',
          'Message history limits in free plan',
          'Can get expensive for larger teams'
        ]
      }
    },
    {
      name: 'ChatGPT',
      description: 'AI-powered language model for conversation and content creation',
      category: 'AI Assistant',
      icon: '/icons/chatgpt.png',
      details: {
        overview: 'ChatGPT is an AI language model that can engage in conversations, answer questions, and assist with various text-based tasks.',
        features: [
          'Natural language processing',
          'Content generation',
          'Question answering',
          'Code assistance',
          'Language translation'
        ],
        useCases: [
          'Content creation',
          'Customer support',
          'Research assistance',
          'Programming help',
          'Learning and education'
        ],
        pricing: {
          free: 'Free: Basic access',
          plus: 'Plus: $20/month',
          enterprise: 'Enterprise: Custom pricing'
        },
        pros: [
          'Versatile capabilities',
          'Quick responses',
          'Available 24/7',
          'Handles complex queries',
          'Regular updates'
        ],
        cons: [
          'May provide incorrect information',
          'Limited context window',
          'No real-time information'
        ]
      }
    },
    {
      name: 'Canva',
      description: 'Online graphic design and publishing tool',
      category: 'Design',
      icon: '/icons/canva.png',
      details: {
        overview: 'Canva is a graphic design platform that allows users to create social media graphics, presentations, posters, and other visual content.',
        features: [
          'Drag-and-drop editor',
          'Template library',
          'Brand kit',
          'Collaboration tools',
          'Content planner'
        ],
        useCases: [
          'Social media graphics',
          'Marketing materials',
          'Presentations',
          'Business cards',
          'Infographics'
        ],
        pricing: {
          free: 'Free: Basic features',
          pro: 'Pro: $12.99/month',
          teams: 'Teams: $14.99/user/month',
          enterprise: 'Enterprise: Custom pricing'
        },
        pros: [
          'User-friendly interface',
          'Extensive template library',
          'Collaboration features',
          'Mobile app available',
          'Regular new features'
        ],
        cons: [
          'Limited customization in free version',
          'Some premium features locked',
          'Download quality restrictions'
        ]
      }
    },
    {
      name: 'Buffer',
      description: 'Social media management and scheduling platform',
      category: 'Social Media Management',
      icon: '/icons/buffer.png',
      details: {
        overview: 'Buffer is a software application designed to manage social media accounts by providing the means to schedule posts across multiple social media platforms.',
        features: [
          'Post scheduling',
          'Analytics',
          'Team collaboration',
          'Instagram planning',
          'Custom reports'
        ],
        useCases: [
          'Social media management',
          'Content scheduling',
          'Performance tracking',
          'Team coordination',
          'Campaign planning'
        ],
        pricing: {
          free: 'Free: Up to 3 channels',
          essentials: 'Essentials: $5/channel/month',
          team: 'Team: $10/channel/month',
          agency: 'Agency: Custom pricing'
        },
        pros: [
          'Easy to use',
          'Clean interface',
          'Good analytics',
          'Reliable scheduling',
          'Mobile app available'
        ],
        cons: [
          'Limited free plan',
          'Basic analytics',
          'No bulk uploading in lower tiers'
        ]
      }
    },
    {
      name: 'Calendly',
      description: 'Automated scheduling and appointment management',
      category: 'Scheduling',
      icon: '/icons/calendly.png',
      details: {
        overview: 'Calendly is an automated scheduling software that makes it easy to schedule meetings without back-and-forth emails.',
        features: [
          'Automated scheduling',
          'Calendar integration',
          'Team scheduling',
          'Meeting polls',
          'Workflow automation'
        ],
        useCases: [
          'Meeting scheduling',
          'Client appointments',
          'Team coordination',
          'Interview scheduling',
          'Event registration'
        ],
        pricing: {
          basic: 'Basic: Free',
          essentials: 'Essentials: $8/user/month',
          professional: 'Professional: $12/user/month',
          enterprise: 'Enterprise: Custom pricing'
        },
        pros: [
          'Easy to use',
          'Clean interface',
          'Multiple calendar integration',
          'Automated notifications',
          'Customizable availability'
        ],
        cons: [
          'Limited features in free plan',
          'No SMS notifications in basic plans',
          'Limited customization options'
        ]
      }
    },
    {
      name: 'Trello',
      description: 'Visual project management and collaboration tool',
      category: 'Project Management',
      icon: '/icons/trello.png',
      details: {
        overview: 'Trello is a collaboration tool that organizes your projects into boards, lists, and cards to help you manage and prioritize your work.',
        features: [
          'Kanban boards',
          'Task management',
          'Team collaboration',
          'Power-Ups integration',
          'Automation'
        ],
        useCases: [
          'Project tracking',
          'Task management',
          'Team collaboration',
          'Workflow management',
          'Personal organization'
        ],
        pricing: {
          free: 'Free: Basic features',
          standard: 'Standard: $5/user/month',
          premium: 'Premium: $10/user/month',
          enterprise: 'Enterprise: Custom pricing'
        },
        pros: [
          'Intuitive interface',
          'Visual organization',
          'Easy collaboration',
          'Mobile friendly',
          'Good integration options'
        ],
        cons: [
          'Limited features in free version',
          'Can get cluttered with many cards',
          'Basic reporting features'
        ]
      }
    }
  ], []); // Empty dependency array since tools are static

  useEffect(() => {
    // Get the tool parameter from URL
    const toolParam = searchParams.get('tool');
    if (toolParam) {
      // Find the tool in the tools array
      const tool = tools.find(t => t.name.toLowerCase() === toolParam.toLowerCase());
      if (tool) {
        setSelectedTool(tool);
        // Find and scroll to the tool card
        const element = document.getElementById(`tool-${toolParam.toLowerCase()}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [searchParams, tools]); // Added tools to dependency array

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <div className="ai-tools-page">
      <section className="hero">
        <div className="container">
          <h1>AI & Automation Tools</h1>
          <p>Discover the best tools to automate your business processes</p>
        </div>
      </section>

      <section className="tools-grid">
        <div className="container">
          <div className="tools-wrapper">
            {tools.map((tool, index) => (
              <div
                id={`tool-${tool.name.toLowerCase()}`}
                key={index}
              >
                <ToolCard
                  tool={tool}
                  onClick={() => handleToolClick(tool)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedTool && (
        <ToolModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
};

export default AIToolsPage;
