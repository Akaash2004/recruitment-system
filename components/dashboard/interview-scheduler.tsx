"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  candidateName: z.string().min(2, { message: "Candidate name is required" }),
  candidateEmail: z.string().email({ message: "Valid email is required" }),
  jobTitle: z.string().min(2, { message: "Job title is required" }),
  interviewDate: z.date({
    required_error: "Interview date is required",
  }),
  interviewTime: z.string().min(1, { message: "Interview time is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  interviewType: z.enum(["video", "phone", "in-person"], {
    required_error: "Interview type is required",
  }),
  interviewerName: z.string().min(2, { message: "Interviewer name is required" }),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export function InterviewScheduler() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidateName: "",
      candidateEmail: "",
      jobTitle: "",
      interviewTime: "",
      duration: "30",
      interviewType: "video",
      interviewerName: "",
      notes: "",
    },
  })

  const interviewDate = watch("interviewDate")

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // In a real app, this would call an API endpoint to schedule the interview
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Interview scheduled",
        description: `Interview with ${data.candidateName} has been scheduled for ${format(data.interviewDate, "PPP")} at ${data.interviewTime}.`,
      })

      reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error scheduling the interview. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="candidateName">Candidate Name</Label>
            <Input id="candidateName" {...register("candidateName")} />
            {errors.candidateName && <p className="text-sm text-destructive">{errors.candidateName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="candidateEmail">Candidate Email</Label>
            <Input id="candidateEmail" type="email" {...register("candidateEmail")} />
            {errors.candidateEmail && <p className="text-sm text-destructive">{errors.candidateEmail.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" {...register("jobTitle")} />
          {errors.jobTitle && <p className="text-sm text-destructive">{errors.jobTitle.message}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Interview Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !interviewDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {interviewDate ? format(interviewDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={interviewDate}
                  onSelect={(date) => date && setValue("interviewDate", date)}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            {errors.interviewDate && <p className="text-sm text-destructive">{errors.interviewDate.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewTime">Interview Time</Label>
            <Input id="interviewTime" placeholder="e.g. 10:00 AM" {...register("interviewTime")} />
            {errors.interviewTime && <p className="text-sm text-destructive">{errors.interviewTime.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select defaultValue="30" onValueChange={(value) => setValue("duration", value)}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
              </SelectContent>
            </Select>
            {errors.duration && <p className="text-sm text-destructive">{errors.duration.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="interviewType">Interview Type</Label>
            <Select
              defaultValue="video"
              onValueChange={(value: "video" | "phone" | "in-person") => setValue("interviewType", value)}
            >
              <SelectTrigger id="interviewType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="in-person">In-person</SelectItem>
              </SelectContent>
            </Select>
            {errors.interviewType && <p className="text-sm text-destructive">{errors.interviewType.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewerName">Interviewer Name</Label>
            <Input id="interviewerName" {...register("interviewerName")} />
            {errors.interviewerName && <p className="text-sm text-destructive">{errors.interviewerName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Add any additional information or instructions for the candidate..."
            className="min-h-[100px]"
            {...register("notes")}
          />
          {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Scheduling..." : "Schedule Interview"}
      </Button>
    </form>
  )
}

