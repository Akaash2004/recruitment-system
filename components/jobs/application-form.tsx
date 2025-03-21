"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  coverLetter: z.string().optional(),
  resume: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "Resume is required" })
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, { message: `Max file size is 5MB` })
    .refine(
      (files) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(files[0]?.type),
      { message: "Only PDF and Word documents are accepted" },
    ),
  linkedIn: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  portfolio: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
})

type FormData = z.infer<typeof formSchema>

export function ApplicationForm({ jobId }: { jobId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      linkedIn: "",
      portfolio: "",
      termsAccepted: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // In a real app, this would call an API endpoint to submit the application
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      })

      router.push(`/jobs/${jobId}/apply/success`)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Provide your contact details so employers can reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...register("fullName")} />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" {...register("phone")} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume & Cover Letter</CardTitle>
            <CardDescription>Upload your resume and add a cover letter to stand out</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF or Word, max 5MB)</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                {...register("resume")}
              />
              {errors.resume && <p className="text-sm text-destructive">{errors.resume.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
              <Textarea
                id="coverLetter"
                placeholder="Tell us why you're a great fit for this role..."
                className="min-h-[150px]"
                {...register("coverLetter")}
              />
              {errors.coverLetter && <p className="text-sm text-destructive">{errors.coverLetter.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Add links to your professional profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
              <Input
                id="linkedIn"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                {...register("linkedIn")}
              />
              {errors.linkedIn && <p className="text-sm text-destructive">{errors.linkedIn.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio or Website (Optional)</Label>
              <Input id="portfolio" type="url" placeholder="https://yourportfolio.com" {...register("portfolio")} />
              {errors.portfolio && <p className="text-sm text-destructive">{errors.portfolio.message}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-start space-x-2">
          <Checkbox id="termsAccepted" {...register("termsAccepted")} />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="termsAccepted"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions and privacy policy
            </Label>
            {errors.termsAccepted && <p className="text-sm text-destructive">{errors.termsAccepted.message}</p>}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting application..." : "Submit Application"}
        </Button>
      </div>
    </form>
  )
}

