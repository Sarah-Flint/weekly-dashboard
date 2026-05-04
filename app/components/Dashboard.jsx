"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, PieChart, Pie, Legend } from "recharts";

// ─── UTILS ───
const fmt=n=>{if(n==null)return"—";const a=Math.abs(n),s=n<0?"-":"";return a>=1e6?`${s}$${(a/1e6).toFixed(1)}M`:a>=1000?`${s}$${(a/1000).toFixed(0)}K`:`${s}$${a.toFixed(0)}`;};
const ff=n=>n==null?"—":n<0?`-$${Math.abs(n).toLocaleString("en-US",{maximumFractionDigits:0})}`:`$${n.toLocaleString("en-US",{maximumFractionDigits:0})}`;
const w=(c,p)=>((c-p)/p*100);
const C={b1:"#1e40af",b2:"#3b82f6",b3:"#93c5fd",b4:"#dbeafe",nv:"#0f172a",sl:"#334155",sL:"#94a3b8",gn:"#059669",rd:"#dc2626",am:"#d97706",cd:"#ffffff",bd:"#e2e8f0"};

const Pill=({v,inv})=>{const p=inv?v<0:v>0;return (<span style={{background:p?"rgba(16,185,129,0.12)":"rgba(239,68,68,0.12)",color:p?C.gn:C.rd,padding:"2px 7px",borderRadius:20,fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{v>0?"▲":"▼"} {Math.abs(v).toFixed(1)}%</span>)};
const MC = ({l, v, ww, pL, inv, sub}) => (
  <div style={{background:C.cd,borderRadius:12,padding:"15px 17px",border:`1px solid ${C.bd}`,flex:1,minWidth:155}}
       onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(30,64,175,0.07)"}
       onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>

    <div style={{fontSize:10,color:C.sL,textTransform:"uppercase",letterSpacing:0.7,fontWeight:600,marginBottom:4}}>
      {l}
    </div>

    <div style={{fontSize:23,fontWeight:700,color:C.nv,lineHeight:1.1}}>
      {v}
    </div>

    {sub && (
      <div style={{fontSize:11,color:C.sL,marginTop:2}}>
        {sub}
      </div>
    )}

    <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap",alignItems:"center"}}>
      {ww !== undefined && <Pill v={ww} inv={inv} />}

      {ww !== undefined && pL && (
        <span style={{fontSize:11,color:C.sL}}>
          PW: {pL}
        </span>
      )}
    </div>

  </div>
);
const SH=({t,icon})=><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:13,marginTop:22}}><span style={{fontSize:16}}>{icon}</span><h2 style={{fontSize:15,fontWeight:700,color:C.nv,margin:0}}>{t}</h2></div>;
const Src=({t})=><div style={{fontSize:10,color:C.sL,marginTop:8,fontStyle:"italic",borderTop:`1px dashed ${C.bd}`,paddingTop:5}}>📎 {t}</div>;
const DEFS={
  gross:"Total revenue before discounts or returns",disc:"Dollar amount discounted at checkout",gld:"Gross Revenue minus Discounts",ret:"Dollar value of returned items",
  net:"GLD minus Returns",discPct:"Discounts / Gross Revenue",retPct:"Returns $ / GLD $",aov:"GLD / Orders",netAOV:"Net Revenue / Orders",aur:"GLD / Units Ordered",upt:"Units Ordered / Orders",
  newNetROAS:"New Customer Net Revenue / Marketing Spend",gldROAS:"New Customer GLD / Marketing Spend",blendedROAS:"Total Net Revenue / Marketing Spend",
  mer:"Marketing Spend / Net Revenue",merNew:"Marketing Spend / New Customer Net Revenue",cac:"Marketing Spend / New Customers Acquired",
  sessions:"Total site visits (GA4)",conv:"Orders / Sessions",engagement:"Sessions with 1+ engaged event / Sessions",atcRate:"Add-to-Cart events / Sessions",bounce:"Bounced Sessions / Sessions",
  st90:"90D Units Sold / (OH Units + 90D Units Sold)",woh:"OH Units / max(7D Units, 90D Units / 90 * 7)",ohVal:"On-hand inventory valued at unit cost",
  newCust:"First-time purchasers (no prior Shopify order)",retOrders:"Orders from customers with 1+ prior purchase",mktSpend:"Total paid media spend (Meta + Google + Other)",
};
const Defs=({keys,show,toggle})=>(<div style={{marginTop:16}}>
  <div onClick={toggle} style={{cursor:"pointer",fontSize:11,color:C.sL,fontWeight:600,display:"flex",alignItems:"center",gap:4}}><span>{show?"▾":"▸"}</span>Metric Definitions</div>
  {show&&<div style={{marginTop:6,background:"#f8fafc",borderRadius:8,padding:"10px 14px",border:`1px solid ${C.bd}`,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 20px"}}>
    {keys.map(k=><div key={k} style={{fontSize:11,padding:"3px 0"}}><span style={{fontWeight:600,color:C.nv}}>{k}: </span><span style={{color:C.sL}}>{DEFS[k]||k}</span></div>)}
  </div>}
</div>);
const CT=({active,payload,label})=>{if(!active||!payload?.length)return null;return (<div style={{background:"#fff",border:`1px solid ${C.bd}`,borderRadius:8,padding:"10px 14px",boxShadow:"0 4px 16px rgba(0,0,0,0.08)"}}><div style={{fontSize:12,fontWeight:600,color:C.nv,marginBottom:4}}>{label}</div>{payload.map((p,i)=><div key={i} style={{fontSize:12,color:p.color||C.sl}}>{p.name}: {typeof p.value==="number"&&Math.abs(p.value)>100?ff(p.value):p.value}</div>)}</div>)};

const CampTbl=({data,title,tSpend,tWow,tRoas,tRoasW})=>(
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:6,overflowX:"auto"}}>
    <div style={{fontSize:13,fontWeight:700,color:C.nv,marginBottom:10}}>{title}: {ff(tSpend)} <span style={{fontWeight:400,color:C.sL}}>({tWow} WoW)</span> · ROAS: {tRoas} <span style={{fontWeight:400,color:C.sL}}>({tRoasW} WoW)</span></div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["Campaign","Type","CW Spend","CW Rev","CW ROAS","PW Spend","PW ROAS","WoW Spend","WoW ROAS"].map(h=><th key={h} style={{textAlign:h==="Campaign"?"left":"right",padding:"7px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}
    </tr></thead><tbody>{data.map((c,i)=>(
      <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <td style={{padding:"8px 6px",fontWeight:500,color:C.nv,maxWidth:190}}>{c.name}</td>
        <td style={{padding:"8px 6px",textAlign:"right"}}><span style={{background:(c.type||c.brand||"").includes("Prosp")?"#dbeafe":(c.type||c.brand||"").includes("Remarket")||(c.type||c.brand||"").includes("Retarget")?"#fef3c7":(c.type||c.brand||"").includes("Brand")?"#d1fae5":"#ede9fe",padding:"2px 6px",borderRadius:4,fontSize:10,fontWeight:600}}>{c.type||c.brand||"–"}</span></td>
        <td style={{padding:"8px 6px",textAlign:"right"}}>{ff(c.cS)}</td>
        <td style={{padding:"8px 6px",textAlign:"right"}}>{ff(c.cR)}</td>
        <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600,color:c.cX>=3?C.gn:c.cX>=1.5?C.nv:c.cX>0?C.am:C.sL}}>{c.cX>0?(c.cX>=10?c.cX.toFixed(1):c.cX.toFixed(2))+"x":"–"}</td>
        <td style={{padding:"8px 6px",textAlign:"right",color:C.sL}}>{c.pS>0?ff(c.pS):"–"}</td>
        <td style={{padding:"8px 6px",textAlign:"right",color:C.sL}}>{c.pX!=null&&c.pX>0?(c.pX>=10?c.pX.toFixed(1):c.pX.toFixed(2))+"x":"–"}</td>
        <td style={{padding:"8px 6px",textAlign:"right"}}>{c.wS!=null?<Pill v={c.wS} inv/>:<span style={{color:C.sL,fontSize:11}}>New</span>}</td>
        <td style={{padding:"8px 6px",textAlign:"right"}}>{c.wX!=null?<Pill v={c.wX}/>:<span style={{color:C.sL,fontSize:11}}>–</span>}</td>
      </tr>
    ))}</tbody></table>
  </div>
);

// ─── MAIN ───
export default function Dashboard() {

const [data, setData] = useState(null);

useEffect(() => {
  fetch('/dashboard_data.json')
    .then(res => res.json())
    .then(setData)
    .catch(err => console.error(err));
}, []);

  const [tab,setTab]=useState("overview");
  const [revF,setRevF]=useState("all");
  const [prodFilter,setProdFilter]=useState("all");
  const [showAll,setShowAll]=useState(false);
  const [search,setSearch]=useState("");
  const [expInv,setExpInv]=useState({});
  const [invSeason,setInvSeason]=useState("All");
  const [invMC,setInvMC]=useState("All");
  const [invSC,setInvSC]=useState("All");
  const [showDefs,setShowDefs]=useState(true);
  const [lpChannel,setLpChannel]=useState("All");
  const [retTimeFilter,setRetTimeFilter]=useState("LW");
  const [expReasons,setExpReasons]=useState({});

  if (!data) return <div>Loading...</div>;
  const meta = data.metadata || {};
  const getMetric = (metric) =>
    data.kpi.find((k) => k.metric === metric) || {};
  // ── Safe value helpers (handle null, "", NaN from JSON) ──
  const _v = (x) => (x != null && x !== "" && !Number.isNaN(Number(x))) ? Number(x) : null;
  const _abs = (x) => { const n = _v(x); return n != null ? Math.abs(n) : null; };
  const _ratio = (num, den) => { const n = _v(num), d = _v(den); return n != null && d ? n / d : null; };
  const _rPct = (num, den) => { const r = _ratio(num, den); return r != null ? r * 100 : null; };
  const _absRPct = (num, den) => { const n = _abs(num), d = _v(den); return n != null && d ? (n / d) * 100 : null; };

  const DD = {
  // ── MTD ──
  mtdGross: _v(getMetric("total_gross_rev")._mtd),
  mtdNet: _v(getMetric("total_net_rev")._mtd),
  mtdNewCust: _v(getMetric("new_orders")._mtd),
  mtdNewNet: _v(getMetric("new_net_rev")._mtd),
  mtdSessions: _v(getMetric("total_sessions")._mtd),
  mtdMktSpend: _v(getMetric("total_marketing")._mtd),

  mtdGrossPlan: _v(getMetric("total_gross_rev")._mtd_plan),
  mtdNetPlan: _v(getMetric("total_net_rev")._mtd_plan),
  mtdNewCustPlan: _v(getMetric("new_orders")._mtd_plan),
  mtdNewNetPlan: _v(getMetric("new_net_rev")._mtd_plan),
  mtdSessionsPlan: _v(getMetric("total_sessions")._mtd_plan),

  // ── QTD ──
  qtdGross: _v(getMetric("total_gross_rev")._qtd),
  qtdNet: _v(getMetric("total_net_rev")._qtd),
  qtdNewCust: _v(getMetric("new_orders")._qtd),
  qtdSessions: _v(getMetric("total_sessions")._qtd),

  qtdGrossPlan: _v(getMetric("total_gross_rev")._qtd_plan),
  qtdNetPlan: _v(getMetric("total_net_rev")._qtd_plan),
  qtdNewCustPlan: _v(getMetric("new_orders")._qtd_plan),
  qtdSessionsPlan: _v(getMetric("total_sessions")._qtd_plan),

  // ── Revenue (weekly) ──
  grossRevenue: _v(getMetric("total_gross_rev")._cw),
  priorGross: _v(getMetric("total_gross_rev")._pw),
  grossPlan: _v(getMetric("total_gross_rev")._cw_plan),

  discounts: _abs(getMetric("total_discounts")._cw),
  priorDiscounts: _abs(getMetric("total_discounts")._pw),
  discountsPlan: _abs(getMetric("total_discounts")._cw_plan),

  gld: _v(getMetric("total_gld")._cw),
  priorGld: _v(getMetric("total_gld")._pw),
  gldPlan: _v(getMetric("total_gld")._cw_plan),

  returns: _abs(getMetric("total_returns")._cw),
  priorReturns: _abs(getMetric("total_returns")._pw),
  returnsPlan: _abs(getMetric("total_returns")._cw_plan),

  netRevenue: _v(getMetric("total_net_rev")._cw),
  priorNet: _v(getMetric("total_net_rev")._pw),
  netPlan: _v(getMetric("total_net_rev")._cw_plan),

  newNetRev: _v(getMetric("new_net_rev")._cw),
  priorNewNetRev: _v(getMetric("new_net_rev")._pw),
  newNetRevPlan: _v(getMetric("new_net_rev")._cw_plan),

  // FIX: unified name — "repeatNetRev" matches D + pie chart references
  repeatNetRev: _v(getMetric("returning_net_rev")._cw),
  priorRepeatNetRev: _v(getMetric("returning_net_rev")._pw),
  repeatNetRevPlan: _v(getMetric("returning_net_rev")._cw_plan),

  // ── New customer detail ──
  newGross:          _v(getMetric("new_gross_rev")._cw),
  priorNewGross:     _v(getMetric("new_gross_rev")._pw),
  newDiscounts:      _abs(getMetric("new_discounts")._cw),
  priorNewDiscounts: _abs(getMetric("new_discounts")._pw),
  newGld:            _v(getMetric("new_gld")._cw),
  priorNewGld:       _v(getMetric("new_gld")._pw),
  newReturns:        _abs(getMetric("new_returns")._cw),
  priorNewReturns:   _abs(getMetric("new_returns")._pw),
  newItems:          _v(getMetric("new_gross_units")._cw),
  priorNewItems:     _v(getMetric("new_gross_units")._pw),
  newDiscPctGross:      _absRPct(getMetric("new_discounts")._cw, getMetric("new_gross_rev")._cw),
  priorNewDiscPctGross: _absRPct(getMetric("new_discounts")._pw, getMetric("new_gross_rev")._pw),
  newReturnPctGLD:      _absRPct(getMetric("new_returns")._cw, getMetric("new_gld")._cw),
  priorNewReturnPctGLD: _absRPct(getMetric("new_returns")._pw, getMetric("new_gld")._pw),
  newGldAOV:   _ratio(getMetric("new_gld")._cw, getMetric("new_orders")._cw),
  priorNewGldAOV: _ratio(getMetric("new_gld")._pw, getMetric("new_orders")._pw),
  newNetAOV:   _ratio(getMetric("new_net_rev")._cw, getMetric("new_orders")._cw),
  priorNewNetAOV: _ratio(getMetric("new_net_rev")._pw, getMetric("new_orders")._pw),
  newAur:      _ratio(getMetric("new_gld")._cw, getMetric("new_gross_units")._cw),
  priorNewAur: _ratio(getMetric("new_gld")._pw, getMetric("new_gross_units")._pw),
  newUpt:      _ratio(getMetric("new_gross_units")._cw, getMetric("new_orders")._cw),
  priorNewUpt: _ratio(getMetric("new_gross_units")._pw, getMetric("new_orders")._pw),

  // ── Returning customer detail ──
  retGross:          _v(getMetric("returning_gross_rev")._cw),
  priorRetGross:     _v(getMetric("returning_gross_rev")._pw),
  retDiscounts:      _abs(getMetric("returning_discounts")._cw),
  priorRetDiscounts: _abs(getMetric("returning_discounts")._pw),
  retGld:            _v(getMetric("returning_gld")._cw),
  priorRetGld:       _v(getMetric("returning_gld")._pw),
  retReturns:        _abs(getMetric("returning_returns")._cw),
  priorRetReturns:   _abs(getMetric("returning_returns")._pw),
  retItems:          _v(getMetric("returning_gross_units")._cw),
  priorRetItems:     _v(getMetric("returning_gross_units")._pw),
  retDiscPctGross:      _absRPct(getMetric("returning_discounts")._cw, getMetric("returning_gross_rev")._cw),
  priorRetDiscPctGross: _absRPct(getMetric("returning_discounts")._pw, getMetric("returning_gross_rev")._pw),
  retReturnPctGLD:      _absRPct(getMetric("returning_returns")._cw, getMetric("returning_gld")._cw),
  priorRetReturnPctGLD: _absRPct(getMetric("returning_returns")._pw, getMetric("returning_gld")._pw),
  retGldAOV:   _ratio(getMetric("returning_gld")._cw, getMetric("returning_orders")._cw),
  priorRetGldAOV: _ratio(getMetric("returning_gld")._pw, getMetric("returning_orders")._pw),
  retNetAOV:   _ratio(getMetric("returning_net_rev")._cw, getMetric("returning_orders")._cw),
  priorRetNetAOV: _ratio(getMetric("returning_net_rev")._pw, getMetric("returning_orders")._pw),
  retAur:      _ratio(getMetric("returning_gld")._cw, getMetric("returning_gross_units")._cw),
  priorRetAur: _ratio(getMetric("returning_gld")._pw, getMetric("returning_gross_units")._pw),
  retUpt:      _ratio(getMetric("returning_gross_units")._cw, getMetric("returning_orders")._cw),
  priorRetUpt: _ratio(getMetric("returning_gross_units")._pw, getMetric("returning_orders")._pw),

  // ── Discount & Return Rates ──
  // FIX: was using _cw_plan / _cw_plan (showed plan rate as current)
  discPctGross: _absRPct(getMetric("total_discounts")._cw, getMetric("total_gross_rev")._cw),
  // FIX: renamed from priorDiscPct → priorDiscPctGross to match config reference
  priorDiscPctGross: _absRPct(getMetric("total_discounts")._pw, getMetric("total_gross_rev")._pw),
  discPctPlan: _absRPct(getMetric("total_discounts")._cw_plan, getMetric("total_gross_rev")._cw_plan),

  returnPctGLD: _absRPct(getMetric("total_returns")._cw, getMetric("total_gld")._cw),
  priorReturnPctGLD: _absRPct(getMetric("total_returns")._pw, getMetric("total_gld")._pw),
  returnPctPlan: _absRPct(getMetric("total_returns")._cw_plan, getMetric("total_gld")._cw_plan),

  // ── Orders / Customers ──
  orders: _v(getMetric("total_orders")._cw),
  priorOrders: _v(getMetric("total_orders")._pw),
  ordersPlan: _v(getMetric("total_orders")._cw_plan),

  newCustomers: _v(getMetric("new_orders")._cw),
  priorNewCustomers: _v(getMetric("new_orders")._pw),
  newCustomersPlan: _v(getMetric("new_orders")._cw_plan),

  retOrders: _v(getMetric("returning_orders")._cw),
  priorRetOrders: _v(getMetric("returning_orders")._pw),
  retOrdersPlan: _v(getMetric("returning_orders")._cw_plan),

  // ── AOV ──
  gldAOV: _ratio(getMetric("total_gld")._cw, getMetric("total_orders")._cw),
  priorGldAOV: _ratio(getMetric("total_gld")._pw, getMetric("total_orders")._pw),
  netAOV: _ratio(getMetric("total_net_rev")._cw, getMetric("total_orders")._cw),
  priorNetAOV: _ratio(getMetric("total_net_rev")._pw, getMetric("total_orders")._pw),
  aur:      _ratio(getMetric("total_gld")._cw, getMetric("total_gross_units")._cw),
  priorAur: _ratio(getMetric("total_gld")._pw, getMetric("total_gross_units")._pw),
  upt:      _ratio(getMetric("total_gross_units")._cw, getMetric("total_orders")._cw),
  priorUpt: _ratio(getMetric("total_gross_units")._pw, getMetric("total_orders")._pw),

  // ── Units ──
  // FIX: was getMetric("units") — JSON key is "total_gross_units"
  items: _v(getMetric("total_gross_units")._cw),
  priorItems: _v(getMetric("total_gross_units")._pw),
  netUnits: _v(getMetric("total_net_units")._cw),
  priorNetUnits: _v(getMetric("total_net_units")._pw),

  // ── Marketing ──
  mktSpend: _v(getMetric("total_marketing")._cw),
  priorMktSpend: _v(getMetric("total_marketing")._pw),
  metaSpend: _v(getMetric("meta_marketing")._cw),
  priorMetaSpend: _v(getMetric("meta_marketing")._pw),
  googleSpend: _v(getMetric("google_marketing")._cw),
  priorGoogleSpend: _v(getMetric("google_marketing")._pw),

  metaRev: _v(getMetric("meta_revenue")._cw),
  priorMetaRev: _v(getMetric("meta_revenue")._pw),
  googleRev: _v(getMetric("google_revenue")._cw),
  priorGoogleRev: _v(getMetric("google_revenue")._pw),

  metaRoas: _v(getMetric("meta_roas")._cw),
  priorMetaRoas: _v(getMetric("meta_roas")._pw),
  googleRoas: _v(getMetric("google_roas")._cw),
  priorGoogleRoas: _v(getMetric("google_roas")._pw),

  cac: _ratio(getMetric("total_marketing")._cw, getMetric("new_orders")._cw),
  priorCac: _ratio(getMetric("total_marketing")._pw, getMetric("new_orders")._pw),

  // ── Website / Conversion ──
  // FIX: was getMetric("sessions") — JSON key is "total_sessions"
  sessions: _v(getMetric("total_sessions")._cw),
  priorSessions: _v(getMetric("total_sessions")._pw),
  sessionsPlan: _v(getMetric("total_sessions")._cw_plan),

  // FIX: renamed to convRate/priorConvRate so weeklyKpis references resolve
  // FIX: priorConversionRate was gld/orders (= AOV), now orders/sessions
  // FIX: added planConv (was undefined)
  convRate: _rPct(getMetric("total_orders")._cw, getMetric("total_sessions")._cw),
  priorConvRate: _rPct(getMetric("total_orders")._pw, getMetric("total_sessions")._pw),
  planConv: _rPct(getMetric("total_orders")._cw_plan, getMetric("total_sessions")._cw_plan),

  // Recomputed from raw counts for precision (JSON decimals round to 2 places)
  engagementRate: _rPct(getMetric("total_engaged_sessions")._cw, getMetric("total_sessions")._cw),
  priorEngagementRate: _rPct(getMetric("total_engaged_sessions")._pw, getMetric("total_sessions")._pw),

  bounceRate: _rPct(getMetric("total_bounces")._cw, getMetric("total_sessions")._cw),
  priorBounceRate: _rPct(getMetric("total_bounces")._pw, getMetric("total_sessions")._pw),

  atcRate: _rPct(getMetric("total_add_to_cart")._cw, getMetric("total_sessions")._cw),
  priorAtcRate: _rPct(getMetric("total_add_to_cart")._pw, getMetric("total_sessions")._pw),

  totalAtc: _v(getMetric("total_add_to_cart")._cw),
  priorTotalAtc: _v(getMetric("total_add_to_cart")._pw),

  pageViews: _v(getMetric("total_page_views")._cw),
  priorPageViews: _v(getMetric("total_page_views")._pw),

  pagesPerSession: _v(getMetric("pages_per_section")._cw),
  priorPagesPerSession: _v(getMetric("pages_per_section")._pw),

  avgSessionLength: _v(getMetric("avg_duration")._cw),
  priorAvgSessionLength: _v(getMetric("avg_duration")._pw),

  newSessions: _v(getMetric("new_sessions")._cw),
  priorNewSessions: _v(getMetric("new_sessions")._pw),
  returningSessions: _v(getMetric("returning_sessions")._cw),
  priorReturningSessions: _v(getMetric("returning_sessions")._pw),

  paidSessions: _v(getMetric("paid_sessions")._cw),
  priorPaidSessions: _v(getMetric("paid_sessions")._pw),
  orgSessions: _v(getMetric("organic_sessions")._cw),
  priorOrgSessions: _v(getMetric("organic_sessions")._pw),

  desktopSessions: _v(getMetric("desktop_sessions")._cw),
  priorDesktopSessions: _v(getMetric("desktop_sessions")._pw),
  mobileSessions: _v(getMetric("mobile_sessions")._cw),
  priorMobileSessions: _v(getMetric("mobile_sessions")._pw),

  desktopAtcRate: _rPct(getMetric("desktop_add_to_cart")._cw, getMetric("desktop_sessions")._cw),
  priorDesktopAtcRate: _rPct(getMetric("desktop_add_to_cart")._pw, getMetric("desktop_sessions")._pw),
  mobileAtcRate: _rPct(getMetric("mobile_add_to_cart")._cw, getMetric("mobile_sessions")._cw),
  priorMobileAtcRate: _rPct(getMetric("mobile_add_to_cart")._pw, getMetric("mobile_sessions")._pw),
};

  const nROAS = DD.mktSpend ? (DD.newNetRev / DD.mktSpend).toFixed(2) : null;
  const pROAS = DD.priorMktSpend ? (DD.priorNewNetRev / DD.priorMktSpend).toFixed(2) : null;

  
  // Weekly Kpis
  
  const pctVar = (actual, compare) =>
    actual != null && compare ? ((actual - compare) / compare) * 100 : null;

  const fmtKpi = (v, type) => {
    if (v == null || Number.isNaN(v)) return "—";

    if (type === "currency") return fmt(v);
    if (type === "currencySmall") return ff(v);
    if (type === "percent") return `${v.toFixed(1)}%`;
    if (type === "multiple") return `${v.toFixed(2)}x`;

    return v.toLocaleString();
  };

  const fmtVar = (v) =>
  v == null || Number.isNaN(v) ? "—" : `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`;

 const weeklyKpis = [
  {
    l: "Gross Revenue",
    value: DD.grossRevenue,
    prior: DD.priorGross,
    planValue: DD.grossPlan,
    format: "currency"
  },
  {
    l: "Net Revenue",
    value: DD.netRevenue,
    prior: DD.priorNet,
    planValue: DD.netPlan,
    format: "currency"
  },
  {
    l: "New Customers",
    value: DD.newCustomers,
    prior: DD.priorNewCustomers,
    planValue: DD.newCustomersPlan,
    format: "number"
  },
  {
    l: "Returning Orders",
    value: DD.retOrders,
    prior: DD.priorRetOrders,
    planValue: DD.retOrdersPlan,
    format: "number"
  },
  {
    l: "Discount Rate",
    value: DD.discPctGross,
    prior: DD.priorDiscPctGross,
    planValue: DD.discPctPlan,
    format: "percent",
    inv: true
  },
  {
    l: "Return Rate",
    value: DD.returnPctGLD,
    prior: DD.priorReturnPctGLD,
    planValue: DD.returnPctPlan,
    format: "percent",
    inv: true
  },
  {
    l: "Marketing Spend",
    value: DD.mktSpend,
    prior: DD.priorMktSpend,
    planValue: null,
    format: "currencySmall",
    inv: true,
    subOverride: `Meta: ${ff(DD.metaSpend)} · Google: ${ff(DD.googleSpend)}`
  },
  {
    l: "New Net Rev ROAS",
    value: nROAS != null ? parseFloat(nROAS) : null,
    prior: pROAS != null ? parseFloat(pROAS) : null,
    planValue: null,
    format: "multiple",
    subOverride: "New Net ÷ Spend"
  },
  {
    l: "Sessions",
    value: DD.sessions,
    prior: DD.priorSessions,
    planValue: DD.sessionsPlan,
    format: "number"
  },
  {
    l: "Conversion Rate",
    value: DD.convRate,
    prior: DD.priorConvRate,
    planValue: DD.planConv,
    format: "percent"
  },
  {
    l: "Engagement Rate",
    value: DD.engagementRate,
    prior: DD.priorEngagementRate,
    planValue: null,
    format: "percent"
  },
  {
    l: "Add to Cart Rate",
    value: DD.atcRate,
    prior: DD.priorAtcRate,
    planValue: null,
    format: "percent"
  }
];


  // Weekly Trend Data
  const getTrend = (metric) =>
  (data.weekly_trend || []).find((row) => row.metric === metric) || {};

  const WEEKLY_TREND_LIVE = Object.keys(getTrend("total_net_rev"))
  .filter((key) => !isNaN(Number(key)))
  .map((week) => ({
    week: `Wk ${week}`,
    net: getTrend("total_net_rev")[week] || 0,
    newNet: getTrend("new_net_rev")[week] || 0,
    retNet: getTrend("returning_net_rev")[week] || 0,
    plan: getTrend("total_net_rev_plan")[week] || 0,
    spend: getTrend("total_marketing")[week] || 0,
    newCust: getTrend("new_orders")[week] || 0,
    cac: getTrend("total_cac")[week] || 0,
    roas: getTrend("new_net_roas")[week] || 0,
  }));  

  // Daily Data 
  const getDaily = (metric) =>
  (data.daily || []).find((row) => row.metric === metric) || {};

  const DAILY_LIVE = Object.keys(getDaily("total_net_rev"))
  .filter((key) => {
    if (key === "metric") return false;

    const val = getDaily("total_net_rev")[key];
    return typeof val === "number"; // only keep real data rows
  })
  .map((dateKey) => {
    const date = new Date(dateKey);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      net: getDaily("total_net_rev")[dateKey] || 0,
      newNet: getDaily("new_net_rev")[dateKey] || 0,
      retNet: getDaily("returning_net_rev")[dateKey] || 0,
    };
  });

  // ── Website tab data (from JSON) ──

  const TRAFFIC_LIVE = (() => {
    const tc = data.traffic_channel || [];
    const cw = tc.filter(r => r['CW PW Tag'] === 'CW');
    const pw = tc.filter(r => r['CW PW Tag'] === 'PW');
    return cw.map(c => {
      const p = pw.find(r => r['Traffic Category'] === c['Traffic Category']) || {};
      return {
        ch: c['Traffic Category'],
        cS: Number(c['sum Sessions']) || 0,
        cAtc: Number(c['sum Add-to-carts']) || 0,
        cTx: Number(c['sum Transactions']) || 0,
        cRev: Number(c['sum Revenue']) || 0,
        pS: Number(p['sum Sessions']) || 0,
        pAtc: Number(p['sum Add-to-carts']) || 0,
        pTx: Number(p['sum Transactions']) || 0,
        pRev: Number(p['sum Revenue']) || 0,
      };
    });
  })();

  const PV_TYPES_LIVE = [
    { key: 'pageview_pdp', type: 'Products' },
    { key: 'pageview_cp', type: 'Collections' },
    { key: 'pageview_blog', type: 'Blog' },
    { key: 'pageview_lp', type: 'Landing Pages' },
    { key: 'pageview_other', type: 'Other' },
  ].map(({ key, type }) => {
    const rows = data[key] || [];
    const sessions = rows.reduce((a, r) => a + (Number(r['sum Sessions']) || 0), 0);
    const atc = rows.reduce((a, r) => a + (Number(r['sum Add-to-carts']) || 0), 0);
    const bounces = rows.reduce((a, r) => a + (Number(r['sum Bounces']) || 0), 0);
    return {
      type,
      sessions,
      atc,
      bounces,
      pages: rows.length,
      br: sessions > 0 ? +(bounces / sessions * 100).toFixed(1) : 0,
      ar: sessions > 0 ? +(atc / sessions * 100).toFixed(1) : 0,
    };
  });

  const LP_ALL_LIVE = (data.landing_pages_top25 || []).map(r => {
    const s = Number(r['sum Sessions']) || 0;
    const atc = Number(r['sum Add-to-carts']) || 0;
    const tx = Number(r['sum Transactions']) || 0;
    return {
      lp: r['Landing Page URL'],
      s,
      atc,
      ar: s > 0 ? +(atc / s * 100).toFixed(1) : 0,
      tx,
      cr: s > 0 ? +(tx / s * 100).toFixed(2) : 0,
      rev: Number(r['sum Revenue']) || 0,
    };
  });

  const LP_CH_LIVE = (() => {
    const rows = data.landing_pages_channel || [];
    const grouped = {};
    rows.forEach(r => {
      const cat = r['Traffic Category'];
      if (!grouped[cat]) grouped[cat] = [];
      const s = Number(r['sum Sessions']) || 0;
      const atc = Number(r['sum Add-to-carts']) || 0;
      const tx = Number(r['sum Transactions']) || 0;
      grouped[cat].push({
        lp: r['Landing Page URL'],
        s,
        atc,
        ar: s > 0 ? +(atc / s * 100).toFixed(1) : 0,
        tx,
        cr: s > 0 ? +(tx / s * 100).toFixed(2) : 0,
        rev: Number(r['sum Revenue']) || 0,
      });
    });
    return grouped;
  })();

  // ── Marketing campaign data (from JSON) ──

  const buildCampData = (rows, typeField) => {
    const cw = rows.filter(r => r['CW & PW'] === 'CW');
    const pw = rows.filter(r => r['CW & PW'] === 'PW');
    return cw.map(c => {
      const p = pw.find(r => r['Campaign name'] === c['Campaign name']) || {};
      const cS = Number(c['Spend']) || 0;
      const cR = Number(c['Revenue']) || 0;
      const cX = Number(c['ROAS']) || 0;
      const pS = Number(p['Spend']) || 0;
      const pX = Number(p['ROAS']) || 0;
      return {
        name: c['Campaign name'],
        [typeField]: c[typeField === 'type' ? 'Campaign Type' : 'Brand vs. Non-Brand'] || '',
        cS, cR, cX, pS, pX,
        wS: pS > 0 ? ((cS - pS) / pS) * 100 : null,
        wX: pX > 0 ? ((cX - pX) / pX) * 100 : null,
      };
    }).sort((a, b) => b.cS - a.cS);
  };

  const META_LIVE = buildCampData(data.meta_ads || [], 'type');
  const GOOG_LIVE = buildCampData(data.google_ads || [], 'brand');

  const mtdROAS=DD.mtdMktSpend?(DD.mtdNewNet/DD.mtdMktSpend).toFixed(2):"—";
  const tabs=[{id:"overview",l:"Overview",i:"📊"},{id:"revenue",l:"Revenue",i:"💰"},{id:"products",l:"Products",i:"👠"},{id:"inventory",l:"Inventory",i:"📦"},{id:"returns",l:"Returns",i:"📦"},{id:"marketing",l:"Marketing",i:"📣"},{id:"website",l:"Website",i:"🌐"}];
  const rv = revF === "new" ? {
    gross: DD.newGross, priorGross: DD.priorNewGross,
    discounts: DD.newDiscounts, priorDiscounts: DD.priorNewDiscounts,
    gld: DD.newGld, priorGld: DD.priorNewGld,
    returns: DD.newReturns, priorReturns: DD.priorNewReturns,
    net: DD.newNetRev, priorNet: DD.priorNewNetRev, netPlan: DD.newNetRevPlan,
    orders: DD.newCustomers, priorOrders: DD.priorNewCustomers,
    items: DD.newItems, priorItems: DD.priorNewItems,
    discPct: DD.newDiscPctGross, priorDiscPct: DD.priorNewDiscPctGross,
    returnPctGLD: DD.newReturnPctGLD, priorReturnPctGLD: DD.priorNewReturnPctGLD,
    gldAOV: DD.newGldAOV, priorGldAOV: DD.priorNewGldAOV,
    netAOV: DD.newNetAOV, priorNetAOV: DD.priorNewNetAOV,
    aur: DD.newAur, priorAur: DD.priorNewAur,
    upt: DD.newUpt, priorUpt: DD.priorNewUpt,
  } : revF === "returning" ? {
    gross: DD.retGross, priorGross: DD.priorRetGross,
    discounts: DD.retDiscounts, priorDiscounts: DD.priorRetDiscounts,
    gld: DD.retGld, priorGld: DD.priorRetGld,
    returns: DD.retReturns, priorReturns: DD.priorRetReturns,
    net: DD.repeatNetRev, priorNet: DD.priorRepeatNetRev, netPlan: DD.repeatNetRevPlan,
    orders: DD.retOrders, priorOrders: DD.priorRetOrders,
    items: DD.retItems, priorItems: DD.priorRetItems,
    discPct: DD.retDiscPctGross, priorDiscPct: DD.priorRetDiscPctGross,
    returnPctGLD: DD.retReturnPctGLD, priorReturnPctGLD: DD.priorRetReturnPctGLD,
    gldAOV: DD.retGldAOV, priorGldAOV: DD.priorRetGldAOV,
    netAOV: DD.retNetAOV, priorNetAOV: DD.priorRetNetAOV,
    aur: DD.retAur, priorAur: DD.priorRetAur,
    upt: DD.retUpt, priorUpt: DD.priorRetUpt,
  } : {
    gross: DD.grossRevenue, priorGross: DD.priorGross,
    discounts: DD.discounts, priorDiscounts: DD.priorDiscounts,
    gld: DD.gld, priorGld: DD.priorGld,
    returns: DD.returns, priorReturns: DD.priorReturns,
    net: DD.netRevenue, priorNet: DD.priorNet, netPlan: DD.netPlan,
    orders: DD.orders, priorOrders: DD.priorOrders,
    items: DD.items, priorItems: DD.priorItems,
    discPct: DD.discPctGross, priorDiscPct: DD.priorDiscPctGross,
    returnPctGLD: DD.returnPctGLD, priorReturnPctGLD: DD.priorReturnPctGLD,
    gldAOV: DD.gldAOV, priorGldAOV: DD.priorGldAOV,
    netAOV: DD.netAOV, priorNetAOV: DD.priorNetAOV,
    aur: DD.aur, priorAur: DD.priorAur,
    upt: DD.upt, priorUpt: DD.priorUpt,
  };

  return (
    <div style={{fontFamily:"'DM Sans','Inter',system-ui,sans-serif",background:"#f1f5f9",minHeight:"100vh",color:C.sl}}>
      <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#1e40af 100%)",color:"#fff",padding:"20px 24px 14px"}}>
        <div><div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",opacity:0.6,marginBottom:4}}>Sarah Flint</div>
        <h1 style={{fontSize:22,fontWeight:700,margin:0}}>Weekly Performance Dashboard</h1>
        <div style={{fontSize:13,opacity:0.7,marginTop:4}}>{meta.quarter} · {meta.week} · {meta.dateRange}</div></div>
        <div style={{display:"flex",gap:2,marginTop:16,overflowX:"auto"}}>
          {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:tab===t.id?"rgba(255,255,255,0.15)":"transparent",border:"none",borderBottom:tab===t.id?"2px solid #93c5fd":"2px solid transparent",color:tab===t.id?"#fff":"rgba(255,255,255,0.55)",padding:"8px 12px",fontSize:13,fontWeight:600,cursor:"pointer",borderRadius:"8px 8px 0 0",whiteSpace:"nowrap"}}><span style={{marginRight:4}}>{t.i}</span>{t.l}</button>)}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"20px 16px 40px"}}>

