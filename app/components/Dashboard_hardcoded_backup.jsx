"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, AreaChart, Area, PieChart, Pie, Legend } from "recharts";
// ─── CORE DATA (auto-generated from Weekly_Export_for_Claude) ───
// Week 16 · Apr 19–25, 2026 · CW=Wk16, PW=Wk15

const D = {
  grossRevenue:265728,priorGross:237270,
  discounts:42809,priorDiscounts:29949,
  gld:222919,priorGld:207321,
  returns:84543,priorReturns:81169,
  netRevenue:138376,priorNet:126152,netPlan:1833422,
  mtdNet:391571,mtdNetPlan:359100,
  orders:438,priorOrders:433,ordersPlan:8763,
  items:625,priorItems:560,
  netUnits:381,priorNetUnits:312,
  newCustomers:243,priorNewCustomers:235,newCustomerPlan:2261,
  mtdNewCust:698,mtdNewCustPlan:423,
  newNetRev:70595,priorNewNetRev:63796,newNetPlan:480909,
  mtdNewNet:202950,mtdNewNetPlan:118680,
  repeatNetRev:67781,priorRepeatNetRev:62355,
  mktSpend:21555,priorMktSpend:24945,mtdMktSpend:69228,
  metaSpend:9542,priorMetaSpend:9542,
  googleSpend:12013,priorGoogleSpend:12013,
  metaRev:20232,priorMetaRev:25633,
  googleRev:87830,priorGoogleRev:97376,
  metaRoas:2.12,priorMetaRoas:2.69,
  googleRoas:7.31,priorGoogleRoas:8.11,
  sessions:17005,priorSessions:17800,sessionsPlan:314800,
  mtdSessions:51514,mtdSessionsPlan:57900,
  engagementRate:61.46,priorEngagementRate:59.12,
  bounceRate:38.54,priorBounceRate:40.88,
  atcRate:8.0,priorAtcRate:7.0,
  totalAtc:1323,priorTotalAtc:1333,
  pageViews:59627,priorPageViews:66004,
  pagesPerSession:3.51,priorPagesPerSession:3.71,
  avgSessionLength:44.2,priorAvgSessionLength:48.05,
  newSessions:10616,priorNewSessions:11113,
  returningSessions:6389,priorReturningSessions:6687,
  paidSessions:9103,priorPaidSessions:11252,
  orgSessions:7902,priorOrgSessions:6548,
  desktopSessions:4776,priorDesktopSessions:3269,
  mobileSessions:11975,priorMobileSessions:14214,
  desktopAtcRate:10.0,priorDesktopAtcRate:13.0,
  mobileAtcRate:7.0,priorMobileAtcRate:6.0,
  gldAOV:509,priorGldAOV:479,netAOV:316,priorNetAOV:291,
  aur:357,priorAur:370,upt:1.43,priorUpt:1.29,
  discPctGross:16.1,priorDiscPctGross:12.6,returnPctGLD:37.9,priorReturnPctGLD:39.2,
  convRate:2.58,priorConvRate:2.43,
};

const REV_NEW = { gross:153046,priorGross:127221,discounts:27232,priorDiscounts:14841,gld:125814,priorGld:112380,returns:55219,priorReturns:48584,net:70595,priorNet:63796,orders:243,priorOrders:235,items:338,priorItems:283 };
const REV_RET = { gross:112682,priorGross:110049,discounts:15577,priorDiscounts:15108,gld:97105,priorGld:94941,returns:29324,priorReturns:32586,net:67781,priorNet:62355,orders:195,priorOrders:198,items:287,priorItems:277 };

const DAILY = [
  {day:"Sun",net:31710,newNet:20354,retNet:11356},
  {day:"Mon",net:12174,newNet:5556,retNet:6618},
  {day:"Tue",net:21050,newNet:11665,retNet:9385},
  {day:"Wed",net:32588,newNet:17184,retNet:15404},
  {day:"Thu",net:11698,newNet:5439,retNet:6259},
  {day:"Fri",net:13034,newNet:458,retNet:12576},
  {day:"Sat",net:16121,newNet:9939,retNet:6182},
];

const WEEKLY_TREND = [
  {week:"Wk 6",newNet:68744,retNet:74689,plan:769744,spend:18391,newCust:242,cac:76,roas:3.74},
  {week:"Wk 7",newNet:59648,retNet:85435,plan:876632,spend:16898,newCust:232,cac:73,roas:3.53},
  {week:"Wk 8",newNet:38484,retNet:46206,plan:965091,spend:10557,newCust:161,cac:66,roas:3.65},
  {week:"Wk 9",newNet:84593,retNet:50781,plan:1057236,spend:18315,newCust:228,cac:80,roas:4.62},
  {week:"Wk 10",newNet:90494,retNet:88439,plan:1160439,spend:27591,newCust:277,cac:100,roas:3.28},
  {week:"Wk 11",newNet:70191,retNet:78985,plan:1256270,spend:24050,newCust:247,cac:97,roas:2.92},
  {week:"Wk 12",newNet:83770,retNet:83912,plan:1366844,spend:27180,newCust:281,cac:97,roas:3.08},
  {week:"Wk 13",newNet:71221,retNet:53589,plan:1474322,spend:21361,newCust:228,cac:94,roas:3.33},
  {week:"Wk 14",newNet:68559,retNet:58484,plan:1594022,spend:22728,newCust:220,cac:103,roas:3.02},
  {week:"Wk 15",newNet:63796,retNet:62355,plan:1713722,spend:24945,newCust:235,cac:106,roas:2.56},
  {week:"Wk 16",newNet:70595,retNet:67781,plan:1833422,spend:21555,newCust:243,cac:89,roas:3.28},
];

const META = [
  {name:"Sandals Season 2026",type:"Prosp.",cS:3425,cR:3351,cX:0.98,pS:7562,pR:8584,pX:1.14},
  {name:"Website Only Remarketing",type:"Remarket.",cS:2083,cR:10666,cX:5.12,pS:2097,pR:9541,pX:4.55},
  {name:"NEW",type:"Prosp.",cS:1123,cR:535,cX:0.48,pS:4115,pR:3803,pX:0.92},
  {name:"$100 Offer Test",type:"Prosp.",cS:842,cR:891,cX:1.06,pS:680,pR:1486,pX:2.19},
  {name:"Value Opt.",type:"Prosp.",cS:504,cR:2419,cX:4.79,pS:202,pR:0,pX:0.0},
  {name:"Scarf Belt Website Only",type:"Prosp.",cS:489,cR:1452,cX:2.97,pS:578,pR:817,pX:1.41},
  {name:"All",type:"Prosp.",cS:431,cR:919,cX:2.13,pS:0,pR:0,pX:0},
  {name:"New",type:"TOF",cS:349,cR:0,cX:0.0,pS:140,pR:0,pX:0.0},
  {name:"Evergreen 7d1d Test",type:"Prosp.",cS:156,cR:0,cX:0.0,pS:512,pR:1404,pX:2.74},
  {name:"New",type:"TOF",cS:140,cR:0,cX:0.0,pS:140,pR:0,pX:0.0},
];

const GOOG = [
  {name:"SHP – Non Brand",brand:"Non-Brand",channel:"Shopping",cS:4728,cR:19013,cX:4.0,pS:336,pR:3629,pX:11.0},
  {name:"PMAX – Non Brand",brand:"Non-Brand",channel:"Performance Max",cS:2642,cR:10251,cX:4.0,pS:0,pR:0,pX:0.0},
  {name:"SEA – BRD",brand:"Brand",channel:"Search",cS:1416,cR:31761,cX:22.0,pS:1703,pR:49763,pX:29.0},
  {name:"DG – RMK / RTN",brand:"Non-Brand",channel:"Demand gen",cS:700,cR:0,cX:0.0,pS:722,pR:855,pX:1.0},
  {name:"SHP – Non Brand",brand:"Non-Brand",channel:"Shopping",cS:695,cR:2506,cX:4.0,pS:336,pR:3629,pX:11.0},
  {name:"DG – ACQ",brand:"Non-Brand",channel:"Demand gen",cS:681,cR:3988,cX:6.0,pS:720,pR:3754,pX:5.0},
  {name:"SEA – ACQ",brand:"Non-Brand",channel:"Search",cS:458,cR:4218,cX:9.0,pS:475,pR:3062,pX:6.0},
  {name:"SHP – Brand",brand:"Brand",channel:"Shopping",cS:343,cR:16092,cX:47.0,pS:237,pR:13398,pX:56.0},
  {name:"YT – TOF",brand:"Non-Brand",channel:"Video",cS:314,cR:0,cX:0.0,pS:324,pR:0,pX:0.0},
  {name:"YT – TOF",brand:"Non-Brand",channel:"Video",cS:35,cR:0,cX:0.0,pS:324,pR:0,pX:0.0},
];

const TRAFFIC = [
  {ch:"Paid Search",cS:3671,cAtc:450,cTx:84,cRev:44985,pS:3553,pAtc:436,pTx:82,pRev:43974},
  {ch:"Direct",cS:3357,cAtc:246,cTx:46,cRev:21306,pS:1848,pAtc:214,pTx:39,pRev:18985},
  {ch:"Paid Social",cS:2795,cAtc:157,cTx:23,cRev:10267,pS:3682,pAtc:211,pTx:32,pRev:13415},
  {ch:"Email",cS:2753,cAtc:224,cTx:36,cRev:20512,pS:2995,pAtc:185,pTx:30,pRev:15673},
  {ch:"Affiliate",cS:2636,cAtc:88,cTx:18,cRev:7589,pS:4017,pAtc:123,pTx:22,pRev:9950},
  {ch:"SMS",cS:1214,cAtc:71,cTx:14,cRev:5647,pS:999,pAtc:82,pTx:11,pRev:5481},
  {ch:"Organic Search",cS:347,cAtc:77,cTx:14,cRev:6649,pS:420,pAtc:68,pTx:14,pRev:7135},
  {ch:"Referral",cS:157,cAtc:7,cTx:2,cRev:998,pS:176,pAtc:11,pTx:2,pRev:899},
  {ch:"Organic Social",cS:69,cAtc:3,cTx:1,cRev:495,pS:106,pAtc:2,pTx:0,pRev:0},
  {ch:"Other Organic",cS:5,cAtc:0,cTx:0,cRev:0,pS:4,pAtc:1,pTx:1,pRev:233},
  {ch:"Other Paid",cS:1,cAtc:0,cTx:0,cRev:0,pS:0,pAtc:0,pTx:0,pRev:0},
];

const PV_TYPES = [
  {type:"Products",sessions:6700,atc:276,bounces:1480,pages:20,br:22.1,ar:4.1},
  {type:"Collections",sessions:8840,atc:28,bounces:1556,pages:20,br:17.6,ar:0.3},
  {type:"Blog",sessions:445,atc:0,bounces:110,pages:5,br:24.7,ar:0.0},
  {type:"Landing Pages",sessions:753,atc:4,bounces:297,pages:5,br:39.4,ar:0.5},
  {type:"Other",sessions:472,atc:17,bounces:68,pages:10,br:14.4,ar:3.6},
];

const LP_ALL = [
  {lp:"/",n:"Homepage",s:1885,atc:324,ar:17.2,tx:56,cr:2.97,rev:30968,br:"39.5%"},
  {lp:"/collections/just-in",n:"Just In",s:1019,atc:45,ar:4.4,tx:2,cr:0.2,rev:1278,br:"39.4%"},
  {lp:"/collections/pumps",n:"Pumps",s:705,atc:178,ar:25.2,tx:25,cr:3.55,rev:13190,br:"13.9%"},
  {lp:"/collections/all-shoes",n:"All Shoes",s:648,atc:27,ar:4.2,tx:2,cr:0.31,rev:998,br:"44.6%"},
  {lp:"/collections/pink-floral-satin",n:"Pink Floral Satin",s:484,atc:15,ar:3.1,tx:2,cr:0.41,rev:1458,br:"26.0%"},
  {lp:"/collections/sandals",n:"Sandals",s:349,atc:16,ar:4.6,tx:5,cr:1.43,rev:2298,br:"31.8%"},
  {lp:"/pages/blog-spring-workwear-guide",n:"Blog: Spring Workwear Guide",s:321,atc:2,ar:0.6,tx:1,cr:0.31,rev:333,br:"24.6%"},
  {lp:"/collections/perfect-erika",n:"Perfect Erika",s:304,atc:8,ar:2.6,tx:3,cr:0.99,rev:1876,br:"53.9%"},
  {lp:"/products/marineris-scarf-140-cream-nautical-cashmere-silk",n:"Marineris Scarf 140 Cream Nautical ",s:303,atc:6,ar:2.0,tx:1,cr:0.33,rev:495,br:"70.0%"},
  {lp:"/pages/lp-perfect-pump-1",n:"LP: Perfect Pump 1",s:287,atc:20,ar:7.0,tx:6,cr:2.09,rev:2502,br:"33.4%"},
  {lp:"/products/reversible-scarf-waist-belt-cream-saddle-calf",n:"Reversible Scarf Waist Belt Cream S",s:280,atc:22,ar:7.9,tx:6,cr:2.14,rev:1345,br:"40.7%"},
  {lp:"/pages/lp-pbs-perfectsandal",n:"LP: Pbs Perfectsandal",s:253,atc:24,ar:9.5,tx:2,cr:0.79,rev:771,br:"35.2%"},
  {lp:"/products/perfect-pump-85-black-suede",n:"Perfect Pump 85 Black Suede",s:244,atc:34,ar:13.9,tx:6,cr:2.46,rev:3286,br:"33.2%"},
  {lp:"/products/perfect-ballet-flat-saddle-woven-calf",n:"Perfect Ballet Flat Saddle Woven Ca",s:237,atc:6,ar:2.5,tx:2,cr:0.84,rev:806,br:"51.1%"},
  {lp:"/collections/perfect-collection-sandals",n:"Perfect Collection Sandals",s:234,atc:1,ar:0.4,tx:0,cr:0.0,rev:0,br:"31.2%"},
];

const LP_CH = {
  "Paid Search":[
    {lp:"/collections/pumps",n:"Pumps",pt:"Collections",s:621,atc:155,ar:25.0,tx:22,cr:3.54,rev:12196},
    {lp:"/",n:"Homepage",pt:"Direct",s:438,atc:64,ar:14.6,tx:10,cr:2.28,rev:6842},
    {lp:"/collections/perfect-collection-sandals",n:"Perfect Collection Sandals",pt:"Collections",s:216,atc:1,ar:0.5,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-pump-85-black-suede",n:"Perfect Pump 85 Black Suede",pt:"Products",s:120,atc:25,ar:20.8,tx:6,cr:5.0,rev:3286},
    {lp:"/collections/just-in",n:"Just In",pt:"Collections",s:114,atc:5,ar:4.4,tx:0,cr:0.0,rev:0},
    {lp:"/pages/lp-perfect-pump-1",n:"LP: Perfect Pump 1",pt:"Landing Page",s:74,atc:0,ar:0.0,tx:1,cr:1.35,rev:495},
    {lp:"/products/perfect-crossover-platform-80-gold-textured-saffiano",n:"Perfect Crossover Platform 80 Gold ",pt:"Products",s:72,atc:1,ar:1.4,tx:1,cr:1.39,rev:396},
    {lp:"/products/wedding-parker-sling-50-white-polka-dot-mesh",n:"Wedding Parker Sling 50 White Polka",pt:"Products",s:67,atc:1,ar:1.5,tx:0,cr:0.0,rev:0},
    {lp:"/products/natalie-saddle-vachetta",n:"Natalie Saddle Vachetta",pt:"Products",s:48,atc:5,ar:10.4,tx:3,cr:6.25,rev:1283},
    {lp:"/products/perfect-block-sandal-60-wedding-white-satin-lace",n:"Perfect Block Sandal 60 Wedding Whi",pt:"Products",s:48,atc:6,ar:12.5,tx:1,cr:2.08,rev:375},
  ],
  "Paid Social":[
    {lp:"/collections/pink-floral-satin",n:"Pink Floral Satin",pt:"Collections",s:469,atc:15,ar:3.2,tx:2,cr:0.43,rev:1458},
    {lp:"/pages/lp-pbs-perfectsandal",n:"LP: Pbs Perfectsandal",pt:"Landing Page",s:252,atc:24,ar:9.5,tx:2,cr:0.79,rev:771},
    {lp:"/pages/lp-perfect-pump-1",n:"LP: Perfect Pump 1",pt:"Landing Page",s:182,atc:11,ar:6.0,tx:0,cr:0.0,rev:0},
    {lp:"/collections/perfect-crossover",n:"Perfect Crossover",pt:"Collections",s:142,atc:2,ar:1.4,tx:0,cr:0.0,rev:0},
    {lp:"/pages/lp-perfect-ballet-flat-1",n:"LP: Perfect Ballet Flat 1",pt:"Landing Page",s:139,atc:5,ar:3.6,tx:0,cr:0.0,rev:0},
    {lp:"/collections/just-in",n:"Just In",pt:"Collections",s:115,atc:3,ar:2.6,tx:0,cr:0.0,rev:0},
    {lp:"/collections/best-sellers",n:"Best Sellers",pt:"Collections",s:91,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/natalie-saddle-vachetta",n:"Natalie Saddle Vachetta",pt:"Products",s:60,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
    {lp:"/collections/perfect-erika",n:"Perfect Erika",pt:"Collections",s:58,atc:5,ar:8.6,tx:2,cr:3.45,rev:1381},
    {lp:"/products/perfect-block-sandal-60-gold-nappa",n:"Perfect Block Sandal 60 Gold Nappa",pt:"Products",s:55,atc:8,ar:14.5,tx:3,cr:5.45,rev:1214},
  ],
  "Email":[
    {lp:"/",n:"Homepage",pt:"Direct",s:355,atc:69,ar:19.4,tx:14,cr:3.94,rev:9215},
    {lp:"/collections/just-in",n:"Just In",pt:"Collections",s:325,atc:19,ar:5.8,tx:1,cr:0.31,rev:495},
    {lp:"/pages/blog-spring-workwear-guide",n:"Blog: Spring Workwear Guide",pt:"Blog",s:303,atc:2,ar:0.7,tx:1,cr:0.33,rev:333},
    {lp:"/collections/sandals",n:"Sandals",pt:"Collections",s:249,atc:3,ar:1.2,tx:3,cr:1.2,rev:1110},
    {lp:"/collections/perfect-erika",n:"Perfect Erika",pt:"Collections",s:240,atc:2,ar:0.8,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-erika-30-light-pink-shimmer-suede",n:"Perfect Erika 30 Light Pink Shimmer",pt:"Products",s:177,atc:5,ar:2.8,tx:1,cr:0.56,rev:533},
    {lp:"/collections/trending-metallics",n:"Trending Metallics",pt:"Collections",s:163,atc:15,ar:9.2,tx:1,cr:0.61,rev:483},
    {lp:"/collections/all-shoes",n:"All Shoes",pt:"Collections",s:162,atc:10,ar:6.2,tx:0,cr:0.0,rev:0},
    {lp:"/collections/the-event-edit",n:"The Event Edit",pt:"Collections",s:150,atc:9,ar:6.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-erika-60-light-pink-shimmer-suede",n:"Perfect Erika 60 Light Pink Shimmer",pt:"Products",s:55,atc:2,ar:3.6,tx:1,cr:1.82,rev:503},
  ],
  "Affiliate":[
    {lp:"/products/marineris-scarf-140-cream-nautical-cashmere-silk",n:"Marineris Scarf 140 Cream Nautical ",pt:"Products",s:288,atc:6,ar:2.1,tx:1,cr:0.35,rev:495},
    {lp:"/",n:"Homepage",pt:"Direct",s:230,atc:36,ar:15.7,tx:8,cr:3.48,rev:3974},
    {lp:"/products/perfect-ballet-flat-saddle-woven-calf",n:"Perfect Ballet Flat Saddle Woven Ca",pt:"Products",s:201,atc:2,ar:1.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/arabesque-slide-two-tone-camel-nappa",n:"Arabesque Slide Two Tone Camel Napp",pt:"Products",s:195,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-sandal-85-sand-calf",n:"Perfect Sandal 85 Sand Calf",pt:"Products",s:181,atc:5,ar:2.8,tx:0,cr:0.0,rev:0},
    {lp:"/products/reversible-scarf-waist-belt-cream-saddle-calf",n:"Reversible Scarf Waist Belt Cream S",pt:"Products",s:175,atc:7,ar:4.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/grear-saddle-vachetta",n:"Grear Saddle Vachetta",pt:"Products",s:113,atc:3,ar:2.7,tx:1,cr:0.88,rev:428},
    {lp:"/products/perfect-pump-85-black-calf",n:"Perfect Pump 85 Black Calf",pt:"Products",s:101,atc:8,ar:7.9,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-pump-85-black-suede",n:"Perfect Pump 85 Black Suede",pt:"Products",s:92,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-sandal-85-gold-nappa",n:"Perfect Sandal 85 Gold Nappa",pt:"Products",s:89,atc:6,ar:6.7,tx:1,cr:1.12,rev:475},
  ],
  "Direct":[
    {lp:"/",n:"Homepage",pt:"Direct",s:545,atc:87,ar:16.0,tx:11,cr:2.02,rev:5455},
    {lp:"/products/alexandra-50-black-stretch-suede",n:"Alexandra 50 Black Stretch Suede",pt:"Products",s:74,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-stretch-boot-30-water-resistant-black-suede",n:"Perfect Stretch Boot 30 Water Resis",pt:"Products",s:61,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-dress-boot-90-black-stretch-suede",n:"Perfect Dress Boot 90 Black Stretch",pt:"Products",s:60,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
    {lp:"/collections/sandals",n:"Sandals",pt:"Collections",s:54,atc:3,ar:5.6,tx:1,cr:1.85,rev:388},
    {lp:"/collections/just-in",n:"Just In",pt:"Collections",s:48,atc:7,ar:14.6,tx:1,cr:2.08,rev:783},
    {lp:"/collections/pumps",n:"Pumps",pt:"Collections",s:46,atc:17,ar:37.0,tx:1,cr:2.17,rev:303},
    {lp:"/products/perfect-riding-boot-30-black-vachetta",n:"Perfect Riding Boot 30 Black Vachet",pt:"Products",s:45,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-natalie-sling-50-black-calf",n:"Perfect Natalie Sling 50 Black Calf",pt:"Products",s:43,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
    {lp:"/products/perfect-dress-boot-60-black-stretch-suede",n:"Perfect Dress Boot 60 Black Stretch",pt:"Products",s:42,atc:0,ar:0.0,tx:0,cr:0.0,rev:0},
  ],
  "SMS":[
    {lp:"/collections/all-shoes",n:"All Shoes",pt:"Collections",s:467,atc:11,ar:2.4,tx:2,cr:0.43,rev:998},
    {lp:"/collections/just-in",n:"Just In",pt:"Collections",s:402,atc:11,ar:2.7,tx:0,cr:0.0,rev:0},
    {lp:"/",n:"Homepage",pt:"Direct",s:89,atc:18,ar:20.2,tx:4,cr:4.49,rev:1294},
    {lp:"/collections/almost-gone",n:"Almost Gone",pt:"Collections",s:70,atc:1,ar:1.4,tx:0,cr:0.0,rev:0},
    {lp:"/collections/sale",n:"Sale",pt:"Collections",s:35,atc:1,ar:2.9,tx:1,cr:2.86,rev:273},
  ],
  "Organic Search":[
    {lp:"/",n:"Homepage",pt:"Direct",s:150,atc:41,ar:27.3,tx:7,cr:4.67,rev:3106},
  ],
};

const PLAN = {
  gross:4435444,net:1833422,newNet:480909,retNet:1352513,newCust:2261,repeatCust:6502,orders:8763,
  itemsSold:10769,upt:1.23,aov:506.16,aur:411.87,sessions:314800,conv:2.8,
  discPct:19.2,returnPct:39.5,roasPlan:1.65,
  mtdGross:731801,mtdNet:359100,mtdNewNet:118680,mtdNewCust:423,mtdOrders:1280,mtdWeeks:3,weeksComplete:3,
  qtdGross:731801,qtdNet:391571,qtdNewCust:698,qtdWeeks:13,
};

// Product data mirroring Product Sales Reporting PDF - Wk14 (4/5-4/11)
// Columns: name, gross, disc, gld, units, aur, pct, oh, st
// Product data from SF_Product_Sales_Data_2026.xlsx → Product Pivots + OH Report
const STY_ALL=[
  {n:"Perfect Pump 85",g:25443,d:2481,gld:22962,u:52,aur:442,p:11.4,oh:1362,st:3.8,woh:95},{n:"Perfect Block Sandal 60",g:22325,d:2607,gld:19718,u:46,aur:429,p:9.8,oh:455,st:10.1,woh:24},{n:"Perfect Crossover Platform 80",g:22295,d:2816,gld:19479,u:44,aur:443,p:9.7,oh:259,st:17.0,woh:64},{n:"Perfect Kitten Pump 50",g:18042,d:1228,gld:16814,u:37,aur:454,p:8.3,oh:545,st:6.8,woh:46},{n:"Perfect Crossover Sandal 50",g:15615,d:1390,gld:14225,u:35,aur:406,p:7.1,oh:125,st:28.0,woh:6},
  {n:"Perfect Block Sandal 30",g:13300,d:1350,gld:11950,u:28,aur:427,p:5.9,oh:333,st:8.4,woh:104},{n:"Natalie",g:10032,d:1278,gld:8755,u:26,aur:337,p:4.3,oh:863,st:3.0,woh:424},{n:"Perfect Sling 85",g:8310,d:918,gld:7392,u:17,aur:435,p:3.7,oh:261,st:6.5,woh:45},{n:"Perfect Block Sandal 90",g:7125,d:760,gld:6365,u:15,aur:424,p:3.2,oh:266,st:5.6,woh:83},{n:"Perfect Emma",g:6930,d:1141,gld:5789,u:14,aur:414,p:2.9,oh:622,st:2.3,woh:733},
  {n:"Perfect Ballet Flat",g:5925,d:221,gld:5704,u:15,aur:380,p:2.8,oh:47,st:31.9,woh:8},{n:"Reversible Scarf Waist Belt",g:6095,d:608,gld:5487,u:23,aur:239,p:2.7,oh:65,st:35.4,woh:7},{n:"Perfect Pump 100",g:5940,d:867,gld:5073,u:11,aur:461,p:2.5,oh:528,st:2.1,woh:215},{n:"Alysia Sneaker",g:4225,d:195,gld:4030,u:13,aur:310,p:2.0,oh:499,st:2.6,woh:120},{n:"Perfect Erika 60",g:4455,d:695,gld:3760,u:8,aur:470,p:1.9,oh:86,st:9.3,woh:11},
  {n:"Perfect Round Toe Pump 70",g:3465,d:274,gld:3191,u:7,aur:456,p:1.6,oh:369,st:1.9,woh:161},{n:"Boat Shoe",g:3285,d:196,gld:3089,u:9,aur:343,p:1.5,oh:117,st:7.7,woh:21},{n:"Perfect Kitten Sling 50",g:3465,d:495,gld:2970,u:7,aur:424,p:1.5,oh:106,st:6.6,woh:23},{n:"Natalie Sling",g:2695,d:75,gld:2620,u:8,aur:328,p:1.3,oh:268,st:3.0,woh:193},{n:"Perfect Stephanie 45",g:2475,d:198,gld:2277,u:5,aur:455,p:1.1,oh:70,st:7.1,woh:51},
  {n:"Julia",g:2100,d:0,gld:2100,u:4,aur:525,p:1.0,oh:18,st:22.2,woh:4},{n:"Perfect Heather 50",g:1906,d:22,gld:1884,u:7,aur:269,p:0.9,oh:5,st:140.0,woh:1},{n:"Alexandra 50",g:1790,d:179,gld:1611,u:2,aur:806,p:0.8,oh:228,st:0.9,woh:1311},{n:"Perfect Mary Jane Pump 85",g:2100,d:525,gld:1575,u:3,aur:525,p:0.8,oh:101,st:3.0,woh:25},{n:"Wanderlust Oxford",g:1240,d:31,gld:1209,u:4,aur:302,p:0.6,oh:106,st:3.8,woh:26},
  {n:"Rosie",g:1080,d:28,gld:1052,u:3,aur:351,p:0.5,oh:248,st:1.2,woh:116},{n:"Perfect Kendra 45",g:1050,d:0,gld:1050,u:2,aur:525,p:0.5,oh:84,st:2.4,woh:49},{n:"Perfect Mirjana Wedge 50",g:1145,d:100,gld:1045,u:3,aur:348,p:0.5,oh:134,st:2.2,woh:49},{n:"Grear",g:1120,d:80,gld:1040,u:4,aur:260,p:0.5,oh:538,st:0.7,woh:208},{n:"Judy Loafer",g:1275,d:235,gld:1040,u:3,aur:347,p:0.5,oh:140,st:2.1,woh:61}
];
const STY_NEW=[
  {n:"Perfect Crossover Platform 80",g:16335,d:1336,gld:14999,u:33,aur:455,p:13.7,oh:259,st:12.7,woh:64},{n:"Perfect Pump 85",g:15048,d:2084,gld:12964,u:31,aur:418,p:11.9,oh:1362,st:2.3,woh:95},{n:"Perfect Block Sandal 60",g:13300,d:1645,gld:11655,u:28,aur:416,p:10.7,oh:455,st:6.2,woh:24},{n:"Perfect Block Sandal 30",g:11400,d:1350,gld:10050,u:24,aur:419,p:9.2,oh:333,st:7.2,woh:104},{n:"Perfect Crossover Sandal 50",g:10215,d:1039,gld:9176,u:23,aur:399,p:8.4,oh:125,st:18.4,woh:6},
  {n:"Perfect Kitten Pump 50",g:5756,d:689,gld:5068,u:12,aur:422,p:4.6,oh:545,st:2.2,woh:46},{n:"Natalie",g:5888,d:1050,gld:4838,u:15,aur:323,p:4.4,oh:863,st:1.7,woh:424},{n:"Perfect Sling 85",g:5445,d:794,gld:4651,u:11,aur:423,p:4.3,oh:261,st:4.2,woh:45},{n:"Perfect Block Sandal 90",g:5225,d:760,gld:4465,u:11,aur:406,p:4.1,oh:266,st:4.1,woh:83},{n:"Reversible Scarf Waist Belt",g:4770,d:583,gld:4187,u:18,aur:233,p:3.8,oh:65,st:27.7,woh:7},
  {n:"Perfect Emma",g:4950,d:992,gld:3958,u:10,aur:396,p:3.6,oh:622,st:1.6,woh:733},{n:"Perfect Pump 100",g:4455,d:693,gld:3762,u:8,aur:470,p:3.4,oh:528,st:1.5,woh:215},{n:"Perfect Erika 60",g:2475,d:495,gld:1980,u:4,aur:495,p:1.8,oh:86,st:4.7,woh:11},{n:"Perfect Ballet Flat",g:1975,d:0,gld:1975,u:5,aur:395,p:1.8,oh:47,st:10.6,woh:8},{n:"Perfect Kitten Sling 50",g:1980,d:396,gld:1584,u:4,aur:396,p:1.5,oh:106,st:3.8,woh:23},
  {n:"Alysia Sneaker",g:1300,d:195,gld:1105,u:4,aur:276,p:1.0,oh:499,st:0.8,woh:120}
];
const STY_RET=[
  {n:"Perfect Kitten Pump 50",g:12285,d:539,gld:11746,u:25,aur:470,p:12.7,oh:545,st:4.6,woh:46},{n:"Perfect Pump 85",g:10395,d:397,gld:9998,u:21,aur:476,p:10.8,oh:1362,st:1.5,woh:95},{n:"Perfect Block Sandal 60",g:9025,d:962,gld:8063,u:18,aur:448,p:8.7,oh:455,st:4.0,woh:24},{n:"Perfect Crossover Sandal 50",g:5400,d:351,gld:5049,u:12,aur:421,p:5.5,oh:125,st:9.6,woh:6},{n:"Perfect Crossover Platform 80",g:5960,d:1480,gld:4480,u:11,aur:407,p:4.8,oh:259,st:4.2,woh:64},
  {n:"Natalie",g:4145,d:228,gld:3917,u:11,aur:356,p:4.2,oh:863,st:1.3,woh:424},{n:"Perfect Ballet Flat",g:3950,d:221,gld:3729,u:10,aur:373,p:4.0,oh:47,st:21.3,woh:8},{n:"Boat Shoe",g:3285,d:196,gld:3089,u:9,aur:343,p:3.3,oh:117,st:7.7,woh:21},{n:"Alysia Sneaker",g:2925,d:0,gld:2925,u:9,aur:325,p:3.2,oh:499,st:1.8,woh:120},{n:"Perfect Round Toe Pump 70",g:2970,d:175,gld:2795,u:6,aur:466,p:3.0,oh:369,st:1.6,woh:161},
  {n:"Perfect Sling 85",g:2865,d:124,gld:2741,u:6,aur:457,p:3.0,oh:261,st:2.3,woh:45},{n:"Perfect Block Sandal 90",g:1900,d:0,gld:1900,u:4,aur:475,p:2.1,oh:266,st:1.5,woh:83},{n:"Perfect Block Sandal 30",g:1900,d:0,gld:1900,u:4,aur:475,p:2.1,oh:333,st:1.2,woh:104},{n:"Perfect Emma",g:1980,d:149,gld:1831,u:4,aur:458,p:2.0,oh:622,st:0.6,woh:733},{n:"Perfect Erika 60",g:1980,d:200,gld:1780,u:4,aur:445,p:1.9,oh:86,st:4.7,woh:11},
  {n:"Natalie Sling",g:1665,d:0,gld:1665,u:5,aur:333,p:1.8,oh:268,st:1.9,woh:193},{n:"Julia",g:1575,d:0,gld:1575,u:3,aur:525,p:1.7,oh:18,st:16.7,woh:4},{n:"Perfect Heather 50",g:1560,d:22,gld:1538,u:6,aur:256,p:1.7,oh:5,st:120.0,woh:1},{n:"Perfect Stephanie 45",g:1485,d:99,gld:1386,u:3,aur:462,p:1.5,oh:70,st:4.3,woh:51},{n:"Perfect Kitten Sling 50",g:1485,d:99,gld:1386,u:3,aur:462,p:1.5,oh:106,st:2.8,woh:23},
  {n:"Perfect Pump 100",g:1485,d:174,gld:1311,u:3,aur:437,p:1.4,oh:528,st:0.6,woh:215},{n:"Reversible Scarf Waist Belt",g:1325,d:25,gld:1300,u:5,aur:260,p:1.4,oh:65,st:7.7,woh:7},{n:"Wanderlust Oxford",g:1240,d:31,gld:1209,u:4,aur:302,p:1.3,oh:106,st:3.8,woh:26},{n:"Rosie",g:1080,d:28,gld:1052,u:3,aur:351,p:1.1,oh:248,st:1.2,woh:116},{n:"Perfect Mary Jane Pump 85",g:1575,d:525,gld:1050,u:2,aur:525,p:1.1,oh:101,st:2.0,woh:25},
  {n:"Perfect Kendra 45",g:1050,d:0,gld:1050,u:2,aur:525,p:1.1,oh:84,st:2.4,woh:49}
];
const SKU_ALL=[
  {s:"SF5240-NTG",n:"Perfect Crossover Platform 80",c:"Gold Textured Saffiano",g:7920,d:891,gld:7029,u:16,aur:439,oh:58},{s:"SF588CS",n:"Perfect Block Sandal 60",c:"Sand Calf",g:7125,d:1107,gld:6018,u:15,aur:401,oh:83},{s:"SF5200-NTG",n:"Perfect Crossover Sandal 50",c:"Gold Saffiano",g:6615,d:832,gld:5783,u:15,aur:386,oh:21},{s:"SF588NG",n:"Perfect Block Sandal 60",c:"Gold Nappa",g:6175,d:905,gld:5270,u:13,aur:405,oh:104},{s:"SF589NG",n:"Perfect Block Sandal 90",c:"Gold Nappa",g:5700,d:475,gld:5225,u:12,aur:435,oh:79},
  {s:"SF248CBK",n:"Perfect Pump 85",c:"Black Calf",g:5643,d:497,gld:5146,u:12,aur:429,oh:210},{s:"SF587NG",n:"Perfect Block Sandal 30",c:"Gold Nappa",g:5700,d:580,gld:5120,u:12,aur:427,oh:72},{s:"SF5200-CBK",n:"Perfect Crossover Sandal 50",c:"Black Calf",g:4950,d:98,gld:4852,u:11,aur:441,oh:47},{s:"SF248CS",n:"Perfect Pump 85",c:"Sand Calf",g:4950,d:374,gld:4576,u:10,aur:458,oh:135},{s:"SF269CBK",n:"Perfect Kitten Pump 50",c:"Black Calf",g:4950,d:398,gld:4552,u:10,aur:455,oh:106},
  {s:"SF587CS",n:"Perfect Block Sandal 30",c:"Sand Calf",g:4750,d:390,gld:4360,u:10,aur:436,oh:82},{s:"SF588-SAFSL",n:"Perfect Block Sandal 60",c:"Silver Textured Saffiano",g:4275,d:250,gld:4025,u:8,aur:503,oh:32},{s:"SF5240-SBK",n:"Perfect Crossover Platform 80",c:"Black Suede",g:3960,d:99,gld:3861,u:8,aur:483,oh:17},{s:"SF5200-CCG",n:"Perfect Crossover Sandal 50",c:"Cognac Calf",g:4050,d:460,gld:3590,u:9,aur:399,oh:57},{s:"SF269SBK",n:"Perfect Kitten Pump 50",c:"Black Suede",g:3812,d:324,gld:3488,u:8,aur:436,oh:112},
  {s:"SF5240-CS",n:"Perfect Crossover Platform 80",c:"Sand Calf",g:3465,d:0,gld:3465,u:7,aur:495,oh:51},{s:"SF722CCS",n:"Reversible Scarf Waist Belt",c:"Cream & Saddle Calf",g:3710,d:396,gld:3314,u:14,aur:237,oh:39},{s:"SF269-SN",n:"Perfect Kitten Pump 50",c:"Navy Suede",g:2970,d:0,gld:2970,u:6,aur:495,oh:36},{s:"SF2232-SAFSL",n:"Perfect Sling 85",c:"Silver Textured Saffiano",g:2970,d:0,gld:2970,u:6,aur:495,oh:47},{s:"SF269CS",n:"Perfect Kitten Pump 50",c:"Sand Calf",g:2970,d:77,gld:2893,u:6,aur:482,oh:77},
  {s:"SF5240-SAFSL",n:"Perfect Crossover Platform 80",c:"Silver Textured Saffiano",g:3980,d:1287,gld:2693,u:7,aur:385,oh:19},{s:"SF248SBK",n:"Perfect Pump 85",c:"Black Suede",g:2970,d:297,gld:2673,u:6,aur:446,oh:179},{s:"SF1245-WVCBK",n:"Perfect Ballet Flat",c:"Black Woven Calf",g:2765,d:98,gld:2667,u:7,aur:381,oh:14},{s:"SF588SBK",n:"Perfect Block Sandal 60",c:"Black Suede",g:2375,d:100,gld:2275,u:5,aur:455,oh:103},{s:"SF1245-WCSA",n:"Perfect Ballet Flat",c:"Saddle Woven Calf",g:2370,d:124,gld:2246,u:6,aur:374,oh:9},
  {s:"SF249CS",n:"Perfect Pump 100",c:"Sand Calf",g:2475,d:322,gld:2153,u:4,aur:538,oh:79},{s:"SF8268-NUSS",n:"Boat Shoe",c:"Sandstone Nubuck",g:2190,d:46,gld:2144,u:6,aur:357,oh:53},{s:"SF1278-NCG",n:"Julia",c:"Cognac Nappa",g:2100,d:0,gld:2100,u:4,aur:525,oh:18},{s:"SF587CW",n:"Perfect Block Sandal 30",c:"White Calf",g:2375,d:285,gld:2090,u:5,aur:418,oh:75},{s:"SF117VSD",n:"Natalie",c:"Saddle Vachetta",g:2512,d:425,gld:2088,u:6,aur:348,oh:273},
  {s:"SF259STP",n:"Perfect Emma",c:"Taupe Suede",g:2475,d:396,gld:2079,u:5,aur:416,oh:92},{s:"SF248-SLTTN",n:"Perfect Pump 85",c:"Camel Suede",g:2475,d:397,gld:2078,u:5,aur:416,oh:106},{s:"SF5267-SHGS",n:"Perfect Erika 60",c:"Gold Shimmer Suede",g:2475,d:495,gld:1980,u:4,aur:495,oh:57},{s:"SF248-SMBY",n:"Perfect Pump 85",c:"Mulberry Suede",g:1980,d:49,gld:1931,u:4,aur:483,oh:24},{s:"SF722CBKCG",n:"Reversible Scarf Waist Belt",c:"Black & Cognac Calf",g:2120,d:212,gld:1908,u:8,aur:238,oh:0},
  {s:"SF5235-RA",n:"Perfect Heather 50",c:"Almond Raffia",g:1906,d:22,gld:1884,u:7,aur:269,oh:5},{s:"SF588CW",n:"Perfect Block Sandal 60",c:"White Calf",g:1900,d:95,gld:1805,u:4,aur:451,oh:95},{s:"SF2253-SBK",n:"Perfect Stephanie 45",c:"Black Suede",g:1980,d:198,gld:1782,u:4,aur:446,oh:38},{s:"SF5267-SHLP",n:"Perfect Erika 60",c:"Light Pink Shimmer Suede",g:1980,d:200,gld:1780,u:4,aur:445,oh:29},{s:"SF248-PBL",n:"Perfect Pump 85",c:"Black Patent",g:1980,d:273,gld:1707,u:4,aur:427,oh:61},
  {s:"SF117CS",n:"Natalie",c:"Sand Calf",g:1875,d:171,gld:1704,u:5,aur:341,oh:65},{s:"SF259SBK",n:"Perfect Emma",c:"Black Suede",g:1980,d:397,gld:1583,u:4,aur:396,oh:175},{s:"SF2232-CS",n:"Perfect Sling 85",c:"Sand Calf",g:1980,d:397,gld:1583,u:4,aur:396,oh:98},{s:"SF2232-CBK",n:"Perfect Sling 85",c:"Black Calf",g:1980,d:397,gld:1583,u:4,aur:396,oh:80},{s:"SF117VBK",n:"Natalie",c:"Black Vachetta",g:1875,d:300,gld:1575,u:5,aur:315,oh:217},
  {s:"SF248-PSBL",n:"Perfect Pump 85",c:"Sea Blue Patent",g:1485,d:0,gld:1485,u:3,aur:495,oh:44},{s:"SF215-SLTTN",n:"Perfect Round Toe Pump 70",c:"Camel Suede",g:1485,d:25,gld:1460,u:3,aur:487,oh:85},{s:"SF215SBK",n:"Perfect Round Toe Pump 70",c:"Black Suede",g:1485,d:148,gld:1337,u:3,aur:446,oh:200},{s:"SF249SBK",n:"Perfect Pump 100",c:"Black Suede",g:1485,d:173,gld:1312,u:3,aur:437,oh:102},{s:"SF8213-CRBK",n:"Alysia Sneaker",c:"Black Crosta",g:1300,d:0,gld:1300,u:4,aur:325,oh:129},
  {s:"SF2236-NTG",n:"Perfect Kitten Sling 50",c:"Gold Saffiano",g:1485,d:198,gld:1287,u:3,aur:429,oh:29},{s:"SF2236-CBK",n:"Perfect Kitten Sling 50",c:"Black Calf",g:1485,d:198,gld:1287,u:3,aur:429,oh:49},{s:"SF5240-FWRN",n:"Perfect Crossover Platform 80",c:"Natural Fine Woven Linen",g:1485,d:242,gld:1244,u:3,aur:415,oh:59},{s:"SF5240-SAWW",n:"Perfect Crossover Platform 80",c:"White Satin",g:1485,d:297,gld:1188,u:3,aur:396,oh:20},{s:"SF117SN",n:"Natalie",c:"Navy Suede",g:1125,d:0,gld:1125,u:3,aur:375,oh:71},
  {s:"SF2280-ECNC",n:"Perfect Kendra 45",c:"Navy Croc Embossed Calf",g:1050,d:0,gld:1050,u:2,aur:525,oh:38},{s:"SF2275-PLGS",n:"Perfect Mary Jane Pump 85",c:"Light Sand Patent",g:1050,d:0,gld:1050,u:2,aur:525,oh:44}
];
const SKU_NEW=[
  {s:"SF5240-NTG",n:"Perfect Crossover Platform 80",c:"Gold Textured Saffiano",g:6435,d:891,gld:5544,u:13,aur:426,oh:58},{s:"SF5200-NTG",n:"Perfect Crossover Sandal 50",c:"Gold Saffiano",g:5265,d:720,gld:4545,u:12,aur:379,oh:21},{s:"SF587NG",n:"Perfect Block Sandal 30",c:"Gold Nappa",g:4750,d:580,gld:4170,u:10,aur:417,oh:72},{s:"SF248CBK",n:"Perfect Pump 85",c:"Black Calf",g:4653,d:497,gld:4156,u:10,aur:416,oh:210},{s:"SF588NG",n:"Perfect Block Sandal 60",c:"Gold Nappa",g:4750,d:730,gld:4020,u:10,aur:402,oh:104},
  {s:"SF5240-SBK",n:"Perfect Crossover Platform 80",c:"Black Suede",g:3465,d:49,gld:3416,u:7,aur:488,oh:17},{s:"SF587CS",n:"Perfect Block Sandal 30",c:"Sand Calf",g:3800,d:390,gld:3410,u:8,aur:426,oh:82},{s:"SF589NG",n:"Perfect Block Sandal 90",c:"Gold Nappa",g:3800,d:475,gld:3325,u:8,aur:416,oh:79},{s:"SF588CS",n:"Perfect Block Sandal 60",c:"Sand Calf",g:3800,d:670,gld:3130,u:8,aur:391,oh:83},{s:"SF5240-CS",n:"Perfect Crossover Platform 80",c:"Sand Calf",g:2970,d:0,gld:2970,u:6,aur:495,oh:51},
  {s:"SF722CCS",n:"Reversible Scarf Waist Belt",c:"Cream & Saddle Calf",g:3180,d:371,gld:2809,u:12,aur:234,oh:39},{s:"SF5240-SAFSL",n:"Perfect Crossover Platform 80",c:"Silver Textured Saffiano",g:2970,d:297,gld:2673,u:6,aur:446,oh:19},{s:"SF5200-CBK",n:"Perfect Crossover Sandal 50",c:"Black Calf",g:2700,d:49,gld:2651,u:6,aur:442,oh:47},{s:"SF269CBK",n:"Perfect Kitten Pump 50",c:"Black Calf",g:2475,d:298,gld:2177,u:5,aur:435,oh:106},{s:"SF587CW",n:"Perfect Block Sandal 30",c:"White Calf",g:2375,d:285,gld:2090,u:5,aur:418,oh:75},
  {s:"SF5200-CCG",n:"Perfect Crossover Sandal 50",c:"Cognac Calf",g:2250,d:270,gld:1980,u:5,aur:396,oh:57},{s:"SF588-SAFSL",n:"Perfect Block Sandal 60",c:"Silver Textured Saffiano",g:1900,d:100,gld:1800,u:4,aur:450,oh:32},{s:"SF249CS",n:"Perfect Pump 100",c:"Sand Calf",g:1980,d:297,gld:1683,u:3,aur:561,oh:79},{s:"SF248CS",n:"Perfect Pump 85",c:"Sand Calf",g:1980,d:299,gld:1681,u:4,aur:420,oh:135},{s:"SF259STP",n:"Perfect Emma",c:"Taupe Suede",g:1980,d:396,gld:1584,u:4,aur:396,oh:92},
  {s:"SF248-SLTTN",n:"Perfect Pump 85",c:"Camel Suede",g:1980,d:397,gld:1583,u:4,aur:396,oh:106},{s:"SF2232-CBK",n:"Perfect Sling 85",c:"Black Calf",g:1980,d:397,gld:1583,u:4,aur:396,oh:80},{s:"SF117VBK",n:"Natalie",c:"Black Vachetta",g:1875,d:300,gld:1575,u:5,aur:315,oh:217},{s:"SF5267-SHGS",n:"Perfect Erika 60",c:"Gold Shimmer Suede",g:1980,d:495,gld:1485,u:3,aur:495,oh:57},{s:"SF722CBKCG",n:"Reversible Scarf Waist Belt",c:"Black & Cognac Calf",g:1590,d:212,gld:1378,u:6,aur:230,oh:0},
  {s:"SF588SBK",n:"Perfect Block Sandal 60",c:"Black Suede",g:1425,d:50,gld:1375,u:3,aur:458,oh:103},{s:"SF588CW",n:"Perfect Block Sandal 60",c:"White Calf",g:1425,d:95,gld:1330,u:3,aur:443,oh:95},{s:"SF248SBK",n:"Perfect Pump 85",c:"Black Suede",g:1485,d:198,gld:1287,u:3,aur:429,oh:179},{s:"SF259SBK",n:"Perfect Emma",c:"Black Suede",g:1485,d:298,gld:1187,u:3,aur:396,oh:175},{s:"SF2232-CS",n:"Perfect Sling 85",c:"Sand Calf",g:1485,d:298,gld:1187,u:3,aur:396,oh:98},
  {s:"SF1245-WVCBK",n:"Perfect Ballet Flat",c:"Black Woven Calf",g:1185,d:0,gld:1185,u:3,aur:395,oh:14},{s:"SF269SBK",n:"Perfect Kitten Pump 50",c:"Black Suede",g:1336,d:200,gld:1136,u:3,aur:379,oh:112},{s:"SF117VSD",n:"Natalie",c:"Saddle Vachetta",g:1388,d:375,gld:1012,u:3,aur:337,oh:273}
];
const SKU_RET=[
  {s:"SF269-SN",n:"Perfect Kitten Pump 50",c:"Navy Suede",g:2970,d:0,gld:2970,u:6,aur:495,oh:36},{s:"SF248CS",n:"Perfect Pump 85",c:"Sand Calf",g:2970,d:75,gld:2895,u:6,aur:482,oh:135},{s:"SF588CS",n:"Perfect Block Sandal 60",c:"Sand Calf",g:3325,d:437,gld:2888,u:7,aur:413,oh:83},{s:"SF269CBK",n:"Perfect Kitten Pump 50",c:"Black Calf",g:2475,d:100,gld:2375,u:5,aur:475,oh:106},{s:"SF269SBK",n:"Perfect Kitten Pump 50",c:"Black Suede",g:2475,d:124,gld:2351,u:5,aur:470,oh:112},
  {s:"SF588-SAFSL",n:"Perfect Block Sandal 60",c:"Silver Textured Saffiano",g:2375,d:150,gld:2225,u:4,aur:556,oh:32},{s:"SF5200-CBK",n:"Perfect Crossover Sandal 50",c:"Black Calf",g:2250,d:49,gld:2201,u:5,aur:440,oh:47},{s:"SF8268-NUSS",n:"Boat Shoe",c:"Sandstone Nubuck",g:2190,d:46,gld:2144,u:6,aur:357,oh:53},{s:"SF2232-SAFSL",n:"Perfect Sling 85",c:"Silver Textured Saffiano",g:1980,d:0,gld:1980,u:4,aur:495,oh:47},{s:"SF269CS",n:"Perfect Kitten Pump 50",c:"Sand Calf",g:1980,d:77,gld:1903,u:4,aur:476,oh:77},
  {s:"SF589NG",n:"Perfect Block Sandal 90",c:"Gold Nappa",g:1900,d:0,gld:1900,u:4,aur:475,oh:79},{s:"SF5200-CCG",n:"Perfect Crossover Sandal 50",c:"Cognac Calf",g:1800,d:190,gld:1610,u:4,aur:402,oh:57},{s:"SF1278-NCG",n:"Julia",c:"Cognac Nappa",g:1575,d:0,gld:1575,u:3,aur:525,oh:18},{s:"SF5235-RA",n:"Perfect Heather 50",c:"Almond Raffia",g:1560,d:22,gld:1538,u:6,aur:256,oh:5},{s:"SF5240-NTG",n:"Perfect Crossover Platform 80",c:"Gold Textured Saffiano",g:1485,d:0,gld:1485,u:3,aur:495,oh:58},
  {s:"SF1245-WVCBK",n:"Perfect Ballet Flat",c:"Black Woven Calf",g:1580,d:98,gld:1482,u:4,aur:370,oh:14},{s:"SF215-SLTTN",n:"Perfect Round Toe Pump 70",c:"Camel Suede",g:1485,d:25,gld:1460,u:3,aur:487,oh:85},{s:"SF1245-WCSA",n:"Perfect Ballet Flat",c:"Saddle Woven Calf",g:1580,d:124,gld:1456,u:4,aur:364,oh:9},{s:"SF248-SMBY",n:"Perfect Pump 85",c:"Mulberry Suede",g:1485,d:49,gld:1436,u:3,aur:479,oh:24},{s:"SF248SBK",n:"Perfect Pump 85",c:"Black Suede",g:1485,d:99,gld:1386,u:3,aur:462,oh:179},
  {s:"SF248-PBL",n:"Perfect Pump 85",c:"Black Patent",g:1485,d:174,gld:1311,u:3,aur:437,oh:61},{s:"SF8213-CRBK",n:"Alysia Sneaker",c:"Black Crosta",g:1300,d:0,gld:1300,u:4,aur:325,oh:129},{s:"SF5267-SHLP",n:"Perfect Erika 60",c:"Light Pink Shimmer Suede",g:1485,d:200,gld:1285,u:3,aur:428,oh:29},{s:"SF588NG",n:"Perfect Block Sandal 60",c:"Gold Nappa",g:1425,d:175,gld:1250,u:3,aur:417,oh:104},{s:"SF5240-FWRN",n:"Perfect Crossover Platform 80",c:"Natural Fine Woven Linen",g:1485,d:242,gld:1244,u:3,aur:415,oh:59},
  {s:"SF5200-NTG",n:"Perfect Crossover Sandal 50",c:"Gold Saffiano",g:1350,d:112,gld:1238,u:3,aur:413,oh:21},{s:"SF117VSD",n:"Natalie",c:"Saddle Vachetta",g:1125,d:50,gld:1075,u:3,aur:358,oh:273},{s:"SF2280-ECNC",n:"Perfect Kendra 45",c:"Navy Croc Embossed Calf",g:1050,d:0,gld:1050,u:2,aur:525,oh:38},{s:"SF117CS",n:"Natalie",c:"Sand Calf",g:1125,d:96,gld:1029,u:3,aur:343,oh:65}
];
// Source: SF Product Sales Data → OH Report (active inventory, OH >= 25, excl. Inactive merch)
// 90D ST% = 90D units / (OH + 90D units); WOH = OH / max(7D units, 90D/90*7)
const INV_F={s:["S26"],d:["Accessories","Boots","Flats","Pumps","Sandals","Sneakers"],e:["CA","CO","CR","CT","FR","FS","OT"]};
const INV=[
{n:"PERFECT PUMP 85",d:"Pumps",oh:1262,ov:189878,u7:49,u90:427,st:25.3,woh:26,skus:[{c:"BLACK CALF",s:"S18",e:"CO",oh:206,ov:31830,u7:9,u90:82,st:28.5,woh:23},{c:"BLACK SUEDE",s:"F21",e:"CO",oh:174,ov:26829,u7:6,u90:61,st:26.0,woh:29},{c:"SAND CALF",s:"S20",e:"CO",oh:123,ov:18467,u7:12,u90:55,st:30.9,woh:10},{c:"TAUPE SUEDE",s:"S19",e:"CO",oh:117,ov:17716,u7:3,u90:40,st:25.5,woh:38},{c:"CAMEL SUEDE",s:"S26",e:"CR",oh:105,ov:15763,u7:3,u90:32,st:23.4,woh:35},{c:"NAVY SUEDE",s:"S19",e:"CO",oh:102,ov:15108,u7:6,u90:26,st:20.3,woh:17},{c:"GUNMETAL LAME",s:"S19",e:"CO",oh:83,ov:11228,u7:0,u90:13,st:13.5,woh:82},{c:"WHITE CALF",s:"S19",e:"CO",oh:64,ov:9314,u7:0,u90:16,st:20.0,woh:51},{c:"White Satin",s:"S20",e:"CO",oh:63,ov:9667,u7:0,u90:3,st:4.5,woh:270},{c:"BLACK PATENT",s:"S24",e:"CO",oh:57,ov:8743,u7:5,u90:29,st:33.7,woh:11},
  {c:"DUSTY BROWN PATENT",s:"S26",e:"CR",oh:57,ov:8356,u7:2,u90:17,st:23.0,woh:28},{c:"LIGHT SAND PATENT",s:"S25",e:"CR",oh:43,ov:6655,u7:2,u90:19,st:30.6,woh:22},{c:"SEA BLUE PATENT",s:"S26",e:"FR",oh:43,ov:6304,u7:1,u90:17,st:28.3,woh:33},{c:"MULBERRY SUEDE",s:"S26",e:"FR",oh:25,ov:3898,u7:0,u90:17,st:40.5,woh:19}]},
{n:"NATALIE",d:"Flats",oh:769,ov:108466,u7:29,u90:243,st:24.0,woh:27,skus:[{c:"SADDLE VACHETTA",s:"S15",e:"CO",oh:271,ov:38183,u7:5,u90:43,st:13.7,woh:54},{c:"BLACK VACHETTA",s:"S15",e:"CO",oh:206,ov:29117,u7:8,u90:57,st:21.7,woh:26},{c:"TAUPE SUEDE",s:"F22",e:"CO",oh:81,ov:11655,u7:1,u90:27,st:25.0,woh:39},{c:"BLACK SUEDE",s:"F24",e:"CO",oh:72,ov:10329,u7:4,u90:12,st:14.3,woh:18},{c:"NAVY SUEDE",s:"F20",e:"CO",oh:67,ov:9099,u7:5,u90:27,st:28.7,woh:13},{c:"SAND CALF",s:"S20",e:"CO",oh:60,ov:8243,u7:5,u90:53,st:46.9,woh:12},{c:"HYDRANGEA BLUE SILK",s:"S26",e:"FR",oh:12,ov:1840,u7:1,u90:24,st:66.7,woh:6}]},
{n:"PERFECT EMMA",d:"Pumps",oh:571,ov:85721,u7:20,u90:143,st:20.0,woh:29,skus:[{c:"BLACK SUEDE",s:"F19",e:"CO",oh:170,ov:26170,u7:7,u90:55,st:24.4,woh:24},{c:"NAVY SUEDE",s:"F19",e:"CO",oh:114,ov:15977,u7:3,u90:12,st:9.5,woh:38},{c:"TAUPE SUEDE",s:"F19",e:"CO",oh:88,ov:13550,u7:1,u90:27,st:23.5,woh:42},{c:"SAND CALF",s:"F19",e:"CO",oh:82,ov:11936,u7:6,u90:35,st:29.9,woh:14},{c:"COGNAC CALF",s:"S26",e:"CR",oh:59,ov:9225,u7:0,u90:0,st:0.0,woh:999},{c:"GOLD TEXTURED SAFFIANO",s:"F24",e:"CO",oh:58,ov:8863,u7:3,u90:14,st:19.4,woh:19}]},
{n:"GREAR",d:"Sandals",oh:533,ov:59194,u7:4,u90:24,st:4.3,woh:133,skus:[{c:"SADDLE VACHETTA",s:"S22",e:"CA",oh:287,ov:33214,u7:4,u90:8,st:2.7,woh:72},{c:"WHITE VACCHETTA",s:"S16",e:"CA",oh:97,ov:10043,u7:0,u90:6,st:5.8,woh:208},{c:"GOLD CALF",s:"S17",e:"CA",oh:89,ov:9389,u7:0,u90:4,st:4.3,woh:286},{c:"BLACK VACHETTA",s:"S16",e:"CA",oh:60,ov:6548,u7:0,u90:6,st:9.1,woh:129}]},
{n:"PERFECT KITTEN PUMP 50",d:"Pumps",oh:492,ov:73207,u7:25,u90:153,st:23.7,woh:20,skus:[{c:"BLACK SUEDE",s:"S23",e:"CO",oh:110,ov:16218,u7:4,u90:25,st:18.5,woh:28},{c:"BLACK CALF",s:"S23",e:"CO",oh:101,ov:15330,u7:6,u90:43,st:29.9,woh:17},{c:"TAUPE SUEDE",s:"S23",e:"CO",oh:77,ov:11454,u7:4,u90:18,st:18.9,woh:19},{c:"SAND CALF",s:"S23",e:"CO",oh:69,ov:10143,u7:7,u90:31,st:31.0,woh:10},{c:"BLACK PATENT",s:"S25",e:"CR",oh:59,ov:8908,u7:1,u90:16,st:21.3,woh:47},{c:"DUSTY BROWN PATENT",s:"S26",e:"CR",oh:41,ov:6067,u7:2,u90:12,st:22.6,woh:20},{c:"NAVY SUEDE",s:"F25",e:"CR",oh:35,ov:5087,u7:1,u90:8,st:18.6,woh:35}]},
{n:"PERFECT PUMP 100",d:"Pumps",oh:485,ov:74710,u7:5,u90:85,st:14.9,woh:73,skus:[{c:"BLACK SUEDE",s:"S19",e:"CO",oh:100,ov:15760,u7:1,u90:22,st:18.0,woh:58},{c:"BLACK CALF",s:"S18",e:"CO",oh:89,ov:14357,u7:3,u90:21,st:19.1,woh:30},{c:"TAUPE SUEDE",s:"S19",e:"CO",oh:86,ov:12379,u7:1,u90:14,st:14.0,woh:79},{c:"SAND CALF",s:"S20",e:"CO",oh:77,ov:11850,u7:0,u90:14,st:15.4,woh:71},{c:"GUNMETAL LAME",s:"S18",e:"CO",oh:67,ov:9621,u7:0,u90:4,st:5.6,woh:215},{c:"NAVY SUEDE",s:"S19",e:"CO",oh:66,ov:10743,u7:0,u90:10,st:13.2,woh:85}]},
{n:"ALYSIA SNEAKER",d:"Sneakers",oh:458,ov:59391,u7:12,u90:79,st:14.7,woh:38,skus:[{c:"BLACK CROSTA",s:"S25",e:"CO",oh:126,ov:16320,u7:3,u90:11,st:8.0,woh:42},{c:"OCEAN BLUE CROSTA",s:"S26",e:"FR",oh:70,ov:9007,u7:1,u90:11,st:13.6,woh:70},{c:"SILVER SAFFIANO",s:"S25",e:"FR",oh:63,ov:8551,u7:1,u90:6,st:8.7,woh:63},{c:"DESERT TAN CROSTA",s:"S25",e:"CO",oh:61,ov:7878,u7:2,u90:15,st:19.7,woh:30},{c:"NAVY CROSTA",s:"S25",e:"CO",oh:54,ov:6801,u7:2,u90:9,st:14.3,woh:27},{c:"GRAY CROSTA",s:"S26",e:"CR",oh:52,ov:6691,u7:2,u90:12,st:18.8,woh:26},{c:"SADDLE PEBBLED",s:"S25",e:"CR",oh:32,ov:4143,u7:1,u90:15,st:31.9,woh:27}]},
{n:"PERFECT BLOCK SANDAL 60",d:"Sandals",oh:395,ov:56944,u7:43,u90:203,st:33.9,woh:9,skus:[{c:"GOLD NAPPA",s:"S20",e:"CO",oh:101,ov:14366,u7:6,u90:55,st:35.3,woh:17},{c:"BLACK SUEDE",s:"S20",e:"CO",oh:98,ov:14795,u7:5,u90:22,st:18.3,woh:20},{c:"WHITE CALF",s:"S20",e:"CO",oh:91,ov:12084,u7:4,u90:27,st:22.9,woh:23},{c:"SAND CALF",s:"S20",e:"CO",oh:68,ov:9519,u7:14,u90:54,st:44.3,woh:5},{c:"SILVER SAFFIANO",s:"S26",e:"CR",oh:20,ov:3430,u7:14,u90:37,st:64.9,woh:1},{c:"NAVY STRIPED LINEN",s:"S26",e:"FR",oh:17,ov:2750,u7:0,u90:8,st:32.0,woh:27}]},
{n:"PERFECT ROUND TOE PUMP 70",d:"Pumps",oh:334,ov:51305,u7:15,u90:63,st:15.9,woh:22,skus:[{c:"BLACK SUEDE",s:"F21",e:"CO",oh:199,ov:30387,u7:4,u90:31,st:13.5,woh:50},{c:"CAMEL SUEDE",s:"S26",e:"CR",oh:77,ov:11992,u7:10,u90:25,st:24.5,woh:8},{c:"COGNAC SUEDE",s:"F21",e:"CO",oh:58,ov:8926,u7:1,u90:7,st:10.8,woh:58}]},
{n:"PERFECT BLOCK SANDAL 30",d:"Sandals",oh:321,ov:45347,u7:23,u90:111,st:25.7,woh:14,skus:[{c:"BLACK SUEDE",s:"S20",e:"CO",oh:103,ov:13392,u7:3,u90:14,st:12.0,woh:34},{c:"WHITE CALF",s:"S20",e:"CO",oh:77,ov:11701,u7:3,u90:19,st:19.8,woh:26},{c:"SAND CALF",s:"S20",e:"CO",oh:72,ov:10495,u7:9,u90:38,st:34.5,woh:8},{c:"GOLD NAPPA",s:"S20",e:"CO",oh:69,ov:9759,u7:8,u90:40,st:36.7,woh:9}]},
{n:"NATALIE - SADDLE VACHETTA",d:"Flats",oh:261,ov:36521,u7:3,u90:31,st:10.6,woh:87,skus:[{c:"SADDLE VACHETTA",s:"F19",e:"CA",oh:261,ov:36521,u7:3,u90:31,st:10.6,woh:87}]},
{n:"ROSIE",d:"Pumps",oh:235,ov:28850,u7:5,u90:52,st:18.1,woh:47,skus:[{c:"TAUPE SUEDE",s:"F18",e:"CO",oh:103,ov:12455,u7:2,u90:19,st:15.6,woh:52},{c:"BLACK SUEDE",s:"F18",e:"CO",oh:71,ov:8721,u7:2,u90:12,st:14.5,woh:36},{c:"NAVY SUEDE",s:"F20",e:"CO",oh:61,ov:7674,u7:1,u90:21,st:25.6,woh:37}]},
{n:"PERFECT BLOCK SANDAL 90",d:"Sandals",oh:234,ov:31184,u7:12,u90:42,st:15.2,woh:20,skus:[{c:"WHITE CALF",s:"S20",e:"CO",oh:163,ov:21367,u7:3,u90:14,st:7.9,woh:54},{c:"GOLD NAPPA",s:"S20",e:"CO",oh:71,ov:9817,u7:9,u90:28,st:28.3,woh:8}]},
{n:"NATALIE SLING",d:"Flats",oh:227,ov:31685,u7:5,u90:66,st:22.5,woh:44,skus:[{c:"WHITE CALF",s:"S22",e:"CO",oh:170,ov:23924,u7:0,u90:26,st:13.3,woh:84},{c:"PETAL CALF",s:"S22",e:"CO",oh:46,ov:6527,u7:4,u90:14,st:23.3,woh:12},{c:"NAVY STRIPED LINEN",s:"S26",e:"FR",oh:11,ov:1234,u7:1,u90:26,st:70.3,woh:5}]},
{n:"PERFECT SANDAL 85",d:"Sandals",oh:216,ov:33861,u7:8,u90:46,st:17.6,woh:27,skus:[{c:"GOLD NAPPA",s:"F19",e:"CO",oh:99,ov:14806,u7:2,u90:20,st:16.8,woh:50},{c:"BLACK SUEDE",s:"S19",e:"CO",oh:63,ov:10129,u7:2,u90:11,st:14.9,woh:32},{c:"SAND CALF",s:"S20",e:"CO",oh:54,ov:8926,u7:4,u90:15,st:21.7,woh:14}]},
{n:"PERFECT SLING 85",d:"Pumps",oh:215,ov:32219,u7:5,u90:59,st:21.5,woh:43,skus:[{c:"SAND CALF",s:"S25",e:"CO",oh:95,ov:13917,u7:3,u90:17,st:15.2,woh:32},{c:"BLACK CALF",s:"S25",e:"CO",oh:76,ov:11270,u7:2,u90:26,st:25.5,woh:38},{c:"SILVER SAFFIANO",s:"S26",e:"CR",oh:44,ov:7032,u7:0,u90:16,st:26.7,woh:35}]},
{n:"ALEXANDRA 50",d:"Boots",oh:197,ov:65215,u7:0,u90:14,st:6.6,woh:181,skus:[{c:"BLACK STRETCH SUEDE",s:"F19",e:"CO",oh:102,ov:34071,u7:0,u90:5,st:4.7,woh:262},{c:"NAVY STRETCH SUEDE",s:"F19",e:"CO",oh:51,ov:16702,u7:0,u90:4,st:7.3,woh:164},{c:"ESPRESSO STRETCH SUEDE",s:"F19",e:"CO",oh:44,ov:14442,u7:0,u90:5,st:10.2,woh:113}]},
{n:"PERFECT ARABESQUE WEDGE 80",d:"Sandals",oh:191,ov:31578,u7:4,u90:20,st:9.5,woh:48,skus:[{c:"TWO-TONE CAMEL NAPPA",s:"S23",e:"CA",oh:191,ov:31578,u7:4,u90:20,st:9.5,woh:48}]},
{n:"PERFECT DRESS BOOTIE 60",d:"Boots",oh:186,ov:43804,u7:0,u90:20,st:9.7,woh:120,skus:[{c:"TAUPE SUEDE",s:"F20",e:"CO",oh:125,ov:30414,u7:0,u90:17,st:12.0,woh:95},{c:"BLACK SUEDE",s:"F22",e:"CO",oh:61,ov:13390,u7:0,u90:3,st:4.7,woh:261}]},
{n:"PERFECT CROSSOVER PLATFORM 80",d:"Sandals",oh:184,ov:38378,u7:39,u90:273,st:59.7,woh:5,skus:[{c:"NATURAL FINE WOVEN LINEN",s:"S25",e:"CO",oh:48,ov:10353,u7:2,u90:20,st:29.4,woh:24},{c:"GOLD TEXTURED SAFFIANO",s:"S25",e:"CO",oh:48,ov:9321,u7:18,u90:116,st:70.7,woh:3},{c:"SAND CALF",s:"S26",e:"CR",oh:38,ov:7756,u7:10,u90:49,st:56.3,woh:4},{c:"PINK FLORAL SATIN",s:"S26",e:"FR",oh:26,ov:6089,u7:3,u90:10,st:27.8,woh:9},{c:"BLACK SUEDE",s:"S26",e:"CR",oh:16,ov:3161,u7:2,u90:58,st:78.4,woh:4},{c:"WHITE SATIN",s:"S25",e:"CO",oh:8,ov:1698,u7:4,u90:20,st:71.4,woh:2}]},
{n:"PERFECT EMMA 85",d:"Pumps",oh:170,ov:26625,u7:1,u90:19,st:10.1,woh:115,skus:[{c:"BLACK CALF",s:"S26",e:"CR",oh:67,ov:10564,u7:0,u90:1,st:1.5,woh:861},{c:"COGNAC CALF",s:"S26",e:"CR",oh:66,ov:10407,u7:0,u90:2,st:2.9,woh:424},{c:"BLACK SUEDE",s:"F25",e:"CT",oh:37,ov:5654,u7:1,u90:16,st:30.2,woh:30}]},
{n:"Scrunchie Set",d:"Accessories",oh:146,ov:4693,u7:0,u90:1,st:0.7,woh:1877,skus:[{c:"MULTI FLORAL SILK",s:"S25",e:"OT",oh:146,ov:4693,u7:0,u90:1,st:0.7,woh:1877}]},
{n:"PERFECT AZIZA 85",d:"Sandals",oh:133,ov:21019,u7:6,u90:13,st:8.9,woh:22,skus:[{c:"GOLD TEXTURED SAFFIANO",s:"S26",e:"CT",oh:85,ov:13433,u7:4,u90:7,st:7.6,woh:21},{c:"WHITE SATIN",s:"S26",e:"CT",oh:48,ov:7586,u7:2,u90:6,st:11.1,woh:24}]},
{n:"ARABESQUE SLIDE",d:"Sandals",oh:125,ov:18115,u7:1,u90:27,st:17.8,woh:60,skus:[{c:"TWO-TONE CAMEL NAPPA",s:"S22",e:"CA",oh:125,ov:18115,u7:1,u90:27,st:17.8,woh:60}]},
{n:"PERFECT MIRJANA WEDGE 50",d:"Sandals",oh:121,ov:20630,u7:2,u90:31,st:20.4,woh:50,skus:[{c:"WHITE CALF AND RAFFIA",s:"S22",e:"CA",oh:121,ov:20630,u7:2,u90:31,st:20.4,woh:50}]},
{n:"PERFECT SANDAL 100",d:"Sandals",oh:114,ov:15831,u7:0,u90:11,st:8.8,woh:133,skus:[{c:"GOLD NAPPA",s:"F19",e:"CA",oh:114,ov:15831,u7:0,u90:11,st:8.8,woh:133}]},
{n:"VIP HOLIDAY GIFT 2024",d:"Accessories",oh:113,ov:1906,u7:0,u90:0,st:0.0,woh:999,skus:[{c:"NAVY SUEDE",s:"F24",e:"OT",oh:113,ov:1906,u7:0,u90:0,st:0.0,woh:999}]},
{n:"PERFECT ERIKA 30",d:"Sandals",oh:112,ov:20223,u7:8,u90:19,st:14.5,woh:14,skus:[{c:"GOLD SHIMMER SUEDE",s:"S26",e:"CT",oh:91,ov:15783,u7:3,u90:7,st:7.1,woh:30},{c:"LT PINK SHIMMER SUEDE",s:"S26",e:"FR",oh:21,ov:4440,u7:5,u90:12,st:36.4,woh:4}]},
{n:"JUDY LOAFER",d:"Flats",oh:112,ov:17381,u7:1,u90:22,st:16.4,woh:65,skus:[{c:"BLACK PEBBLED LEATHER",s:"S25",e:"CO",oh:62,ov:9557,u7:0,u90:13,st:17.3,woh:61},{c:"DESERT TAN CROSTA",s:"S25",e:"CO",oh:50,ov:7824,u7:1,u90:9,st:15.3,woh:50}]},
{n:"BOAT SHOE",d:"Sneakers",oh:112,ov:17419,u7:5,u90:11,st:8.9,woh:22,skus:[{c:"DUSTY BLUE NUBUCK",s:"S26",e:"FS",oh:61,ov:9456,u7:3,u90:5,st:7.6,woh:20},{c:"SANDSTONE NUBUCK",s:"S26",e:"FS",oh:51,ov:7963,u7:2,u90:6,st:10.5,woh:26}]},
{n:"PERFECT CROSSOVER SANDAL 50",d:"Sandals",oh:103,ov:16506,u7:30,u90:152,st:59.6,woh:3,skus:[{c:"BLACK CALF",s:"S26",e:"CR",oh:45,ov:7156,u7:7,u90:25,st:35.7,woh:6},{c:"COGNAC CALF",s:"S25",e:"CO",oh:45,ov:7221,u7:13,u90:54,st:54.5,woh:3},{c:"GOLD SAFFIANO",s:"S25",e:"CO",oh:13,ov:2129,u7:10,u90:73,st:84.9,woh:1}]},
{n:"WANDERLUST OXFORD",d:"Sneakers",oh:100,ov:17594,u7:1,u90:17,st:14.5,woh:76,skus:[{c:"AMARETTO CROSTA",s:"F23",e:"CO",oh:51,ov:9005,u7:0,u90:12,st:19.0,woh:55},{c:"NAVY CROSTA",s:"F24",e:"CO",oh:49,ov:8589,u7:1,u90:5,st:9.3,woh:49}]},
{n:"Wrapping Sheet VIP",d:"Accessories",oh:98,ov:372,u7:0,u90:0,st:0.0,woh:999,skus:[{c:"BLUE",s:"F21",e:"OT",oh:98,ov:372,u7:0,u90:0,st:0.0,woh:999}]},
{n:"PERFECT MARY JANE PUMP 85",d:"Pumps",oh:94,ov:15910,u7:3,u90:48,st:33.8,woh:25,skus:[{c:"BLACK PATENT",s:"S26",e:"CT",oh:51,ov:8632,u7:2,u90:27,st:34.6,woh:24},{c:"LIGHT SAND PATENT",s:"S26",e:"CT",oh:43,ov:7278,u7:1,u90:21,st:32.8,woh:26}]},
{n:"PERFECT KENDRA 45",d:"Pumps",oh:81,ov:15163,u7:2,u90:37,st:31.4,woh:28,skus:[{c:"LIGHT PINK PATENT",s:"S26",e:"FS",oh:46,ov:8417,u7:1,u90:11,st:19.3,woh:46},{c:"NAVY CROC CALF",s:"S26",e:"FS",oh:35,ov:6746,u7:1,u90:26,st:42.6,woh:17}]},
{n:"PERFECT KITTEN SLING 50",d:"Pumps",oh:78,ov:12288,u7:5,u90:25,st:24.3,woh:16,skus:[{c:"BLACK CALF",s:"S25",e:"CO",oh:46,ov:7021,u7:3,u90:15,st:24.6,woh:15},{c:"GOLD SAFFIANO",s:"S25",e:"CO",oh:32,ov:5267,u7:2,u90:10,st:23.8,woh:16}]},
{n:"PERFECT DRESS BOOTIE 90",d:"Boots",oh:75,ov:16555,u7:0,u90:6,st:7.4,woh:161,skus:[{c:"BLACK SUEDE",s:"F19",e:"CO",oh:75,ov:16555,u7:0,u90:6,st:7.4,woh:161}]},
{n:"SARAHS GARDEN SCARF 45",d:"Accessories",oh:75,ov:2315,u7:0,u90:3,st:3.8,woh:321,skus:[{c:"HYDRANGEA BLUE SILK",s:"S26",e:"OT",oh:75,ov:2315,u7:0,u90:3,st:3.8,woh:321}]},
{n:"PERFECT ERIKA 60",d:"Sandals",oh:73,ov:13498,u7:9,u90:19,st:20.7,woh:8,skus:[{c:"GOLD SHIMMER SUEDE",s:"S26",e:"CT",oh:51,ov:8846,u7:4,u90:6,st:10.5,woh:13},{c:"LT PINK SHIMMER SUEDE",s:"S26",e:"FR",oh:22,ov:4652,u7:5,u90:13,st:37.1,woh:4}]},
{n:"MIRJANA LOAFER",d:"Flats",oh:63,ov:11120,u7:1,u90:27,st:30.0,woh:30,skus:[{c:"BLACK SUEDE",s:"F24",e:"CO",oh:32,ov:5642,u7:1,u90:11,st:25.6,woh:32},{c:"COGNAC SUEDE",s:"F24",e:"CO",oh:31,ov:5478,u7:0,u90:16,st:34.0,woh:25}]},
{n:"REVERSIBLE SCARF WAIST BELT",d:"Accessories",oh:62,ov:7676,u7:29,u90:545,st:89.8,woh:1,skus:[{c:"CREAM & SADDLE CALF",s:"S23",e:"OT",oh:34,ov:2749,u7:16,u90:217,st:86.5,woh:2},{c:"BLACK CALF & ESPRESSO CROSTA",s:"F25",e:"OT",oh:27,ov:4866,u7:3,u90:43,st:61.4,woh:8}]},
{n:"SF X MARY ORTON OXFORD",d:"Flats",oh:55,ov:11023,u7:0,u90:11,st:16.7,woh:64,skus:[{c:"BLACK CALF",s:"F25",e:"FS",oh:55,ov:11023,u7:0,u90:11,st:16.7,woh:64}]},
{n:"PERFECT ZIP BOOTIE 30",d:"Boots",oh:52,ov:11849,u7:0,u90:12,st:18.8,woh:56,skus:[{c:"BLACK CALF",s:"F19",e:"CO",oh:52,ov:11849,u7:0,u90:12,st:18.8,woh:56}]},
{n:"PERFECT ZIP BOOTIE 70",d:"Boots",oh:52,ov:11072,u7:0,u90:6,st:10.3,woh:111,skus:[{c:"ESPRESSO CROSTA",s:"F21",e:"CO",oh:52,ov:11072,u7:0,u90:6,st:10.3,woh:111}]},
{n:"HIDDEN GARDEN SCARF 90",d:"Accessories",oh:50,ov:2788,u7:2,u90:22,st:30.6,woh:25,skus:[{c:"CHESTNUT SILK",s:"S20",e:"OT",oh:50,ov:2788,u7:2,u90:22,st:30.6,woh:25}]},
{n:"PERFECT STRETCH BOOT 30",d:"Boots",oh:48,ov:12475,u7:0,u90:2,st:4.0,woh:309,skus:[{c:"WR BLACK SUEDE",s:"F21",e:"CA",oh:48,ov:12475,u7:0,u90:2,st:4.0,woh:309}]},
{n:"PERFECT BALLET FLAT",d:"Flats",oh:46,ov:7456,u7:11,u90:185,st:80.1,woh:3,skus:[{c:"NAVY STRIPED LINEN",s:"S26",e:"FR",oh:14,ov:1835,u7:0,u90:22,st:61.1,woh:8},{c:"BLACK WOVEN CALF",s:"S26",e:"CT",oh:12,ov:2107,u7:4,u90:59,st:83.1,woh:3},{c:"SILVER WOVEN CALF",s:"S26",e:"FR",oh:12,ov:2115,u7:3,u90:35,st:74.5,woh:4},{c:"SADDLE WOVEN CALF",s:"S26",e:"CT",oh:8,ov:1399,u7:4,u90:69,st:89.6,woh:1}]},
{n:"PERFECT GITA 70",d:"Pumps",oh:39,ov:6793,u7:0,u90:10,st:20.4,woh:50,skus:[{c:"BLACK SUEDE",s:"S26",e:"FS",oh:39,ov:6793,u7:0,u90:10,st:20.4,woh:50}]},
];

const PC_ALL=[{n:"Heeled Sandals",g:92882,d:10051,gld:82830,u:197,aur:420,p:41.1,oh:2477,st:7.4},{n:"Pumps",g:82654,d:8760,gld:73895,u:167,aur:442,p:36.6,oh:4878,st:3.3},{n:"Flats",g:26408,d:2629,gld:23779,u:67,aur:355,p:11.8,oh:2033,st:3.2},{n:"Sneakers",g:9620,d:422,gld:9198,u:29,aur:317,p:4.6,oh:783,st:3.6},{n:"Belts",g:6995,d:806,gld:6189,u:27,aur:229,p:3.1,oh:248,st:9.8},{n:"Tall Boots",g:2440,d:309,gld:2131,u:3,aur:710,p:1.1,oh:442,st:0.7},{n:"Flat Sandals",g:1840,d:80,gld:1760,u:7,aur:251,p:0.9,oh:765,st:0.9},{n:"Scarves",g:1115,d:72,gld:1043,u:7,aur:149,p:0.5,oh:589,st:1.2},{n:"Booties",g:1785,d:1236,gld:549,u:1,aur:549,p:0.3,oh:601,st:0.2},{n:"Slippers",g:290,d:0,gld:290,u:1,aur:290,p:0.1,oh:21,st:4.5}];
const PC_NEW=[{n:"Heeled Sandals",g:62272,d:7015,gld:55256,u:131,aur:422,p:50.6,oh:2477,st:5.0},{n:"Pumps",g:42665,d:6450,gld:36215,u:86,aur:421,p:33.2,oh:4878,st:1.7},{n:"Flats",g:11373,d:1426,gld:9947,u:29,aur:343,p:9.1,oh:2033,st:1.4},{n:"Belts",g:4770,d:583,gld:4187,u:18,aur:233,p:3.8,oh:248,st:6.8},{n:"Tall Boots",g:1545,d:309,gld:1236,u:2,aur:618,p:1.1,oh:442,st:0.5},{n:"Sneakers",g:1300,d:195,gld:1105,u:4,aur:276,p:1.0,oh:783,st:0.5}];
const PC_RET=[{n:"Pumps",g:39990,d:2310,gld:37680,u:81,aur:465,p:40.7,oh:4878,st:1.6},{n:"Heeled Sandals",g:30610,d:3036,gld:27574,u:66,aur:418,p:29.8,oh:2477,st:2.6},{n:"Flats",g:15035,d:1203,gld:13832,u:38,aur:364,p:14.9,oh:2033,st:1.8},{n:"Sneakers",g:8320,d:227,gld:8093,u:25,aur:324,p:8.7,oh:783,st:3.1},{n:"Belts",g:2225,d:223,gld:2002,u:9,aur:222,p:2.2,oh:248,st:3.5},{n:"Tall Boots",g:895,d:0,gld:895,u:1,aur:895,p:1.0,oh:442,st:0.2}];
const MC_ALL=[{n:"Carryover",g:144107,d:18682,gld:125425,u:305,aur:411,p:62.2,oh:7613,st:3.9},{n:"Carryover Remat.",g:28995,d:1451,gld:27544,u:60,aur:459,p:13.7,oh:983,st:5.8},{n:"Carryover Test",g:11690,d:1340,gld:10350,u:24,aur:431,p:5.1,oh:328,st:6.8},{n:"Fashion Seasonal",g:10442,d:288,gld:10153,u:27,aur:376,p:5.0,oh:457,st:5.6},{n:"Fashion Remat.",g:9890,d:1039,gld:8851,u:21,aur:421,p:4.4,oh:493,st:4.1},{n:"Carryover Aged",g:7840,d:587,gld:7253,u:24,aur:302,p:3.6,oh:1785,st:1.3},{n:"Other",g:8110,d:878,gld:7232,u:34,aur:213,p:3.6,oh:1209,st:2.7},{n:"Inactive",g:4955,d:99,gld:4856,u:11,aur:441,p:2.4,oh:343,st:3.1}];
// Source: SF Product Sales Data → PO Report (Season = S26, 58 SKUs, 5 categories)
const S26_CATS = [
  {cat:"Carryover Remat.",buy:1157,rem:865,st:25,u7:33,n7:15118,tu:292,tn:132107,skus:[
    {n:"Perfect Crossover Platform 80",c:"Black Suede",buy:90,rem:28,st:69,u7:8,n7:3861,tu:62,tn:30341,ta:489},{n:"Perfect Crossover Platform 80",c:"Sand Calf",buy:111,rem:67,st:40,u7:5,n7:2475,tu:44,tn:21478,ta:488},{n:"Perfect Pump 85",c:"Camel Suede",buy:150,rem:117,st:22,u7:4,n7:1616,tu:33,tn:14325,ta:434},
    {n:"Perfect Block Sandal 60",c:"Silver Saffiano",buy:71,rem:43,st:39,u7:1,n7:276,tu:28,tn:12231,ta:437},{n:"Perfect Round Toe Pump 70",c:"Camel Suede",buy:117,rem:93,st:21,u7:0,n7:274,tu:24,tn:11154,ta:465},{n:"Perfect Crossover Sandal 50",c:"Black Calf",buy:79,rem:59,st:25,u7:7,n7:3052,tu:20,tn:8852,ta:443},
    {n:"Perfect Sling 85",c:"Silver Saffiano",buy:70,rem:53,st:24,u7:6,n7:2970,tu:17,tn:7892,ta:464},{n:"Perfect Stephanie 45",c:"Camel Suede",buy:62,rem:47,st:24,u7:0,n7:99,tu:15,tn:6919,ta:461},{n:"Perfect Pump 85",c:"Dusty Brown Patent",buy:80,rem:65,st:19,u7:0,n7:0,tu:15,tn:6604,ta:440},
    {n:"Perfect Kitten Pump 50",c:"Dusty Brown Patent",buy:60,rem:47,st:22,u7:0,n7:-25,tu:13,tn:6128,ta:471},{n:"Alysia Sneaker",c:"Gray Crosta",buy:127,rem:109,st:14,u7:2,n7:520,tu:18,tn:4973,ta:276},{n:"Perfect Emma 85",c:"Cognac Calf",buy:70,rem:68,st:3,u7:0,n7:0,tu:2,tn:815,ta:408},
    {n:"Perfect Emma 85",c:"Black Calf",buy:70,rem:69,st:1,u7:0,n7:0,tu:1,tn:395,ta:395}]},
  {cat:"Carryover Test",buy:1119,rem:854,st:24,u7:13,n7:5897,tu:265,tn:104657,skus:[
    {n:"Perfect Ballet Flat",c:"Saddle Woven Calf",buy:91,rem:23,st:75,u7:0,n7:-74,tu:68,tn:24079,ta:354},{n:"Perfect Ballet Flat",c:"Black Woven Calf",buy:91,rem:30,st:67,u7:4,n7:1530,tu:61,tn:22065,ta:362},{n:"Perfect Mary Jane Pump 85",c:"Black Patent",buy:150,rem:123,st:18,u7:1,n7:525,tu:27,tn:13753,ta:509},
    {n:"Perfect Mary Jane Pump 85",c:"Light Sand Patent",buy:126,rem:106,st:16,u7:1,n7:525,tu:20,tn:10196,ta:510},{n:"Perfect Erika 60",c:"Gold Shimmer Suede",buy:125,rem:118,st:6,u7:4,n7:1980,tu:7,tn:3465,ta:495},{n:"Perfect Erika 30",c:"Gold Shimmer Suede",buy:100,rem:94,st:6,u7:1,n7:495,tu:6,tn:2970,ta:495},
    {n:"Perfect Aziza 85",c:"White Satin",buy:52,rem:48,st:8,u7:1,n7:495,tu:4,tn:2070,ta:518},{n:"Perfect Aziza 85",c:"Gold Saffiano",buy:91,rem:87,st:4,u7:1,n7:495,tu:4,tn:1980,ta:495},{n:"Perfect Aziza 50",c:"White Satin",buy:46,rem:46,st:0,u7:0,n7:0,tu:0,tn:0,ta:0},
    {n:"Perfect Aziza 50",c:"Black Nappa",buy:67,rem:67,st:0,u7:0,n7:0,tu:0,tn:0,ta:0},{n:"Perfect Aziza 50",c:"Gold Saffiano",buy:100,rem:100,st:0,u7:0,n7:0,tu:0,tn:0,ta:0}]},
  {cat:"Fashion Remat.",buy:990,rem:794,st:20,u7:4,n7:1445,tu:196,tn:80827,skus:[
    {n:"Perfect Ballet Flat",c:"Silver Woven Calf",buy:53,rem:20,st:62,u7:-1,n7:-395,tu:33,tn:11285,ta:342},{n:"Natalie Sling",c:"Navy Striped Linen",buy:53,rem:25,st:53,u7:1,n7:395,tu:28,tn:10376,ta:371},{n:"Perfect Pump 85",c:"Mulberry Suede",buy:52,rem:31,st:40,u7:3,n7:1485,tu:21,tn:10034,ta:478},
    {n:"Natalie",c:"Hydrangea Blue Silk",buy:40,rem:17,st:57,u7:-1,n7:-395,tu:23,tn:8728,ta:379},{n:"Perfect Ballet Flat",c:"Navy Striped Linen",buy:43,rem:21,st:51,u7:1,n7:395,tu:22,tn:8113,ta:369},{n:"Perfect Pump 85",c:"Sea Blue Patent",buy:70,rem:53,st:24,u7:3,n7:1485,tu:17,tn:7916,ta:466},
    {n:"Perfect Erika 60",c:"Lt Pink Shimmer Suede",buy:42,rem:32,st:24,u7:1,n7:470,tu:10,tn:4749,ta:475},{n:"Perfect Crossover Platform 80",c:"Pink Floral Satin",buy:37,rem:30,st:19,u7:0,n7:0,tu:7,tn:4567,ta:652},{n:"Perfect Block Sandal 60",c:"Navy Striped Linen",buy:45,rem:37,st:18,u7:-2,n7:-1100,tu:8,tn:3375,ta:422},
    {n:"Alysia Sneaker",c:"Ocean Blue Crosta",buy:82,rem:72,st:12,u7:1,n7:325,tu:10,tn:2918,ta:292},{n:"Judy Loafer",c:"Bluefish Linen",buy:38,rem:33,st:13,u7:0,n7:0,tu:5,tn:2728,ta:546},{n:"Perfect Erika 30",c:"Lt Pink Shimmer Suede",buy:31,rem:25,st:19,u7:-1,n7:-495,tu:6,tn:2673,ta:446},
    {n:"Perfect Crossover Sandal 50",c:"Pink Floral Satin",buy:37,rem:34,st:8,u7:-1,n7:-725,tu:3,tn:2175,ta:725},{n:"Stella",c:"Cognac Croc Calf",buy:39,rem:37,st:5,u7:0,n7:0,tu:2,tn:740,ta:370},{n:"Natalie",c:"Almond Raffia",buy:82,rem:81,st:1,u7:0,n7:0,tu:1,tn:450,ta:450}]},
  {cat:"Fashion Seasonal",buy:560,rem:459,st:18,u7:8,n7:3139,tu:101,tn:47466,skus:[
    {n:"Perfect Kendra 45",c:"Navy Croc Calf",buy:67,rem:41,st:39,u7:1,n7:525,tu:26,tn:12984,ta:499},{n:"Julia",c:"Cognac Nappa",buy:41,rem:23,st:44,u7:1,n7:725,tu:18,tn:8436,ta:469},{n:"Perfect Julia 85",c:"Ivory Nappa",buy:42,rem:26,st:38,u7:-1,n7:-524,tu:16,tn:8058,ta:504},
    {n:"Perfect Gita 70",c:"Black Suede",buy:61,rem:49,st:20,u7:0,n7:0,tu:12,tn:6272,ta:523},{n:"Perfect Kendra 45",c:"Lt Pink Patent",buy:62,rem:51,st:18,u7:0,n7:0,tu:11,tn:5047,ta:459},{n:"Boat Shoe",c:"Sandstone Nubuck",buy:71,rem:62,st:13,u7:6,n7:2144,tu:9,tn:3159,ta:351},
    {n:"Boat Shoe",c:"Dusty Blue Nubuck",buy:71,rem:65,st:8,u7:1,n7:269,tu:6,tn:2050,ta:342},{n:"Perfect Dawn Wedge 50",c:"Ocean Blue Vachetta",buy:42,rem:40,st:5,u7:0,n7:0,tu:2,tn:990,ta:495},{n:"Perfect Dawn Wedge 50",c:"Sand Calf",buy:64,rem:63,st:2,u7:0,n7:0,tu:1,tn:470,ta:470}]},
  {cat:"Other (Accessories)",buy:240,rem:203,st:15,u7:2,n7:423,tu:37,tn:9119,skus:[
    {n:"Mariners Scarf 140",c:"Cream Nautical Cashmere",buy:60,rem:49,st:18,u7:0,n7:0,tu:11,tn:4392,ta:399},{n:"Beetle Cat Scarf 90",c:"Blue Nautical Silk",buy:60,rem:42,st:30,u7:2,n7:423,tu:18,tn:3737,ta:208},{n:"Beetle Cat Grear Ties",c:"Blue Nautical Silk",buy:40,rem:35,st:12,u7:0,n7:0,tu:5,tn:615,ta:123},
    {n:"Garden Scarf 45",c:"Hydrangea Blue Silk",buy:80,rem:77,st:4,u7:0,n7:0,tu:3,tn:375,ta:125}]}];

// Source: SF Product Sales Data → OH Report (active inventory, OH >= 25, excl. Inactive merch)
// 90D ST% = 90D units / (OH + 90D units); WOH = OH / max(7D units, 90D/90*7)

// Loop Returns data — exported 4/14/2026
const RET = {
  wk14Submitted:206, wk14Returns:169, wk14Exchanges:37,
  wk14Refund:59683, wk14ExchangeVal:17423, wk14Open:44, wk14Processed:162,
  ytdSubmitted:2723, ytdRefund:793128, ytdOpen:592, ytdOpenReturns:523, ytdOpenExchanges:69,
  openRefundExposure:193556, openExchangeExposure:25741, openTotalExposure:219297,
  wk14OpenRefund:10733,
  priorWkSubmitted:170, priorWkRefund:43921,
};
const RETURNS_WEEKLY = [
  {wk:"Wk 9", newRefund:24200,retRefund:17241,total:41441,netSales:135374,pctNet:30.6},
  {wk:"Wk 10",newRefund:23800,retRefund:17264,total:41064,netSales:178933,pctNet:22.9},
  {wk:"Wk 11",newRefund:27100,retRefund:19320,total:46420,netSales:149510,pctNet:31.0},
  {wk:"Wk 12",newRefund:32600,retRefund:22654,total:55254,netSales:167682,pctNet:32.9},
  {wk:"Wk 13",newRefund:24500,retRefund:19421,total:43921,netSales:124810,pctNet:35.2},
  {wk:"Wk 14",newRefund:36800,retRefund:22884,total:59684,netSales:127043,pctNet:47.0}];
// Sorted by refund $; ex = Wk14 exchanges processed for that style
const RETURNS_BY_STYLE_WK14 = [
  {s:"Perfect Crossover Platform 80",u:33,refund:12793,pct:21.4,ex:5},
  {s:"Perfect Pump 85",u:20,refund:7777,pct:13.0,ex:3},
  {s:"Perfect Block Sandal 60",u:17,refund:6431,pct:10.8,ex:1},
  {s:"Perfect Block Sandal 30",u:12,refund:4186,pct:7.0,ex:2},
  {s:"Perfect Crossover Sandal 50",u:12,refund:4178,pct:7.0,ex:3},
  {s:"Perfect Ballet Flat",u:12,refund:3268,pct:5.5,ex:2},
  {s:"Alysia Sneaker",u:12,refund:2507,pct:4.2,ex:4},
  {s:"Perfect Round Toe Pump 70",u:7,refund:2354,pct:3.9,ex:2},
  {s:"Natalie",u:10,refund:2296,pct:3.8,ex:1},
  {s:"Reversible Scarf Waist Belt",u:6,refund:1577,pct:2.6,ex:0},
  {s:"Perfect Pump 100",u:5,refund:1363,pct:2.3,ex:2},
  {s:"Perfect Kitten Sling 50",u:3,refund:1321,pct:2.2,ex:0},
  {s:"Perfect Sling 85",u:3,refund:1043,pct:1.7,ex:1},
  {s:"Perfect Erika 60",u:3,refund:980,pct:1.6,ex:0},
  {s:"Perfect Kitten Pump 50",u:4,refund:850,pct:1.4,ex:0},
  {s:"Other (31 styles)",u:47,refund:6760,pct:11.3,ex:19,isOther:true}];
const OPEN_BY_STYLE = [
  {s:"Perfect Pump 85",u:18,refund:32390},{s:"Perfect Block Sandal 60",u:9,refund:10636},
  {s:"Perfect Crossover Platform 80",u:8,refund:10580},{s:"Perfect Emma",u:8,refund:7913},
  {s:"Perfect Kitten Pump 50",u:6,refund:14043},{s:"Natalie",u:5,refund:9104},
  {s:"Perfect Pump 100",u:5,refund:4955},{s:"Perfect Crossover Sandal 50",u:4,refund:5778},
  {s:"Alysia Sneaker",u:4,refund:3168},{s:"Perfect Round Toe Pump 70",u:4,refund:10224},
  {s:"Perfect Block Sandal 30",u:4,refund:8518},{s:"Perfect Ballet Flat",u:4,refund:3005}];
const REASONS_WK14 = [
  {r:"Item Was Too Small",n:82,pct:39.8},{r:"Item Was Too Large",n:51,pct:24.8},
  {r:"Changed My Mind",n:34,pct:16.5},{r:"Item Not as Expected",n:16,pct:7.8},
  {r:"Ordered to Compare",n:12,pct:5.8},{r:"Had a Bad Experience",n:5,pct:2.4},
  {r:"Item Did Not Fit",n:3,pct:1.5},{r:"Wrong Item / Damaged",n:3,pct:1.5}];
const REASONS_YTD = [
  {r:"Item Was Too Small",n:1148,pct:42.0},{r:"Item Was Too Large",n:547,pct:20.0},
  {r:"Changed My Mind",n:406,pct:14.9},{r:"Ordered to Compare",n:225,pct:8.2},
  {r:"Item Not as Expected",n:159,pct:5.8},{r:"Item Did Not Fit",n:104,pct:3.8},
  {r:"Wrong Item Received",n:49,pct:1.8},{r:"Item Arrived Damaged",n:41,pct:1.5},
  {r:"Had a Bad Experience",n:39,pct:1.4},{r:"Other",n:11,pct:0.4}];

// Return Reasons pivot — keyed by timeframe → style → {cols, groups, total}
// groups[].g = parent reason, groups[].t = totals per col, groups[].rows = child reasons
// cols last entry is always "Total"
const REASONS_PIVOT = {
  styleList:["All Styles","Perfect Pump 85","Perfect Crossover Platform 80","Perfect Block Sandal 60","Perfect Crossover Sandal 50","Perfect Ballet Flat","Natalie","Alysia Sneaker"],
  LW:{
    "All Styles":{cols:["Total"],groups:[
      {g:"Fit",t:[136],rows:[{r:"Item Was Too Small",v:[82]},{r:"Item Was Too Large",v:[51]},{r:"Item Did Not Fit",v:[3]}]},
      {g:"Purchase Decision",t:[46],rows:[{r:"Changed My Mind",v:[34]},{r:"Ordered to Compare",v:[12]}]},
      {g:"Product Issue",t:[16],rows:[{r:"Item Not as Expected",v:[16]}]},
      {g:"Other",t:[8],rows:[{r:"Had a Bad Experience",v:[5]},{r:"Wrong Item / Damaged",v:[3]}]},
    ],total:[206]},
    "Perfect Pump 85":{cols:["Black Calf","Sand Calf","Black Suede","Camel Suede","Total"],groups:[
      {g:"Fit",t:[5,4,3,1,13],rows:[{r:"Item Was Too Small",v:[3,2,2,1,8]},{r:"Item Was Too Large",v:[2,2,1,0,5]}]},
      {g:"Purchase Decision",t:[2,1,1,0,4],rows:[{r:"Changed My Mind",v:[2,1,1,0,4]}]},
      {g:"Other",t:[1,0,1,0,2],rows:[{r:"Item Not as Expected",v:[1,0,1,0,2]}]},
    ],total:[8,5,5,1,19]},
    "Perfect Crossover Platform 80":{cols:["Gold Textured Saffiano","Black Suede","Sand Calf","Pink Floral Satin","Total"],groups:[
      {g:"Fit",t:[8,6,4,2,20],rows:[{r:"Item Was Too Small",v:[5,4,2,1,12]},{r:"Item Was Too Large",v:[3,2,2,1,8]}]},
      {g:"Purchase Decision",t:[4,2,2,1,9],rows:[{r:"Changed My Mind",v:[3,1,2,1,7]},{r:"Ordered to Compare",v:[1,1,0,0,2]}]},
      {g:"Other",t:[2,1,1,0,4],rows:[{r:"Item Not as Expected",v:[2,1,1,0,4]}]},
    ],total:[14,9,7,3,33]},
    "Perfect Block Sandal 60":{cols:["Sand Calf","Gold Nappa","Black Suede","Total"],groups:[
      {g:"Fit",t:[4,3,2,9],rows:[{r:"Item Was Too Small",v:[2,2,1,5]},{r:"Item Was Too Large",v:[2,1,1,4]}]},
      {g:"Purchase Decision",t:[3,2,1,6],rows:[{r:"Changed My Mind",v:[3,2,1,6]}]},
      {g:"Other",t:[1,0,1,2],rows:[{r:"Item Not as Expected",v:[1,0,1,2]}]},
    ],total:[8,5,4,17]},
  },
  L4W:{
    "All Styles":{cols:["Total"],groups:[
      {g:"Fit",t:[512],rows:[{r:"Item Was Too Small",v:[296]},{r:"Item Was Too Large",v:[196]},{r:"Item Did Not Fit",v:[20]}]},
      {g:"Purchase Decision",t:[168],rows:[{r:"Changed My Mind",v:[122]},{r:"Ordered to Compare",v:[46]}]},
      {g:"Product Issue",t:[58],rows:[{r:"Item Not as Expected",v:[58]}]},
      {g:"Other",t:[30],rows:[{r:"Had a Bad Experience",v:[16]},{r:"Wrong Item / Damaged",v:[14]}]},
    ],total:[768]},
    "Perfect Pump 85":{cols:["Black Calf","Sand Calf","Black Suede","Camel Suede","Total"],groups:[
      {g:"Fit",t:[18,15,12,5,50],rows:[{r:"Item Was Too Small",v:[10,9,7,3,29]},{r:"Item Was Too Large",v:[8,6,5,2,21]}]},
      {g:"Purchase Decision",t:[6,4,3,1,14],rows:[{r:"Changed My Mind",v:[6,4,3,1,14]}]},
      {g:"Other",t:[3,1,2,1,7],rows:[{r:"Item Not as Expected",v:[3,1,2,1,7]}]},
    ],total:[27,20,17,7,71]},
    "Perfect Crossover Platform 80":{cols:["Gold Textured Saffiano","Black Suede","Sand Calf","Pink Floral Satin","Total"],groups:[
      {g:"Fit",t:[28,22,16,8,74],rows:[{r:"Item Was Too Small",v:[16,13,10,5,44]},{r:"Item Was Too Large",v:[12,9,6,3,30]}]},
      {g:"Purchase Decision",t:[12,8,7,3,30],rows:[{r:"Changed My Mind",v:[9,6,5,2,22]},{r:"Ordered to Compare",v:[3,2,2,1,8]}]},
      {g:"Other",t:[5,3,2,1,11],rows:[{r:"Item Not as Expected",v:[5,3,2,1,11]}]},
    ],total:[45,33,25,12,115]},
    "Perfect Block Sandal 60":{cols:["Sand Calf","Gold Nappa","Black Suede","Total"],groups:[
      {g:"Fit",t:[14,11,8,33],rows:[{r:"Item Was Too Small",v:[8,7,5,20]},{r:"Item Was Too Large",v:[6,4,3,13]}]},
      {g:"Purchase Decision",t:[9,6,4,19],rows:[{r:"Changed My Mind",v:[9,6,4,19]}]},
      {g:"Other",t:[3,1,2,6],rows:[{r:"Item Not as Expected",v:[3,1,2,6]}]},
    ],total:[26,18,14,58]},
  }
};


// ─── UTILS ───
const fmt=n=>n>=1e6?`$${(n/1e6).toFixed(1)}M`:n>=1000?`$${(n/1000).toFixed(0)}K`:`$${n.toFixed(0)}`;
const ff=n=>`$${n.toLocaleString("en-US",{maximumFractionDigits:0})}`;
const w=(c,p)=>((c-p)/p*100);
const C={b1:"#1e40af",b2:"#3b82f6",b3:"#93c5fd",b4:"#dbeafe",nv:"#0f172a",sl:"#334155",sL:"#94a3b8",gn:"#059669",rd:"#dc2626",am:"#d97706",cd:"#ffffff",bd:"#e2e8f0"};

const Pill=({v,inv})=>{const p=inv?v<0:v>0;return (<span style={{background:p?"rgba(16,185,129,0.12)":"rgba(239,68,68,0.12)",color:p?C.gn:C.rd,padding:"2px 7px",borderRadius:20,fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{v>0?"▲":"▼"} {Math.abs(v).toFixed(1)}%</span>)};
const MC=({l,v,ww,plan,pL,inv,sub})=>(
  <div style={{background:C.cd,borderRadius:12,padding:"15px 17px",border:`1px solid ${C.bd}`,flex:1,minWidth:155}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(30,64,175,0.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
    <div style={{fontSize:10,color:C.sL,textTransform:"uppercase",letterSpacing:0.7,fontWeight:600,marginBottom:4}}>{l}</div>
    <div style={{fontSize:23,fontWeight:700,color:C.nv,lineHeight:1.1}}>{v}</div>
    {sub&&<div style={{fontSize:11,color:C.sL,marginTop:2}}>{sub}</div>}
    <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap",alignItems:"center"}}>
      {ww!==undefined&&<Pill v={ww} inv={inv}/>}
      {plan!==undefined&&<span style={{fontSize:11,color:C.sL}}>{pL||"vs Plan"}: <span style={{color:plan>=0?C.gn:C.rd,fontWeight:600}}>{plan>=0?"+":""}{plan.toFixed(0)}%</span></span>}
    </div>
  </div>
);
const SH=({t,icon})=><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:13,marginTop:22}}><span style={{fontSize:16}}>{icon}</span><h2 style={{fontSize:15,fontWeight:700,color:C.nv,margin:0}}>{t}</h2></div>;
const Src=({t})=><div style={{fontSize:10,color:C.sL,marginTop:8,fontStyle:"italic",borderTop:`1px dashed ${C.bd}`,paddingTop:5}}>📎 {t}</div>;
const Badge=({type,children})=>{const s={callout:{bg:"#fef3c7",b:"#fbbf24",i:"⚡"},opportunity:{bg:"#d1fae5",b:"#34d399",i:"🎯"},warning:{bg:"#fee2e2",b:"#f87171",i:"⚠️"},info:{bg:"#dbeafe",b:"#60a5fa",i:"💡"}}[type];return (<div style={{background:s.bg,border:`1px solid ${s.b}`,borderRadius:8,padding:"10px 14px",fontSize:13,lineHeight:1.5,color:C.sl,marginBottom:8}}><span style={{marginRight:6}}>{s.i}</span>{children}</div>)};
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
const CT=({active,payload,label})=>{if(!active||!payload?.length)return null;return (<div style={{background:"#fff",border:`1px solid ${C.bd}`,borderRadius:8,padding:"10px 14px",boxShadow:"0 4px 16px rgba(0,0,0,0.08)"}}><div style={{fontSize:12,fontWeight:600,color:C.nv,marginBottom:4}}>{label}</div>{payload.map((p,i)=><div key={i} style={{fontSize:12,color:p.color||C.sl}}>{p.name}: {typeof p.value==="number"&&p.value>100?ff(p.value):p.value}</div>)}</div>)};

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
  const [tab,setTab]=useState("overview");
  const [revF,setRevF]=useState("all");
  const [prodFilter,setProdFilter]=useState("all");
  const [showAll,setShowAll]=useState(false);
  const [search,setSearch]=useState("");
  const [expSlow,setExpSlow]=useState({});
  const [expLP,setExpLP]=useState({});
  const [expS26,setExpS26]=useState({});
  const [expInv,setExpInv]=useState({});
  const [invSeason,setInvSeason]=useState("All");
  const [invMC,setInvMC]=useState("All");
  const [invSC,setInvSC]=useState("All");
  const [showDefs,setShowDefs]=useState(true);
  const [lpChannel,setLpChannel]=useState("All");
  const [retStyleFilter,setRetStyleFilter]=useState("All Styles");
  const [retTimeFilter,setRetTimeFilter]=useState("LW");
  const [expReasons,setExpReasons]=useState({});

  const nROAS=(D.newNetRev/D.mktSpend).toFixed(2);
  const pROAS=(D.priorNewNetRev/D.priorMktSpend).toFixed(2);
  const mtdROAS=(D.mtdNewNet/D.mtdMktSpend).toFixed(2);
  const tabs=[{id:"overview",l:"Overview",i:"📊"},{id:"revenue",l:"Revenue",i:"💰"},{id:"products",l:"Products",i:"👠"},{id:"inventory",l:"Inventory",i:"📦"},{id:"returns",l:"Returns",i:"📦"},{id:"marketing",l:"Marketing",i:"📣"},{id:"website",l:"Website",i:"🌐"}];
  const rv=revF==="new"?REV_NEW:revF==="returning"?REV_RET:null;

  return (
    <div style={{fontFamily:"'DM Sans','Inter',system-ui,sans-serif",background:"#f1f5f9",minHeight:"100vh",color:C.sl}}>
      <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#1e40af 100%)",color:"#fff",padding:"20px 24px 14px"}}>
        <div><div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",opacity:0.6,marginBottom:4}}>Sarah Flint</div>
        <h1 style={{fontSize:22,fontWeight:700,margin:0}}>Weekly Performance Dashboard</h1>
        <div style={{fontSize:13,opacity:0.7,marginTop:4}}>Q2 · Week 16 · Apr 19–25, 2026</div></div>
        <div style={{display:"flex",gap:2,marginTop:16,overflowX:"auto"}}>
          {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:tab===t.id?"rgba(255,255,255,0.15)":"transparent",border:"none",borderBottom:tab===t.id?"2px solid #93c5fd":"2px solid transparent",color:tab===t.id?"#fff":"rgba(255,255,255,0.55)",padding:"8px 12px",fontSize:13,fontWeight:600,cursor:"pointer",borderRadius:"8px 8px 0 0",whiteSpace:"nowrap"}}><span style={{marginRight:4}}>{t.i}</span>{t.l}</button>)}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"20px 16px 40px"}}>

{/* ═══ OVERVIEW ═══ */}
{tab==="overview"&&<>
  {/* Plan Comparison Table — retail 4-4-5 calendar */}
  {(()=>{
    const wc=PLAN.weeksComplete;
    const mtdPace=wc/PLAN.mtdWeeks;
    const qtdPace=wc/PLAN.qtdWeeks;
    const pTh={textAlign:"right",padding:"6px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase",whiteSpace:"nowrap"};
    const pTd=(v,col)=>({padding:"9px 6px",textAlign:col===0?"left":"right",fontWeight:col===0?600:500,color:col===0?C.nv:"inherit"});
    const rows=[
      {l:"GROSS REV ($000s)",a:Math.round(D.grossRevenue/1000),wp:Math.round(PLAN.gross/1000),mp:Math.round(PLAN.mtdGross/1000),qp:Math.round(PLAN.qtdGross/1000),dl:true},
      {l:"NET REV ($000s)",a:Math.round(D.netRevenue/1000),wp:Math.round(PLAN.net/1000),mp:Math.round(PLAN.mtdNet/1000),qp:Math.round(PLAN.qtdNet/1000),dl:true},
      {l:"NEW CUSTOMERS",a:D.newCustomers,wp:PLAN.newCust,mp:PLAN.mtdNewCust,qp:PLAN.qtdNewCust,dl:false}];
    return <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14,overflowX:"auto"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead>
        <tr>
          <td style={{padding:"8px 8px",fontWeight:700,color:C.nv,fontSize:13}}>PLAN COMPARISON</td>
          {["WTD (Wk 16)","MTD (Apr · 4 wks)","QTD (Q2 · 13 wks)"].map(p=>(
            <td key={p} colSpan={4} style={{textAlign:"center",padding:"0 1px"}}>
              <div style={{background:C.b1,color:"#fff",padding:"5px 0",fontWeight:700,fontSize:11,letterSpacing:0.4,borderRadius:"4px 4px 0 0"}}>{p}</div>
            </td>
          ))}
        </tr>
        <tr style={{borderBottom:`2px solid ${C.bd}`}}>
          <td/>
          {["Actual","Wk Plan","Var $","Var %"].map(h=><td key={"w"+h} style={pTh}>{h}</td>)}
          {["Actual","Period Plan","% Plan","Pace"].map(h=><td key={"m"+h} style={pTh}>{h}</td>)}
          {["Actual","Period Plan","% Plan","Pace"].map(h=><td key={"q"+h} style={pTh}>{h}</td>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r,i)=>{
          const pre=r.dl?"$":"";
          const wVar=r.a-r.wp; const wPct=((r.a/r.wp-1)*100).toFixed(0);
          const mPct=(r.a/r.mp*100).toFixed(1); const mPaceRatio=parseFloat(mPct)/(mtdPace*100);
          const qPct=(r.a/r.qp*100).toFixed(1); const qPaceRatio=parseFloat(qPct)/(qtdPace*100);
          const wPos=wVar>=0;
          return <tr key={i} style={{borderBottom:`1px dashed ${C.bd}`}}>
            <td style={pTd(0,0)}>{r.l}</td>
            <td style={{...pTd(0,1),fontWeight:600}}>{pre}{r.a.toLocaleString()}</td>
            <td style={{...pTd(0,1),color:C.sL}}>{pre}{r.wp.toLocaleString()}</td>
            <td style={{...pTd(0,1),color:wPos?C.gn:C.rd,fontWeight:600}}>{wPos?"+":""}{pre}{wVar.toLocaleString()}</td>
            <td style={{...pTd(0,1),color:wPos?C.gn:C.rd,fontWeight:600}}>{wPos?"+":""}{wPct}%</td>
            <td style={{...pTd(0,1),fontWeight:600}}>{pre}{r.a.toLocaleString()}</td>
            <td style={{...pTd(0,1),color:C.sL}}>{pre}{r.mp.toLocaleString()}</td>
            <td style={pTd(0,1)}>{mPct}%</td>
            <td style={{...pTd(0,1),fontWeight:600,color:mPaceRatio>=1?C.gn:C.rd}}>{mPaceRatio>=1?"Ahead":"Behind"}</td>
            <td style={{...pTd(0,1),fontWeight:600}}>{pre}{r.a.toLocaleString()}</td>
            <td style={{...pTd(0,1),color:C.sL}}>{pre}{r.qp.toLocaleString()}</td>
            <td style={pTd(0,1)}>{qPct}%</td>
            <td style={{...pTd(0,1),fontWeight:600,color:qPaceRatio>=1?C.gn:C.rd}}>{qPaceRatio>=1?"Ahead":"Behind"}</td>
          </tr>;
        })}
        {(()=>{
          const rPlan=PLAN.roasPlan;
          const wVar=(parseFloat(nROAS)-rPlan).toFixed(2);
          const wPct=((parseFloat(nROAS)/rPlan-1)*100).toFixed(0);
          return <tr>
            <td style={pTd(0,0)}>NEW NET ROAS</td>
            <td style={{...pTd(0,1),fontWeight:600}}>{nROAS}x</td>
            <td style={{...pTd(0,1),color:C.sL}}>{rPlan}x</td>
            <td style={{...pTd(0,1),color:C.gn,fontWeight:600}}>+{wVar}x</td>
            <td style={{...pTd(0,1),color:C.gn,fontWeight:600}}>+{wPct}%</td>
            <td style={{...pTd(0,1),fontWeight:600}}>{nROAS}x</td>
            <td style={{...pTd(0,1),color:C.sL}} colSpan={3}>Pacing tracks WTD (Wk 1 of period)</td>
            <td style={{...pTd(0,1),fontWeight:600}}>{nROAS}x</td>
            <td style={{...pTd(0,1),color:C.sL}} colSpan={3}>Pacing tracks WTD (Wk 1 of period)</td>
          </tr>;
        })()}
      </tbody>
    </table>
    <div style={{fontSize:11,color:C.sL,marginTop:10}}>Retail calendar: Apr = Wks 14–17 (4 wks) · Q2 = Wks 14–26 (13 wks, 4-4-5) · Pace = actual % to plan vs expected % ({(mtdPace*100).toFixed(0)}% MTD, {(qtdPace*100).toFixed(1)}% QTD)</div>
    <Src t="Actuals: SF Supermetrics → Exhibits; Plan: SF Supermetrics → Finance Plan Wkly (retail 4-4-5)"/>
  </div>;
  })()}

  {/* Weekly KPIs */}
  <SH t="Week 16 Performance" icon="📈"/>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
    <MC l="Gross Revenue" v={fmt(D.grossRevenue)} ww={w(D.grossRevenue,D.priorGross)} plan={w(D.grossRevenue,PLAN.gross)} sub={`Plan: ${fmt(PLAN.gross)}`}/>
    <MC l="Net Revenue" v={fmt(D.netRevenue)} ww={w(D.netRevenue,D.priorNet)} plan={w(D.netRevenue,PLAN.net)} sub={`Plan: ${fmt(PLAN.net)}`}/>
    <MC l="New Customers" v={D.newCustomers} ww={w(D.newCustomers,D.priorNewCustomers)} plan={w(D.newCustomers,PLAN.newCust)} sub={`Plan: ${PLAN.newCust}`}/>
    <MC l="Returning Orders" v={REV_RET.orders} ww={w(REV_RET.orders,REV_RET.priorOrders)} sub={`PW: ${REV_RET.priorOrders} · Plan: ${PLAN.repeatCust}`}/>
  </div>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
    <MC l="Discount Rate" v={`${D.discPctGross}%`} ww={w(D.discPctGross,D.priorDiscPctGross)} inv sub={`Plan: ${PLAN.discPct}% · PW: ${D.priorDiscPctGross}%`}/>
    <MC l="Return Rate" v={`${D.returnPctGLD}%`} ww={w(D.returnPctGLD,D.priorReturnPctGLD)} inv sub={`Plan: ${PLAN.returnPct}% · PW: ${D.priorReturnPctGLD}%`}/>
    <MC l="Marketing Spend" v={ff(D.mktSpend)} ww={w(D.mktSpend,D.priorMktSpend)} inv sub={`Meta: ${ff(D.metaSpend)} · Google: ${ff(D.googleSpend)}`}/>
    <MC l="New Net Rev ROAS" v={`${nROAS}x`} ww={w(parseFloat(nROAS),parseFloat(pROAS))} sub={`PW: ${pROAS}x · New Net ÷ Spend`}/>
  </div>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:6}}>
    <MC l="Sessions" v={D.sessions.toLocaleString()} ww={w(D.sessions,D.priorSessions)} plan={w(D.sessions,PLAN.sessions)} sub={`Plan: ${PLAN.sessions.toLocaleString()}`}/>
    <MC l="Conversion Rate" v={`${D.convRate}%`} ww={w(D.convRate,D.priorConvRate)} sub={`Plan: ${PLAN.conv}% · PW: ${D.priorConvRate}%`}/>
    <MC l="Engagement Rate" v={`${D.engagementRate}%`} ww={w(D.engagementRate,D.priorEngagementRate)} sub={`PW: ${D.priorEngagementRate}%`}/>
    <MC l="Add to Cart Rate" v={`${D.atcRate}%`} ww={w(D.atcRate,D.priorAtcRate)} inv sub={`PW: ${D.priorAtcRate}%`}/>
  </div>
  <Src t="SF Supermetrics → Exhibits (rows 10–34, 62–76) + Traffic (R9: ATC Rate); Plan: Finance Plan Wkly"/>

  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <div style={{fontSize:14,fontWeight:700,color:C.nv,marginBottom:14}}>Net Revenue – Weekly (New vs. Returning)</div>
    <ResponsiveContainer width="100%" height={230}>
      <ComposedChart data={WEEKLY_TREND}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="week" tick={{fontSize:11,fill:C.sL}}/><YAxis tick={{fontSize:11,fill:C.sL}} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`}/><Tooltip content={<CT/>}/>
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
      <ResponsiveContainer width="100%" height={160}><PieChart><Pie data={[{name:"New",value:Math.round(D.newNetRev/(D.newNetRev+D.repeatNetRev)*100)},{name:"Returning",value:Math.round(D.repeatNetRev/(D.newNetRev+D.repeatNetRev)*100)}]} innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value"><Cell fill={C.b1}/><Cell fill={C.b3}/></Pie><Tooltip formatter={v=>`${v}%`}/><Legend iconType="circle" wrapperStyle={{fontSize:11}}/></PieChart></ResponsiveContainer>
      <div style={{display:"flex",justifyContent:"space-around",fontSize:12,marginTop:4}}>
        <div style={{textAlign:"center"}}><div style={{fontWeight:700,color:C.b1}}>{fmt(D.newNetRev)}</div><div style={{color:C.sL}}>New</div></div>
        <div style={{textAlign:"center"}}><div style={{fontWeight:700,color:C.b3}}>{fmt(D.repeatNetRev)}</div><div style={{color:C.sL}}>Returning</div></div>
      </div>
      <Src t="SF Supermetrics → Exhibits (rows 15–16)"/>
    </div>
  </div>
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["gross","gld","net","discPct","retPct","newCust","retOrders","mktSpend","newNetROAS","sessions","conv","engagement","atcRate"]}/>
</>}

{/* ═══ REVENUE ═══ */}
{tab==="revenue"&&<>
  <div style={{display:"flex",gap:4,marginBottom:14}}>
    {["all","new","returning"].map(f=><button key={f} onClick={()=>setRevF(f)} style={{background:revF===f?C.b1:C.cd,color:revF===f?"#fff":C.sl,border:`1px solid ${revF===f?C.b1:C.bd}`,borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{f==="all"?"All":f==="new"?"New":"Returning"}</button>)}
  </div>

  {revF==="all"?<>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
      <MC l="Gross Revenue" v={ff(D.grossRevenue)} ww={w(D.grossRevenue,D.priorGross)} plan={w(D.grossRevenue,PLAN.gross)} sub={`Plan: ${ff(PLAN.gross)}`}/>
      <MC l="Discounts" v={ff(D.discounts)} ww={w(D.discounts,D.priorDiscounts)} inv sub={`PW: ${ff(D.priorDiscounts)}`}/>
      <MC l="Returns" v={ff(D.returns)} ww={w(D.returns,D.priorReturns)} inv sub={`PW: ${ff(D.priorReturns)}`}/>
      <MC l="Net Revenue" v={ff(D.netRevenue)} ww={w(D.netRevenue,D.priorNet)} plan={w(D.netRevenue,PLAN.net)} sub={`Plan: ${ff(PLAN.net)}`}/>
    </div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
      <MC l="Orders" v={D.orders} ww={w(D.orders,D.priorOrders)} plan={w(D.orders,PLAN.orders)} sub={`Plan: ${PLAN.orders}`}/>
      <MC l="Items" v={D.items} ww={w(D.items,D.priorItems)} plan={w(D.items,PLAN.itemsSold)} sub={`Plan: ${PLAN.itemsSold}`}/>
      <MC l="Discount %" v={`${D.discPctGross}%`} ww={w(D.discPctGross,D.priorDiscPctGross)} inv sub={`Plan: ${PLAN.discPct}% · PW: ${D.priorDiscPctGross}%`}/>
      <MC l="Returns % GLD" v={`${D.returnPctGLD}%`} ww={w(D.returnPctGLD,D.priorReturnPctGLD)} inv sub={`Plan: ${PLAN.returnPct}% · PW: ${D.priorReturnPctGLD}%`}/>
    </div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:6}}>
      <MC l="GLD AOV" v={`$${D.gldAOV}`} ww={w(D.gldAOV,D.priorGldAOV)} sub={`Plan: $${PLAN.aov} · PW: $${D.priorGldAOV}`}/>
      <MC l="Net AOV" v={`$${D.netAOV}`} ww={w(D.netAOV,D.priorNetAOV)} sub={`PW: $${D.priorNetAOV}`}/>
      <MC l="AUR" v={`$${D.aur}`} ww={w(D.aur,D.priorAur)} sub={`Plan: $${PLAN.aur} · GLD ÷ Units`}/>
      <MC l="UPT" v={D.upt.toFixed(2)} ww={w(D.upt,D.priorUpt)} sub={`Plan: ${PLAN.upt} · Units ÷ Orders`}/>
    </div>
    <Src t="SF Supermetrics → Exhibits (rows 10–21); Product Sales Report → All Styles; Plan from Finance Plan"/>
  </>:<>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
      <MC l="Gross Revenue" v={ff(rv.gross)} ww={w(rv.gross,rv.priorGross)}/>
      <MC l="Discounts" v={ff(rv.discounts)} ww={w(rv.discounts,rv.priorDiscounts)} inv sub={`PW: ${ff(rv.priorDiscounts)}`}/>
      <MC l="Returns" v={ff(rv.returns)} ww={w(rv.returns,rv.priorReturns)} inv sub={`PW: ${ff(rv.priorReturns)}`}/>
      <MC l="Net Revenue" v={ff(rv.net)} ww={w(rv.net,rv.priorNet)} plan={w(rv.net,revF==="new"?PLAN.newNet:PLAN.retNet)} sub={`Plan: ${ff(revF==="new"?PLAN.newNet:PLAN.retNet)}`}/>
    </div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
      <MC l="Orders" v={rv.orders} ww={w(rv.orders,rv.priorOrders)} sub={`PW: ${rv.priorOrders}`}/>
      <MC l="Items" v={rv.items} ww={w(rv.items,rv.priorItems)} sub={`PW: ${rv.priorItems}`}/>
      <MC l="Discount %" v={`${rv.discPct}%`} ww={w(rv.discPct,rv.priorDiscPct)} inv sub={`PW: ${rv.priorDiscPct}%`}/>
      <MC l="Returns % GLD" v={`${rv.returnPctGLD}%`} ww={w(rv.returnPctGLD,rv.priorReturnPctGLD)} inv sub={`PW: ${rv.priorReturnPctGLD}%`}/>
    </div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:6}}>
      <MC l="GLD AOV" v={`$${rv.gldAOV}`} ww={w(rv.gldAOV,rv.priorGldAOV)} sub={`PW: $${rv.priorGldAOV}`}/>
      <MC l="Net AOV" v={`$${rv.netAOV}`} ww={w(rv.netAOV,rv.priorNetAOV)} sub={`PW: $${rv.priorNetAOV}`}/>
      <MC l="AUR" v={`$${rv.aur}`} ww={w(rv.aur,rv.priorAur)} sub="GLD ÷ Units"/>
      <MC l="UPT" v={rv.upt.toFixed(2)} ww={w(rv.upt,rv.priorUpt)} sub="Units ÷ Orders"/>
    </div>
    <Src t={`SF Supermetrics → Exhibits (rows ${revF==="new"?"36–46":"49–59"}); Product Sales Report; Plan from Finance Plan`}/>
  </>}

  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14,marginTop:14}}>
    <div style={{fontSize:14,fontWeight:700,color:C.nv,marginBottom:14}}>Daily Net Revenue – Wk 16 {revF!=="all"?`(${revF==="new"?"New":"Returning"})`:""}</div>
    <ResponsiveContainer width="100%" height={220}><ComposedChart data={DAILY}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="day" tick={{fontSize:11,fill:C.sL}}/><YAxis tick={{fontSize:11,fill:C.sL}} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`}/><Tooltip content={<CT/>}/>
      <Bar dataKey={revF==="new"?"newNet":revF==="returning"?"retNet":"newNet"} stackId={revF==="all"?"stack":undefined} fill={C.b1} radius={revF==="all"?[0,0,0,0]:[4,4,0,0]} name={revF==="all"?"New Net Rev":"Net Revenue"}/>
      {revF==="all"&&<Bar dataKey="retNet" stackId="stack" fill={C.b3} radius={[4,4,0,0]} name="Returning Net Rev"/>}
    </ComposedChart></ResponsiveContainer>
    <Src t="SF Supermetrics → Exhibits (rows 78–95) + DShopify (Wks 11–13 daily net for trailing avg)"/>
  </div>

  <SH t="New vs. Returning Comparison" icon="👥"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:8,overflowX:"auto"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["Metric","New CW","New PW","WoW","Ret CW","Ret PW","WoW"].map(h=><th key={h} style={{textAlign:h==="Metric"?"left":"right",padding:"7px 9px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
    </tr></thead><tbody>{[
      {m:"Net Revenue",nc:ff(REV_NEW.net),np:ff(REV_NEW.priorNet),nw:w(REV_NEW.net,REV_NEW.priorNet),rc:ff(REV_RET.net),rp:ff(REV_RET.priorNet),rw:w(REV_RET.net,REV_RET.priorNet)},
      {m:"Orders",nc:REV_NEW.orders,np:REV_NEW.priorOrders,nw:w(REV_NEW.orders,REV_NEW.priorOrders),rc:REV_RET.orders,rp:REV_RET.priorOrders,rw:w(REV_RET.orders,REV_RET.priorOrders)},
      {m:"GLD AOV",nc:`$${REV_NEW.gldAOV}`,np:`$${REV_NEW.priorGldAOV}`,nw:w(REV_NEW.gldAOV,REV_NEW.priorGldAOV),rc:`$${REV_RET.gldAOV}`,rp:`$${REV_RET.priorGldAOV}`,rw:w(REV_RET.gldAOV,REV_RET.priorGldAOV)},
      {m:"Net AOV",nc:`$${REV_NEW.netAOV}`,np:`$${REV_NEW.priorNetAOV}`,nw:w(REV_NEW.netAOV,REV_NEW.priorNetAOV),rc:`$${REV_RET.netAOV}`,rp:`$${REV_RET.priorNetAOV}`,rw:w(REV_RET.netAOV,REV_RET.priorNetAOV)},
      {m:"Disc %",nc:`${REV_NEW.discPct}%`,np:`${REV_NEW.priorDiscPct}%`,nw:-4.9,rc:`${REV_RET.discPct}%`,rp:`${REV_RET.priorDiscPct}%`,rw:-55.5,inv:true},
      {m:"Return % GLD",nc:`${REV_NEW.returnPctGLD}%`,np:"29.9%",nw:26.4,rc:`${REV_RET.returnPctGLD}%`,rp:"29.6%",rw:27.3,inv:true}].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
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
  const styData = pf==="new"?STY_NEW:pf==="returning"?STY_RET:STY_ALL;
  const skuData = pf==="new"?SKU_NEW:pf==="returning"?SKU_RET:SKU_ALL;
  const catData = pf==="new"?PC_NEW:pf==="returning"?PC_RET:PC_ALL;
  const styles = styData.filter(s=>s.gld>0&&s.n.toLowerCase().includes(search.toLowerCase()));
  const shown = showAll ? styles : styles.slice(0,10);
  const skuShown = showAll ? skuData : skuData.slice(0,10);
  const custLabel = pf==="new"?"NEW CUSTOMERS":pf==="returning"?"RETURNING CUSTOMERS":"ALL CUSTOMERS";
  const tblS = {width:"100%",borderCollapse:"collapse",fontSize:11};
  const th = (h,i) => ({textAlign:i===0||i===1?"left":"right",padding:"6px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase",whiteSpace:"nowrap"});
  const td = (a) => ({padding:"7px 6px",textAlign:a||"right"});
  const totGld = styData.filter(s=>s.gld>0).reduce((a,r)=>a+r.gld,0);
  const totU = styData.filter(s=>s.gld>0).reduce((a,r)=>a+r.u,0);
  const totG = styData.filter(s=>s.gld>0).reduce((a,r)=>a+r.g,0);
  const totD = styData.filter(s=>s.gld>0).reduce((a,r)=>a+r.d,0);
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
      {["#","Style","Gross $","Disc $","GLD $","Units","AUR","% TTL","OH","ST %","WOH"].map((h,i)=><th key={h} style={th(h,i)}>{h}</th>)}
    </tr></thead><tbody>
      {shown.map((s,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{...td("right"),color:C.sL,width:20}}>{i+1}</td>
          <td style={{...td("left"),fontWeight:600,color:C.nv,maxWidth:180}}>{s.n}</td>
          <td style={td()}>{ff(s.g)}</td><td style={td()}>{ff(s.d)}</td>
          <td style={{...td(),fontWeight:600}}>{ff(s.gld)}</td>
          <td style={td()}>{s.u}</td><td style={td()}>${s.aur}</td><td style={td()}>{s.p}%</td>
          <td style={td()}><span style={{color:s.oh<150?C.rd:s.oh<300?C.am:C.sl,fontWeight:s.oh<150?700:400}}>{s.oh>0?s.oh.toLocaleString():"–"}</span></td>
          <td style={td()}><div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:4}}><div style={{width:36,height:4,background:C.b4,borderRadius:2,overflow:"hidden"}}><div style={{width:`${Math.min(s.st*4,100)}%`,height:"100%",background:s.st>10?C.gn:C.b2,borderRadius:2}}/></div>{s.st}%</div></td>
          <td style={{...td(),fontSize:10,color:s.woh>100?C.rd:s.woh>50?C.am:C.sl}}>{s.woh>0?s.woh+"w":"–"}</td>
        </tr>
      ))}
      <tr style={{borderTop:`2px solid ${C.bd}`,background:"#f8fafc",fontWeight:600}}>
        <td colSpan={2} style={{...td("left"),fontWeight:700,color:C.nv}}>Total ({styles.length} styles)</td>
        <td style={td()}>{ff(totG)}</td><td style={td()}>{ff(totD)}</td>
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
      {["#","SKU","Style","Color","Gross $","Disc $","GLD $","Units","AUR","OH"].map((h,i)=><th key={h} style={th(h,i)}>{h}</th>)}
    </tr></thead><tbody>
      {skuShown.map((s,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{...td("right"),color:C.sL,width:20}}>{i+1}</td>
          <td style={{...td("left"),fontSize:10,color:C.sL,fontFamily:"monospace"}}>{s.s}</td>
          <td style={{...td("left"),fontWeight:600,color:C.nv,maxWidth:160}}>{s.n}</td>
          <td style={{...td("left"),color:C.sL,fontSize:10,maxWidth:120}}>{s.c}</td>
          <td style={td()}>{ff(s.g)}</td><td style={td()}>{ff(s.d)}</td>
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
      {["Category","Gross $","Disc $","GLD $","Units","AUR","% TTL","OH","ST %"].map((h,i)=><th key={h} style={th(h,i)}>{h}</th>)}
    </tr></thead><tbody>
      {catData.map((s,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{...td("left"),fontWeight:600,color:C.nv}}>{s.n}</td>
          <td style={td()}>{ff(s.g)}</td><td style={td()}>{ff(s.d)}</td>
          <td style={{...td(),fontWeight:600}}>{ff(s.gld)}</td>
          <td style={td()}>{s.u}</td><td style={td()}>${s.aur}</td><td style={td()}>{s.p}%</td>
          <td style={td()}>{s.oh.toLocaleString()}</td><td style={td()}>{s.st}%</td>
        </tr>
      ))}
    </tbody></table>
    <Src t="SF Product Sales Data → Product Pivots (Product Category)"/>
  </div>

  {/* MERCH CATEGORY - All only */}
  {pf==="all"&&<div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:16,marginBottom:12,overflowX:"auto"}}>
    <div style={{fontSize:13,fontWeight:700,color:C.nv,marginBottom:8}}>ALL CUSTOMERS – MERCH CATEGORY</div>
    <table style={tblS}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["Merch Category","Gross $","Disc $","GLD $","Units","AUR","% TTL","OH","ST %"].map((h,i)=><th key={h} style={th(h,i)}>{h}</th>)}
    </tr></thead><tbody>
      {MC_ALL.map((s,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{...td("left"),fontWeight:600,color:C.nv}}>{s.n}</td>
          <td style={td()}>{ff(s.g)}</td><td style={td()}>{ff(s.d)}</td>
          <td style={{...td(),fontWeight:600}}>{ff(s.gld)}</td>
          <td style={td()}>{s.u}</td><td style={td()}>${s.aur}</td><td style={td()}>{s.p}%</td>
          <td style={td()}>{s.oh.toLocaleString()}</td><td style={td()}>{s.st}%</td>
        </tr>
      ))}
    </tbody></table>
    <Src t="SF Product Sales Data → Product Pivots (Merch Category)"/>
  </div>}

  {/* S26 SPRING/SUMMER 2026 COLLECTION - All only */}
  {pf==="all"&&(()=>{
    const ttlBuy=S26_CATS.reduce((a,c)=>a+c.buy,0);const ttlRem=S26_CATS.reduce((a,c)=>a+c.rem,0);
    const ttlU7=S26_CATS.reduce((a,c)=>a+c.u7,0);const ttlTn=S26_CATS.reduce((a,c)=>a+c.tn,0);
    const ttlSt=Math.round((1-ttlRem/ttlBuy)*100);
    return <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:16,marginBottom:12,overflowX:"auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
      <span style={{fontSize:13,fontWeight:700,color:C.nv}}>SPRING/SUMMER 2026 COLLECTION</span>
      <span style={{fontSize:11,color:C.sL}}>{ttlBuy.toLocaleString()} bought | {ttlRem.toLocaleString()} remaining | {ttlSt}% ST | {ff(ttlTn)} total net</span>
    </div>
    <div style={{fontSize:11,color:C.sL,marginBottom:6}}>Click a category to expand style detail</div>
    <table style={tblS}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["","Merch Category","Initial Buy","Remaining","Total ST%","7D Units","7D Net $","Total Units","Total Net $"].map((h,i)=><th key={h} style={th(h,i)}>{h}</th>)}
    </tr></thead><tbody>
    {S26_CATS.map((cat,ci)=>{
      const open=expS26[cat.cat];
      return <React.Fragment key={ci}>
      <tr style={{borderBottom:open?"none":`1px solid ${C.bd}`,cursor:"pointer",background:cat.st>=30?"rgba(5,150,105,0.04)":cat.st<15?"#fef2f2":"transparent"}} onClick={()=>setExpS26(p=>({...p,[cat.cat]:!p[cat.cat]}))} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>{e.currentTarget.style.background=cat.st>=30?"rgba(5,150,105,0.04)":cat.st<15?"#fef2f2":"transparent"}}>
        <td style={{padding:"8px 4px",color:C.sL,width:16}}>{open?"▾":"▸"}</td>
        <td style={{...td("left"),fontWeight:700,color:C.nv}}>{cat.cat} <span style={{fontWeight:400,color:C.sL,fontSize:10}}>({cat.skus.length} SKUs)</span></td>
        <td style={td()}>{cat.buy.toLocaleString()}</td>
        <td style={td()}>{cat.rem.toLocaleString()}</td>
        <td style={{...td(),fontWeight:600,color:cat.st>=30?C.gn:cat.st>=15?C.nv:C.rd}}>{cat.st}%</td>
        <td style={{...td(),color:cat.u7>0?C.gn:cat.u7<0?C.rd:C.sL}}>{cat.u7}</td>
        <td style={td()}>{ff(cat.n7)}</td>
        <td style={td()}>{cat.tu}</td>
        <td style={{...td(),fontWeight:600}}>{ff(cat.tn)}</td>
      </tr>
      {open&&cat.skus.map((s,si)=>(
        <tr key={si} style={{borderBottom:`1px solid ${C.bd}`,background:"#f8fafc",opacity:s.tu===0&&s.u7===0?0.5:1}}>
          <td/>
          <td style={{...td("left"),paddingLeft:20}}><span style={{fontWeight:500,color:C.nv}}>{s.n}</span><span style={{color:C.sL,fontSize:10,marginLeft:6}}>{s.c}</span></td>
          <td style={td()}>{s.buy}</td>
          <td style={td()}>{s.rem}</td>
          <td style={{...td(),color:s.st>=40?C.gn:s.st>=15?C.nv:s.st>0?C.am:C.sL}}>{s.st}%</td>
          <td style={{...td(),color:s.u7>0?C.gn:s.u7<0?C.rd:C.sL}}>{s.u7}</td>
          <td style={td()}>{s.n7!==0?ff(s.n7):"–"}</td>
          <td style={td()}>{s.tu}</td>
          <td style={td()}>{s.tn>0?ff(s.tn):"–"}</td>
        </tr>
      ))}
      </React.Fragment>;
    })}
    <tr style={{borderTop:`2px solid ${C.bd}`,background:"#f8fafc",fontWeight:700}}>
      <td/><td style={{...td("left"),fontWeight:700,color:C.nv}}>S26 Total</td>
      <td style={td()}>{ttlBuy.toLocaleString()}</td><td style={td()}>{ttlRem.toLocaleString()}</td>
      <td style={{...td(),fontWeight:700}}>{ttlSt}%</td><td style={td()}>{ttlU7}</td><td style={td()}>{ff(S26_CATS.reduce((a,c)=>a+c.n7,0))}</td>
      <td style={td()}>{S26_CATS.reduce((a,c)=>a+c.tu,0)}</td><td style={{...td(),fontWeight:700}}>{ff(ttlTn)}</td>
    </tr>
    </tbody></table>
    <Src t="SF Product Sales Data → PO Report (Season = S26)"/>
  </div>;
  })()}

  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["gross","disc","gld","net","aur","aov"]}/>
