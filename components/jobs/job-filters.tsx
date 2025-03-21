"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface JobFiltersProps {
  filters: {
    keyword: string
    location: string
    salaryMin: number
    salaryMax: number
    jobType: string[]
    experienceLevel: string[]
  }
  onChange: (filters: JobFiltersProps['filters']) => void
}

export function JobFilters({ filters, onChange }: JobFiltersProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      const values = [...(filters[name as keyof typeof filters] as string[])]
      
      if (checkbox.checked) {
        values.push(value)
      } else {
        const index = values.indexOf(value)
        if (index > -1) values.splice(index, 1)
      }
      
      onChange({ ...filters, [name]: values })
    } else {
      onChange({ ...filters, [name]: value })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Keyword</label>
        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleInputChange}
          placeholder="e.g. React, Designer"
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleInputChange}
          placeholder="e.g. Mumbai, Remote"
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Salary Range (₹)</label>
        <div className="mt-1 grid grid-cols-2 gap-2">
          <input
            type="number"
            name="salaryMin"
            value={filters.salaryMin}
            onChange={handleInputChange}
            placeholder="Min"
            className="rounded-md border px-3 py-2"
          />
          <input
            type="number"
            name="salaryMax"
            value={filters.salaryMax}
            onChange={handleInputChange}
            placeholder="Max"
            className="rounded-md border px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Job Type</label>
        <div className="mt-2 space-y-2">
          {['Full-time', 'Part-time', 'Contract', 'Remote'].map(type => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="jobType"
                value={type}
                checked={filters.jobType.includes(type)}
                onChange={handleInputChange}
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

