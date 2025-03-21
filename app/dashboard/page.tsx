"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { CandidateDashboard } from "@/components/dashboard/candidate-dashboard"
import { RecruiterDashboard } from "@/components/dashboard/recruiter-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.fullName}!</p>
      </div>

      {user.role === "candidate" && <CandidateDashboard />}
      {user.role === "recruiter" && <RecruiterDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  )
}

function FilterSection() {
  return (
    <div>
      <label htmlFor="location">Location:</label>
      <select id="location" name="location">
        <option value="mumbai">Mumbai</option>
        <option value="delhi">Delhi</option>
        <option value="bangalore">Bangalore</option>
        <option value="chennai">Chennai</option>
        <option value="kolkata">Kolkata</option>
      </select>

      <label htmlFor="salary">Salary Range (INR):</label>
      <select id="salary" name="salary">
        <option value="0-500000">0 - 5,00,000 INR</option>
        <option value="500000-1000000">5,00,000 - 10,00,000 INR</option>
        <option value="1000000-2000000">10,00,000 - 20,00,000 INR</option>
        <option value="2000000-5000000">20,00,000 - 50,00,000 INR</option>
      </select>
    </div>
  );
}

