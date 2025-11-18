import React from "react";
import { Link, NavLink } from "react-router-dom";

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-primary">
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/projects"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="text-white text-xl">MyProject Management Tool</span>
        </Link>
        <nav className="flex gap-4 text-sm shadow">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full border text-xs font-medium ${
                isActive
                  ? "border-blue-500 bg-blue-400/20 text-blue-100"
                  : "border-slate-700 hover:border-slate-500 text-slate-200"
              }`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full border text-xs font-medium ${
                isActive
                  ? "border-blue-400 bg-blue-400/20 text-blue-100"
                  : "border-slate-700 hover:border-slate-500 text-slate-200"
              }`
            }
          >
            Notifications
          </NavLink>
        </nav>
      </div>
    </header>
    <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
      {children}
    </main>
  </div>
);

export default Layout;
