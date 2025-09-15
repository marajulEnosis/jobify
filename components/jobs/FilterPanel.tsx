import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { JobFilters } from '@/types';
import { Filter, Search } from 'lucide-react';

interface FilterPanelProps {
  filters: JobFilters;
  setFilters: React.Dispatch<React.SetStateAction<JobFilters>>;
  resetFilters: () => void;
  filteredJobsCount: number;
  totalJobsCount: number;
  onClose?: () => void;
}

export default function FilterPanel({ 
  filters, 
  setFilters, 
  resetFilters, 
  filteredJobsCount, 
  totalJobsCount,
  onClose 
}: FilterPanelProps) {
  return (
    <div className="h-full flex flex-col space-y-0">
      {/* Filter Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-1 space-y-6">
        {/* Search */}
        <div className="space-y-3">
          <Label htmlFor="panel-search" className="text-base font-semibold text-slate-800">Search Jobs</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="panel-search"
              placeholder="Search by company, position, or location..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-10 h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white cursor-text hover:border-indigo-400 transition-colors duration-200"
            />
          </div>
        </div>
        
        {/* Job Type & Status Side by Side */}
        <div className="flex gap-4">
          {/* Job Type */}
          <div className="space-y-3 w-1/2">
            <Label className="text-base font-semibold text-slate-800">Job Type</Label>
            <Select value={filters.jobType} onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}>
              <SelectTrigger className="h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Status */}
          <div className="space-y-3 w-1/2">
            <Label className="text-base font-semibold text-slate-800">Application Status</Label>
            <Select value={filters.jobStatus} onValueChange={(value) => setFilters(prev => ({ ...prev, jobStatus: value }))}>
              <SelectTrigger className="h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-slate-800">Sort By</Label>
          <Select value={`${filters.sortBy}-${filters.sortOrder}`} onValueChange={(value) => {
            const [sortBy, sortOrder] = value.split('-');
            setFilters(prev => ({ ...prev, sortBy, sortOrder: sortOrder as 'asc' | 'desc' }));
          }}>
            <SelectTrigger className="h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200">
              <SelectValue placeholder="Newest First" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateApplied-desc">Newest First</SelectItem>
              <SelectItem value="dateApplied-asc">Oldest First</SelectItem>
              <SelectItem value="company-asc">Company A-Z</SelectItem>
              <SelectItem value="company-desc">Company Z-A</SelectItem>
              <SelectItem value="position-asc">Position A-Z</SelectItem>
              <SelectItem value="position-desc">Position Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Results Summary */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-semibold text-slate-800">Results</span>
            <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 px-3 py-1">
              {filteredJobsCount} of {totalJobsCount}
            </Badge>
          </div>
          <p className="text-sm text-slate-600">
            {filteredJobsCount === totalJobsCount 
              ? "Showing all jobs"
              : `Showing ${filteredJobsCount} filtered results`
            }
          </p>
        </div>
      </div>

      {/* Fixed Action Buttons */}
      <div className="border-t border-slate-200 pt-4 mt-6 space-y-3 bg-white">
        <Button 
          variant="outline" 
          onClick={resetFilters} 
          className="w-full h-11 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-medium cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <Filter className="h-4 w-4 mr-2" />
          Reset All Filters
        </Button>
        
        {onClose && (
          <Button 
            onClick={onClose}
            className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md font-medium cursor-pointer hover:scale-105 transition-all duration-200"
          >
            Apply Filters ({filteredJobsCount})
          </Button>
        )}
      </div>
    </div>
  );
}
