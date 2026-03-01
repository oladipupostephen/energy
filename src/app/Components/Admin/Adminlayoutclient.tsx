"use client";

import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./Adminheader";

const SIDEBAR_STATE_KEY = "solarstore_admin_sidebar_collapsed";

/**
 * Read the persisted sidebar state from localStorage.
 * Called once as a lazy useState initializer — runs synchronously
 * during the first render on the client, so there is no effect,
 * no second render, and no cascading-setState warning.
 *
 * Returns false (expanded) as the safe default when:
 *  - running on the server (typeof window === "undefined")
 *  - localStorage is blocked / throws
 *  - no value has been stored yet
 */
function readSidebarState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(SIDEBAR_STATE_KEY);
    return stored !== null ? (JSON.parse(stored) as boolean) : false;
  } catch {
    return false;
  }
}

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

/**
 * AdminLayoutClient
 * Client shell that wires together the sidebar + header.
 * Persists sidebar collapsed/expanded state in localStorage.
 * Handles mobile drawer open/close state.
 *
 * Lives inside app/admin/layout.tsx (Server Component) so the
 * actual layout server-renders the shell; only interactivity is client.
 */
export default function AdminLayoutClient({
  children,
}: AdminLayoutClientProps) {
  // ── Sidebar collapse state ────────────────────────────────────────────────
  // Lazy initializer: reads localStorage once during the first client render.
  // No useEffect needed → no synchronous setState inside an effect → no warning.
  const [collapsed, setCollapsed] = useState<boolean>(readSidebarState);

  const handleToggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(next));
      } catch {
        // localStorage blocked — state still updates in memory
      }
      return next;
    });
  }, []);

  // ── Mobile drawer state ───────────────────────────────────────────────────
  const [mobileOpen, setMobileOpen] = useState(false);

  // Subscribe to keyboard events (external system → setState in callback ✓)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const sidebarWidth = collapsed ? "lg:pl-[72px]" : "lg:pl-64";

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        onToggle={handleToggle}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content area — shifts right to accommodate sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out ${sidebarWidth} flex flex-col min-h-screen`}>
        {/* Header */}
        <AdminHeader
          onMobileMenuOpen={() => setMobileOpen(true)}
          sidebarCollapsed={collapsed}
        />

        {/* Page content */}
        <main
          id="admin-main-content"
          className="flex-1 p-4 lg:p-6 xl:p-8"
          tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
