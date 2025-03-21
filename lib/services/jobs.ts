import { API_BASE_URL } from '../api-config';

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: number;
  recruiter: string;
  status: 'active' | 'closed';
  createdAt: string;
}

export async function fetchJobs(filters?: {
  keyword?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: string[];
  experienceLevel?: string[];
}) {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value.toString());
      }
    });
  }

  const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
}

export async function applyToJob(jobId: string, data: {
  resume: string;
  coverLetter?: string;
}, token: string) {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      jobId,
      ...data
    })
  });
  
  if (!response.ok) throw new Error('Failed to submit application');
  return response.json();
} 