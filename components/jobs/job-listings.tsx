"use client"

import { useEffect, useState } from 'react'
import { Job, fetchJobs } from '@/lib/services/jobs'
import { JobCard } from './job-card'
import { JobFilters } from './job-filters'

export function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    salaryMin: 0,
    salaryMax: 0,
    jobType: [],
    experienceLevel: []
  })

  useEffect(() => {
    loadJobs()
  }, [filters])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const data = await fetchJobs(filters)
      setJobs(data)
      setError('')
    } catch (err) {
      setError('Failed to load jobs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  if (loading) return <div>Loading jobs...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
      <JobFilters filters={filters} onChange={handleFilterChange} />
      <div className="space-y-4">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
        {jobs.length === 0 && (
          <div className="text-center text-gray-500">
            No jobs found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}

