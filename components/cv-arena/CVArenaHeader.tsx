'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CV } from '@/types';
import {
  FileText,
  Search,
  Star,
  Upload
} from 'lucide-react';

interface CVArenaHeaderProps {
  cvs: CV[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onUploadClick: () => void;
}

export default function CVArenaHeader({ 
  cvs, 
  searchTerm, 
  onSearchChange, 
  onUploadClick 
}: CVArenaHeaderProps) {
  const totalCVs = cvs.length;
  const activeCVs = cvs.filter(cv => cv.isActive).length;
  const totalSize = cvs.reduce((sum, cv) => sum + cv.fileSize, 0);
  
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 MB';
    const mb = bytes / 1024 / 1024;
    return mb.toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-2">
              <FileText className="h-7 w-7 text-white" />
            </div>
            CV Arena
          </h1>
          <p className="text-slate-600 mt-2">
            Manage and organize your CV collection for different job applications
          </p>
        </div>

        <Button
          onClick={onUploadClick}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg"
          size="lg"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload New CV
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total CVs</p>
              <p className="text-2xl font-bold text-blue-700">{totalCVs}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Active CVs</p>
              <p className="text-2xl font-bold text-green-700">{activeCVs}</p>
            </div>
            <Star className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Total Size</p>
              <p className="text-2xl font-bold text-purple-700">{formatSize(totalSize)}</p>
            </div>
            <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">MB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search CVs by name, tags, or description..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {totalCVs > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-slate-600">
              {totalCVs} CV{totalCVs !== 1 ? 's' : ''} found
            </Badge>
          </div>
        )}
      </div>


    </div>
  );
}