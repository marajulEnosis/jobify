import { Job } from '@/types';

const STORAGE_KEY = 'jobify_jobs';

export const saveJobsToStorage = (jobs: Job[]): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    }
  } catch (error) {
    console.error('Error saving jobs to localStorage:', error);
  }
};

export const loadJobsFromStorage = (): Job[] => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch (error) {
    console.error('Error loading jobs from localStorage:', error);
  }
  return [];
};

export const addJobToStorage = (job: Job): void => {
  const jobs = loadJobsFromStorage();
  jobs.unshift(job); // Add to beginning
  saveJobsToStorage(jobs);
};

export const updateJobInStorage = (updatedJob: Job): void => {
  const jobs = loadJobsFromStorage();
  const index = jobs.findIndex(job => job.id === updatedJob.id);
  if (index !== -1) {
    jobs[index] = updatedJob;
    saveJobsToStorage(jobs);
  }
};

export const deleteJobFromStorage = (jobId: string): void => {
  const jobs = loadJobsFromStorage();
  const filteredJobs = jobs.filter(job => job.id !== jobId);
  saveJobsToStorage(filteredJobs);
};

export const clearAllJobs = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error clearing jobs from localStorage:', error);
  }
};