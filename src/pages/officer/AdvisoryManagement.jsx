import React, { useState } from 'react';
import { motion } from 'framer-motion';

const mockAdvisories = [
  {
    id: 1,
    title: 'Irrigation Advice for Wheat - April',
    category: 'Irrigation',
    region: 'Bhubaneswar, Odisha',
    crop: 'Wheat',
    date: '2025-04-10',
    content: 'Due to rising temperatures, irrigate wheat fields in the morning and late evening to reduce water loss. Mulching recommended.',
  },
  {
    id: 2,
    title: 'Pest Alert: Rice Blast',
    category: 'Pest/Disease',
    region: 'Cuttack, Odisha',
    crop: 'Rice',
    date: '2025-05-15',
    content: 'Rice blast disease observed. Spray approved fungicide after sunset. Ensure proper drainage.',
  },
  {
    id: 3,
    title: 'Govt Scheme: Subsidy on Drip Irrigation',
    category: 'Scheme',
    region: 'Khordha, Odisha',
    crop: 'Any',
    date: '2025-06-01',
    content: 'Farmers can now apply for 50% subsidy on drip irrigation systems under the state agriculture scheme. Apply at nearest block office before July.',
  }
];

function AdvisoryManagement() {
  const [advisories, setAdvisories] = useState(mockAdvisories);
  const [selected, setSelected] = useState(null);
  const [filterCat, setFilterCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = advisories
    .filter(a => filterCat === 'All' || a.category === filterCat)
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.crop.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Advisory Management</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search advisories or crops..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-grow focus:outline-none focus:ring focus:ring-green-200"
        />
        <select
          value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>All</option>
          <option>Irrigation</option>
          <option>Pest/Disease</option>
          <option>Scheme</option>
          <option>Post-Harvest</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            // placeholder to create new advisory
            const newAd = { id: Date.now(), title: '', category: 'Irrigation', region: '', crop: '', date: new Date().toLocaleDateString(), content: '' };
            setSelected(newAd);
          }}
        >
          + New Advisory
        </button>
      </div>

      <div className="grid gap-4">
        {filtered.map(a => (
          <motion.div
            key={a.id}
            className="bg-white shadow rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelected(a)}
            layout
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{a.title}</h2>
              <span className="text-xs px-2 py-1 rounded bg-green-200 text-green-800">{a.category}</span>
            </div>
            <p className="text-gray-700 truncate mt-1">{a.content}</p>
            <p className="text-xs text-gray-500 mt-2">{a.region}, {a.date}</p>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-[600px] max-h-[80vh] overflow-auto shadow-xl">
            <h2 className="text-xl font-bold mb-4">{selected.title || 'New Advisory'}</h2>
            <div className="space-y-4">
              {['Title','Category','Region','Crop','Date','Content'].map(field => (
                <div key={field}>
                  <label className="block font-semibold">{field}</label>
                  {field === 'Content' ? (
                    <textarea
                      rows={4}
                      className="w-full border rounded p-2"
                      defaultValue={selected.content}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full border rounded p-2"
                      defaultValue={selected[field.toLowerCase()]}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save Advisory</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AdvisoryManagement;