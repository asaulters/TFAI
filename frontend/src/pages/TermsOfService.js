import React from 'react';
import './StaticPages.css';

const TermsOfService = () => {
  return (
    <div className="static-page">
      <div className="static-page-content">
        <h1>Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using BizEaseAI, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </section>

        <section>
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily access the materials (information or software) on BizEaseAI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on BizEaseAI's website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section>
          <h2>3. Service Description</h2>
          <p>BizEaseAI provides automation solutions and tools to streamline business processes. We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.</p>
        </section>

        <section>
          <h2>4. User Obligations</h2>
          <p>Users agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of their account</li>
            <li>Use the service in compliance with all applicable laws</li>
            <li>Not engage in any activity that interferes with or disrupts the service</li>
          </ul>
        </section>

        <section>
          <h2>5. Disclaimer</h2>
          <p>The materials on BizEaseAI's website are provided on an 'as is' basis. BizEaseAI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section>
          <h2>6. Limitations</h2>
          <p>In no event shall BizEaseAI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BizEaseAI's website.</p>
        </section>

        <section>
          <h2>7. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>BizEaseAI reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms of service.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