</>})()}

{/* ═══ INVENTORY ═══ */}
{tab==="inventory"&&(()=>{
  const scLabel={"CO":"Carryover","CA":"Carryover Aged","CR":"Carryover Rematerialization","CT":"Carryover Test","FR":"Fashion Rematerialization","FS":"Fashion Seasonal","OT":"Other"};
  const filtSkus=(skus)=>{
    return skus.filter(k=>{
      if(invSeason!=="All"&&k.s!==invSeason) return false;
      if(invSC!=="All"&&k.e!==invSC) return false;
      return true;
    }).sort((a,b)=>b.oh-a.oh);
  };
  const filt=INV.filter(s=>{
    if(invMC!=="All"&&s.d!==invMC) return false;
    return filtSkus(s.skus).length>0;
  }).map(s=>({...s,_skus:filtSkus(s.skus)})).sort((a,b)=>b._skus.reduce((x,k)=>x+k.oh,0)-a._skus.reduce((x,k)=>x+k.oh,0));
  const ttlOH=filt.reduce((a,s)=>a+s._skus.reduce((b,k)=>b+k.oh,0),0);
  const ttlOV=filt.reduce((a,s)=>a+s._skus.reduce((b,k)=>b+(k.ov||0),0),0);
  const ttlU7=filt.reduce((a,s)=>a+s._skus.reduce((b,k)=>b+k.u7,0),0);
  const ttlU90=filt.reduce((a,s)=>a+s._skus.reduce((b,k)=>b+k.u90,0),0);
  const ttlST=ttlU90>0?((ttlU90/(ttlOH+ttlU90))*100).toFixed(1):"0";
  const btnS=(v,cur,set)=>({background:cur===v?C.b1:C.cd,color:cur===v?"#fff":C.sl,border:`1px solid ${cur===v?C.b1:C.bd}`,borderRadius:6,padding:"4px 8px",fontSize:10,fontWeight:600,cursor:"pointer"});
  return <>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
    <span style={{fontSize:11,fontWeight:600,color:C.nv,minWidth:90}}>Season:</span>
    {["All",...INV_F.s].map(v=><button key={v} onClick={()=>setInvSeason(v)} style={btnS(v,invSeason)}>{v}</button>)}
  </div>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
    <span style={{fontSize:11,fontWeight:600,color:C.nv,minWidth:90}}>Merch Class:</span>
    {["All",...INV_F.d].map(v=><button key={v} onClick={()=>setInvMC(v)} style={btnS(v,invMC)}>{v}</button>)}
  </div>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
    <span style={{fontSize:11,fontWeight:600,color:C.nv,minWidth:90}}>Merch Category:</span>
    {["All",...INV_F.e].map(v=><button key={v} onClick={()=>setInvSC(v)} style={btnS(v,invSC)}>{scLabel[v]||v}</button>)}
  </div>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:12}}>
    <MC l="Total OH Units" v={ttlOH.toLocaleString()} sub={`${filt.length} styles`}/>
    <MC l="OH Value" v={`$${(ttlOV/1000).toFixed(0)}K`} sub="At cost"/>
    <MC l="7D Units Sold" v={ttlU7.toLocaleString()} sub="Last 7 days"/>
    <MC l="90D Units Sold" v={ttlU90.toLocaleString()} sub="Last 90 days"/>
    <MC l="90D ST%" v={`${ttlST}%`} sub="90D / (OH + 90D)"/>
  </div>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:16,overflowX:"auto"}}>
    <div style={{fontSize:11,color:C.sL,marginBottom:6}}>Click style to expand color-level detail · Sorted by OH units descending</div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}><thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
      {["","Style","OH Units","OH Value","7D Units","90D Units","90D ST%","WOH"].map((h,i)=><th key={h} style={{textAlign:h===""||h==="Style"?"left":"right",padding:"6px 5px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}
    </tr></thead><tbody>{filt.map((s,i)=>{
      const open=expInv[s.n]; const fs=s._skus;
      const dOH=fs.reduce((a,k)=>a+k.oh,0);
      const dU7=fs.reduce((a,k)=>a+k.u7,0);
      const dU90=fs.reduce((a,k)=>a+k.u90,0);
      const dOV=fs.reduce((a,k)=>a+(k.ov||0),0);
      const dST=dU90>0?((dU90/(dOH+dU90))*100).toFixed(1):"0.0";
      const rate=Math.max(dU7,dU90/90*7);const dWOH=rate>0?Math.round(dOH/rate):999;
      return <React.Fragment key={i}>
      <tr style={{borderBottom:open?"none":`1px solid ${C.bd}`,cursor:"pointer",background:dWOH>=100?"#fef2f2":dWOH<=8?"#f0fdf4":"transparent"}} onClick={()=>setExpInv(p=>({...p,[s.n]:!p[s.n]}))} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>{e.currentTarget.style.background=dWOH>=100?"#fef2f2":dWOH<=8?"#f0fdf4":"transparent"}}>
        <td style={{padding:"7px 4px",color:C.sL,width:16}}>{open?"▾":"▸"}</td>
        <td style={{padding:"7px 5px",fontWeight:600,color:C.nv}}>{s.n} <span style={{fontSize:9,color:C.sL,fontWeight:400}}>({fs.length} colors)</span></td>
        <td style={{padding:"7px 5px",textAlign:"right",fontWeight:600}}>{dOH.toLocaleString()}</td>
        <td style={{padding:"7px 5px",textAlign:"right",color:C.sL}}>{ff(dOV)}</td>
        <td style={{padding:"7px 5px",textAlign:"right",color:dU7>0?C.gn:C.sL}}>{dU7}</td>
        <td style={{padding:"7px 5px",textAlign:"right"}}>{dU90}</td>
        <td style={{padding:"7px 5px",textAlign:"right",fontWeight:500,color:parseFloat(dST)>=25?C.gn:parseFloat(dST)>=10?C.nv:parseFloat(dST)>0?C.am:C.rd}}>{dST}%</td>
        <td style={{padding:"7px 5px",textAlign:"right",fontWeight:600,color:dWOH>=100?C.rd:dWOH>=50?C.am:dWOH<=8?C.gn:C.nv}}>{dWOH>=999?"No sales":dWOH}</td>
      </tr>
      {open&&fs.map((k,j)=>(
        <tr key={j} style={{borderBottom:`1px solid ${C.bd}`,background:"#f8fafc"}}>
          <td/>
          <td style={{padding:"5px 5px 5px 20px",color:C.nv,fontSize:10}}><span style={{fontWeight:500}}>{k.c}</span> <span style={{color:C.sL}}>({k.s}{k.e?` · ${scLabel[k.e]||k.e}`:""})</span></td>
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
    <Src t="SF Product Sales Data → OH Report (active inventory, excl. Inactive merch)"/>
  </div>
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["st90","woh","ohVal"]}/>
  </>;
})()}

{/* ═══ RETURNS ═══ */}
{tab==="returns"&&<>
  {/* KPI Row */}
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="Returns Submitted" v={RET.wk14Submitted} ww={w(RET.wk14Submitted,RET.priorWkSubmitted)} inv sub={`Value: ${ff(RET.wk14Refund+RET.wk14ExchangeVal)} · PW: ${RET.priorWkSubmitted}`}/>
    <MC l="Total Refunds" v={ff(RET.wk14Refund)} ww={w(RET.wk14Refund,RET.priorWkRefund)} inv sub={`PW: ${ff(RET.priorWkRefund)} · ${RET.wk14Returns} return orders`}/>
    <MC l="Total Exchanges" v={ff(RET.wk14ExchangeVal)} sub={`${RET.wk14Exchanges} exchange orders · revenue retained`}/>
    <MC l="Total Open" v={ff(RET.openTotalExposure)} inv sub={`${RET.ytdOpen} unprocessed · ${ff(RET.openRefundExposure)} refund + ${ff(RET.openExchangeExposure)} exchange`}/>
  </div>
  <Src t="Loop Returns — Returned Items Report + Exchanges Report (exported 4/14/26)"/>

  {/* Weekly Trend */}
  <SH t="Weekly Return Value Trend" icon="📈"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={RETURNS_WEEKLY} margin={{top:4,right:48,left:0,bottom:0}}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.bd}/>
        <XAxis dataKey="wk" tick={{fontSize:11,fill:C.sL}}/>
        <YAxis yAxisId="val" orientation="left" tick={{fontSize:10,fill:C.sL}} width={52} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
        <YAxis yAxisId="pct" orientation="right" tick={{fontSize:10,fill:C.sL}} width={36} tickFormatter={v=>`${v}%`}/>
        <Tooltip formatter={(v,n)=>n==="pctNet"?[`${v}%`,`% of Net Sales`]:[`$${v.toLocaleString()}`,n==="newRefund"?"New Returns":"Returning Returns"]}/>
        <Bar yAxisId="val" dataKey="newRefund" stackId="a" fill={C.b1} radius={[0,0,0,0]} name="newRefund"/>
        <Bar yAxisId="val" dataKey="retRefund" stackId="a" fill={C.b3} radius={[3,3,0,0]} name="retRefund"/>
        <Line yAxisId="pct" type="monotone" dataKey="pctNet" stroke={C.rd} strokeWidth={2} dot={{r:3,fill:C.rd}} name="pctNet"/>
      </ComposedChart>
    </ResponsiveContainer>
    <div style={{display:"flex",gap:16,marginTop:8,fontSize:11,color:C.sL}}>
      <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,background:C.b1,borderRadius:2,display:"inline-block"}}/>New customer returns</span>
      <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,background:C.b3,borderRadius:2,display:"inline-block"}}/>Returning customer returns</span>
      <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:16,height:2,background:C.rd,display:"inline-block"}}/>% of Net Sales (right axis)</span>
    </div>
    <Src t="Loop Returns — Returned Items Report · new/ret split from DShopify · stub data — update with actual new/ret split when available"/>
  </div>

  {/* Top Returned Styles — full width */}
  <SH t="Top Returned Styles — LW" icon="👟"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:18,marginBottom:14}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
      <thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
        {["Style","Returns","Exchanges","Refund $","% of Total"].map(h=><th key={h} style={{textAlign:h==="Style"?"left":"right",padding:"5px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
      </tr></thead>
      <tbody>{RETURNS_BY_STYLE_WK14.map((r,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`,background:r.isOther?"rgba(0,0,0,0.03)":i%2===0?"transparent":"rgba(0,0,0,0.01)"}}>
          <td style={{padding:"7px 6px",color:r.isOther?C.sL:C.nv,fontWeight:r.isOther?400:500,fontStyle:r.isOther?"italic":"normal"}}>{r.s}</td>
          <td style={{padding:"7px 6px",textAlign:"right",fontWeight:600}}>{r.u}</td>
          <td style={{padding:"7px 6px",textAlign:"right",color:r.ex>0?"#0284c7":C.sL}}>{r.ex>0?r.ex:"–"}</td>
          <td style={{padding:"7px 6px",textAlign:"right",color:r.isOther?C.sL:C.rd,fontWeight:r.isOther?400:500}}>{ff(r.refund)}</td>
          <td style={{padding:"7px 6px",textAlign:"right"}}><div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:5}}><div style={{width:Math.round(r.pct*1.8),height:6,background:r.isOther?C.bd:C.am,borderRadius:3,opacity:0.7}}/>{r.pct}%</div></td>
        </tr>
      ))}
      <tr style={{borderTop:`2px solid ${C.bd}`,background:"rgba(0,0,0,0.02)"}}>
        <td style={{padding:"7px 6px",fontWeight:700,color:C.nv}}>Total</td>
        <td style={{padding:"7px 6px",textAlign:"right",fontWeight:700}}>{RET.wk14Submitted}</td>
        <td style={{padding:"7px 6px",textAlign:"right",fontWeight:700,color:"#0284c7"}}>{RET.wk14Exchanges}</td>
        <td style={{padding:"7px 6px",textAlign:"right",fontWeight:700,color:C.rd}}>{ff(RET.wk14Refund)}</td>
        <td style={{padding:"7px 6px",textAlign:"right",fontWeight:700}}>100%</td>
      </tr>
      </tbody>
    </table>
    <Src t="Loop Returns — Returned Items Report (Return Submitted Date Apr 5–11)"/>
  </div>

  {/* Return Reasons */}
  <SH t="Return Reasons" icon="🔍"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    {/* Filters */}
    <div style={{display:"flex",gap:12,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        <span style={{fontSize:10,fontWeight:600,color:C.sL,textTransform:"uppercase",letterSpacing:0.5}}>Style</span>
        <select value={retStyleFilter} onChange={e=>setRetStyleFilter(e.target.value)} style={{border:`1px solid ${C.bd}`,borderRadius:6,padding:"6px 10px",fontSize:12,color:C.nv,background:"#fff",cursor:"pointer",outline:"none",minWidth:220}}>
          {REASONS_PIVOT.styleList.map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        <span style={{fontSize:10,fontWeight:600,color:C.sL,textTransform:"uppercase",letterSpacing:0.5}}>Timeframe</span>
        <div style={{display:"flex",gap:4}}>
          {["LW","L4W"].map(t=><button key={t} onClick={()=>setRetTimeFilter(t)} style={{background:retTimeFilter===t?C.b1:"#fff",color:retTimeFilter===t?"#fff":C.sl,border:`1px solid ${retTimeFilter===t?C.b1:C.bd}`,borderRadius:6,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{t==="LW"?"Last Week":"Last 4 Weeks"}</button>)}
        </div>
      </div>
    </div>

    {/* Pivot Table */}
    {(()=>{
      const pivot=(REASONS_PIVOT[retTimeFilter]||{})[retStyleFilter]||(REASONS_PIVOT[retTimeFilter]||{})["All Styles"];
      if(!pivot) return <div style={{color:C.sL,fontSize:12}}>No data for selection.</div>;
      const {cols,groups,total}=pivot;
      const isTotal=(ci)=>ci===cols.length-1&&cols.length>1;
      const thS=(i)=>({textAlign:i===0?"left":"right",padding:"7px 8px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase",whiteSpace:"nowrap",background:"#f8fafc",borderBottom:`2px solid ${C.bd}`});
      return <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr>
            <th style={thS(0)}>Reason</th>
            {cols.map((c,ci)=><th key={ci} style={{...thS(ci+1),color:isTotal(ci)?C.nv:C.sL}}>{c}</th>)}
          </tr></thead>
          <tbody>
            {groups.map((grp,gi)=>{
              const open=expReasons[gi];
              return <React.Fragment key={gi}>
                {/* Parent row */}
                <tr style={{borderBottom:`1px solid ${C.bd}`,cursor:"pointer",background:"#f8fafc"}} onClick={()=>setExpReasons(p=>({...p,[gi]:!p[gi]}))} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="#f8fafc"}>
                  <td style={{padding:"8px 8px",fontWeight:700,color:C.nv}}>
                    <span style={{marginRight:6,fontSize:10,color:C.sL}}>{open?"▾":"▸"}</span>{grp.g}
                  </td>
                  {grp.t.map((v,ci)=><td key={ci} style={{padding:"8px 8px",textAlign:"right",fontWeight:700,color:isTotal(ci)?C.nv:C.sl}}>{v}</td>)}
                </tr>
                {/* Child rows */}
                {open&&grp.rows.map((row,ri)=>(
                  <tr key={ri} style={{borderBottom:`1px solid ${C.bd}`,background:"#fff"}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                    <td style={{padding:"7px 8px 7px 28px",color:C.sl}}>{row.r}</td>
                    {row.v.map((v,ci)=><td key={ci} style={{padding:"7px 8px",textAlign:"right",color:isTotal(ci)?C.nv:C.sL,fontWeight:isTotal(ci)?600:400}}>{v||"–"}</td>)}
                  </tr>
                ))}
              </React.Fragment>;
            })}
            {/* Grand total */}
            <tr style={{borderTop:`2px solid ${C.bd}`,background:"#f1f5f9"}}>
              <td style={{padding:"8px 8px",fontWeight:700,color:C.nv}}>Grand Total</td>
              {total.map((v,ci)=><td key={ci} style={{padding:"8px 8px",textAlign:"right",fontWeight:700,color:isTotal(ci)?C.nv:C.sl}}>{v}</td>)}
            </tr>
          </tbody>
        </table>
      </div>;
    })()}
    <Src t="Loop Returns — Return Reasons by Line Items Report · stub data — update with actual reason IDs per color"/>
  </div>

  <Badge type="warning"><strong>Wk14 returns up 21% WoW</strong> (206 vs 170), refund $ up 35.8%. Platform 80 accounts for 16% of all returns — high volume + high return rate is a risk as the top acquisition style.</Badge>
  <Badge type="warning"><strong>Sizing drives 65%+ of returns.</strong> "Too Small" is the #1 reason. Fit guidance or virtual sizing tools could meaningfully reduce return rate.</Badge>
  <Badge type="opportunity"><strong>Exchange rate healthy at 18% of submissions.</strong> Opportunity to increase exchange nudge in the Loop flow to protect revenue.</Badge>
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["gld","ret","retPct","net"]}/>
</>}

{tab==="marketing"&&<>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="Total Spend" v={ff(D.mktSpend)} ww={w(D.mktSpend,D.priorMktSpend)} inv sub={`PW: ${ff(D.priorMktSpend)} · MTD: ${ff(D.mtdMktSpend)}`}/>
    <MC l="New Customers" v={D.newCustomers} ww={w(D.newCustomers,D.priorNewCustomers)} sub={`PW: ${D.priorNewCustomers} · MTD: ${D.mtdNewCust}`}/>
    <MC l="CAC" v={ff(Math.round(D.mktSpend/D.newCustomers))} ww={w(D.mktSpend/D.newCustomers,D.priorMktSpend/D.priorNewCustomers)} inv sub={`PW: ${ff(Math.round(D.priorMktSpend/D.priorNewCustomers))} · MTD: ${ff(Math.round(D.mtdMktSpend/D.mtdNewCust))}`}/>
    <MC l="New Net ROAS" v={nROAS+"x"} ww={w(parseFloat(nROAS),parseFloat(pROAS))} sub={`PW: ${pROAS}x · MTD: ${mtdROAS}x`}/>
  </div>
  <Src t="Supermetrics Exhibits + Finance Plan Wkly"/>

  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="Meta Spend" v={ff(D.metaSpend)} ww={w(D.metaSpend,D.priorMetaSpend)} inv sub={`ROAS: ${D.metaRoas}x (PW: ${D.priorMetaRoas}x)`}/>
    <MC l="Google Spend" v={ff(D.googleSpend)} ww={w(D.googleSpend,D.priorGoogleSpend)} inv sub={`ROAS: ${D.googleRoas}x (PW: ${D.priorGoogleRoas}x)`}/>
    <MC l="Meta Revenue" v={ff(D.metaRev)} ww={w(D.metaRev,D.priorMetaRev)}/>
    <MC l="Google Revenue" v={ff(D.googleRev)} ww={w(D.googleRev,D.priorGoogleRev)}/>
  </div>

  <SH t="Weekly Marketing Trend" icon="📈"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={WEEKLY_TREND}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="week" tick={{fontSize:11,fill:C.sL}}/><YAxis tick={{fontSize:11,fill:C.sL}} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`}/><Tooltip content={<CT/>}/>
        <Bar dataKey="spend" fill={C.b3} name="Spend" radius={[3,3,0,0]}/>
        <Line type="monotone" dataKey="newNet" stroke={C.gn} strokeWidth={2} dot={{r:3}} name="New Net Rev"/>
      </ComposedChart>
    </ResponsiveContainer>
    <Src t="Daily Data (weekly aggregation, Wks 6-16)"/>
  </div>

  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
    <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:18}}>
      <div style={{fontSize:13,fontWeight:700,color:C.nv,marginBottom:10}}>CAC Trend</div>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={WEEKLY_TREND}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="week" tick={{fontSize:10,fill:C.sL}}/><YAxis tick={{fontSize:10,fill:C.sL}}/><Tooltip content={<CT/>}/>
          <Bar dataKey="cac" fill={C.b2} name="CAC" radius={[3,3,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:18}}>
      <div style={{fontSize:13,fontWeight:700,color:C.nv,marginBottom:10}}>New Net ROAS Trend</div>
      <ResponsiveContainer width="100%" height={140}>
        <ComposedChart data={WEEKLY_TREND}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="week" tick={{fontSize:10,fill:C.sL}}/>
          <YAxis tick={{fontSize:10,fill:C.sL}}/><Tooltip content={<CT/>}/>
          <Bar dataKey="roas" fill={C.gn} name="ROAS" radius={[3,3,0,0]}/>
          <ReferenceLine y={1.65} stroke={C.rd} strokeDasharray="5 5" label={{value:"Plan 1.65x",fontSize:10,fill:C.rd}}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>

  {(()=>{
    const metaWoW=D.priorMetaSpend>0?((D.metaSpend/D.priorMetaSpend-1)*100).toFixed(1)+"%":"–";
    const googWoW=D.priorGoogleSpend>0?((D.googleSpend/D.priorGoogleSpend-1)*100).toFixed(1)+"%":"–";
    return <>
      <SH t="Campaign Performance" icon="📋"/>
      <CampTbl data={META} title="Meta" tSpend={D.metaSpend} tWow={metaWoW} tRoas={D.metaRoas+"x"} tRoasW={D.priorMetaRoas>0?((D.metaRoas/D.priorMetaRoas-1)*100).toFixed(1)+"%":"–"}/>
      <CampTbl data={GOOG} title="Google" tSpend={D.googleSpend} tWow={googWoW} tRoas={D.googleRoas+"x"} tRoasW={D.priorGoogleRoas>0?((D.googleRoas/D.priorGoogleRoas-1)*100).toFixed(1)+"%":"–"}/>
    </>;
  })()}
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["mktSpend","cac","newNetROAS","gldROAS","mer","merNew"]}/>
</>}

{/* ═══ WEBSITE ═══ */}
{tab==="website"&&<>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="Sessions" v={D.sessions.toLocaleString()} ww={w(D.sessions,D.priorSessions)} sub={`PW: ${D.priorSessions.toLocaleString()} · MTD: ${D.mtdSessions.toLocaleString()}`}/>
    <MC l="ATC Rate" v={D.atcRate+"%"} ww={w(D.atcRate,D.priorAtcRate)} sub={`PW: ${D.priorAtcRate}%`}/>
    <MC l="Bounce Rate" v={D.bounceRate+"%"} ww={w(D.bounceRate,D.priorBounceRate)} inv sub={`PW: ${D.priorBounceRate}%`}/>
    <MC l="Pages/Session" v={D.pagesPerSession} ww={w(D.pagesPerSession,D.priorPagesPerSession)} sub={`PW: ${D.priorPagesPerSession}`}/>
  </div>
  <Src t="Supermetrics Exhibits (rows 35-63)"/>

  <SH t="Traffic by Channel (WoW)" icon="📊"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
        {["Channel","CW Sess","PW Sess","WoW","CW ATC","CW Tx","CW Rev"].map(h=><th key={h} style={{textAlign:h==="Channel"?"left":"right",padding:"8px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
      </tr></thead>
      <tbody>{TRAFFIC.map((t,i)=>(
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
    <Src t="D:GA-Traffic (Apr 19-25 vs Apr 12-18)"/>
  </div>

  <SH t="Page Views by Type" icon="📄"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
        {["Type","Sessions","Pages","Bounce %","ATC","ATC %"].map(h=><th key={h} style={{textAlign:h==="Type"?"left":"right",padding:"8px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
      </tr></thead>
      <tbody>{PV_TYPES.map((t,i)=>(
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
    <Src t="D:GA-Pages LW (PDP, Collections, Blog, Landing Pages, Other)"/>
  </div>

  <SH t="Top Landing Pages by Channel" icon="🔗"/>
  <div style={{background:C.cd,borderRadius:12,border:`1px solid ${C.bd}`,padding:20,marginBottom:14}}>
    <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
      {["All",...Object.keys(LP_CH)].map(ch=>(
        <button key={ch} onClick={()=>setLpChannel(ch)} style={{padding:"8px 14px",borderRadius:6,border:`1px solid ${C.bd}`,cursor:"pointer",fontSize:11,fontWeight:700,background:lpChannel===ch?C.nv:"#fff",color:lpChannel===ch?"#fff":C.nv}}>{ch}</button>
      ))}
    </div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.bd}`}}>
        {["Landing Page","Sessions","ATC","ATC %","Orders","CVR","Revenue"].map(h=><th key={h} style={{textAlign:h==="Landing Page"?"left":"right",padding:"8px 6px",color:C.sL,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
      </tr></thead>
      <tbody>{(lpChannel==="All"?LP_ALL:(LP_CH[lpChannel]||[])).map((lp,i)=>(
        <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}} onMouseEnter={e=>e.currentTarget.style.background=C.b4} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <td style={{padding:"8px 6px"}}><div style={{fontWeight:600,color:C.nv}}>{lp.n}</div><div style={{fontSize:9,color:C.sL}}>{lp.lp}</div></td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600}}>{lp.s.toLocaleString()}</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{lp.atc}</td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600,color:lp.ar>=15?C.gn:lp.ar>=5?C.nv:lp.ar>=2?C.am:C.rd}}>{lp.ar}%</td>
          <td style={{padding:"8px 6px",textAlign:"right"}}>{lp.tx}</td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600,color:lp.cr>=2?C.gn:lp.cr>=1?C.nv:C.rd}}>{lp.cr}%</td>
          <td style={{padding:"8px 6px",textAlign:"right",fontWeight:600}}>{lp.rev>0?ff(lp.rev):"–"}</td>
        </tr>
      ))}</tbody>
    </table>
    <Src t="D:GA-LP LW (Apr 19-25, top 15 per channel)"/>
  </div>

  <SH t="Session Breakdown" icon="👥"/>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
    <MC l="New Sessions" v={D.newSessions.toLocaleString()} ww={w(D.newSessions,D.priorNewSessions)} sub={`${(D.newSessions/D.sessions*100).toFixed(0)}% of total`}/>
    <MC l="Returning" v={D.returningSessions.toLocaleString()} ww={w(D.returningSessions,D.priorReturningSessions)} sub={`${(D.returningSessions/D.sessions*100).toFixed(0)}% of total`}/>
    <MC l="Desktop" v={D.desktopSessions.toLocaleString()} ww={w(D.desktopSessions,D.priorDesktopSessions)} sub={`ATC: ${D.desktopAtcRate}% (PW: ${D.priorDesktopAtcRate}%)`}/>
    <MC l="Mobile" v={D.mobileSessions.toLocaleString()} ww={w(D.mobileSessions,D.priorMobileSessions)} sub={`ATC: ${D.mobileAtcRate}% (PW: ${D.priorMobileAtcRate}%)`}/>
  </div>
  <Defs show={showDefs} toggle={()=>setShowDefs(!showDefs)} keys={["sessions","conv","engagement","atcRate","bounce"]}/>
</>}

        <div style={{marginTop:28,padding:"14px 0",borderTop:`1px solid ${C.bd}`,display:"flex",justifyContent:"space-between",fontSize:11,color:C.sL,flexWrap:"wrap",gap:8}}>
          <span>Sarah Flint · Weekly Dashboard · Data through 4/25/26</span>
          <span>Sources: Weekly_Export_for_Claude (Supermetrics, GA, Meta, Google Ads)</span>
        </div>
      </div>
    </div>
  );
}