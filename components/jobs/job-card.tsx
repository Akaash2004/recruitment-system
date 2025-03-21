import { formatDistanceToNow } from 'date-fns'
import { Job } from '@/lib/services/jobs'
import Link from 'next/link'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-muted-foreground">{job.company}</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
          {job.status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span>{job.location}</span>
        <span>₹{job.salary.toLocaleString('en-IN')}/year</span>
        <span>{formatDistanceToNow(new Date(job.createdAt))} ago</span>
      </div>

      <p className="mt-4 line-clamp-2 text-muted-foreground">
        {job.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.requirements.slice(0, 3).map((req, i) => (
          <span
            key={i}
            className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
          >
            {req}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="text-sm text-muted-foreground">
            +{job.requirements.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Link
          href={`/jobs/${job._id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Details
        </Link>
        <Link
          href={`/jobs/${job._id}/apply`}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Apply Now
        </Link>
      </div>
    </div>
  )
} 