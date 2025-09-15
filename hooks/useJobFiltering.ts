import { Job, JobFilters } from '@/types';
import { useMemo } from 'react';

export function useJobFiltering(jobs: Job[], filters: JobFilters) {
  return useMemo(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.position.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.location.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.jobType === 'all' || job.jobType === filters.jobType;
      const matchesStatus = filters.jobStatus === 'all' || job.jobStatus === filters.jobStatus;

      return matchesSearch && matchesType && matchesStatus;
    });


    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (filters.sortBy) {
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        case 'position':
          aValue = a.position.toLowerCase();
          bValue = b.position.toLowerCase();
          break;
        case 'dateApplied':
          aValue = new Date(a.dateApplied).getTime();
          bValue = new Date(b.dateApplied).getTime();
          break;
        default:
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [jobs, filters]);
}
