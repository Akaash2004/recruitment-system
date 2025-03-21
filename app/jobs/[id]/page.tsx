import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { BriefcaseIcon, BuildingIcon, CalendarIcon, DollarSignIcon, MapPinIcon, ShareIcon } from "lucide-react"

// Mock data - would be fetched from API in a real application
const mockJob = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "TechCorp",
  companyDescription:
    "TechCorp is a leading technology company specializing in innovative software solutions for businesses of all sizes. With a focus on user experience and cutting-edge technology, we help our clients transform their digital presence.",
  location: "San Francisco, CA",
  salary: "$120,000 - $150,000",
  type: "Full-time",
  posted: "2 days ago",
  description:
    "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building and maintaining user interfaces for our web applications, ensuring they are responsive, accessible, and provide an excellent user experience.",
  responsibilities: [
    "Develop and implement user interface components using React.js and related technologies",
    "Collaborate with designers to translate visual designs into functional interfaces",
    "Write clean, maintainable, and efficient code",
    "Optimize applications for maximum speed and scalability",
    "Participate in code reviews and contribute to team knowledge sharing",
    "Stay up-to-date with emerging trends and technologies in frontend development",
  ],
  requirements: [
    "5+ years of experience in frontend development",
    "Strong proficiency in JavaScript, HTML, and CSS",
    "Experience with React.js and its ecosystem",
    "Familiarity with TypeScript",
    "Knowledge of responsive design and cross-browser compatibility",
    "Understanding of RESTful APIs and asynchronous request handling",
    "Experience with version control systems (Git)",
    "Excellent problem-solving skills and attention to detail",
    "Good communication and teamwork skills",
  ],
  benefits: [
    "Competitive salary and equity options",
    "Health, dental, and vision insurance",
    "401(k) matching",
    "Flexible work hours and remote work options",
    "Professional development budget",
    "Paid time off and parental leave",
    "Modern office with snacks and beverages",
  ],
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
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
          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            <div className="md:w-2/3">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Link href="/jobs" className="text-sm text-muted-foreground hover:underline">
                    Jobs
                  </Link>
                  <span className="text-sm text-muted-foreground">/</span>
                  <span className="text-sm">{job.title}</span>
                </div>
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{job.type}</Badge>
                  <span className="text-sm text-muted-foreground">Posted {job.posted}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <BuildingIcon className="mr-2 h-4 w-4 text-primary" />
                      <span>{job.company}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4 text-primary" />
                      <span>{job.location}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <DollarSignIcon className="mr-2 h-4 w-4 text-primary" />
                      <span>{job.salary}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      <span>Start: Immediate</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-3">Job Description</h2>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-bold mb-3">Responsibilities</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-bold mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-bold mb-3">Benefits</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Apply for this position</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Submit your application now and take the next step in your career journey.
                    </p>
                    <Link href={`/jobs/${job.id}/apply`} className="w-full">
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">About {job.company}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{job.companyDescription}</p>
                    <Link href={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button variant="outline" className="w-full">
                        View Company Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Share this job</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <ShareIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        Copy Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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

