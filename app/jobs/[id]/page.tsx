// app/jobs/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Correct import for App Router

import '../../jobs/[id]/page_id.css';
import Link from 'next/link';

interface Job {
  title: string;
  description: string;
  location: string;
  skillsRequired: string[];
  salaryRange: {
    min: number;
    max: number;
  };
}

export default function JobDetails() {
  const { id } = useParams(); // Get the job ID from the URL parameters
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data for submission
    const applicationData = {
      ...formData,
      jobId: id // Include the job ID in the submission
    };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else {
        // Clear the form fields
        setFormData({
          name: '',
          email: '',
          phone: '',
        });

        // Navigate to success page
        router.push('/success');
      }

     
      // Clear the form fields by resetting formData to its initial state
      setFormData({
        name: '',
        email: '',
        phone: '',
      });

      // Optionally, clear the success message after a few seconds
      setTimeout(() => {
      
      }, 3000); // Clear message after 3 seconds

    } catch (error) {
      console.error('Failed to submit application:', error);
    }
  };

  if (!job) return <p>Loading...</p>; // Loading state

  return (
    <div>
    <div>
      <div className='header'>
        <Link href="/jobs">
          <p className='homepara'>Home</p>
        </Link>
      </div>        
      <div className="job-details-container">
        <div className='title_heading'>
          <h1>{job.title}</h1>
        </div>
        <p>{job.description}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
        {job.salaryRange && job.salaryRange.min != null && job.salaryRange.max != null && (
          <p><strong>Salary Range:</strong> ${job.salaryRange.min} - ${job.salaryRange.max}</p>
        )}
      </div>

      {/* Form Section */}
      <div className='form'>
        <h2>Apply for this Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <button type="submit">Submit Application</button>
        </form>
      </div>

    </div> 
    </div>
  );
}