{/* ═══ OVERVIEW ═══ */}
{tab==="overview"&&<>
  {/* Plan Comparison Table */}
{(() => {
  const varAbs = (actual, plan) =>
    actual != null && plan != null ? actual - plan : null;
  const varPct = (actual, plan) =>
    actual != null && plan ? ((actual - plan) / plan) * 100 : null;
  const fmt = (v, pre = "") =>
    v == null || Number.isNaN(v) ? "—" : `${pre}${Math.round(v).toLocaleString()}`;
  const fmtPct = (v) =>
    v == null || Number.isNaN(v) ? "—" : `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`;
  const pTh = {
    textAlign: "right",
    padding: "6px 6px",
    color: C.sL,
    fontWeight: 600,
    fontSize: 10,
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  };

  const pTd = (v, col) => ({
    padding: "9px 6px",
    textAlign: col === 0 ? "left" : "right",
    fontWeight: col === 0 ? 600 : 500,
    color: col === 0 ? C.nv : "inherit"
  });

const rows = [
  {
    l: "GROSS REV ($000s)",
    wa: Math.round(DD.grossRevenue / 1000),
    wp: Math.round(DD.grossPlan / 1000),
    ma: Math.round(DD.mtdGross / 1000),
    mp: Math.round(DD.mtdGrossPlan / 1000),
    qa: Math.round(DD.qtdGross / 1000),
    qp: Math.round(DD.qtdGrossPlan / 1000),
    dl: true
  },
  {
    l: "NET REV ($000s)",
    wa: Math.round(DD.netRevenue / 1000),
    wp: Math.round(DD.netPlan / 1000),
    ma: Math.round(DD.mtdNet / 1000),
    mp: Math.round(DD.mtdNetPlan / 1000),
    qa: Math.round(DD.qtdNet / 1000),
    qp: Math.round(DD.qtdNetPlan / 1000),
    dl: true
  },
  {
    l: "NEW CUSTOMERS",
    wa: DD.newCustomers,
    wp: DD.newCustomersPlan,
    ma: DD.mtdNewCust,
    mp: DD.mtdNewCustPlan,
    qa: DD.qtdNewCust,
    qp: DD.qtdNewCustPlan,
    dl: false
  }
];

  return (
    <div style={{ background: C.cd, borderRadius: 12, border: `1px solid ${C.bd}`, padding: 20, marginBottom: 14, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            <td style={{ padding: "8px 8px", fontWeight: 700, color: C.nv, fontSize: 13 }}>PLAN COMPARISON</td>
            {[meta.week || "WEEK", "MTD", "QTD"].map(p => (
              <td key={p} colSpan={4} style={{ textAlign: "center", padding: "0 1px" }}>
                <div style={{ background: C.b1, color: "#fff", padding: "5px 0", fontWeight: 700, fontSize: 11, letterSpacing: 0.4, borderRadius: "4px 4px 0 0" }}>
                  {p}
                </div>
              </td>
            ))}
          </tr>
          <tr style={{ borderBottom: `2px solid ${C.bd}` }}>
            <td />
            {["Actual", "Plan", "Var", "Var %"].map(h => <td key={"w" + h} style={pTh}>{h}</td>)}
            {["Actual", "Plan", "Var", "Var %"].map(h => <td key={"m" + h} style={pTh}>{h}</td>)}
            {["Actual", "Plan", "Var", "Var %"].map(h => <td key={"q" + h} style={pTh}>{h}</td>)}
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => {
            const pre = r.dl ? "$" : "";

            const wVar = varAbs(r.wa, r.wp);
            const wPct = varPct(r.wa, r.wp);

            const mVar = varAbs(r.ma, r.mp);
            const mPct = varPct(r.ma, r.mp);

            const qVar = varAbs(r.qa, r.qp);
            const qPct = varPct(r.qa, r.qp);

            const cellColor = (v) => v == null ? C.nv : v >= 0 ? C.gn : C.rd;

            return (
              <tr key={i} style={{ borderBottom: `1px dashed ${C.bd}` }}>
                <td style={pTd(0, 0)}>{r.l}</td>

                <td style={{ ...pTd(0, 1), fontWeight: 600 }}>{fmt(r.wa, pre)}</td>
                <td style={{ ...pTd(0, 1), color: C.sL }}>{fmt(r.wp, pre)}</td>
                <td style={{ ...pTd(0, 1), color: cellColor(wVar), fontWeight: 600 }}>{wVar >= 0 ? "+" : ""}{fmt(wVar, pre)}</td>
                <td style={{ ...pTd(0, 1), color: cellColor(wPct), fontWeight: 600 }}>{fmtPct(wPct)}</td>

                <td style={{ ...pTd(0, 1), fontWeight: 600 }}>{fmt(r.ma, pre)}</td>
                <td style={{ ...pTd(0, 1), color: C.sL }}>{fmt(r.mp, pre)}</td>
                <td style={{ ...pTd(0, 1), color: cellColor(mVar), fontWeight: 600 }}>{mVar >= 0 ? "+" : ""}{fmt(mVar, pre)}</td>
                <td style={{ ...pTd(0, 1), color: cellColor(mPct), fontWeight: 600 }}>{fmtPct(mPct)}</td>

                <td style={{ ...pTd(0, 1), fontWeight: 600 }}>{fmt(r.qa, pre)}</td>
                <td style={{ ...pTd(0, 1), color: C.sL }}>{fmt(r.qp, pre)}</td>
                <td style={{ ...pTd(0, 1), color: cellColor(qVar), fontWeight: 600 }}>{qVar >= 0 ? "+" : ""}{fmt(qVar, pre)}</td>
                <td style={{ ...pTd(0, 1), color: cellColor(qPct), fontWeight: 600 }}>{fmtPct(qPct)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
})()}

{/* Weekly KPIs */}
<SH t={`${meta.week.replace("WEEK", "Week")} Performance`} icon="📈"/>

<div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:6}}>
  {weeklyKpis.map((kpi) => {
    const vsPlan = pctVar(kpi.value, kpi.planValue);
    const vsPw = pctVar(kpi.value, kpi.prior);

    return (
      <MC
        key={kpi.l}
        l={kpi.l}
        v={fmtKpi(kpi.value, kpi.format)}
        ww={vsPw}
        pL={fmtKpi(kpi.prior, kpi.format)}
        inv={kpi.inv}
        sub={
          kpi.planValue != null ? (
            <>
              Plan: {fmtKpi(kpi.planValue, kpi.format)}{" "}
              <span
                style={{
                  marginLeft: 6,
                  fontWeight: 700,
                  color:
                    vsPlan == null
                      ? C.sL
                      : (kpi.inv ? vsPlan < 0 : vsPlan > 0)
                      ? C.gn
                      : C.rd
                }}
              >
                {fmtVar(vsPlan)}
              </span>
            </>
          ) : kpi.subOverride ?? null
        }
      />
    );
  })}
</div>

  <Src t="SF Supermetrics → Exhibits (rows 10–34, 62–76) + Traffic (R9: ATC Rate); Plan: Finance Plan Wkly"/>

 {/* Weekly Trend Chart */}
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <div style={{fontSize:14,fontWeight:700,color:C.nv,marginBottom:14}}>Net Revenue – Weekly (New vs. Returning)</div>
    <ResponsiveContainer width="100%" height={230}>
      <ComposedChart data={WEEKLY_TREND_LIVE}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="week" tick={{fontSize:11,fill:C.sL}}/><YAxis tick={{fontSize:11,fill:C.sL}} tickFormatter={v=>`${v<0?"-":""}$${(Math.abs(v)/1000).toFixed(0)}K`}/><Tooltip content={<CT/>}/>
        <Bar dataKey="newNet" stackId="a" fill={C.b1} name="New Net Rev"/>
        <Bar dataKey="retNet" stackId="a" fill={C.b3} radius={[4,4,0,0]} name="Returning Net Rev"/>
        <Line dataKey="plan" stroke={C.sL} strokeDasharray="5 5" dot={false} name="Plan" strokeWidth={2}/>
      </ComposedChart>
    </ResponsiveContainer>
    <Src t="SF Supermetrics → DShopify (new/ret net by week) + Finance Plan Wkly (plan line)"/>
  </div>

  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
    <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20}}>
      <div style={{fontSize:14,fontWeight:700,color:C.nv,marginBottom:10}}>Revenue by Customer Type</div>
      <ResponsiveContainer width="100%" height={160}><PieChart><Pie data={[{name:"New",value:Math.round(DD.newNetRev/(DD.newNetRev+DD.repeatNetRev)*100)},{name:"Returning",value:Math.round(DD.repeatNetRev/(DD.newNetRev+DD.repeatNetRev)*100)}]} innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value"><Cell fill={C.b1}/><Cell fill={C.b3}/></Pie><Tooltip formatter={v=>`${v}%`}/><Legend iconType="circle" wrapperStyle={{fontSize:11}}/></PieChart></ResponsiveContainer>
      <div style={{display:"flex",justifyContent:"space-around",fontSize:12,marginTop:4}}>
        <div style={{textAlign:"center"}}><div style={{fontWeight:700,color:C.b1}}>{fmt(DD.newNetRev)}</div><div style={{color:C.sL}}>New</div></div>
        <div style={{textAlign:"center"}}><div style={{fontWeight:700,color:C.b3}}>{fmt(DD.repeatNetRev)}</div><div style={{color:C.sL}}>Returning</div></div>
      </div>
      <Src t="SF Supermetrics → Exhibits (rows 15–16)"/>
    </div>
  </div>
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["gross","gld","net","discPct","retPct","newCust","retOrders","mktSpend","newNetROAS","sessions","conv","engagement","atcRate"]}/>
</>}

{/* ═══ REVENUE TAB ═══ */}
{tab==="revenue"&&<>
    <div style={{display:"flex",gap:4,marginBottom:14}}>
      {["all","new","returning"].map(f=><button key={f} onClick={()=>setRevF(f)} style={{background:revF===f?C.b1:C.cd,color:revF===f?"#fff":C.sl,border:`1px solid ${revF===f?C.b1:C.bd}`,borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{f==="all"?"All":f==="new"?"New":"Returning"}</button>)}
    </div>

    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
      <MC l="Gross Revenue" v={ff(rv.gross)} ww={w(rv.gross,rv.priorGross)} sub={`PW: ${ff(rv.priorGross)}`}/>
      <MC l="Discounts" v={ff(rv.discounts)} ww={w(rv.discounts,rv.priorDiscounts)} inv sub={`PW: ${ff(rv.priorDiscounts)}`}/>
      <MC l="Returns" v={ff(rv.returns)} ww={w(rv.returns,rv.priorReturns)} inv sub={`PW: ${ff(rv.priorReturns)}`}/>
      <MC l="Net Revenue" v={ff(rv.net)} ww={w(rv.net,rv.priorNet)} sub={rv.netPlan != null ? `Plan: ${ff(rv.netPlan)}` : `PW: ${ff(rv.priorNet)}`}/>
    </div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
      <MC l="Orders" v={rv.orders} ww={w(rv.orders,rv.priorOrders)} sub={`PW: ${rv.priorOrders}`}/>
      <MC l="Items" v={rv.items} ww={w(rv.items,rv.priorItems)} sub={`PW: ${rv.priorItems}`}/>
      <MC l="Discount %" v={rv.discPct!=null?`${rv.discPct.toFixed(1)}%`:"—"} ww={w(rv.discPct,rv.priorDiscPct)} inv sub={rv.priorDiscPct!=null?`PW: ${rv.priorDiscPct.toFixed(1)}%`:""}/>
      <MC l="Returns % GLD" v={rv.returnPctGLD!=null?`${rv.returnPctGLD.toFixed(1)}%`:"—"} ww={w(rv.returnPctGLD,rv.priorReturnPctGLD)} inv sub={rv.priorReturnPctGLD!=null?`PW: ${rv.priorReturnPctGLD.toFixed(1)}%`:""}/>
    </div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:6}}>
      <MC l="GLD AOV" v={rv.gldAOV!=null?`$${Math.round(rv.gldAOV)}`:"—"} ww={w(rv.gldAOV,rv.priorGldAOV)} sub={rv.priorGldAOV!=null?`PW: $${Math.round(rv.priorGldAOV)}`:""}/>
      <MC l="Net AOV" v={rv.netAOV!=null?`$${Math.round(rv.netAOV)}`:"—"} ww={w(rv.netAOV,rv.priorNetAOV)} sub={rv.priorNetAOV!=null?`PW: $${Math.round(rv.priorNetAOV)}`:""}/>
      <MC l="AUR" v={rv.aur!=null?`$${Math.round(rv.aur)}`:"—"} ww={w(rv.aur,rv.priorAur)} sub="GLD ÷ Units"/>
      <MC l="UPT" v={rv.upt!=null?rv.upt.toFixed(2):"—"} ww={w(rv.upt,rv.priorUpt)} sub="Units ÷ Orders"/>
    </div>
    <Src t="SF Supermetrics → Exhibits; Product Sales Report; Plan from Finance Plan"/>

  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14,marginTop:14}}>
    <div style={{fontSize:14,fontWeight:700,color:C.nv,marginBottom:14}}>Daily Net Revenue – {meta.week} {revF!=="all"?`(${revF==="new"?"New":"Returning"})`:""}</div>
    <ResponsiveContainer width="100%" height={220}><ComposedChart data={DAILY_LIVE}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="day" tick={{fontSize:11,fill:C.sL}}/><YAxis tick={{fontSize:11,fill:C.sL}} tickFormatter={v=>`${v<0?"-":""}$${(Math.abs(v)/1000).toFixed(0)}K`}/><Tooltip content={<CT/>}/>
      <Bar dataKey={revF==="new"?"newNet":revF==="returning"?"retNet":"newNet"} stackId={revF==="all"?"stack":undefined} fill={C.b1} radius={revF==="all"?[0,0,0,0]:[4,4,0,0]} name={revF==="all"?"New Net Rev":"Net Revenue"}/>
      {revF==="all"&&<Bar dataKey="retNet" stackId="stack" fill={C.b3} radius={[4,4,0,0]} name="Returning Net Rev"/>}
    </ComposedChart></ResponsiveContainer>
    <Src t="SF Supermetrics → DShopify (daily net revenue)"/>
  </div>

  <SH t="New vs. Returning Comparison" icon="👥"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:8,overflowX:"auto"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["Metric","New CW","New PW","WoW","Ret CW","Ret PW","WoW"].map(h=><th key={h} style={{textAlign:h==="Metric"?"left":"right",padding:"7px 9px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
    </tr></thead><tbody>{[
      {m:"Net Revenue",nc:ff(DD.newNetRev),np:ff(DD.priorNewNetRev),nw:w(DD.newNetRev,DD.priorNewNetRev),rc:ff(DD.repeatNetRev),rp:ff(DD.priorRepeatNetRev),rw:w(DD.repeatNetRev,DD.priorRepeatNetRev)},
      {m:"Orders",nc:DD.newCustomers,np:DD.priorNewCustomers,nw:w(DD.newCustomers,DD.priorNewCustomers),rc:DD.retOrders,rp:DD.priorRetOrders,rw:w(DD.retOrders,DD.priorRetOrders)},
      {m:"GLD AOV",nc:DD.newGldAOV!=null?`$${Math.round(DD.newGldAOV)}`:"—",np:DD.priorNewGldAOV!=null?`$${Math.round(DD.priorNewGldAOV)}`:"—",nw:w(DD.newGldAOV,DD.priorNewGldAOV),rc:DD.retGldAOV!=null?`$${Math.round(DD.retGldAOV)}`:"—",rp:DD.priorRetGldAOV!=null?`$${Math.round(DD.priorRetGldAOV)}`:"—",rw:w(DD.retGldAOV,DD.priorRetGldAOV)},
      {m:"Net AOV",nc:DD.newNetAOV!=null?`$${Math.round(DD.newNetAOV)}`:"—",np:DD.priorNewNetAOV!=null?`$${Math.round(DD.priorNewNetAOV)}`:"—",nw:w(DD.newNetAOV,DD.priorNewNetAOV),rc:DD.retNetAOV!=null?`$${Math.round(DD.retNetAOV)}`:"—",rp:DD.priorRetNetAOV!=null?`$${Math.round(DD.priorRetNetAOV)}`:"—",rw:w(DD.retNetAOV,DD.priorRetNetAOV)},
      {m:"Disc %",nc:DD.newDiscPctGross!=null?`${DD.newDiscPctGross.toFixed(1)}%`:"—",np:DD.priorNewDiscPctGross!=null?`${DD.priorNewDiscPctGross.toFixed(1)}%`:"—",nw:w(DD.newDiscPctGross,DD.priorNewDiscPctGross),rc:DD.retDiscPctGross!=null?`${DD.retDiscPctGross.toFixed(1)}%`:"—",rp:DD.priorRetDiscPctGross!=null?`${DD.priorRetDiscPctGross.toFixed(1)}%`:"—",rw:w(DD.retDiscPctGross,DD.priorRetDiscPctGross),inv:true},
      {m:"Return % GLD",nc:DD.newReturnPctGLD!=null?`${DD.newReturnPctGLD.toFixed(1)}%`:"—",np:DD.priorNewReturnPctGLD!=null?`${DD.priorNewReturnPctGLD.toFixed(1)}%`:"—",nw:w(DD.newReturnPctGLD,DD.priorNewReturnPctGLD),rc:DD.retReturnPctGLD!=null?`${DD.retReturnPctGLD.toFixed(1)}%`:"—",rp:DD.priorRetReturnPctGLD!=null?`${DD.priorRetReturnPctGLD.toFixed(1)}%`:"—",rw:w(DD.retReturnPctGLD,DD.priorRetReturnPctGLD),inv:true}].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
      <td style={{padding:"8px 9px",fontWeight:600,color:C.nv}}>{r.m}</td><td style={{padding:"8px 9px",textAlign:"right"}}>{r.nc}</td><td style={{padding:"8px 9px",textAlign:"right",color:C.sL}}>{r.np}</td><td style={{padding:"8px 9px",textAlign:"right"}}><Pill v={r.nw} inv={r.inv}/></td>
      <td style={{padding:"8px 9px",textAlign:"right",borderLeft:`2px solid ${C.bd}`}}>{r.rc}</td><td style={{padding:"8px 9px",textAlign:"right",color:C.sL}}>{r.rp}</td><td style={{padding:"8px 9px",textAlign:"right"}}><Pill v={r.rw} inv={r.inv}/></td>
    </tr>)}</tbody></table>
    <Src t="SF Supermetrics → Exhibits (rows 36–59)"/>
  </div>
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["gross","disc","gld","ret","net","discPct","retPct","aov","netAOV","aur","upt"]}/>
</>}




