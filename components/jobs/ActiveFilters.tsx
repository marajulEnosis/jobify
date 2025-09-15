import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JobFilters } from '@/types';
import { Filter } from 'lucide-react';

interface ActiveFiltersProps {
  filters: JobFilters;
  resetFilters: () => void;
}

export default function ActiveFilters({ filters, resetFilters }: ActiveFiltersProps) {
  const hasActiveFilters = filters.search || 
    filters.jobType !== 'all' || 
    filters.jobStatus !== 'all' || 
    filters.sortBy !== 'dateApplied' || 
    filters.sortOrder !== 'desc';

  if (!hasActiveFilters) return null;

  return (
    <Card className="bg-indigo-50 border-indigo-200 shadow-sm">
      <CardContent className="py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-800">Active Filters:</span>
            <div className="flex gap-2 flex-wrap">
              {filters.search && (
                <Badge variant="secondary" className="bg-white text-indigo-700 border-indigo-200">
                  Search: "{filters.search}"
                </Badge>
              )}
              {filters.jobType !== 'all' && (
                <Badge variant="secondary" className="bg-white text-indigo-700 border-indigo-200">
                  Type: {filters.jobType}
                </Badge>
              )}
              {filters.jobStatus !== 'all' && (
                <Badge variant="secondary" className="bg-white text-indigo-700 border-indigo-200">
                  Status: {filters.jobStatus}
                </Badge>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 cursor-pointer hover:scale-105 transition-all duration-200"
          >
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
