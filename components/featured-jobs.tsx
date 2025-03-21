"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPinIcon, BuildingIcon, DollarSignIcon } from "lucide-react"

// Mock data - would be fetched from API in a real application
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "InnovateCo",
    location: "New York, NY",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "1 week ago",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote",
    salary: "$90,000 - $120,000",
    type: "Contract",
    posted: "3 days ago",
  },
  {
    id: "4",
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Austin, TX",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    posted: "Just now",
  },
]

export function FeaturedJobs() {
  const [jobs, setJobs] = useState<typeof mockJobs | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchJobs = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setJobs(mockJobs)
      setLoading(false)
    }

    fetchJobs()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
      {jobs?.map((job) => (
        <Card key={job.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <BuildingIcon className="mr-1 h-3 w-3" />
              {job.company}
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <MapPinIcon className="mr-1 h-3 w-3" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <DollarSignIcon className="mr-1 h-3 w-3" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{job.type}</Badge>
                <span className="text-xs text-muted-foreground">{job.posted}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/jobs/${job.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