{/* ═══ PRODUCTS ═══ */}
{tab==="products"&&(()=>{
  const pf = prodFilter;
  const gldKey = pf==="new"?"n_gld7":pf==="returning"?"r_gld7":"gld7";
  const unitKey = pf==="new"?"n_gu_7":pf==="returning"?"r_gu_7":"gu_7";
  const rankKey = pf==="new"?"new_rank":pf==="returning"?"returning_rank":"total_rank";

  const allSkus = data.product_sku || [];

  // Shared aggregation helper
  const aggregateBy = (rows, keyField, gk, uk) => {
    const map = {};
    const totGld = rows.reduce((a,r)=>a+(Number(r[gk])||0),0);
    rows.forEach(r=>{
      const n=r[keyField]||"Other";
      if(!map[n]) map[n]={n,gld:0,u:0,oh:0,gu90:0};
      map[n].gld+=Number(r[gk])||0;
      map[n].u+=Number(r[uk])||0;
      map[n].oh+=Number(r.u_oh)||0;
      map[n].gu90+=Number(r.gu_90)||0;
    });
    return { totGld, data: Object.values(map).filter(s=>s.gld>0).map(s=>({
      ...s,
      aur:s.u>0?Math.round(s.gld/s.u):0,
      p:totGld>0?+((s.gld/totGld)*100).toFixed(1):0,
      st:(s.oh+s.gu90)>0?+((s.gu90/(s.oh+s.gu90))*100).toFixed(1):0,
      woh:s.u>0?Math.round(s.oh/Math.max(s.u,s.gu90/90*7)):0,
    })).sort((a,b)=>b.gld-a.gld) };
  };

  const {totGld: totGldAll, data: styData} = aggregateBy(allSkus, 'style_name', gldKey, unitKey);
  const {data: catData} = aggregateBy(allSkus, 'm_class', gldKey, unitKey);
  const {data: mcData} = aggregateBy(allSkus, 'merch_cat', gldKey, unitKey);

  // Build SKU list
  const skuData = allSkus.map(r=>({
    s:r.sku, n:r.style_name, c:r.color_name,
    gld:Number(r[gldKey])||0, u:Number(r[unitKey])||0,
    aur:(Number(r[unitKey])||0)>0?Math.round((Number(r[gldKey])||0)/(Number(r[unitKey])||0)):0,
    oh:Number(r.u_oh)||0, rank:Number(r[rankKey])||999,
  })).filter(s=>s.gld>0).sort((a,b)=>a.rank-b.rank);

  const styles = styData.filter(s=>s.n.toLowerCase().includes(search.toLowerCase()));
  const shown = showAll ? styles : styles.slice(0,10);
  const skuShown = showAll ? skuData : skuData.slice(0,10);
  const custLabel = pf==="new"?"NEW CUSTOMERS":pf==="returning"?"RETURNING CUSTOMERS":"ALL CUSTOMERS";
  const tblS = {width:"100%",borderCollapse:"collapse",fontSize:11};
  const textCols = new Set(["Style","Category","Merch Category","SKU","Color"]);
  const th = (h) => ({textAlign:textCols.has(h)?"left":"right",padding:"6px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase",whiteSpace:"nowrap"});
  const td = (a) => ({padding:"7px 6px",textAlign:a||"right"});
  const totGld = styles.reduce((a,r)=>a+r.gld,0);
  const totU = styles.reduce((a,r)=>a+r.u,0);
  return <>
  <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
    {["all","new","returning"].map(f=><button key={f} onClick={()=>setProdFilter(f)} style={{background:pf===f?C.b1:C.cd,color:pf===f?"#fff":C.sl,border:`1px solid ${pf===f?C.b1:C.bd}`,borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{f==="all"?"All Customers":f==="new"?"New":"Returning"}</button>)}
    <div style={{flex:1}}/>
    <button onClick={()=>setShowAll(!showAll)} style={{background:showAll?C.b2:C.cd,color:showAll?"#fff":C.sl,border:`1px solid ${showAll?C.b2:C.bd}`,borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{showAll?"Top 10":"All Styles"}</button>
    <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{border:`1px solid ${C.bd}`,borderRadius:8,padding:"7px 12px",fontSize:12,width:150,outline:"none"}}/>
  </div>

  {/* TOP STYLES */}
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:16,marginBottom:12,overflowX:"auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
      <span style={{fontSize:13,fontWeight:700,color:C.nv}}>{custLabel} – TOP STYLES {showAll?"":"(Top 10)"}</span>
      <span style={{fontSize:11,color:C.sL}}>{shown.length} of {styles.length} styles</span>
    </div>
    <table style={tblS}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["#","Style","GLD $","Units","AUR","% TTL","OH","ST %","WOH"].map(h=><th key={h} style={th(h)}>{h}</th>)}
    </tr></thead><tbody>
      {shown.map((s,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{...td("right"),color:C.sL,width:20}}>{i+1}</td>
          <td style={{...td("left"),fontWeight:600,color:C.nv,maxWidth:180}}>{s.n}</td>
          <td style={{...td(),fontWeight:600}}>{ff(s.gld)}</td>
          <td style={td()}>{s.u}</td><td style={td()}>${s.aur}</td><td style={td()}>{s.p}%</td>
          <td style={td()}><span style={{color:s.oh<150?C.rd:s.oh<300?C.am:C.sl,fontWeight:s.oh<150?700:400}}>{s.oh>0?s.oh.toLocaleString():"–"}</span></td>
          <td style={td()}><div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:4}}><div style={{width:36,height:4,background:C.b4,borderRadius:2,overflow:"hidden"}}><div style={{width:`${Math.min(s.st*4,100)}%`,height:"100%",background:s.st>10?C.gn:C.b2,borderRadius:2}}/></div>{s.st}%</div></td>
          <td style={{...td(),fontSize:10,color:s.woh>100?C.rd:s.woh>50?C.am:C.sl}}>{s.woh>0?s.woh+"w":"–"}</td>
        </tr>
      ))}
      <tr style={{borderTop:`2px solid ${C.bd}`,background:"#f8fafc",fontWeight:600}}>
        <td colSpan={2} style={{...td("left"),fontWeight:700,color:C.nv}}>Total ({styles.length} styles)</td>
        <td style={{...td(),fontWeight:700}}>{ff(totGld)}</td>
        <td style={td()}>{totU}</td><td style={td()}>${totU>0?Math.round(totGld/totU):0}</td>
        <td style={td()}>100%</td><td colSpan={3}/>
      </tr>
    </tbody></table>
    <Src t="SF Product Sales Data → Product Pivots + OH Report"/>
  </div>

  {/* TOP SKUS */}
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:16,marginBottom:12,overflowX:"auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
      <span style={{fontSize:13,fontWeight:700,color:C.nv}}>{custLabel} – TOP SKUS {showAll?"":"(Top 10)"}</span>
      <span style={{fontSize:11,color:C.sL}}>{skuShown.length} of {skuData.length} SKUs</span>
    </div>
    <table style={tblS}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["#","SKU","Style","Color","GLD $","Units","AUR","OH"].map(h=><th key={h} style={th(h)}>{h}</th>)}
    </tr></thead><tbody>
      {skuShown.map((s,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{...td("right"),color:C.sL,width:20}}>{i+1}</td>
          <td style={{...td("left"),fontSize:10,color:C.sL,fontFamily:"monospace"}}>{s.s}</td>
          <td style={{...td("left"),fontWeight:600,color:C.nv,maxWidth:160}}>{s.n}</td>
          <td style={{...td("left"),color:C.sL,fontSize:10,maxWidth:120}}>{s.c}</td>
          <td style={{...td(),fontWeight:600}}>{ff(s.gld)}</td>
          <td style={td()}>{s.u}</td><td style={td()}>${s.aur}</td>
          <td style={td()}>{s.oh>0?s.oh.toLocaleString():"–"}</td>
        </tr>
      ))}
    </tbody></table>
    <Src t="SF Product Sales Data → Product Pivots (SKUs) + OH Report"/>
  </div>

  {/* PRODUCT CATEGORY */}
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:16,marginBottom:12,overflowX:"auto"}}>
    <div style={{fontSize:13,fontWeight:700,color:C.nv,marginBottom:8}}>{custLabel} – PRODUCT CATEGORY</div>
    <table style={tblS}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["Category","GLD $","Units","AUR","% TTL","OH","ST %"].map(h=><th key={h} style={th(h)}>{h}</th>)}
    </tr></thead><tbody>
      {catData.map((s,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{...td("left"),fontWeight:600,color:C.nv}}>{s.n}</td>
          <td style={{...td(),fontWeight:600}}>{ff(s.gld)}</td>
          <td style={td()}>{s.u}</td><td style={td()}>${s.aur}</td><td style={td()}>{s.p}%</td>
          <td style={td()}>{s.oh.toLocaleString()}</td><td style={td()}>{s.st}%</td>
        </tr>
      ))}
    </tbody></table>
    <Src t="SF Product Sales Data → Product Pivots (Product Category)"/>
  </div>

  {/* MERCH CATEGORY */}
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:16,marginBottom:12,overflowX:"auto"}}>
    <div style={{fontSize:13,fontWeight:700,color:C.nv,marginBottom:8}}>{custLabel} – MERCH CATEGORY</div>
    <table style={tblS}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["Merch Category","GLD $","Units","AUR","% TTL","OH","ST %"].map(h=><th key={h} style={th(h)}>{h}</th>)}
    </tr></thead><tbody>
      {mcData.map((s,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{...td("left"),fontWeight:600,color:C.nv}}>{s.n}</td>
          <td style={{...td(),fontWeight:600}}>{ff(s.gld)}</td>
          <td style={td()}>{s.u}</td><td style={td()}>${s.aur}</td><td style={td()}>{s.p}%</td>
          <td style={td()}>{s.oh.toLocaleString()}</td><td style={td()}>{s.st}%</td>
        </tr>
      ))}
    </tbody></table>
    <Src t="SF Product Sales Data → Product Pivots (Merch Category)"/>
  </div>

  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["gld","net","aur","aov","st90","woh"]}/>
