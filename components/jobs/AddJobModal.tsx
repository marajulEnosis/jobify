import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Job, NewJobForm } from '@/types';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface AddJobModalProps {
  onAddJob: (job: Omit<Job, 'id' | 'dateApplied'>) => void;
}

export default function AddJobModal({ onAddJob }: AddJobModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<NewJobForm>({
    company: '',
    position: '',
    location: '',
    jobType: 'full-time',
    jobStatus: 'pending',
    interviewDate: '',
    salary: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.position || !formData.location) return;

    onAddJob({
      ...formData,
      interviewDate: formData.interviewDate || undefined,
      salary: formData.salary || undefined,
      description: formData.description || undefined
    });

    setFormData({
      company: '',
      position: '',
      location: '',
      jobType: 'full-time',
      jobStatus: 'pending',
      interviewDate: '',
      salary: '',
      description: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200">
          <Plus className="h-4 w-4" />
          Add New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Job Application</DialogTitle>
          <DialogDescription>
            Fill in the details of your new job application.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Enter company name"
                className="cursor-text hover:border-indigo-400 transition-colors duration-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                placeholder="Enter job position"
                className="cursor-text hover:border-indigo-400 transition-colors duration-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter job location"
              className="cursor-text hover:border-indigo-400 transition-colors duration-200"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select value={formData.jobType} onValueChange={(value: any) => setFormData(prev => ({ ...prev, jobType: value }))}>
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
              <Label htmlFor="jobStatus">Status</Label>
              <Select value={formData.jobStatus} onValueChange={(value: any) => setFormData(prev => ({ ...prev, jobStatus: value }))}>
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
            <Label htmlFor="interviewDate">Interview Date (Optional)</Label>
            <Input
              id="interviewDate"
              type="date"
              value={formData.interviewDate}
              onChange={(e) => setFormData(prev => ({ ...prev, interviewDate: e.target.value }))}
              className="cursor-pointer hover:border-indigo-400 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salary (Optional)</Label>
            <Input
              id="salary"
              value={formData.salary}
              onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
              placeholder="e.g., $80,000 - $100,000"
              className="cursor-text hover:border-indigo-400 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief job description"
              className="cursor-text hover:border-indigo-400 transition-colors duration-200"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="cursor-pointer hover:scale-105 transition-transform duration-200">
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer hover:scale-105 transition-transform duration-200">Add Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
