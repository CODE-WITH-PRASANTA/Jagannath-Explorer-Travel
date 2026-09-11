import React, { useEffect, useMemo, useRef, useState } from "react";
import "./DashboardHome.css";
import {
  Calendar,
  Briefcase,
  Users,
  IndianRupee,
  Luggage,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   COUNT-UP HOOK — animates a number from 0 to its target.
   Re-runs (and re-animates from 0) whenever `end` changes,
   so switching the filter date visibly re-counts the cards.
========================================================= */
const useCountUp = (end, { duration = 1000, delay = 0 } = {}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime = null;
    setValue(0);

    const timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setValue(Math.floor(eased * end));
        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setValue(end);
        }
      };
      frameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [end, duration, delay]);

  return value;
};

/* =========================================================
   SEEDED PSEUDO-RANDOM — deterministic per selected date, so
   picking a date always yields the same "filtered" numbers
   instead of re-rolling randomly on every render.
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

const BASE_STATS = [
  { id: "bookings", label: "Total Bookings", base: 128, icon: <Briefcase size={22} />, color: "orange" },
  { id: "customers", label: "Total Customers", base: 356, icon: <Users size={22} />, color: "blue" },
  { id: "revenue", label: "Total Revenue", base: 245680, icon: <IndianRupee size={22} />, color: "green", isCurrency: true },
  { id: "packages", label: "Active Packages", base: 24, icon: <Luggage size={22} />, color: "purple" },
];

/** Derives stat values + trend for the currently selected filter date. */
const useStatsForDate = (dateKey) => {
  return useMemo(() => {
    const rand = seededRandom(dateKey);
    return BASE_STATS.map((stat) => {
      const variance = 0.75 + rand() * 0.5; // 0.75x – 1.25x of base
      const value = Math.max(0, Math.round(stat.base * variance));
      const change = Math.round((rand() * 30 - 6) * 10) / 10; // -6% .. +24%
      return { ...stat, value, change };
    });
  }, [dateKey]);
};

/* =========================================================
   SINGLE STAT CARD
========================================================= */
const StatCard = ({ stat, index }) => {
  const count = useCountUp(stat.value, { duration: 1000, delay: index * 90 });
  const displayValue = stat.isCurrency
    ? `₹${count.toLocaleString("en-IN")}`
    : count.toLocaleString("en-IN");
  const isPositive = stat.change >= 0;

  return (
    <div
      className={`dashboard-home-stat-card dashboard-home-stat-${stat.color}`}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="dashboard-home-stat-icon">{stat.icon}</div>

      <div className="dashboard-home-stat-body">
        <span className="dashboard-home-stat-label">{stat.label}</span>
        <span className="dashboard-home-stat-value">{displayValue}</span>

        <span
          className={`dashboard-home-stat-trend ${isPositive ? "is-up" : "is-down"}`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} className="dashboard-home-stat-trend-icon" />
          ) : (
            <ArrowDownRight size={14} className="dashboard-home-stat-trend-icon" />
          )}
          {Math.abs(stat.change)}% from last month
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   PREMIUM CUSTOM CALENDAR DROPDOWN
========================================================= */
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const buildCalendarGrid = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
};

const isSameDate = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const DatePickerDropdown = ({ selectedDate, onSelect, onClose }) => {
  const [viewDate, setViewDate] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );
  const popoverRef = useRef(null);
  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const cells = buildCalendarGrid(viewDate.getFullYear(), viewDate.getMonth());

  const goPrevMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const goNextMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const handlePickDay = (day) => {
    if (!day) return;
    const picked = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onSelect(picked);
  };

  const handleToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    onSelect(today);
  };

  return (
    <div className="dashboard-home-calendar-popover" ref={popoverRef}>
      <div className="dashboard-home-calendar-header">
        <button
          type="button"
          className="dashboard-home-calendar-nav-btn"
          onClick={goPrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="dashboard-home-calendar-month-label">{monthLabel}</span>
        <button
          type="button"
          className="dashboard-home-calendar-nav-btn"
          onClick={goNextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="dashboard-home-calendar-weekdays">
        {WEEKDAYS.map((wd) => (
          <span key={wd}>{wd}</span>
        ))}
      </div>

      <div className="dashboard-home-calendar-days">
        {cells.map((day, i) => {
          if (!day) return <span key={`blank-${i}`} className="dashboard-home-calendar-day-blank" />;

          const cellDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
          const isToday = isSameDate(cellDate, today);
          const isSelected = isSameDate(cellDate, selectedDate);

          return (
            <button
              type="button"
              key={day}
              className={`dashboard-home-calendar-day ${isToday ? "is-today" : ""} ${
                isSelected ? "is-selected" : ""
              }`}
              onClick={() => handlePickDay(day)}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="dashboard-home-calendar-footer">
        <button type="button" className="dashboard-home-calendar-today-btn" onClick={handleToday}>
          Today
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   COMPONENT
========================================================= */
const DashboardHome = ({ adminName = "Admin" }) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const dateKey = selectedDate.toDateString();
  const stats = useStatsForDate(dateKey);

  const dateLabel = selectedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <section className="dashboard-home-section">

      {/* ================= Header ================= */}
      <div className="dashboard-home-header">
        <div className="dashboard-home-header-text">
          <h1 className="dashboard-home-title">
            Welcome back, {adminName}! <span className="dashboard-home-wave">👋</span>
          </h1>
          <p className="dashboard-home-subtitle">
            Here's what's happening with your travel business today.
          </p>
        </div>

        <div className="dashboard-home-date-wrapper">
          <button
            type="button"
            className={`dashboard-home-date-btn ${isCalendarOpen ? "is-active" : ""}`}
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            aria-expanded={isCalendarOpen}
          >
            <Calendar size={16} className="dashboard-home-date-icon" />
            <span>{dateLabel}</span>
          </button>

          {isCalendarOpen && (
            <DatePickerDropdown
              selectedDate={selectedDate}
              onSelect={handleSelectDate}
              onClose={() => setIsCalendarOpen(false)}
            />
          )}
        </div>
      </div>

      {/* ================= Stat Cards ================= */}
      <div className="dashboard-home-stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={`${stat.id}-${dateKey}`} stat={stat} index={index} />
        ))}
      </div>

    </section>
  );
};

export default DashboardHome;