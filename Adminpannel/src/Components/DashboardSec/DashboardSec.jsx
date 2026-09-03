import React, { useEffect, useMemo, useRef, useState } from "react";
import "./DashboardSec.css";
import { ChevronDown } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* =========================================================
   ASSETS & DUMMY PLACEHOLDERS
========================================================= */
const DUMMY_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f1f5f9'/><circle cx='50' cy='40' r='20' fill='%23cbd5e1'/><path d='M20 85C20 70 35 65 50 65C65 65 80 70 80 85Z' fill='%23cbd5e1'/></svg>";

// Rich tropical beach photo data URI for the promo card matching your reference screenshot exactly
const PROMO_BEACH_BANNER = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";

/* =========================================================
   SEEDED PSEUDO-RANDOM
========================================================= */
const seededRandom = (seedStr) => {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed << 5) - seed + seedStr.charCodeAt(i);
    seed |= 0;
  }
  return () => {
    seed = (seed * 1664525 + 1013904223) | 0;
    return ((seed >>> 0) % 1000) / 1000;
  };
};

/* =========================================================
   CHART RANGE FILTER OPTIONS + DATA BUILDER
========================================================= */
const RANGE_OPTIONS = [
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "year", label: "This Year" },
];

const buildChartData = (range) => {
  const rand = seededRandom(range);

  if (range === "week") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let val = 12;
    return days.map((label) => {
      val = Math.max(4, val + Math.round((rand() - 0.35) * 10));
      return { label, value: val };
    });
  }

  if (range === "year") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let val = 120;
    return months.map((label) => {
      val = Math.max(40, val + Math.round((rand() - 0.3) * 60));
      return { label, value: val };
    });
  }

  const startDate = new Date(2025, 4, 5);
  let val = 8;
  const data = [];
  for (let i = 0; i < 29; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    val = Math.max(4, val + Math.round((rand() - 0.3) * 10));
    data.push({
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: val,
    });
  }
  data[data.length - 1].value = 42;
  return data;
};

const RANGE_TICK_INTERVAL = { week: 0, month: 4, year: 0 };

/* =========================================================
   CUSTOM CHART TOOLTIP
========================================================= */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="dashboard-sec-chart-tooltip">
      <span className="dashboard-sec-chart-tooltip-label">{label}</span>
      <span className="dashboard-sec-chart-tooltip-value">{payload[0].value} Bookings</span>
    </div>
  );
};

/* =========================================================
   CUSTOM CHART DOT
========================================================= */
const renderChartDot = (props) => {
  const { cx, cy, index, payload, dataLength } = props;
  const isLast = index === dataLength - 1;

  if (!isLast) {
    return (
      <circle
        key={`dot-${index}`}
        cx={cx}
        cy={cy}
        r={3}
        fill="#f97316"
        stroke="#ffffff"
        strokeWidth={1}
      />
    );
  }

  return (
    <g key={`dot-${index}`}>
      <circle cx={cx} cy={cy} r={5} fill="#f97316" stroke="#ffffff" strokeWidth={2} />
      <rect x={cx - 17} y={cy - 34} width={36} height={22} rx={11} fill="#f97316" />
      <text x={cx + 1} y={cy - 19} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
        {payload.value}
      </text>
    </g>
  );
};

