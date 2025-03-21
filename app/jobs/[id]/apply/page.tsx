import Link from "next/link"
import { ApplicationForm } from "@/components/jobs/application-form"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon } from "lucide-react"

// Mock data - would be fetched from API in a real application
const mockJob = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "TechCorp",
  location: "San Francisco, CA",
}

export default function JobApplicationPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the job details based on the ID
  const job = mockJob

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BriefcaseIcon className="h-5 w-5" />
            <span>RecruitPro</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/jobs" className="text-sm font-medium transition-colors hover:text-primary">
              Jobs
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Link href="/jobs" className="text-sm text-muted-foreground hover:underline">
                  Jobs
                </Link>
                <span className="text-sm text-muted-foreground">/</span>
                <Link href={`/jobs/${job.id}`} className="text-sm text-muted-foreground hover:underline">
                  {job.title}
                </Link>
                <span className="text-sm text-muted-foreground">/</span>
                <span className="text-sm">Apply</span>
              </div>
              <h1 className="text-3xl font-bold">Apply for {job.title}</h1>
              <p className="text-muted-foreground mt-2">
                {job.company} • {job.location}
              </p>
            </div>

            <ApplicationForm jobId={job.id} />
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 RecruitPro. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

