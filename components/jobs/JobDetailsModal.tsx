import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Job } from '@/types';
import {
    Building,
    Calendar,
    Clock,
    DollarSign,
    Edit3,
    FileText,
    MapPin,
    Trash2
} from 'lucide-react';
import { useState } from 'react';

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
}

export default function JobDetailsModal({ 
  job, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete 
}: JobDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Job | null>(null);

  if (!job) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'interview': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'declined': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'accepted': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'part-time': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'contract': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'internship': return 'bg-violet-50 text-violet-700 border-violet-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleEdit = () => {
    setEditData({ ...job });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData) {
      onEdit(editData);
      setIsEditing(false);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      onDelete(job.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Building className="h-5 w-5 text-indigo-600" />
            {isEditing ? 'Edit Job Application' : job.position}
          </DialogTitle>
          {!isEditing && (
            <DialogDescription className="text-lg font-medium text-slate-700">
              {job.company}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {isEditing ? (
            // Edit Form
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Input
                    id="edit-company"
                    value={editData?.company || ''}
                    onChange={(e) => setEditData(prev => prev ? { ...prev, company: e.target.value } : null)}
                    className="cursor-text hover:border-indigo-400 transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-position">Position</Label>
                  <Input
                    id="edit-position"
                    value={editData?.position || ''}
                    onChange={(e) => setEditData(prev => prev ? { ...prev, position: e.target.value } : null)}
                    className="cursor-text hover:border-indigo-400 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={editData?.location || ''}
                  onChange={(e) => setEditData(prev => prev ? { ...prev, location: e.target.value } : null)}
                  className="cursor-text hover:border-indigo-400 transition-colors duration-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <Select 
                    value={editData?.jobType} 
                    onValueChange={(value: any) => setEditData(prev => prev ? { ...prev, jobType: value } : null)}
                  >
                    <SelectTrigger className="cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={editData?.jobStatus} 
                    onValueChange={(value: any) => setEditData(prev => prev ? { ...prev, jobStatus: value } : null)}
                  >
                    <SelectTrigger className="cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-interview-date">Interview Date</Label>
                <Input
                  id="edit-interview-date"
                  type="date"
                  value={editData?.interviewDate || ''}
                  onChange={(e) => setEditData(prev => prev ? { ...prev, interviewDate: e.target.value } : null)}
                  className="cursor-pointer hover:border-indigo-400 transition-colors duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-salary">Salary</Label>
                <Input
                  id="edit-salary"
                  value={editData?.salary || ''}
                  onChange={(e) => setEditData(prev => prev ? { ...prev, salary: e.target.value } : null)}
                  placeholder="e.g., $80,000 - $100,000"
                  className="cursor-text hover:border-indigo-400 transition-colors duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editData?.description || ''}
                  onChange={(e) => setEditData(prev => prev ? { ...prev, description: e.target.value } : null)}
                  placeholder="Brief job description"
                  className="cursor-text hover:border-indigo-400 transition-colors duration-200"
                />
              </div>
            </div>
          ) : (
            // View Mode
            <div className="space-y-6">
              {/* Status and Type Badges */}
              <div className="flex gap-3">
                <Badge className={getStatusColor(job.jobStatus)}>
                  {job.jobStatus.charAt(0).toUpperCase() + job.jobStatus.slice(1)}
                </Badge>
                <Badge variant="outline" className={getJobTypeColor(job.jobType)}>
                  <Clock className="h-3 w-3 mr-1" />
                  {job.jobType.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Location</p>
                    <p className="font-medium text-slate-800">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-600">Date Applied</p>
                    <p className="font-medium text-slate-800">{formatDate(job.dateApplied)}</p>
                  </div>
                </div>

                {job.interviewDate && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600">Interview Date</p>
                      <p className="font-medium text-blue-800">{formatDate(job.interviewDate)}</p>
                    </div>
                  </div>
                )}

                {job.salary && (
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-emerald-600">Salary</p>
                      <p className="font-medium text-emerald-800">{job.salary}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {job.description && (
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-slate-600" />
                    <p className="text-sm font-medium text-slate-600">Description</p>
                  </div>
                  <p className="text-slate-700">{job.description}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          {isEditing ? (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                Close
              </Button>
              <Button 
                variant="outline" 
                onClick={handleEdit}
                className="cursor-pointer hover:scale-105 transition-transform duration-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}