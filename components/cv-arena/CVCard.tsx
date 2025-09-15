'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CV } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import {
    Calendar,
    CheckCircle,
    Download,
    Edit,
    ExternalLink,
    File,
    MoreHorizontal,
    Star,
    Trash2
} from 'lucide-react';

interface CVCardProps {
  cv: CV;
  onEdit: (cv: CV) => void;
  onDelete: (cvId: string) => void;
  onSetActive: (cvId: string) => void;
  onDownload: (cv: CV) => void;
  onOpenInNewTab: (cv: CV) => void;
}

export default function CVCard({ cv, onEdit, onDelete, onSetActive, onDownload, onOpenInNewTab }: CVCardProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown date';
    }
  };

  return (
    <Card className={`group relative transition-all duration-300 hover:shadow-lg min-h-[350px] flex flex-col ${
      cv.isActive ? 'ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50' : 'hover:shadow-md'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center gap-2 w-full">
              <File className="h-5 w-5 text-slate-500 flex-shrink-0" />
              <h3 
                className="font-semibold text-lg text-slate-900 truncate flex-1 min-w-0" 
                title={cv.name}
              >
                {cv.name}
              </h3>
            </div>
            <p 
              className="text-sm text-slate-500 mt-1 truncate" 
              title={cv.fileName}
            >
              {cv.fileName}
            </p>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {cv.isActive && (
              <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onSetActive(cv.id)}
              disabled={cv.isActive}
            >
              <Star className={`h-4 w-4 ${cv.isActive ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
            </Button>
          </div>
        </div>

        {cv.description && (
          <p className="text-sm text-slate-600 line-clamp-2 mt-2">
            {cv.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="py-3 flex-1">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Version</span>
            <Badge variant="outline">v{cv.version}</Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Size</span>
            <span className="text-slate-700">{formatFileSize(cv.fileSize)}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-slate-500">
              <Calendar className="h-3 w-3" />
              <span>Updated</span>
            </div>
            <span className="text-slate-700">{formatDate(cv.lastModified)}</span>
          </div>
          
          <div className="text-sm">
            <div className="flex items-center gap-1 text-slate-500 mb-1">
              <span>Path:</span>
            </div>
            <div className="text-slate-700 text-xs break-all bg-slate-50 p-2 rounded border font-mono">
              {cv.filePath}
            </div>
          </div>
        </div>

        {cv.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {cv.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t border-slate-100 mt-auto">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload(cv)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(cv)}
              className="text-slate-600 hover:text-slate-900"
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(cv.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => onOpenInNewTab(cv)}
                  className="cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}