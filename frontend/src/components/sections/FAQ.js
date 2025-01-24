import React, { useState, useId } from 'react';
import { Helmet } from 'react-helmet';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqId = useId();

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is automation in simple terms?",
      answer: "Automation is when you use software, apps, or AI to do tasks that you'd normally do yourself, such as sending emails or entering data. It's about creating \"if this, then that\" rules so a computer can handle repetitive or time-consuming work for you."
    },
    {
      question: "Why should I care about automation for my small business?",
      answer: "Automation saves time, cuts down on manual errors, and can help you scale without hiring lots of extra staff. Instead of spending hours on routine tasks, you can focus on more strategic, creative, or customer-facing activities. This can lead to faster growth, happier customers, and a healthier bottom line."
    },
    {
      question: "I'm not very tech-savvy—can I still use automation?",
      answer: "Absolutely. Many automation tools offer user-friendly interfaces, drag-and-drop templates, or pre-made \"recipes\" so you don't have to code. If you can use basic office software, you can typically set up simple automations. And if you need extra help, most platforms have tutorials or support teams to guide you."
    },
    {
      question: "Which tasks are best to automate first?",
      answer: "Start with anything repetitive and time-consuming, such as:\n\n• Sending follow-up emails\n• Data entry or invoice creation\n• Social media scheduling\n• Lead capture and nurturing\n\nBy automating quick wins, you'll see immediate benefits and free up time to tackle more complex processes later."
    },
    {
      question: "How do I know if automation is working for me?",
      answer: "Monitor improvements in:\n\n• Time saved (e.g., you used to spend 2 hours a day on emails, now it takes 0)\n• Reduced errors in data entry or scheduling\n• Cost savings from lower labor expenses\n• Scalability (handling more leads or orders without extra staff)\n\nIf you see these metrics improving, automation is providing real value."
    },
    {
      question: "Is automation safe? Will my data be secure?",
      answer: "Reputable automation tools use encryption, secure servers, and comply with data protection laws (like GDPR). Always check a platform's privacy policy and security measures. Use strong passwords, enable two-factor authentication, and be mindful of the data you share."
    },
    {
      question: "Do I need special or expensive software?",
      answer: "Not necessarily. Many tools offer free plans or affordable monthly pricing. Basic features may be enough for small businesses with moderate automation needs. As you grow, you can upgrade to handle bigger volumes of tasks."
    },
    {
      question: "Will automation replace my employees?",
      answer: "Typically, no. Automation handles the repetitive tasks so your team can focus on things that require human insight, like building customer relationships or developing new products. Think of it as a helper that eliminates tedious work, rather than a replacement for people."
    },
    {
      question: "What kinds of tasks can be automated more deeply?",
      answer: "If you're looking for advanced use cases, automation can integrate across multiple platforms—for instance:\n\n• CRM Updates: Sync leads and customer notes between your CRM and email marketing tool\n• Inventory Management: Adjust stock levels automatically when sales happen\n• Chatbots: Provide instant responses to common customer questions, or route them to the correct team\n• Reporting and Analytics: Generate regular performance reports without manual data pulling"
    },
    {
      question: "What if I have a unique workflow? Can I customize automation?",
      answer: "Many automation solutions allow for custom \"if this, then that\" logic. You can either build from scratch or tweak existing templates. If your needs are complex, you could consult an automation specialist or developer who can tailor the tools to your exact process."
    },
    {
      question: "How do I handle support or troubleshooting?",
      answer: "Most automation platforms offer help centers, tutorials, and user communities. If you can't resolve an issue on your own, reach out to their support teams—many provide chat or email assistance. For more in-depth help, you can hire a freelance consultant or agency specializing in that platform."
    },
    {
      question: "Does automation work for all types of businesses?",
      answer: "Almost any business that deals with repetitive, systematic tasks can benefit from automation. Whether you run an e-commerce store, a freelance service, a small agency, or a physical shop, you likely have processes that could be made more efficient. The key is starting small, then expanding as you see results."
    },
    {
      question: "How do I choose the right automation tool among so many options?",
      answer: "Think about:\n\n• Integration Needs (Does it connect with your existing software?)\n• Budget (Is there a free or affordable tier?)\n• Ease of Use (Is the interface user-friendly if you're not technical?)\n• Scalability (Can it handle increased tasks as you grow?)\n\nCompare features and try free trials to see which tool aligns best with your requirements."
    },
    {
      question: "What if I don't see a direct integration for an app I use?",
      answer: "You can often use connector services like Zapier, Make, or native APIs to bridge gaps. Many apps allow custom webhooks or workflows that can link two otherwise unrelated systems. If that's too advanced, consider hiring someone for a small integration project—they can often get you set up quickly."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>
      
      <section className="faq-section" aria-labelledby={`${faqId}-title`}>
        <h2 id={`${faqId}-title`}>Frequently Asked Questions</h2>
          <div className="faq-container" role="list">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="faq-item" 
                role="listitem"
              >
                <button
                  className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`${faqId}-answer-${index}`}
                  id={`${faqId}-question-${index}`}
                >
                  {faq.question}
                  <span className="faq-icon" aria-hidden="true">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div 
                  id={`${faqId}-answer-${index}`}
                  className={`faq-answer ${activeIndex === index ? 'active' : ''}`}
                  role="region"
                  aria-labelledby={`${faqId}-question-${index}`}
                  hidden={activeIndex !== index}
                >
                  {faq.answer.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
    </>
  );
};

export default FAQ;
