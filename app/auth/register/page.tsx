import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"
import { BriefcaseIcon } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-bold">
          <BriefcaseIcon className="h-6 w-6" />
          <span>RecruitPro</span>
        </Link>
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Enter your information to get started</p>
          </div>
          <RegisterForm />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

