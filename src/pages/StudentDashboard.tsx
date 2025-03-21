
import React, { useState } from "react";
import { 
  Calendar, 
  PlusCircle, 
  BookOpen, 
  Layers, 
  BarChart3, 
  ChevronRight,
  Clock,
  X
} from "lucide-react";
import Dashboard from "./Dashboard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import SessionCard, { SessionData } from "@/components/dashboard/SessionCard";
import { CustomCard, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import BookingForm from "@/components/dashboard/BookingForm";

// Mock data for performance chart
const performanceData = [
  { name: "Sem 1", CGPA: 8.2, Attendance: 9.0, Assignment: 8.5 },
  { name: "Sem 2", CGPA: 8.4, Attendance: 8.7, Assignment: 8.8 },
  { name: "Sem 3", CGPA: 7.9, Attendance: 8.2, Assignment: 8.1 },
  { name: "Sem 4", CGPA: 8.6, Attendance: 8.9, Assignment: 9.0 },
  { name: "Sem 5", CGPA: 8.8, Attendance: 9.1, Assignment: 9.2 },
];

// Mock counselors data
const counselors = [
  { id: "1", name: "Dr. Srinivas Rao", department: "Computer Science" },
  { id: "2", name: "Dr. Lakshmi Menon", department: "Electrical Engineering" },
  { id: "3", name: "Prof. Rajesh Kumar", department: "Mathematics" },
  { id: "4", name: "Dr. Ananya Sharma", department: "Physics" },
];

// Mock sessions data
const mockSessions: SessionData[] = [
  {
    id: "1",
    title: "Academic Performance Review",
    date: "May 25, 2023",
    time: "10:00 AM",
    duration: "30 mins",
    counselor: {
      name: "Dr. Srinivas Rao",
      department: "Computer Science",
    },
    location: "Online Meeting",
    status: "upcoming",
    description: "Review of current semester performance and discussion of improvement strategies.",
  },
  {
    id: "2",
    title: "Career Guidance Session",
    date: "May 18, 2023",
    time: "2:30 PM",
    duration: "45 mins",
    counselor: {
      name: "Prof. Rajesh Kumar",
      department: "Mathematics",
    },
    location: "Faculty Office",
    status: "completed",
    description: "Discussion about career paths in data science and required skill development.",
  },
];

const StudentDashboard: React.FC = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [sessions, setSessions] = useState<SessionData[]>(mockSessions);

  const handleBookSession = (data: any) => {
    // In a real app, this would send data to an API
    const selectedCounselor = counselors.find(c => c.id === data.counselorId);
    
    if (!selectedCounselor) return;
    
    const newSession: SessionData = {
      id: `session-${Date.now()}`,
      title: data.title,
      date: new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: data.time,
      duration: `${data.duration} mins`,
      counselor: {
        name: selectedCounselor.name,
        department: selectedCounselor.department,
      },
      location: data.location,
      status: "upcoming",
      description: data.description,
    };
    
    setSessions([newSession, ...sessions]);
    setShowBookingForm(false);
  };

  const handleCancelSession = (id: string) => {
    setSessions(sessions.map(session => 
      session.id === id 
        ? { ...session, status: "cancelled" } 
        : session
    ));
  };

  return (
    <Dashboard
      title="Student Dashboard"
      description="Track your academic performance and manage counseling sessions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Overview */}
          <PerformanceChart
            data={performanceData}
            title="Academic Performance Overview"
            type="area"
          />

          {/* Sessions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Counseling Sessions</h2>
              <CustomButton
                onClick={() => setShowBookingForm(true)}
                size="sm"
                className={showBookingForm ? "hidden" : ""}
              >
                <PlusCircle size={16} className="mr-2" />
                Book Session
              </CustomButton>
            </div>

            {showBookingForm ? (
              <CustomCard className="mb-6 overflow-hidden animate-scale-in">
                <CardHeader className="bg-secondary/50">
                  <div className="flex items-center justify-between">
                    <CardTitle>Schedule New Session</CardTitle>
                    <button
                      onClick={() => setShowBookingForm(false)}
                      className="p-1 rounded-full hover:bg-background/80 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <BookingForm
                    onSubmit={handleBookSession}
                    onCancel={() => setShowBookingForm(false)}
                    counselors={counselors}
                  />
                </CardContent>
              </CustomCard>
            ) : null}

            <div className="space-y-4">
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onViewDetails={(id) => console.log("View details", id)}
                    onCancel={handleCancelSession}
                    onReschedule={(id) => console.log("Reschedule", id)}
                    onMessage={(id) => console.log("Message", id)}
                    className="animate-fade-in"
                  />
                ))
              ) : (
                <CustomCard className="p-8 text-center">
                  <p className="text-muted-foreground">No sessions scheduled yet.</p>
                  <CustomButton
                    onClick={() => setShowBookingForm(true)}
                    className="mt-4"
                  >
                    Book Your First Session
                  </CustomButton>
                </CustomCard>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-6">
          {/* Quick actions */}
          <CustomCard>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                <li>
                  <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <Calendar size={18} />
                      </div>
                      <span>View Academic Calendar</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <BookOpen size={18} />
                      </div>
                      <span>Course Materials</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <Layers size={18} />
                      </div>
                      <span>Assignment Tracker</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <BarChart3 size={18} />
                      </div>
                      <span>Detailed Analytics</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
              </ul>
            </CardContent>
          </CustomCard>

          {/* Upcoming deadlines */}
          <CustomCard>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                <li className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-destructive/10 text-destructive mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">Database Systems Assignment</h4>
                      <p className="text-sm text-muted-foreground">Due in 2 days</p>
                    </div>
                  </div>
                </li>
                <li className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-amber-500/10 text-amber-500 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">Machine Learning Mid-term</h4>
                      <p className="text-sm text-muted-foreground">Due in 5 days</p>
                    </div>
                  </div>
                </li>
                <li className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-green-500/10 text-green-500 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">Computer Networks Project</h4>
                      <p className="text-sm text-muted-foreground">Due in 10 days</p>
                    </div>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="border-t border-border p-4">
              <CustomButton variant="outline" size="sm" className="w-full">
                View All Deadlines
              </CustomButton>
            </CardFooter>
          </CustomCard>
        </div>
      </div>
    </Dashboard>
  );
};

export default StudentDashboard;
