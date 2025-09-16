'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStats, dummyJobs, getDeclinedJobsByYear } from '@/data/dummy-data';
import {
  Briefcase,
  Building,
  Calendar,
  MapPin,
  TrendingDown,
  Users
} from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  color = "text-blue-600" 
}: {
  title: string;
  value: number | string;
  description: string;
  icon: any;
  color?: string;
}) => (
  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-slate-700">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      <p className="text-xs text-slate-500">{description}</p>
    </CardContent>
  </Card>
);

const RecentJobsCard = () => {
  const recentJobs = dummyJobs
    .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'interview': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'declined': return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'accepted': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  return (
    <Card className="col-span-full lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-800">Recent Applications</CardTitle>
        <CardDescription className="text-slate-600">Your latest job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-800">{job.company}</span>
                </div>
                <p className="text-sm text-slate-600">{job.position}</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-500">{job.location}</span>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(job.jobStatus)}>
                  {job.jobStatus}
                </Badge>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(job.dateApplied).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const YearlyDeclinedJobs = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];
  
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-800">Jobs Declined by Year</CardTitle>
        <CardDescription className="text-slate-600">Track your declined applications over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {years.map((year) => {
            const declined = getDeclinedJobsByYear(year);
            return (
              <div key={year} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-sm font-medium text-slate-800">{year}</span>
                <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                  {declined} declined
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Home() {
  return (
    <div className="p-6 pt-16 md:pt-6 space-y-6 bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-slate-600">
            Track your job applications and see your progress
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending Applications"
          value={dashboardStats.pendingJobs}
          description="Awaiting response"
          icon={Briefcase}
          color="text-amber-600"
        />
        <StatCard
          title="Interview Scheduled"
          value={dashboardStats.interviewSets}
          description="Upcoming interviews"
          icon={Calendar}
          color="text-blue-600"
        />
        <StatCard
          title="Applications Declined"
          value={dashboardStats.jobsDeclined}
          description="Not selected"
          icon={TrendingDown}
          color="text-rose-600"
        />
        <StatCard
          title="Total Applications"
          value={dashboardStats.totalJobs}
          description="All time applications"
          icon={Users}
          color="text-emerald-600"
        />
      </div>

      {/* Additional Cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        <RecentJobsCard />
        <YearlyDeclinedJobs />
      </div>
    </div>
  );
}
