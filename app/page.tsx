import { Button } from "@/components/ui/button";
import {
  Briefcase,
  LayoutDashboard,
  Plus
} from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="px-6 pt-16 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Jobify</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Your comprehensive job application tracker. Organize, manage, and track all your job applications in one place. 
            Make your job search more efficient and never lose track of an opportunity again.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                <LayoutDashboard className="h-5 w-5" />
                View Dashboard
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" size="lg" className="flex items-center gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <Plus className="h-5 w-5" />
                Add New Job
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
