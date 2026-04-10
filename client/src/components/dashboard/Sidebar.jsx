import { useState } from "react";
import { Menu, X, Home, LayoutDashboard, Bell, Lightbulb, Settings } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Mobile Open Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center md:hidden fixed top-4 left-4 z-50 bg-[#111827] p-2 rounded-lg border border-[#1F2937]"
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
          fixed md:relative z-40 h-screen
          bg-[#111827] border-r border-[#1F2937]
          transition-all duration-300 ease-in-out
          ${open ? "w-64" : "w-16"}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-3">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">

            {/* Logo (keeps space even when closed) */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-bold text-lg whitespace-nowrap">
                {open ? "SolarIQ ⚡" : "⚡"}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">

              {/* Desktop Toggle */}
              <button
                onClick={() => setOpen(!open)}
                className="hidden md:block text-gray-400 hover:text-white"
              >
                <Menu size={18} />
              </button>

              {/* Mobile Close */}
              <button
                onClick={() => setOpen(false)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>

            </div>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2">
            <Item icon={<LayoutDashboard size={18} />} label="Dashboard" open={open} />
            <Item icon={<Lightbulb size={18} />} label="Insights" open={open} />
            <Item icon={<Bell size={18} />} label="Notifications" open={open} />
            <Item icon={<Settings size={18} />} label="Setup" open={open} />
          </nav>

          {/* Bottom */}
          <div className="mt-auto">
            <Item icon={<Home size={18} />} label="Home" open={open} />
          </div>

        </div>
      </aside>
    </>
  );
}

function Item({ icon, label, open }) {
  return (
    <div
      className="
        flex items-center gap-3 p-3 rounded-lg cursor-pointer
        hover:bg-[#1F2937] transition
      "
    >
      <div className="text-yellow-400">{icon}</div>

      <span
        className={`
          text-sm text-gray-300 whitespace-nowrap
          transition-all duration-200
          ${open ? "opacity-100 ml-1" : "opacity-0 w-0 overflow-hidden"}
        `}
      >
        {label}
      </span>
    </div>
  );
}