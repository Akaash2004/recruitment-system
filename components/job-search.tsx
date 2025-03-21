"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchIcon } from "lucide-react"

export function JobSearch() {
  const router = useRouter()
  const [search, setSearch] = useState({
    title: "",
    location: "",
    company: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearch((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (search.title) params.append("title", search.title)
    if (search.location) params.append("location", search.location)
    if (search.company) params.append("company", search.company)

    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Software Engineer"
            value={search.title}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g. New York"
            value={search.location}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            placeholder="e.g. Acme Inc"
            value={search.company}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button type="submit" className="w-full md:w-auto">
        <SearchIcon className="mr-2 h-4 w-4" />
        Search Jobs
      </Button>
    </form>
  )
}

