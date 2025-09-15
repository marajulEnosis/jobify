'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CalendarLegend() {
  const statusColors = [
    { status: 'Interview Scheduled', color: 'bg-emerald-500', textColor: 'text-emerald-700' },
    { status: 'Pending Response', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    { status: 'Declined', color: 'bg-red-500', textColor: 'text-red-700' },
    { status: 'Accepted', color: 'bg-purple-500', textColor: 'text-purple-700' },
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mt-4">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-slate-800">
          Legend
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {statusColors.map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${item.color}`}></div>
            <span className={`text-xs font-medium ${item.textColor}`}>
              {item.status}
            </span>
          </div>
        ))}
        <div className="pt-2 mt-3 border-t border-slate-200">
          <p className="text-xs text-slate-600">
            Click on events to view details
          </p>
        </div>
      </CardContent>
    </Card>
  );
}