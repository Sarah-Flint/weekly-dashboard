import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // 1. FETCH DATA FROM GITHUB
  useEffect(() => {
    fetch('/data/dashboard_data.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => console.error("Error loading data:", err));
  }, []);

  // 2. SEARCH & GROUPING LOGIC (Style-Color Table)
  const groupedProducts = useMemo(() => {
    if (!data?.sku) return [];
    
    // Filter by search query
    const filtered = data.sku.filter(p => 
      p.style_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.color_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group by Style Name
    const groups = {};
    filtered.forEach(p => {
      if (!groups[p.style_name]) {
        groups[p.style_name] = { 
          name: p.style_name, 
          colors: [], 
          total_rev: 0, 
          total_oh: 0 
        };
      }
      groups[p.style_name].colors.push(p);
      groups[p.style_name].total_rev += Number(p.gld7) || 0;
      groups[p.style_name].total_oh += Number(p.u_oh) || 0;
    });
    return Object.values(groups).sort((a, b) => b.total_rev - a.total_rev);
  }, [data, searchQuery]);

  if (loading) return <div className="p-10 text-center">Loading Weekly Insights...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Sarah Flint Dashboard</h1>
          <p className="text-gray-500">{data.metadata.week} · Updated {new Date(data.metadata.lastUpdated).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border shadow-sm">
          {["overview", "products", "marketing"].map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-md capitalize ${activeTab === t ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: OVERVIEW (KPIs) */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {data.kpi.slice(0, 4).map((k, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border shadow-sm">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{k.metric_label}</p>
                <p className="text-2xl font-bold mt-1">${Math.round(k._cw).toLocaleString()}</p>
                <p className={`text-sm mt-2 ${k._cw > k._pw ? 'text-green-600' : 'text-red-600'}`}>
                  {k._cw > k._pw ? '↑' : '↓'} vs PW (${Math.round(k._pw).toLocaleString()})
                </p>
              </div>
            ))}
          </div>
          
          {/* Revenue Trend Chart */}
          <div className="bg-white p-6 rounded-xl border shadow-sm h-80">
            <h3 className="font-bold mb-4">Weekly Revenue Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weekly_trend}>
                <XAxis dataKey="week_end" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="gld" fill="#1a2b4b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT DEEP-DIVE (Searchable Table) */}
      {activeTab === "products" && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <input 
              type="text" 
              placeholder="Search by style or color..." 
              className="border p-2 rounded-md w-72 text-sm focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="text-xs text-gray-500">{groupedProducts.length} Styles Found</span>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-[10px] tracking-widest">
              <tr>
                <th className="p-4">Style / Color</th>
                <th className="p-4 text-right">Revenue (LW)</th>
                <th className="p-4 text-right">On Hand</th>
                <th className="p-4 text-right">WOH</th>
                <th className="p-4 text-right">Sell-Thru</th>
              </tr>
            </thead>
            <tbody>
              {groupedProducts.map((group, i) => (
                <React.Fragment key={i}>
                  {/* Parent Row (Style) */}
                  <tr className="border-b bg-gray-50/50 font-bold">
                    <td className="p-4 flex items-center gap-2">
                       <span className="text-gray-400">▼</span> {group.name}
                    </td>
                    <td className="p-4 text-right">${group.total_rev.toLocaleString()}</td>
                    <td className="p-4 text-right">{group.total_oh}</td>
                    <td className="p-4 text-right">—</td>
                    <td className="p-4 text-right">—</td>
                  </tr>
                  {/* Child Rows (Colors) */}
                  {group.colors.map((c, j) => (
                    <tr key={j} className="border-b hover:bg-gray-50 text-gray-600">
                      <td className="p-4 pl-10 text-xs italic">{c.color_name}</td>
                      <td className="p-4 text-right text-xs">${Math.round(c.gld7).toLocaleString()}</td>
                      <td className="p-4 text-right text-xs">{c.u_oh}</td>
                      <td className={`p-4 text-right text-xs font-semibold ${c.woh < 4 ? 'text-red-500' : ''}`}>{c.woh}</td>
                      <td className="p-4 text-right text-xs">{Math.round(c['st_90d%'] * 100)}%</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
