import { DashboardStats, Job } from '@/types';

export const dummyJobs: Job[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Frontend Developer',
    location: 'Mountain View, CA',
    jobType: 'full-time',
    jobStatus: 'pending',
    dateApplied: '2025-09-10',
    salary: '$120,000 - $150,000',
    description: 'Work on cutting-edge web applications using React and TypeScript.'
  },
  {
    id: '2',
    company: 'Microsoft',
    position: 'Software Engineer',
    location: 'Seattle, WA',
    jobType: 'full-time',
    jobStatus: 'interview',
    dateApplied: '2025-09-05',
    interviewDate: '2025-09-18',
    salary: '$110,000 - $140,000',
    description: 'Develop cloud-based applications and services.'
  },
  {
    id: '3',
    company: 'Apple',
    position: 'iOS Developer',
    location: 'Cupertino, CA',
    jobType: 'full-time',
    jobStatus: 'declined',
    dateApplied: '2025-09-02',
    salary: '$130,000 - $160,000',
    description: 'Build innovative iOS applications for millions of users.'
  },
  {
    id: '4',
    company: 'Meta',
    position: 'Full Stack Developer',
    location: 'Menlo Park, CA',
    jobType: 'full-time',
    jobStatus: 'pending',
    dateApplied: '2025-09-12',
    salary: '$125,000 - $155,000',
    description: 'Work on social media platforms and VR applications.'
  },
  {
    id: '5',
    company: 'Netflix',
    position: 'Backend Developer',
    location: 'Los Gatos, CA',
    jobType: 'full-time',
    jobStatus: 'interview',
    dateApplied: '2025-09-08',
    interviewDate: '2025-09-21',
    salary: '$115,000 - $145,000',
    description: 'Develop scalable streaming infrastructure.'
  },
  {
    id: '6',
    company: 'Amazon',
    position: 'DevOps Engineer',
    location: 'Seattle, WA',
    jobType: 'contract',
    jobStatus: 'pending',
    dateApplied: '2025-09-14',
    salary: '$100,000 - $130,000',
    description: 'Manage cloud infrastructure and deployment pipelines.'
  },
  {
    id: '7',
    company: 'Spotify',
    position: 'Frontend Developer',
    location: 'New York, NY',
    jobType: 'full-time',
    jobStatus: 'accepted',
    dateApplied: '2025-09-01',
    salary: '$105,000 - $135,000',
    description: 'Create engaging music streaming experiences.'
  },
  {
    id: '8',
    company: 'Uber',
    position: 'Mobile Developer',
    location: 'San Francisco, CA',
    jobType: 'full-time',
    jobStatus: 'declined',
    dateApplied: '2025-09-03',
    interviewDate: '2025-09-23',
    salary: '$110,000 - $140,000',
    description: 'Develop ride-sharing mobile applications.'
  },
  {
    id: '9',
    company: 'Airbnb',
    position: 'Product Manager',
    location: 'San Francisco, CA',
    jobType: 'full-time',
    jobStatus: 'interview',
    dateApplied: '2025-09-09',
    interviewDate: '2025-09-24',
    salary: '$140,000 - $180,000',
    description: 'Lead product development for travel experiences.'
  },
  {
    id: '10',
    company: 'Tesla',
    position: 'Software Engineer',
    location: 'Austin, TX',
    jobType: 'full-time',
    jobStatus: 'pending',
    dateApplied: '2025-09-13',
    salary: '$120,000 - $150,000',
    description: 'Work on autonomous driving software systems.'
  },
  {
    id: '11',
    company: 'Stripe',
    position: 'Full Stack Developer',
    location: 'Remote',
    jobType: 'full-time',
    jobStatus: 'interview',
    dateApplied: '2025-09-11',
    interviewDate: '2025-09-26',
    salary: '$130,000 - $160,000',
    description: 'Build payment processing platforms and APIs.'
  },
  {
    id: '12',
    company: 'Slack',
    position: 'Frontend Engineer',
    location: 'San Francisco, CA',
    jobType: 'part-time',
    jobStatus: 'declined',
    dateApplied: '2025-09-06',
    salary: '$80,000 - $100,000',
    description: 'Develop communication and collaboration tools.'
  },
  {
    id: '13',
    company: 'Shopify',
    position: 'React Developer',
    location: 'Toronto, CA',
    jobType: 'full-time',
    jobStatus: 'interview',
    dateApplied: '2025-09-14',
    interviewDate: '2025-09-27',
    salary: '$95,000 - $125,000',
    description: 'Build e-commerce solutions and merchant tools.'
  },
  {
    id: '14',
    company: 'GitHub',
    position: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    jobType: 'full-time',
    jobStatus: 'interview',
    dateApplied: '2025-09-12',
    interviewDate: '2025-09-28',
    salary: '$140,000 - $170,000',
    description: 'Work on developer collaboration platforms.'
  },
  {
    id: '15',
    company: 'Discord',
    position: 'Full Stack Engineer',
    location: 'Remote',
    jobType: 'full-time',
    jobStatus: 'interview',
    dateApplied: '2025-09-13',
    interviewDate: '2025-09-29',
    salary: '$120,000 - $150,000',
    description: 'Build communication platforms for gaming communities.'
  }
];

export const dashboardStats: DashboardStats = {
  pendingJobs: dummyJobs.filter(job => job.jobStatus === 'pending').length,
  interviewSets: dummyJobs.filter(job => job.jobStatus === 'interview').length,
  jobsDeclined: dummyJobs.filter(job => job.jobStatus === 'declined').length,
  totalJobs: dummyJobs.length
};

export const getJobsByYear = (year: number) => {
  return dummyJobs.filter(job => 
    new Date(job.dateApplied).getFullYear() === year
  );
};

export const getDeclinedJobsByYear = (year: number) => {
  return dummyJobs.filter(job => 
    job.jobStatus === 'declined' && 
    new Date(job.dateApplied).getFullYear() === year
  ).length;
};
