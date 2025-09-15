import { Job } from '@/types';

const STORAGE_KEY = 'jobify_jobs';

export const jobsStorage = {
  // Save jobs to localStorage
  save: (jobs: Job[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving jobs to localStorage:', error);
    }
  },

  // Load jobs from localStorage
  load: (): Job[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading jobs from localStorage:', error);
    }
    return [];
  },

  // Add a new job
  add: (job: Job): Job[] => {
    const jobs = jobsStorage.load();
    const updatedJobs = [job, ...jobs];
    jobsStorage.save(updatedJobs);
    return updatedJobs;
  },

  // Update an existing job
  update: (updatedJob: Job): Job[] => {
    const jobs = jobsStorage.load();
    const updatedJobs = jobs.map(job => 
      job.id === updatedJob.id ? updatedJob : job
    );
    jobsStorage.save(updatedJobs);
    return updatedJobs;
  },

  // Delete a job
  delete: (jobId: string): Job[] => {
    const jobs = jobsStorage.load();
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    jobsStorage.save(updatedJobs);
    return updatedJobs;
  },

  // Get a single job by ID
  getById: (jobId: string): Job | undefined => {
    const jobs = jobsStorage.load();
    return jobs.find(job => job.id === jobId);
  },

  // Clear all jobs (for development/testing)
  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing jobs from localStorage:', error);
    }
  }
};

// Initialize with dummy data if no data exists
export const initializeJobsData = (dummyJobs: Job[]): Job[] => {
  const existingJobs = jobsStorage.load();
  if (existingJobs.length === 0) {
    jobsStorage.save(dummyJobs);
    return dummyJobs;
  }
  return existingJobs;
};