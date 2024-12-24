// app/jobs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard';

interface Job {
  _id: string; // Ensure id is part of the Job interface
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

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('http://localhost:3000/jobs');
      const data = await response.json();
      setJobs(data);
    };
    
    fetchJobs();
  }, []);

  return (
    <div className="jobs-container">
      <h1 className="page-title">Job Listings</h1>
      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <div className="job-list">
          {jobs.map(job => (
            <JobCard 
              key={job._id} // Use unique ID as key
              id={job._id}
              title={job.title}
              description={job.description}
              companyId={job.companyId}
              location={job.location}
              skillsRequired={job.skillsRequired}
              salaryRange={job.salaryRange} 
            />
          ))}
        </div>
      )}
    </div>
  );
}