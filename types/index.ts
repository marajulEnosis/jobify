export interface Job {
  id: string;
  company: string;
  position: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  jobStatus: 'pending' | 'interview' | 'declined' | 'accepted';
  dateApplied: string;
  interviewDate?: string;
  salary?: string;
  description?: string;
}

export interface DashboardStats {
  pendingJobs: number;
  interviewSets: number;
  jobsDeclined: number;
  totalJobs: number;
}

export interface JobFilters {
  search: string;
  jobType: string;
  jobStatus: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface NewJobForm {
  company: string;
  position: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  jobStatus: 'pending' | 'interview' | 'declined' | 'accepted';
  interviewDate?: string;
  salary?: string;
  description?: string;
}
