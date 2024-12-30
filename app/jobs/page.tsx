// app/jobs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard';
//import Head from 'next/head'; // Import Head component
import '../../styles/global.css';
import type { Metadata } from "next";

interface Job {
  _id: string;
  title: string;
  description: string;
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
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL as string);
      const data = await response.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div>

      <div className="jobs-container">
        <div className='title'><h1 className="page-title">Job</h1></div>
        {jobs.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          <div className="job-list">
            {jobs.map(job => (
              <JobCard 
                key={job._id}
                id={job._id}
                title={job.title}
                description={job.description}
                location={job.location}
                skillsRequired={job.skillsRequired}
                salaryRange={job.salaryRange} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
