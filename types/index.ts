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

export interface CV {
  id: string;
  name: string;
  filePath: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  lastModified: string;
  version: number;
  isActive: boolean;
  tags: string[];
  description?: string;
  fileContent?: string; // Base64 encoded file content (deprecated - use serverFilename)
  serverFilename?: string; // Filename on the server for API calls
}

export interface CVVersion {
  id: string;
  cvId: string;
  version: number;
  filePath: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  changes?: string;
}
