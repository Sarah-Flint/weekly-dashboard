import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  // Load the automated data pushed from Google Sheets
  useEffect(() => {
    fetch('/data/dashboard_data.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Sync Error:", err));
  }, []);

  if (!data) return <div className="p-20 text-center font-serif italic text-navy-900">Refreshing Sarah Flint Weekly Insights...</div>;

  // Helpers to match your v4 formatting
  const f = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
  const getK = (label) => data.kpi.find(k => k.metric_label === label) || { _cw: 0, _pw: 0 };
  const w = (cw, pw) => {
    const pct = ((cw / pw) - 1) * 100;
    return <span className={pct >= 0 ? "text-green-600" : "text-red-600"}>{pct >= 0 ? "↑" : "↓"} {Math.abs(pct).toFixed(1)}%</span>;
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9F7] font-sans text-[#1A2B4B]">
      {/* ─── NAVIGATION SIDEBAR ─── */}
      <div className="w-64 bg-[#1A2B4B] text-white p-8 flex flex-col shadow-2xl fixed h-full">
        <h1 className="text-2xl font-serif italic border-b border-blue-900 pb-6 mb-8">Sarah Flint</h1>
        <nav className="flex-grow space-y-4">
          {["Overview", "Daily", "Acquisition", "Product", "Returns"].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left py-2 px-4 rounded transition-all ${activeTab === tab ? 'bg-white text-[#1A2B4B] font-bold shadow-lg' : 'hover:bg-blue-900 text-blue-100'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="text-[10px] uppercase tracking-widest text-blue-300">
          {data.metadata.week} <br /> Data Sync: {new Date(data.metadata.lastUpdated).toLocaleTimeString()}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="ml-64 flex-grow p-10">
        
        {/* OVERVIEW TAB */}
        {activeTab === "Overview" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header>
              <h2 className="text-3xl font-serif italic mb-2">Weekly Performance</h2>
              <p className="text-gray-400 text-sm uppercase tracking-tighter">Compared to Previous Week (PW)</p>
            </header>

            <div className="grid grid-cols-4 gap-6">
              {["Gross Revenue", "GLD", "Net Revenue", "New Customers"].map(label => {
                const k = getK(label);
                return (
                  <div key={label} className="bg-white p-6 rounded-sm border shadow-sm border-gray-100">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{label}</p>
                    <p className="text-2xl font-bold">{label.includes("Cust") ? k._cw.toLocaleString() : f(k._cw)}</p>
                    <p className="text-xs mt-2">{w(k._cw, k._pw)} <span className="text-gray-300 ml-1">vs PW</span></p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white p-8 rounded-sm border shadow-sm h-96">
              <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6">Revenue Trend (LW)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.weekly_trend}>
                  <XAxis dataKey="week_end" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#F9F9F7'}} />
                  <Bar dataKey="gld" fill="#1A2B4B" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* PRODUCT & INVENTORY TAB (Lead Time Logic) */}
        {activeTab === "Product" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif italic">Inventory & Style Performance</h2>
            <div className="bg-white border shadow-sm rounded-sm overflow-hidden">
              <div className="p-4 bg-[#F1F1ED] flex justify-between items-center border-b">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Sorted by Weekly GLD</span>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                   <span className="text-xs font-bold text-red-700 uppercase">
                    {data.product_sku.filter(p => p.woh < 16 && p.woh > 0).length} SKUs below 16wk Lead Time
                   </span>
                </div>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-[#1A2B4B] text-white text-[10px] uppercase tracking-widest">
                  <tr>
                    <th className="p-4">Style Detail</th>
                    <th className="p-4 text-right">Units LW</th>
                    <th className="p-4 text-right">On Hand</th>
                    <th className="p-4 text-right">WOH</th>
                    <th className="p-4 text-right">ST (90D)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.product_sku.map((p, i) => (
                    <tr key={i} className="border-b hover:bg-[#F9F9F7]">
                      <td className="p-4">
                        <p className="font-bold">{p.style_name}</p>
                        <p className="text-[10px] text-gray-400 uppercase">{p.color_name}</p>
                      </td>
                      <td className="p-4 text-right">{p.gu_7}</td>
                      <td className="p-4 text-right">{p.u_oh}</td>
                      <td className={`p-4 text-right font-bold ${p.woh < 16 ? 'text-red-500 bg-red-50' : ''}`}>
                        {p.woh}
                      </td>
                      <td className="p-4 text-right">{(p['st_90d%'] * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ACQUISITION TAB (Marketing) */}
        {activeTab === "Acquisition" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <AdPlatformCard name="Meta Ads" data={data.meta_ads} color="#1A2B4B" />
              <AdPlatformCard name="Google Ads" data={data.google_ads} color="#D4AF37" />
            </div>
            <div className="bg-white p-6 border shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Traffic Channel Performance</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b">
                    <th className="pb-2 font-normal">Channel</th>
                    <th className="pb-2 text-right font-normal">Sessions</th>
                    <th className="pb-2 text-right font-normal">Revenue</th>
                    <th className="pb-2 text-right font-normal">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.traffic_channel.map((c, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 font-medium">{c.channel}</td>
                      <td className="py-3 text-right">{c.sessions?.toLocaleString()}</td>
                      <td className="py-3 text-right font-bold">{f(c.gld)}</td>
                      <td className="py-3 text-right">{c.roas?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// Sub-component for Platform Cards
const AdPlatformCard = ({ name, data, color }) => (
  <div className="bg-white p-6 border-t-4 shadow-sm" style={{borderColor: color}}>
    <h3 className="font-serif italic text-xl mb-4">{name}</h3>
    <div className="grid grid-cols-2 gap-4">
      {data.map((m, i) => (
        <div key={i} className="bg-gray-50 p-3 rounded-sm">
          <p className="text-[9px] uppercase text-gray-400 tracking-tighter">{m.metric_label}</p>
          <p className="text-lg font-bold">
            {m.metric_label.includes("ROAS") ? m._cw.toFixed(2) : f(m._cw)}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default Dashboard;
