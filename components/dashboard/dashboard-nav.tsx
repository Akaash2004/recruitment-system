"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { cn } from "@/lib/utils"
import {
  BarChartIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClipboardCheckIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
  PlusCircleIcon,
} from "lucide-react"

const candidateNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Job Search",
    href: "/dashboard/jobs",
    icon: BriefcaseIcon,
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
    icon: ClipboardCheckIcon,
  },
  {
    title: "Interviews",
    href: "/dashboard/interviews",
    icon: CalendarIcon,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
]

const recruiterNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Job Postings",
    href: "/dashboard/job-postings",
    icon: BriefcaseIcon,
  },
  {
    title: "Applicants",
    href: "/dashboard/applicants",
    icon: UsersIcon,
  },
  {
    title: "Interviews",
    href: "/dashboard/interviews",
    icon: CalendarIcon,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChartIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
]

const adminNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    title: "Jobs",
    href: "/dashboard/jobs",
    icon: BriefcaseIcon,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChartIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  let navItems = candidateNavItems

  if (user?.role === "recruiter") {
    navItems = recruiterNavItems
  } else if (user?.role === "admin") {
    navItems = adminNavItems
  }

  return (
    <nav className="hidden border-r bg-muted/40 md:block md:w-64">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Dashboard</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
            {user?.role === 'recruiter' && (
              <Link
                href="/dashboard/post-job"
                className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md"
              >
                <PlusCircleIcon className="h-4 w-4" />
                Post Job
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

