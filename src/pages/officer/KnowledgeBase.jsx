import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  {
    title: 'Dashboard Overview',
    content: (
      <>
        <p>The <strong>Dashboard</strong> is your starting point. It shows quick statistics like:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Total number of farmers registered</li>
          <li>Active alerts (e.g., weather warnings)</li>
          <li>Pending farmer queries</li>
        </ul>
        <p className="mt-2 italic">Example: Click “5 Active Alerts” to view all alerts and their details instantly.</p>
      </>
    )
  },
  {
    title: 'Managing Farmers',
    content: (
      <>
        <p>Use the <strong>Farmers</strong> section to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>View all farmers and their details</li>
          <li>Add a new farmer by clicking <em>"Add Farmer"</em></li>
          <li>Edit or update farmer profiles</li>
        </ul>
        <p className="mt-2 italic">Example: If a farmer moves to a new village, update their address from their profile in seconds.</p>
      </>
    )
  },
  {
    title: 'Alerts & Notifications',
    content: (
      <>
        <p>This section is used to send important information to farmers such as:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Weather warnings</li>
          <li>Government schemes</li>
          <li>Market price updates</li>
        </ul>
        <p className="mt-2 italic">Example: If heavy rainfall is expected, create a weather alert and notify farmers instantly.</p>
      </>
    )
  },
  {
    title: 'Reports',
    content: (
      <>
        <p>The <strong>Reports</strong> section helps you generate and download reports:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Farmer registration data</li>
          <li>Queries resolved within a time frame</li>
          <li>Alert statistics</li>
        </ul>
        <p className="mt-2 italic">Example: Generate a monthly summary report to submit to higher authorities with one click.</p>
      </>
    )
  },
  {
    title: 'Pro Tips',
    content: (
      <ul className="list-disc pl-6 mt-2">
        <li>✅ Check the dashboard daily to stay updated.</li>
        <li>💬 Respond to farmer queries quickly for better communication.</li>
        <li>📝 Keep farmer records updated to avoid confusion.</li>
        <li>📢 Use alerts only for important information.</li>
      </ul>
    )
  }
];

function KnowledgeBase() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">📖 Officer Knowledge Base</h1>
      <p className="mb-4 text-lg text-center">
        Learn how to use the officer dashboard step-by-step. Click on a topic below to expand and read details.
      </p>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="bg-white shadow rounded-2xl overflow-hidden transition hover:shadow-lg">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold hover:bg-gray-50"
            >
              {section.title}
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 border-t bg-gray-50 animate-fadeIn">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-gray-500">
        💡 <strong>Tip:</strong> Bookmark this page for quick reference whenever you need guidance.
      </p>
    </div>
  );
}

export default KnowledgeBase;