</>})()}

{/* ═══ INVENTORY ═══ */}
{tab==="inventory"&&(()=>{
  const allSkus = data.product_sku || [];
  const invMClasses = [...new Set(allSkus.map(r=>r.m_class).filter(Boolean))].sort();
  const invMCats = [...new Set(allSkus.map(r=>r.merch_cat).filter(Boolean))].sort();
  const recentSeasons = ["S26","F25","S25"];

  // Filter SKUs
  const filtered = allSkus.filter(r=>{
    if(invSeason==="2024 & Prior"&&recentSeasons.includes(r.sn)) return false;
    if(invSeason!=="All"&&invSeason!=="2024 & Prior"&&r.sn!==invSeason) return false;
    if(invMC!=="All"&&r.m_class!==invMC) return false;
    if(invSC!=="All"&&r.merch_cat!==invSC) return false;
    return true;
  });

  // Group by style
  const styleMap = {};
  filtered.forEach(r=>{
    const n=r.style_name;
    if(!styleMap[n]) styleMap[n]={n,d:r.m_class,skus:[]};
    const oh=Number(r.u_oh)||0;const ov=Number(r.oh_value)||0;
    const u7=Number(r.gu_7)||0;const u90=Number(r.gu_90)||0;
    const stPct=(oh+u90)>0?+((u90/(oh+u90))*100).toFixed(1):0;
    const rate=Math.max(u7,u90/90*7);const skuWoh=rate>0?Math.round(oh/rate):999;
    styleMap[n].skus.push({c:r.color_name,s:r.sn,mc:r.merch_cat,oh,ov,u7,u90,st:stPct,woh:skuWoh});
  });
  const invData = Object.values(styleMap).map(s=>{
    const dOH=s.skus.reduce((a,k)=>a+k.oh,0);
    const dOV=s.skus.reduce((a,k)=>a+k.ov,0);
    const dU7=s.skus.reduce((a,k)=>a+k.u7,0);
    const dU90=s.skus.reduce((a,k)=>a+k.u90,0);
    return {...s,oh:dOH,ov:dOV,u7:dU7,u90:dU90};
  }).sort((a,b)=>b.oh-a.oh);

  const ttlOH=invData.reduce((a,s)=>a+s.oh,0);
  const ttlOV=invData.reduce((a,s)=>a+s.ov,0);
  const ttlU7=invData.reduce((a,s)=>a+s.u7,0);
  const ttlU90=invData.reduce((a,s)=>a+s.u90,0);
  const ttlST=ttlU90>0?((ttlU90/(ttlOH+ttlU90))*100).toFixed(1):"0";
  const btnS=(v,cur)=>({background:cur===v?C.b1:C.cd,color:cur===v?"#fff":C.sl,border:`1px solid ${cur===v?C.b1:C.bd}`,borderRadius:6,padding:"4px 8px",fontSize:10,fontWeight:600,cursor:"pointer"});
  return <>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
    <span style={{fontSize:11,fontWeight:600,color:C.nv,minWidth:90}}>Season:</span>
    {["All","S26","F25","S25","2024 & Prior"].map(v=><button key={v} onClick={()=>setInvSeason(v)} style={btnS(v,invSeason)}>{v}</button>)}
  </div>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
    <span style={{fontSize:11,fontWeight:600,color:C.nv,minWidth:90}}>Product Class:</span>
    {["All",...invMClasses].map(v=><button key={v} onClick={()=>setInvMC(v)} style={btnS(v,invMC)}>{v}</button>)}
  </div>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
    <span style={{fontSize:11,fontWeight:600,color:C.nv,minWidth:90}}>Merch Category:</span>
    {["All",...invMCats].map(v=><button key={v} onClick={()=>setInvSC(v)} style={btnS(v,invSC)}>{v}</button>)}
  </div>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:12}}>
    <MC l="Total OH Units" v={ttlOH.toLocaleString()} sub={`${invData.length} styles`}/>
    <MC l="OH Value" v={`$${(ttlOV/1000).toFixed(0)}K`} sub="At cost"/>
    <MC l="7D Units Sold" v={ttlU7.toLocaleString()} sub="Last 7 days"/>
    <MC l="90D Units Sold" v={ttlU90.toLocaleString()} sub="Last 90 days"/>
    <MC l="90D ST%" v={`${ttlST}%`} sub="90D / (OH + 90D)"/>
  </div>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:16,overflowX:"auto"}}>
    <div style={{fontSize:11,color:C.sL,marginBottom:6}}>Click style to expand color-level detail · Sorted by OH units descending</div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["","Style","OH Units","OH Value","7D Units","90D Units","90D ST%","WOH"].map((h,i)=><th key={h} style={{textAlign:h===""||h==="Style"?"left":"right",padding:"6px 5px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}
    </tr></thead><tbody>{invData.map((s,i)=>{
      const open=expInv[s.n]; const fs=s.skus;
      const dST=s.u90>0?((s.u90/(s.oh+s.u90))*100).toFixed(1):"0.0";
      const rate=Math.max(s.u7,s.u90/90*7);const dWOH=rate>0?Math.round(s.oh/rate):999;
      return <React.Fragment key={i}>
      <tr style={{borderBottom:open?"none":`1px solid ${C.bd}`,cursor:"pointer",background:dWOH>=100?"#fef2f2":dWOH<=8?"#f0fdf4":"transparent"}} onClick={()=>setExpInv(p=>({...p,[s.n]:!p[s.n]}))} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>{e.currentTarget.style.background=dWOH>=100?"#fef2f2":dWOH<=8?"#f0fdf4":"transparent"}}>
        <td style={{padding:"7px 4px",color:C.sL,width:16}}>{open?"▾":"▸"}</td>
        <td style={{padding:"7px 5px",fontWeight:600,color:C.nv}}>{s.n} <span style={{fontSize:9,color:C.sL,fontWeight:400}}>({fs.length} colors)</span></td>
        <td style={{padding:"7px 5px",textAlign:"right",fontWeight:600}}>{s.oh.toLocaleString()}</td>
        <td style={{padding:"7px 5px",textAlign:"right",color:C.sL}}>{ff(s.ov)}</td>
        <td style={{padding:"7px 5px",textAlign:"right",color:s.u7>0?C.gn:C.sL}}>{s.u7}</td>
        <td style={{padding:"7px 5px",textAlign:"right"}}>{s.u90}</td>
        <td style={{padding:"7px 5px",textAlign:"right",fontWeight:500,color:parseFloat(dST)>=25?C.gn:parseFloat(dST)>=10?C.nv:parseFloat(dST)>0?C.am:C.rd}}>{dST}%</td>
        <td style={{padding:"7px 5px",textAlign:"right",fontWeight:600,color:dWOH>=100?C.rd:dWOH>=50?C.am:dWOH<=8?C.gn:C.nv}}>{dWOH>=999?"No sales":dWOH}</td>
      </tr>
      {open&&fs.map((k,j)=>(
        <tr key={j} style={{borderBottom:`1px solid ${C.bd}`,background:"#f8fafc"}}>
          <td/>
          <td style={{padding:"5px 5px 5px 20px",color:C.nv,fontSize:10}}><span style={{fontWeight:500}}>{k.c}</span> <span style={{color:C.sL}}>({k.s}{k.mc?` · ${k.mc}`:""})</span></td>
          <td style={{padding:"5px",textAlign:"right"}}>{k.oh}</td>
          <td style={{padding:"5px",textAlign:"right",color:C.sL}}>{k.ov?ff(k.ov):"–"}</td>
          <td style={{padding:"5px",textAlign:"right",color:k.u7>0?C.gn:C.sL}}>{k.u7}</td>
          <td style={{padding:"5px",textAlign:"right"}}>{k.u90}</td>
          <td style={{padding:"5px",textAlign:"right",color:k.st>=25?C.gn:k.st>=10?C.nv:k.st>0?C.am:C.rd}}>{k.st}%</td>
          <td style={{padding:"5px",textAlign:"right",fontWeight:500,color:k.woh>=100?C.rd:k.woh>=50?C.am:k.woh<=8?C.gn:C.nv}}>{k.woh>=999?"No sales":k.woh}</td>
        </tr>
      ))}
      </React.Fragment>;
    })}</tbody></table>
    <Src t="Product Sales Data → OH Report (active inventory)"/>
  </div>
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["st90","woh","ohVal"]}/>
  </>;
})()}

