// components/JobCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';

import '../styles/global.css';

interface JobCardProps {
  id: string; // Add an id prop for the job
  title: string;
  description: string;
  location: string;
  skillsRequired: string[];
  salaryRange: {
    min: number;
    max: number;
  };
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  description,
  location,
  skillsRequired,
  salaryRange,
}) => {
  return (
    <Link href={`/jobs/${id}`} className="job-card"> {/* Link to the job details page */}
      <h2 className="job-title">{title}</h2>
      <p className="job-description">{description}</p>
      <div className="job-details">
        <div className="location-salary">
          <p><span className="label">Location:</span> {location}</p>
          {salaryRange && salaryRange.min != null && salaryRange.max != null &&
          <p><span className="label">Salary:</span> Rs.{salaryRange.min} - Rs.{salaryRange.max}</p> }
        </div>
        <p><strong>Skills Required:</strong> {skillsRequired.join(', ')}</p>
      </div>
    </Link>
  );
};

export default JobCard;
