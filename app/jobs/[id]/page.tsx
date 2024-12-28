// app/jobs/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correct import for App Router

import '../../jobs/[id]/page_id.css';
import Link from 'next/link';

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
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `${id}`); // Fetch job details using the ID
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
  <div>
    <div className='header'><Link href="/jobs">
    <p className='homepara'>Home</p>
    </Link>
    <p className='signin'>Sign in</p>
    
    </div>        
    <div className="job-details-container">
      <div className='title_heading'>
        <h1>{job.title}</h1>
      </div>
      <p>{job.description}</p>
      <p><strong>Company ID:</strong> {job.companyId}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
    {job.salaryRange && job.salaryRange.min != null && job.salaryRange != null &&  <p><strong>Salary Range:</strong> ${job.salaryRange.min} - ${job.salaryRange.max}</p>}
    </div>
  </div> 
 );
}
