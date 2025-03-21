import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon, CheckCircleIcon } from "lucide-react"

export default function ApplicationSuccessPage({ params }: { params: { id: string } }) {
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
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md py-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircleIcon className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Application Submitted!</h1>
              <p className="text-muted-foreground">
                Your application has been successfully submitted. The employer will review your application and contact
                you if they're interested.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full sm:flex-row">
              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/jobs" className="w-full">
                <Button className="w-full">Browse More Jobs</Button>
              </Link>
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