/* =========================================================
   BOOKINGS OVERVIEW CARD
========================================================= */
const BookingsOverviewCard = () => {
  const [range, setRange] = useState("month");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const chartData = useMemo(() => buildChartData(range), [range]);
  const currentLabel = RANGE_OPTIONS.find((o) => o.id === range)?.label;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard-sec-card dashboard-sec-bookings-card">
      <div className="dashboard-sec-card-header">
        <h3 className="dashboard-sec-card-title">Bookings Overview</h3>

        <div className="dashboard-sec-filter-wrapper" ref={filterRef}>
          <button
            type="button"
            className={`dashboard-sec-filter-btn ${isFilterOpen ? "is-active" : ""}`}
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            {currentLabel}
            <ChevronDown size={14} className={`dashboard-sec-filter-chevron ${isFilterOpen ? "is-open" : ""}`} />
          </button>

          {isFilterOpen && (
            <div className="dashboard-sec-filter-menu">
              {RANGE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  className={`dashboard-sec-filter-option ${range === opt.id ? "is-selected" : ""}`}
                  onClick={() => {
                    setRange(opt.id);
                    setIsFilterOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-sec-chart-wrapper">
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={chartData} margin={{ top: 26, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="dashboardSecBookingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.32} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              interval={RANGE_TICK_INTERVAL[range]}
              dy={6}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#fdba74", strokeWidth: 1, strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={2.5}
              fill="url(#dashboardSecBookingsGradient)"
              dot={(props) => renderChartDot({ ...props, dataLength: chartData.length })}
              activeDot={false}
              isAnimationActive
              animationDuration={700}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* =========================================================
   RECENT BOOKINGS DATA + CARD
========================================================= */
const STATUS_STYLES = {
  Confirmed: "is-confirmed",
  Pending: "is-pending",
  Completed: "is-completed",
};

const RECENT_BOOKINGS = [
  { id: "JT1234", customer: "Rakesh S.", initials: "RS", color: "e0f2fe", pkg: "Puri Darshan Package", date: "02 Jun 2025", amount: "₹6,500", status: "Confirmed" },
  { id: "JT1233", customer: "Anita P.", initials: "AP", color: "fde7f3", pkg: "Golden Triangle Tour", date: "01 Jun 2025", amount: "₹18,999", status: "Pending" },
  { id: "JT1232", customer: "Suresh M.", initials: "SM", color: "e9fbf1", pkg: "Konark & Chilika Tour", date: "31 May 2025", amount: "₹7,200", status: "Confirmed" },
  { id: "JT1231", customer: "Priya K.", initials: "PK", color: "fff1e6", pkg: "Bhubaneswar City Tour", date: "30 May 2025", amount: "₹4,800", status: "Completed" },
  { id: "JT1230", customer: "Manoj T.", initials: "MT", color: "f2ecff", pkg: "Chilika Boat Safari", date: "28 May 2025", amount: "₹3,600", status: "Confirmed" },
  { id: "JT1229", customer: "Sneha R.", initials: "SR", color: "eaf1ff", pkg: "Konark Sun Temple Tour", date: "27 May 2025", amount: "₹5,100", status: "Pending" },
];

const RecentBookingsCard = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleBookings = showAll ? RECENT_BOOKINGS : RECENT_BOOKINGS.slice(0, 4);

  return (
    <div className="dashboard-sec-card dashboard-sec-bookings-table-card">
      <div className="dashboard-sec-card-header">
        <h3 className="dashboard-sec-card-title">Recent Bookings</h3>
        <button
          type="button"
          className="dashboard-sec-view-all-btn"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="dashboard-sec-table-wrapper">
        <table className="dashboard-sec-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Package</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleBookings.map((b) => (
              <tr key={b.id}>
                <td className="dashboard-sec-table-id">{b.id}</td>
                <td>
                  <div className="dashboard-sec-customer-cell">
                    <span
                      className="dashboard-sec-avatar"
                      style={{ background: `#${b.color}` }}
                    >
                      {b.initials}
                    </span>
                    {b.customer}
                  </div>
                </td>
                <td className="dashboard-sec-table-package">{b.pkg}</td>
                <td className="dashboard-sec-table-date">{b.date}</td>
                <td className="dashboard-sec-table-amount">{b.amount}</td>
                <td>
                  <span className={`dashboard-sec-status-pill ${STATUS_STYLES[b.status]}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* =========================================================
   TOP DESTINATIONS DATA + CARD
========================================================= */
const TOP_DESTINATIONS = [
  { id: 1, name: "Puri", subtitle: "Most Booked Destination", bookings: 56, img: DUMMY_AVATAR },
  { id: 2, name: "Konark", subtitle: "Heritage & Culture", bookings: 34, img: DUMMY_AVATAR },
  { id: 3, name: "Chilika Lake", subtitle: "Nature & Adventure", bookings: 22, img: DUMMY_AVATAR },
  { id: 4, name: "Bhubaneswar", subtitle: "Temple City", bookings: 16, img: DUMMY_AVATAR },
  { id: 5, name: "Gopalpur Beach", subtitle: "Coastal Getaway", bookings: 12, img: DUMMY_AVATAR },
  { id: 6, name: "Similipal", subtitle: "Wildlife & Forest", bookings: 9, img: DUMMY_AVATAR },
];

const TopDestinationsCard = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleDestinations = showAll ? TOP_DESTINATIONS : TOP_DESTINATIONS.slice(0, 4);

  return (
    <div className="dashboard-sec-card dashboard-sec-destinations-card">
      <div className="dashboard-sec-card-header">
        <h3 className="dashboard-sec-card-title">Top Destinations</h3>
        <button
          type="button"
          className="dashboard-sec-view-all-btn"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="dashboard-sec-destinations-list">
        {visibleDestinations.map((dest) => (
          <div className="dashboard-sec-destination-item" key={dest.id}>
            <img src={dest.img} alt={dest.name} className="dashboard-sec-destination-thumb" />
            <div className="dashboard-sec-destination-text">
              <span className="dashboard-sec-destination-name">{dest.name}</span>
              <span className="dashboard-sec-destination-subtitle">{dest.subtitle}</span>
            </div>
            <div className="dashboard-sec-destination-count">
              <span className="dashboard-sec-destination-number">{dest.bookings}</span>
              <span className="dashboard-sec-destination-label">Bookings</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================
   PROMO BANNER CARD
========================================================= */
const PromoBannerCard = () => {
  return (
    <div
      className="dashboard-sec-promo-card"
      style={{ backgroundImage: `url(${PROMO_BEACH_BANNER})` }}
    >
      <div className="dashboard-sec-promo-overlay" />
      <div className="dashboard-sec-promo-content">
        <h3 className="dashboard-sec-promo-title">It's Time to Explore the World!</h3>
        <p className="dashboard-sec-promo-subtitle">
          Discover amazing places with Jaganath Tours &amp; Travels
        </p>
        <a href="/packages" className="dashboard-sec-promo-btn">
          Explore Packages
        </a>
      </div>
    </div>
  );
};

/* =========================================================
   COMPONENT
========================================================= */
const DashboardSec = () => {
  return (
    <section className="dashboard-sec-section">
      <div className="dashboard-sec-grid">

        {/* Left Column */}
        <div className="dashboard-sec-col dashboard-sec-col-left">
          <BookingsOverviewCard />
          <RecentBookingsCard />
        </div>

        {/* Right Column */}
        <div className="dashboard-sec-col dashboard-sec-col-right">
          <TopDestinationsCard />
          <PromoBannerCard />
        </div>

      </div>
    </section>
  );
};

export default DashboardSec;