{/* ═══ RETURNS ═══ */}
{tab==="returns"&&(()=>{
  const rs = data.returns_summary || [];
  const rd = data.returns_details || [];

  // KPI aggregation from returns_summary
  const totalSubmitted = rs.reduce((a,r)=>a+r['count Return ID'],0);
  const totalValue = Math.abs(rs.reduce((a,r)=>a+r['sum Line Item Net'],0));
  const closedReturns = rs.filter(r=>r['Return Status']==='closed'&&r['Outcome']==='Return');
  const closedExchanges = rs.filter(r=>r['Return Status']==='closed'&&r['Outcome']==='Exchange');
  const openRows = rs.filter(r=>r['Return Status']==='open');
  const refundVal = Math.abs(closedReturns.reduce((a,r)=>a+r['sum Line Item Net'],0));
  const refundCount = closedReturns.reduce((a,r)=>a+r['count Return ID'],0);
  const exchVal = Math.abs(closedExchanges.reduce((a,r)=>a+r['sum Line Item Net'],0));
  const exchCount = closedExchanges.reduce((a,r)=>a+r['count Return ID'],0);
  const openVal = Math.abs(openRows.reduce((a,r)=>a+r['sum Line Item Net'],0));
  const openCount = openRows.reduce((a,r)=>a+r['count Return ID'],0);

  // Returns trend from weekly_trend (new_returns + returning_returns)
  const getRetTrend = (metric) => (data.weekly_trend || []).find(r => r.metric === metric) || {};
  const newRetTrend = getRetTrend("new_returns");
  const retRetTrend = getRetTrend("returning_returns");
  const trendWeeks = Object.keys(newRetTrend).filter(k => !isNaN(Number(k))).sort((a,b)=>Number(a)-Number(b));
  const retTrendData = trendWeeks.map(wk => ({
    wk: `Wk ${wk}`,
    newRefund: Math.abs(Number(newRetTrend[wk]) || 0),
    retRefund: Math.abs(Number(retRetTrend[wk]) || 0),
  }));

  // Style-level returns from returns_details
  const retTimeTag = retTimeFilter === "LW" ? "CW" : "p5w";
  const rdFiltered = rd.filter(r => r['Time Tag'] === retTimeTag);
  const styleMap = {};
  rdFiltered.forEach(r => {
    const s = r['Product Title'];
    if (!styleMap[s]) styleMap[s] = { s, count: 0, value: 0 };
    styleMap[s].count += r['count Return ID'];
    styleMap[s].value += Math.abs(r['sum Line Item Net']);
  });
  const totalRefundFiltered = Object.values(styleMap).reduce((a, s) => a + s.value, 0);
  const retStyles = Object.values(styleMap)
    .map(s => ({ ...s, pct: totalRefundFiltered > 0 ? +((s.value / totalRefundFiltered) * 100).toFixed(1) : 0 }))
    .sort((a, b) => b.value - a.value);
  const retStylesShown = retStyles.slice(0, 15);
  const otherStyles = retStyles.slice(15);
  const otherCount = otherStyles.reduce((a, s) => a + s.count, 0);
  const otherValue = otherStyles.reduce((a, s) => a + s.value, 0);
  const otherPct = totalRefundFiltered > 0 ? +((otherValue / totalRefundFiltered) * 100).toFixed(1) : 0;

  // Reason aggregation with parent/sub-reason grouping
  const reasonGroups = {
    "Fit": ["Item Was Too Small", "Item Was Too Large", "Item Did Not Fit"],
    "Purchase Decision": ["Changed My Mind", "Ordered Multiples For Comparison"],
    "Product Issue": ["Item Was Not as Expected/Pictured"],
    "Other": ["I Had a Bad Experience", "Item Arrived Damaged", "Received Incorrect Item"],
  };
  const reasonGroupMap = {};
  Object.entries(reasonGroups).forEach(([g, reasons]) => reasons.forEach(r => { reasonGroupMap[r] = g; }));

  const reasonData = {};
  rdFiltered.forEach(r => {
    const parent = r['Parent Return Reason'];
    const sub = r['Reason'];
    const group = reasonGroupMap[parent] || "Other";
    if (!reasonData[group]) reasonData[group] = { g: group, total: 0, subs: {} };
    reasonData[group].total += r['count Return ID'];
    const subKey = sub || parent;
    if (!reasonData[group].subs[subKey]) reasonData[group].subs[subKey] = 0;
    reasonData[group].subs[subKey] += r['count Return ID'];
  });
  const reasonRows = Object.values(reasonData).sort((a, b) => b.total - a.total);
  const reasonGrandTotal = reasonRows.reduce((a, g) => a + g.total, 0);

  return <>
  {/* KPI Row */}
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="Returns Submitted" v={totalSubmitted} sub={`Total value: ${ff(totalValue)}`}/>
    <MC l="Refunds (Closed)" v={ff(refundVal)} sub={`${refundCount} return orders`}/>
    <MC l="Exchanges (Closed)" v={ff(exchVal)} sub={`${exchCount} exchange orders · revenue retained`}/>
    <MC l="Open Returns" v={ff(openVal)} inv sub={`${openCount} unprocessed`}/>
  </div>
  <Src t="Loop Returns — Returns Summary"/>

  {/* Weekly Trend Chart */}
  {retTrendData.length > 0 && <>
  <SH t="Weekly Return Value Trend" icon="📈"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={retTrendData} margin={{top:4,right:8,left:0,bottom:0}}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.bd}/>
        <XAxis dataKey="wk" tick={{fontSize:11,fill:C.sL}}/>
        <YAxis tick={{fontSize:10,fill:C.sL}} width={52} tickFormatter={v=>`${v<0?"-":""}$${(Math.abs(v)/1000).toFixed(0)}k`}/>
        <Tooltip content={<CT/>}/>
        <Bar dataKey="newRefund" stackId="a" fill={C.b1} radius={[0,0,0,0]} name="New Returns"/>
        <Bar dataKey="retRefund" stackId="a" fill={C.b3} radius={[3,3,0,0]} name="Returning Returns"/>
      </ComposedChart>
    </ResponsiveContainer>
    <div style={{display:"flex",gap:16,marginTop:8,fontSize:11,color:C.sL}}>
      <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,background:C.b1,borderRadius:2,display:"inline-block"}}/>New customer returns</span>
      <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,background:C.b3,borderRadius:2,display:"inline-block"}}/>Returning customer returns</span>
    </div>
    <Src t="Loop Returns — Weekly Trend"/>
  </div>
  </>}

  {/* Top Returned Styles */}
  <SH t="Top Returned Styles" icon="👟"/>
  <div style={{display:"flex",gap:4,marginBottom:8}}>
    {[["LW","This Week"],["L4W","Past 5 Weeks"]].map(([k,label])=><button key={k} onClick={()=>setRetTimeFilter(k)} style={{background:retTimeFilter===k?C.b1:"#fff",color:retTimeFilter===k?"#fff":C.sl,border:`1px solid ${retTimeFilter===k?C.b1:C.bd}`,borderRadius:6,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{label}</button>)}
  </div>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:18,marginBottom:14}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
      <thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
        {["Style","Returns","Refund $","% of Total"].map(h=><th key={h} style={{textAlign:h==="Style"?"left":"right",padding:"5px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
      </tr></thead>
      <tbody>{retStylesShown.map((r,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}}>
          <td style={{padding:"7px 6px",color:C.nv,fontWeight:500}}>{r.s}</td>
          <td style={{padding:"7px 6px",textAlign:"right",fontWeight:600}}>{r.count}</td>
          <td style={{padding:"7px 6px",textAlign:"right",color:C.rd,fontWeight:500}}>{ff(r.value)}</td>
          <td style={{padding:"7px 6px",textAlign:"right"}}><div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:5}}><div style={{width:Math.round(r.pct*1.8),height:6,background:C.am,borderRadius:3,opacity:0.7}}/>{r.pct}%</div></td>
        </tr>
      ))}
      {otherStyles.length>0&&<tr style={{borderBottom:`1px solid ${C.bd}`,background:"rgba(0,0,0,0.03)"}}>
        <td style={{padding:"7px 6px",color:C.sL,fontStyle:"italic"}}>Other ({otherStyles.length} styles)</td>
        <td style={{padding:"7px 6px",textAlign:"right"}}>{otherCount}</td>
        <td style={{padding:"7px 6px",textAlign:"right",color:C.sL}}>{ff(otherValue)}</td>
        <td style={{padding:"7px 6px",textAlign:"right"}}>{otherPct}%</td>
      </tr>}
      <tr style={{borderTop:`2px solid ${C.bd}`,background:"rgba(0,0,0,0.02)"}}>
        <td style={{padding:"7px 6px",fontWeight:700,color:C.nv}}>Total</td>
        <td style={{padding:"7px 6px",textAlign:"right",fontWeight:700}}>{retStyles.reduce((a,s)=>a+s.count,0)}</td>
        <td style={{padding:"7px 6px",textAlign:"right",fontWeight:700,color:C.rd}}>{ff(totalRefundFiltered)}</td>
        <td style={{padding:"7px 6px",textAlign:"right",fontWeight:700}}>100%</td>
      </tr>
      </tbody>
    </table>
    <Src t="Loop Returns — Return Details"/>
  </div>

  {/* Return Reasons */}
  <SH t="Return Reasons" icon="🔍"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.bd}`,background:"#f8fafc"}}>
        <th style={{textAlign:"left",padding:"7px 8px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>Reason</th>
        <th style={{textAlign:"right",padding:"7px 8px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>Count</th>
        <th style={{textAlign:"right",padding:"7px 8px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>% of Total</th>
      </tr></thead>
      <tbody>
        {reasonRows.map((grp,gi)=>{
          const open=expReasons[gi];
          const subRows=Object.entries(grp.subs).sort((a,b)=>b[1]-a[1]);
          return <React.Fragment key={gi}>
            <tr style={{borderBottom:`1px solid ${C.bd}`,cursor:"pointer",background:"#f8fafc"}} onClick={()=>setExpReasons(p=>({...p,[gi]:!p[gi]}))} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="#f8fafc"}>
              <td style={{padding:"8px 8px",fontWeight:700,color:C.nv}}><span style={{marginRight:6,fontSize:10,color:C.sL}}>{open?"▾":"▸"}</span>{grp.g}</td>
              <td style={{padding:"8px 8px",textAlign:"right",fontWeight:700}}>{grp.total}</td>
              <td style={{padding:"8px 8px",textAlign:"right",fontWeight:700}}>{reasonGrandTotal>0?((grp.total/reasonGrandTotal)*100).toFixed(0):0}%</td>
            </tr>
            {open&&subRows.map(([reason,count],ri)=>(
              <tr key={ri} style={{borderBottom:`1px solid ${C.bd}`,background:"#fff"}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                <td style={{padding:"7px 8px 7px 28px",color:C.sl}}>{reason}</td>
                <td style={{padding:"7px 8px",textAlign:"right",color:C.sl}}>{count}</td>
                <td style={{padding:"7px 8px",textAlign:"right",color:C.sL}}>{reasonGrandTotal>0?((count/reasonGrandTotal)*100).toFixed(1):0}%</td>
              </tr>
            ))}
          </React.Fragment>;
        })}
        <tr style={{borderTop:`2px solid ${C.bd}`,background:"#f1f5f9"}}>
          <td style={{padding:"8px 8px",fontWeight:700,color:C.nv}}>Grand Total</td>
          <td style={{padding:"8px 8px",textAlign:"right",fontWeight:700}}>{reasonGrandTotal}</td>
          <td style={{padding:"8px 8px",textAlign:"right",fontWeight:700}}>100%</td>
        </tr>
      </tbody>
    </table>
    <Src t="Loop Returns — Return Reasons"/>
  </div>

  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["gld","ret","retPct","net"]}/>
</>;
})()}

{tab==="marketing"&&<>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="Total Spend" v={ff(DD.mktSpend)} ww={w(DD.mktSpend,DD.priorMktSpend)} inv sub={`PW: ${ff(DD.priorMktSpend)} · MTD: ${ff(DD.mtdMktSpend)}`}/>
    <MC l="New Customers" v={DD.newCustomers} ww={w(DD.newCustomers,DD.priorNewCustomers)} sub={`PW: ${DD.priorNewCustomers} · MTD: ${DD.mtdNewCust}`}/>
    <MC l="CAC" v={ff(Math.round(DD.mktSpend/DD.newCustomers))} ww={w(DD.mktSpend/DD.newCustomers,DD.priorMktSpend/DD.priorNewCustomers)} inv sub={`PW: ${ff(Math.round(DD.priorMktSpend/DD.priorNewCustomers))} · MTD: ${ff(Math.round(DD.mtdMktSpend/DD.mtdNewCust))}`}/>
    <MC l="New Net ROAS" v={nROAS+"x"} ww={w(parseFloat(nROAS),parseFloat(pROAS))} sub={`PW: ${pROAS}x · MTD: ${mtdROAS}x`}/>
  </div>
  <Src t="Supermetrics Exhibits + Finance Plan Wkly"/>

  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="Meta Spend" v={ff(DD.metaSpend)} ww={w(DD.metaSpend,DD.priorMetaSpend)} inv sub={`ROAS: ${DD.metaRoas}x (PW: ${DD.priorMetaRoas}x)`}/>
    <MC l="Google Spend" v={ff(DD.googleSpend)} ww={w(DD.googleSpend,DD.priorGoogleSpend)} inv sub={`ROAS: ${DD.googleRoas}x (PW: ${DD.priorGoogleRoas}x)`}/>
    <MC l="Meta Revenue" v={ff(DD.metaRev)} ww={w(DD.metaRev,DD.priorMetaRev)}/>
    <MC l="Google Revenue" v={ff(DD.googleRev)} ww={w(DD.googleRev,DD.priorGoogleRev)}/>
  </div>

  <SH t="Weekly Marketing Trend" icon="📈"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={WEEKLY_TREND_LIVE}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="week" tick={{fontSize:11,fill:C.sL}}/><YAxis tick={{fontSize:11,fill:C.sL}} tickFormatter={v=>`${v<0?"-":""}$${(Math.abs(v)/1000).toFixed(0)}K`}/><Tooltip content={<CT/>}/>
        <Bar dataKey="spend" fill={C.b3} name="Spend" radius={[3,3,0,0]}/>
        <Line type="monotone" dataKey="newNet" stroke={C.gn} strokeWidth={2} dot={{r:3}} name="New Net Rev"/>
      </ComposedChart>
    </ResponsiveContainer>
    <Src t="Weekly Trend Data (weekly aggregation)"/>
  </div>

  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
    <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:18}}>
      <div style={{fontSize:13,fontWeight:700,color:C.nv,marginBottom:10}}>CAC Trend</div>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={WEEKLY_TREND_LIVE}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="week" tick={{fontSize:10,fill:C.sL}}/><YAxis tick={{fontSize:10,fill:C.sL}}/><Tooltip content={<CT/>}/>
          <Bar dataKey="cac" fill={C.b2} name="CAC" radius={[3,3,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:18}}>
      <div style={{fontSize:13,fontWeight:700,color:C.nv,marginBottom:10}}>New Net ROAS Trend</div>
      <ResponsiveContainer width="100%" height={140}>
        <ComposedChart data={WEEKLY_TREND_LIVE}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="week" tick={{fontSize:10,fill:C.sL}}/>
          <YAxis tick={{fontSize:10,fill:C.sL}}/><Tooltip content={<CT/>}/>
          <Bar dataKey="roas" fill={C.gn} name="ROAS" radius={[3,3,0,0]}/>
          <ReferenceLine y={1.65} stroke={C.rd} strokeDasharray="5 5" label={{value:"Plan 1.65x",fontSize:10,fill:C.rd}}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>

  {(()=>{
    const metaWoW=DD.priorMetaSpend>0?((DD.metaSpend/DD.priorMetaSpend-1)*100).toFixed(1)+"%":"–";
    const googWoW=DD.priorGoogleSpend>0?((DD.googleSpend/DD.priorGoogleSpend-1)*100).toFixed(1)+"%":"–";
    return <>
      <SH t="Campaign Performance" icon="📋"/>
      <CampTbl data={META_LIVE} title="Meta" tSpend={DD.metaSpend} tWow={metaWoW} tRoas={DD.metaRoas+"x"} tRoasW={DD.priorMetaRoas>0?((DD.metaRoas/DD.priorMetaRoas-1)*100).toFixed(1)+"%":"–"}/>
      <CampTbl data={GOOG_LIVE} title="Google" tSpend={DD.googleSpend} tWow={googWoW} tRoas={DD.googleRoas+"x"} tRoasW={DD.priorGoogleRoas>0?((DD.googleRoas/DD.priorGoogleRoas-1)*100).toFixed(1)+"%":"–"}/>
    </>;
  })()}
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["mktSpend","cac","newNetROAS","gldROAS","mer","merNew"]}/>
</>}

{/* ═══ WEBSITE ═══ */}
{tab==="website"&&<>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="Sessions" v={DD.sessions.toLocaleString()} ww={w(DD.sessions,DD.priorSessions)} sub={`PW: ${DD.priorSessions.toLocaleString()} · MTD: ${DD.mtdSessions.toLocaleString()}`}/>
    <MC l="ATC Rate" v={DD.atcRate.toFixed(1)+"%"} ww={w(DD.atcRate,DD.priorAtcRate)} sub={`PW: ${DD.priorAtcRate.toFixed(1)}%`}/>
    <MC l="Bounce Rate" v={DD.bounceRate.toFixed(1)+"%"} ww={w(DD.bounceRate,DD.priorBounceRate)} inv sub={`PW: ${DD.priorBounceRate.toFixed(1)}%`}/>
    <MC l="Pages/Session" v={DD.pagesPerSession} ww={w(DD.pagesPerSession,DD.priorPagesPerSession)} sub={`PW: ${DD.priorPagesPerSession}`}/>
  </div>
  <Src t="Supermetrics Exhibits (rows 35-63)"/>

  <SH t="Traffic by Channel (WoW)" icon="📊"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
        {["Channel","CW Sess","PW Sess","WoW","CW ATC","CW Tx","CW Rev"].map(h=><th key={h} style={{textAlign:h==="Channel"?"left":"right",padding:"8px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
      </tr></thead>
      <tbody>{TRAFFIC_LIVE.map((t,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{padding:"8px 6px",fontWeight:600,color:C.nv}}>{t.ch}</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{t.cS.toLocaleString()}</td>
          <td style={{padding:"8px 6px",textAlign:"right",color:C.sL}}>{t.pS.toLocaleString()}</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{t.pS>0?<Pill v={w(t.cS,t.pS)}/>:"–"}</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{t.cAtc}</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{t.cTx}</td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600}}>{t.cRev>0?ff(t.cRev):"–"}</td>
        </tr>
      ))}</tbody>
    </table>
    <Src t={`GA Traffic (${meta.dateRange} vs PW)`}/>
  </div>

  <SH t="Page Views by Type" icon="📄"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
        {["Type","Sessions","Pages","Bounce %","ATC","ATC %"].map(h=><th key={h} style={{textAlign:h==="Type"?"left":"right",padding:"8px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
      </tr></thead>
      <tbody>{PV_TYPES_LIVE.map((t,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}}>
          <td style={{padding:"8px 6px",fontWeight:600,color:C.nv}}>{t.type}</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{t.sessions.toLocaleString()}</td>
          <td style={{padding:"8px 6px",textAlign:"right",color:C.sL}}>{t.pages}</td>
          <td style={{padding:"8px 6px",textAlign:"right",color:t.br>40?C.rd:t.br>25?C.am:C.nv}}>{t.br}%</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{t.atc}</td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600,color:t.ar>=5?C.gn:t.ar>=2?C.nv:C.rd}}>{t.ar}%</td>
        </tr>
      ))}</tbody>
    </table>
    <Src t={`GA Page Views (${meta.dateRange})`}/>
  </div>

  <SH t="Top Landing Pages by Channel" icon="🔗"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
      {["All",...Object.keys(LP_CH_LIVE)].map(ch=>(
        <button key={ch} onClick={()=>setLpChannel(ch)} style={{padding:"8px 14px",borderRadius:6,border:`1px solid ${C.bd}`,cursor:"pointer",fontSize:11,fontWeight:700,background:lpChannel===ch?C.nv:"#fff",color:lpChannel===ch?"#fff":C.nv}}>{ch}</button>
      ))}
    </div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
        {["Landing Page","Sessions","ATC","ATC %","Orders","CVR","Revenue"].map(h=><th key={h} style={{textAlign:h==="Landing Page"?"left":"right",padding:"8px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
      </tr></thead>
      <tbody>{(lpChannel==="All"?LP_ALL_LIVE:(LP_CH_LIVE[lpChannel]||[])).map((lp,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{padding:"8px 6px"}}><div style={{fontWeight:600,color:C.nv,fontSize:11}}>{lp.lp}</div></td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600}}>{lp.s.toLocaleString()}</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{lp.atc}</td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600,color:lp.ar>=15?C.gn:lp.ar>=5?C.nv:lp.ar>=2?C.am:C.rd}}>{lp.ar}%</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{lp.tx}</td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600,color:lp.cr>=2?C.gn:lp.cr>=1?C.nv:C.rd}}>{lp.cr}%</td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600}}>{lp.rev>0?ff(lp.rev):"–"}</td>
        </tr>
      ))}</tbody>
    </table>
    <Src t={`GA Landing Pages (${meta.dateRange})`}/>
  </div>

  <SH t="Session Breakdown" icon="👥"/>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="New Sessions" v={DD.newSessions.toLocaleString()} ww={w(DD.newSessions,DD.priorNewSessions)} sub={`${(DD.newSessions/DD.sessions*100).toFixed(0)}% of total`}/>
    <MC l="Returning" v={DD.returningSessions.toLocaleString()} ww={w(DD.returningSessions,DD.priorReturningSessions)} sub={`${(DD.returningSessions/DD.sessions*100).toFixed(0)}% of total`}/>
    <MC l="Desktop" v={DD.desktopSessions.toLocaleString()} ww={w(DD.desktopSessions,DD.priorDesktopSessions)} sub={`ATC: ${DD.desktopAtcRate.toFixed(1)}% (PW: ${DD.priorDesktopAtcRate.toFixed(1)}%)`}/>
    <MC l="Mobile" v={DD.mobileSessions.toLocaleString()} ww={w(DD.mobileSessions,DD.priorMobileSessions)} sub={`ATC: ${DD.mobileAtcRate.toFixed(1)}% (PW: ${DD.priorMobileAtcRate.toFixed(1)}%)`}/>
  </div>
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["sessions","conv","engagement","atcRate","bounce"]}/>
</>}

        <div style={{marginTop:28,padding:"14px 0",borderTop:`1px solid ${C.bd}`,display:"flex",justifyContent:"space-between",fontSize:11,color:C.sL,flexWrap:"wrap",gap:8}}>
          <span>Sarah Flint · Weekly Dashboard · {meta.dateRange}</span>
          <span>Sources: Weekly_Export_for_Claude (Supermetrics, GA, Meta, Google Ads)</span>
        </div>
      </div>
    </div>
  );
}
