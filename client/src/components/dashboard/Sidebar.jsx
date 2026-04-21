import { memo } from "react";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  Bell,
  Lightbulb,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Open Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-[#111827] p-2 rounded-lg border border-[#1F2937]"
        >
          <Menu size={18} />
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-40
          bg-[#111827] border-r border-[#374b66]
          transition-all duration-300 ease-in-out
          ${open ? "w-64" : "w-16"}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-yellow-400 font-bold text-lg whitespace-nowrap">
              {open ? "SolarIQ ⚡" : "⚡"}
            </span>

            <button
              onClick={() => setOpen(!open)}
              className="text-gray-400 hover:text-white"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* PRIMARY NAV */}
          <nav className="flex flex-col gap-2">
            <Item
              icon={<Home size={18} />}
              label="Home"
              open={open}
              to="/"
              active={location.pathname === "/"}
            />

            <Item
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              open={open}
              to="/dashboard"
              active={location.pathname === "/dashboard"}
            />
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-[#1F2937]" />

          {/* SECONDARY NAV */}
          <nav className="flex flex-col gap-2">
            <Item
              icon={<Lightbulb size={18} />}
              label="Insights"
              open={open}
              to="/insights"
              active={location.pathname === "/insights"}
            />

            <Item
              icon={<Bell size={18} />}
              label="Notifications"
              open={open}
              to="/notifications"
              active={location.pathname === "/notifications"}
            />

            <Item
              icon={<Settings size={18} />}
              label="Setup"
              open={open}
              to="/#setup"
              active={location.pathname === "/#setup"}
            />
          </nav>
        </div>
      </aside>
    </>
  );
}

const Item = memo(function Item({ icon, label, open, to, active }) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-3 py-3 rounded-lg
        transition-all duration-200
        ${
          active
            ? "bg-yellow-400/10 text-yellow-400"
            : "text-gray-300 hover:bg-[#1F2937]"
        }
      `}
    >
      <div>{icon}</div>

      <span
        className={`
          text-sm whitespace-nowrap
          transition-all duration-200
          ${open ? "opacity-100 ml-1" : "opacity-0 w-0 overflow-hidden"}
        `}
      >
        {label}
      </span>
    </Link>
  );
});