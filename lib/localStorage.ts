import { Job } from '@/types';

const STORAGE_KEY = 'jobify_jobs';

export const jobsStorage = {
  save: (jobs: Job[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving jobs to localStorage:', error);
    }
  },


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


  add: (job: Job): Job[] => {
    const jobs = jobsStorage.load();
    const updatedJobs = [job, ...jobs];
    jobsStorage.save(updatedJobs);
    return updatedJobs;
  },


  update: (updatedJob: Job): Job[] => {
    const jobs = jobsStorage.load();
    const updatedJobs = jobs.map(job => 
      job.id === updatedJob.id ? updatedJob : job
    );
    jobsStorage.save(updatedJobs);
    return updatedJobs;
  },


  delete: (jobId: string): Job[] => {
    const jobs = jobsStorage.load();
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    jobsStorage.save(updatedJobs);
    return updatedJobs;
  },


  getById: (jobId: string): Job | undefined => {
    const jobs = jobsStorage.load();
    return jobs.find(job => job.id === jobId);
  },


  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing jobs from localStorage:', error);
    }
  }
};


export const initializeJobsData = (dummyJobs: Job[]): Job[] => {
  const existingJobs = jobsStorage.load();
  if (existingJobs.length === 0) {
    jobsStorage.save(dummyJobs);
    return dummyJobs;
  }
  return existingJobs;
};