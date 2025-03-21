"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, VideoIcon } from "lucide-react"
import { InterviewScheduler } from "@/components/dashboard/interview-scheduler"

// Mock data - would be fetched from API in a real application
const mockInterviews = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp",
    date: "2023-06-15",
    time: "10:00 AM",
    duration: "45 minutes",
    type: "Video",
    status: "Scheduled",
    with: "John Smith, Engineering Manager",
    notes: "Please prepare a short presentation about your recent projects.",
  },
  {
    id: "2",
    jobTitle: "UX Designer",
    company: "DesignHub",
    date: "2023-06-18",
    time: "2:00 PM",
    duration: "60 minutes",
    type: "Video",
    status: "Scheduled",
    with: "Sarah Johnson, Design Lead",
    notes: "We'll discuss your portfolio and design process.",
  },
]

export default function InterviewsPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
        <p className="text-muted-foreground">Manage your upcoming and past interviews</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          {user.role === "recruiter" && <TabsTrigger value="schedule">Schedule Interview</TabsTrigger>}
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {mockInterviews.length > 0 ? (
            mockInterviews.map((interview) => (
              <Card key={interview.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{interview.jobTitle}</CardTitle>
                      <CardDescription>{interview.company}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">{interview.status}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {interview.date} at {interview.time} ({interview.duration})
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <VideoIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {interview.type} Interview with {interview.with}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Notes:</p>
                      <p className="text-sm text-muted-foreground">{interview.notes}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                    <Button size="sm">
                      <VideoIcon className="mr-2 h-4 w-4" />
                      Join Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Upcoming Interviews</CardTitle>
                <CardDescription>You don't have any interviews scheduled at the moment.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Continue applying for jobs to secure interviews.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>No Past Interviews</CardTitle>
              <CardDescription>You don't have any past interviews.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Your completed interviews will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {user.role === "recruiter" && (
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule a New Interview</CardTitle>
                <CardDescription>Set up interviews with candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <InterviewScheduler />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

