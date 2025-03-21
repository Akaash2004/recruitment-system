import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

// This would normally check the session on the server
// For demo purposes, we'll use client-side auth in the components
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header>
      <h1>Job Dashboard - India</h1>
      <p>All salaries are listed in Indian Rupees (INR).</p>
    </header>
  );
}

