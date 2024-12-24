// app/jobs/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correct import for App Router

import '../../../styles/global.css';

interface Job {
  title: string;
  description: string;
  companyId: string;
  location: string;
  skillsRequired: string[];
  salaryRange: {
    min: number;
    max: number;
  };
}

export default function JobDetails() {
  const { id } = useParams(); // Get the job ID from the URL parameters
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        const response = await fetch(`http://localhost:3000/jobs/${id}`); // Fetch job details using the ID
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJob(data);
      };

      fetchJobDetails().catch(err => {
        console.error('Failed to fetch job details:', err);
      });
    }
  }, [id]);

  if (!job) return <p>Loading...</p>; // Loading state

  return (
    <div className="job-details-container">
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p><strong>Company ID:</strong> {job.companyId}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
      <p><strong>Salary Range:</strong> ${job.salaryRange.min} - ${job.salaryRange.max}</p>
    </div>
  );
}
