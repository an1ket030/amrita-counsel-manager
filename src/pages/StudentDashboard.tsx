
import React, { useState } from "react";
import { 
  Calendar, 
  PlusCircle, 
  BookOpen, 
  Layers, 
  BarChart3, 
  ChevronRight,
  Clock,
  X,
  User
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import SessionCard, { SessionData } from "@/components/dashboard/SessionCard";
import { CustomCard, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import BookingForm from "@/components/dashboard/BookingForm";
import { toast } from "@/components/ui/use-toast";

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

interface StudentDashboardProps {
  authContext?: {
    isLoggedIn: boolean;
    userRole: 'student' | 'teacher' | null;
    onSignIn: (role: 'student' | 'teacher') => void;
    onSignOut: () => void;
  };
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ authContext }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [sessions, setSessions] = useState<SessionData[]>(mockSessions);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const navigate = useNavigate();

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
    toast({
      title: "Session Booked",
      description: `Your session "${data.title}" has been scheduled successfully.`,
      duration: 5000,
    });
  };

  const handleCancelSession = (id: string) => {
    setSessions(sessions.map(session => 
      session.id === id 
        ? { ...session, status: "cancelled" } 
        : session
    ));
    toast({
      title: "Session Cancelled",
      description: "Your counseling session has been cancelled.",
      variant: "destructive",
      duration: 3000,
    });
  };

  const handleQuickAction = (action: string) => {
    // Reset all panels
    setShowCalendar(false);
    setShowMaterials(false);
    setShowAssignments(false);
    setShowAnalytics(false);

    // Show the selected panel
    switch (action) {
      case "calendar":
        setShowCalendar(true);
        break;
      case "materials":
        setShowMaterials(true);
        break;
      case "assignments":
        setShowAssignments(true);
        break;
      case "analytics":
        setShowAnalytics(true);
        break;
      case "profile":
        navigate("/student/profile");
        break;
      default:
        break;
    }
  };

  // Check if user is logged in and is a student
  if (authContext?.isLoggedIn === false || (authContext?.isLoggedIn && authContext?.userRole !== 'student')) {
    // If not logged in or not a student, redirect to home
    setTimeout(() => {
      navigate('/');
    }, 100);
    return null;
  }

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

          {/* Quick Actions Expanded Content */}
          {showCalendar && (
            <CustomCard className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Academic Calendar</CardTitle>
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="p-1 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <h3 className="font-medium mb-2">Upcoming Events</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Mid-term Examinations</span>
                      <span className="text-primary">May 15-20, 2023</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Project Submission Deadline</span>
                      <span className="text-primary">May 25, 2023</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Summer Break</span>
                      <span className="text-primary">June 10-30, 2023</span>
                    </li>
                    <li className="flex justify-between">
                      <span>New Semester Begins</span>
                      <span className="text-primary">July 5, 2023</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </CustomCard>
          )}

          {showMaterials && (
            <CustomCard className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Materials</CardTitle>
                  <button
                    onClick={() => setShowMaterials(false)}
                    className="p-1 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h3 className="font-medium mb-1">Database Systems</h3>
                    <p className="text-sm text-muted-foreground mb-3">Prof. Rajesh Kumar</p>
                    <div className="flex justify-between">
                      <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400 px-2 py-1 rounded-full">Lecture Notes</span>
                      <button className="text-sm text-primary hover:underline">Download</button>
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h3 className="font-medium mb-1">Machine Learning</h3>
                    <p className="text-sm text-muted-foreground mb-3">Dr. Srinivas Rao</p>
                    <div className="flex justify-between">
                      <span className="text-xs bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400 px-2 py-1 rounded-full">Assignment Guide</span>
                      <button className="text-sm text-primary hover:underline">Download</button>
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h3 className="font-medium mb-1">Computer Networks</h3>
                    <p className="text-sm text-muted-foreground mb-3">Dr. Ananya Sharma</p>
                    <div className="flex justify-between">
                      <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-700/20 dark:text-purple-400 px-2 py-1 rounded-full">Lab Manual</span>
                      <button className="text-sm text-primary hover:underline">Download</button>
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <h3 className="font-medium mb-1">Operating Systems</h3>
                    <p className="text-sm text-muted-foreground mb-3">Dr. Lakshmi Menon</p>
                    <div className="flex justify-between">
                      <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-700/20 dark:text-amber-400 px-2 py-1 rounded-full">Reference Material</span>
                      <button className="text-sm text-primary hover:underline">Download</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CustomCard>
          )}

          {showAssignments && (
            <CustomCard className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Assignment Tracker</CardTitle>
                  <button
                    onClick={() => setShowAssignments(false)}
                    className="p-1 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">Assignment</th>
                        <th className="text-left py-3 px-4 font-medium">Course</th>
                        <th className="text-left py-3 px-4 font-medium">Due Date</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Database Systems Assignment</td>
                        <td className="py-3 px-4">Database Systems</td>
                        <td className="py-3 px-4">May 18, 2023</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full">Due in 2 days</span>
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Machine Learning Project</td>
                        <td className="py-3 px-4">Machine Learning</td>
                        <td className="py-3 px-4">May 25, 2023</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full">Due in 5 days</span>
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Network Design Paper</td>
                        <td className="py-3 px-4">Computer Networks</td>
                        <td className="py-3 px-4">May 30, 2023</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Due in 10 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">OS Simulation</td>
                        <td className="py-3 px-4">Operating Systems</td>
                        <td className="py-3 px-4">June 5, 2023</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Due in 15 days</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </CustomCard>
          )}

          {showAnalytics && (
            <CustomCard className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detailed Analytics</CardTitle>
                  <button
                    onClick={() => setShowAnalytics(false)}
                    className="p-1 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Current CGPA</p>
                    <p className="text-3xl font-bold text-primary">8.75</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Attendance</p>
                    <p className="text-3xl font-bold text-primary">91%</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Assignments</p>
                    <p className="text-3xl font-bold text-primary">88%</p>
                  </div>
                </div>
                
                <div className="p-4 bg-secondary/30 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Subject-wise Performance</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Database Systems</span>
                        <span>A (9.0)</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Machine Learning</span>
                        <span>A (8.7)</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Computer Networks</span>
                        <span>B+ (8.3)</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Operating Systems</span>
                        <span>A (9.1)</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <CustomButton variant="outline" size="sm" className="w-full">
                    Download Full Report
                  </CustomButton>
                </div>
              </CardContent>
            </CustomCard>
          )}

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
                    onViewDetails={(id) => {
                      toast({
                        title: "View Details",
                        description: `Viewing details for session: ${sessions.find(s => s.id === id)?.title}`,
                      });
                    }}
                    onCancel={handleCancelSession}
                    onReschedule={(id) => {
                      toast({
                        title: "Reschedule Request",
                        description: `Request sent to reschedule session: ${sessions.find(s => s.id === id)?.title}`,
                      });
                    }}
                    onMessage={(id) => {
                      toast({
                        title: "Message Sent",
                        description: `Message sent to ${sessions.find(s => s.id === id)?.counselor.name}`,
                      });
                    }}
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
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    onClick={() => handleQuickAction("calendar")}
                  >
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
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    onClick={() => handleQuickAction("materials")}
                  >
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
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    onClick={() => handleQuickAction("assignments")}
                  >
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
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    onClick={() => handleQuickAction("analytics")}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <BarChart3 size={18} />
                      </div>
                      <span>Detailed Analytics</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    onClick={() => handleQuickAction("profile")}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <User size={18} />
                      </div>
                      <span>My Profile</span>
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
              <CustomButton
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleQuickAction("assignments")}
              >
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
