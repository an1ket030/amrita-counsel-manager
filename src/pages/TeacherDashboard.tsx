
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Users, 
  AlertTriangle, 
  Download, 
  Calendar, 
  Clock, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Mail,
  FileText
} from "lucide-react";
import Dashboard from "./Dashboard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import { CustomCard, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import CustomAvatar from "@/components/ui/CustomAvatar";
import SessionCard, { SessionData } from "@/components/dashboard/SessionCard";
import { toast } from "@/components/ui/use-toast";

// Mock data for students
const students = [
  {
    id: "1",
    name: "Rahul Sharma",
    rollNumber: "AM.EN.U4CSE19001",
    course: "B.Tech CSE",
    year: "4th Year",
    cgpa: 8.7,
    attendance: 92,
    status: "good",
  },
  {
    id: "2",
    name: "Priya Patel",
    rollNumber: "AM.EN.U4CSE19045",
    course: "B.Tech CSE",
    year: "4th Year",
    cgpa: 7.2,
    attendance: 78,
    status: "at-risk",
  },
  {
    id: "3",
    name: "Arun Kumar",
    rollNumber: "AM.EN.U4ECE19023",
    course: "B.Tech ECE",
    year: "4th Year",
    cgpa: 9.1,
    attendance: 95,
    status: "excellent",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    rollNumber: "AM.EN.U4CSE19078",
    course: "B.Tech CSE",
    year: "4th Year",
    cgpa: 6.8,
    attendance: 68,
    status: "critical",
  }
];

// Performance trend data
const performanceData = [
  { name: "Jan", CGPA: 8.2, Attendance: 9.0, Assignment: 8.5 },
  { name: "Feb", CGPA: 8.0, Attendance: 8.5, Assignment: 8.0 },
  { name: "Mar", CGPA: 7.8, Attendance: 8.0, Assignment: 7.5 },
  { name: "Apr", CGPA: 7.5, Attendance: 7.6, Assignment: 7.2 },
  { name: "May", CGPA: 7.3, Attendance: 7.0, Assignment: 7.0 },
];

// Mock sessions data
const mockSessions: SessionData[] = [
  {
    id: "1",
    title: "Performance Improvement Plan",
    date: "May 26, 2023",
    time: "11:30 AM",
    duration: "45 mins",
    counselor: {
      name: "You",
      department: "Computer Science",
    },
    location: "Your Office",
    status: "upcoming",
    description: "Discussing strategies to improve academic performance with Priya Patel.",
  },
  {
    id: "2",
    title: "Final Year Project Review",
    date: "May 24, 2023",
    time: "2:00 PM",
    duration: "30 mins",
    counselor: {
      name: "You",
      department: "Computer Science",
    },
    location: "Lab 3",
    status: "upcoming",
    description: "Reviewing progress on the final year project with Rahul Sharma.",
  },
];

interface TeacherDashboardProps {
  authContext?: {
    isLoggedIn: boolean;
    userRole: 'student' | 'teacher' | null;
    onSignIn: (role: 'student' | 'teacher') => void;
    onSignOut: () => void;
  };
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ authContext }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions] = useState<SessionData[]>(mockSessions);
  const [showGroupScheduler, setShowGroupScheduler] = useState(false);
  const [showFlagStudent, setShowFlagStudent] = useState(false);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const navigate = useNavigate();

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-500 text-white";
      case "good":
        return "bg-blue-500 text-white";
      case "at-risk":
        return "bg-amber-500 text-white";
      case "critical":
        return "bg-red-600 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
      case "good":
        return <ArrowUpRight size={14} />;
      case "at-risk":
      case "critical":
        return <ArrowDownRight size={14} />;
      default:
        return null;
    }
  };

  const handleQuickAction = (action: string) => {
    // Reset all panels
    setShowGroupScheduler(false);
    setShowFlagStudent(false);
    setShowReportGenerator(false);

    // Show the selected panel
    switch (action) {
      case "groupSession":
        setShowGroupScheduler(true);
        break;
      case "flagStudent":
        setShowFlagStudent(true);
        break;
      case "reports":
        setShowReportGenerator(true);
        break;
      default:
        break;
    }
  };

  const handleViewProfile = (studentId: string) => {
    toast({
      title: "Viewing Student Profile",
      description: `Opening profile for ${students.find(s => s.id === studentId)?.name}`,
      duration: 3000,
    });
  };

  // Check if user is logged in and is a teacher
  if (authContext?.isLoggedIn === false || (authContext?.isLoggedIn && authContext?.userRole !== 'teacher')) {
    // If not logged in or not a teacher, redirect to home
    setTimeout(() => {
      navigate('/');
    }, 100);
    return null;
  }

  return (
    <Dashboard
      title="Teacher Dashboard"
      description="Monitor student performance and manage counseling sessions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main content - 8/12 width on large screens */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search and filters */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search students by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-10 py-3 rounded-lg border border-input bg-background"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>

          {/* Quick Actions Expanded Content */}
          {showGroupScheduler && (
            <CustomCard className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Schedule Group Session</CardTitle>
                  <button
                    onClick={() => setShowGroupScheduler(false)}
                    className="p-1 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 mb-4">
                  <h3 className="font-medium mb-3">Select Students for Group Session</h3>
                  <div className="space-y-2">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`student-${student.id}`}
                          className="mr-2 h-4 w-4"
                        />
                        <label htmlFor={`student-${student.id}`} className="text-sm">
                          {student.name} ({student.rollNumber})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Session Title</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="Enter session title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Time</label>
                    <input 
                      type="time" 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Duration (minutes)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="60"
                      min="15"
                      step="15"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      rows={3}
                      placeholder="Provide details about the session"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <CustomButton
                    variant="outline"
                    onClick={() => setShowGroupScheduler(false)}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    variant="primary"
                    onClick={() => {
                      setShowGroupScheduler(false);
                      toast({
                        title: "Group Session Scheduled",
                        description: "The group counseling session has been scheduled successfully.",
                        duration: 3000,
                      });
                    }}
                  >
                    Schedule Session
                  </CustomButton>
                </div>
              </CardContent>
            </CustomCard>
          )}

          {showFlagStudent && (
            <CustomCard className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Flag Student Concerns</CardTitle>
                  <button
                    onClick={() => setShowFlagStudent(false)}
                    className="p-1 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 mb-4">
                  <h3 className="font-medium mb-3">Select Student</h3>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-4 mb-4">
                  <h3 className="font-medium mb-3">Concern Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="academic" 
                        name="concernType" 
                        className="mr-2"
                      />
                      <label htmlFor="academic">Academic Performance</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="attendance" 
                        name="concernType" 
                        className="mr-2"
                      />
                      <label htmlFor="attendance">Attendance Issues</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="behavior" 
                        name="concernType" 
                        className="mr-2"
                      />
                      <label htmlFor="behavior">Behavioral Concerns</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="other" 
                        name="concernType" 
                        className="mr-2"
                      />
                      <label htmlFor="other">Other</label>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Details</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    rows={4}
                    placeholder="Provide details about your concerns"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Priority Level</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                    <option value="low">Low - For Information Only</option>
                    <option value="medium">Medium - Requires Attention</option>
                    <option value="high">High - Immediate Action Required</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <CustomButton
                    variant="outline"
                    onClick={() => setShowFlagStudent(false)}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    variant="primary"
                    onClick={() => {
                      setShowFlagStudent(false);
                      toast({
                        title: "Student Concern Flagged",
                        description: "The concern has been reported to the academic team.",
                        duration: 3000,
                      });
                    }}
                  >
                    Submit Concern
                  </CustomButton>
                </div>
              </CardContent>
            </CustomCard>
          )}

          {showReportGenerator && (
            <CustomCard className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generate Reports</CardTitle>
                  <button
                    onClick={() => setShowReportGenerator(false)}
                    className="p-1 rounded-full hover:bg-background/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 mb-4">
                  <h3 className="font-medium mb-3">Report Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="individual" 
                        name="reportType" 
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="individual">Individual Student Report</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="class" 
                        name="reportType" 
                        className="mr-2"
                      />
                      <label htmlFor="class">Class Performance Report</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="attendance-report" 
                        name="reportType" 
                        className="mr-2"
                      />
                      <label htmlFor="attendance-report">Attendance Report</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="counseling" 
                        name="reportType" 
                        className="mr-2"
                      />
                      <label htmlFor="counseling">Counseling Sessions Summary</label>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 mb-4 border-t border-border">
                  <h3 className="font-medium mb-3">Student Selection (for Individual Report)</h3>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="p-4 mb-4 border-t border-border">
                  <h3 className="font-medium mb-3">Time Period</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">From</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">To</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 mb-4 border-t border-border">
                  <h3 className="font-medium mb-3">File Format</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="pdf" 
                        name="fileFormat" 
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="pdf">PDF</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="excel" 
                        name="fileFormat" 
                        className="mr-2"
                      />
                      <label htmlFor="excel">Excel</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="csv" 
                        name="fileFormat" 
                        className="mr-2"
                      />
                      <label htmlFor="csv">CSV</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <CustomButton
                    variant="outline"
                    onClick={() => setShowReportGenerator(false)}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    variant="primary"
                    onClick={() => {
                      setShowReportGenerator(false);
                      toast({
                        title: "Report Generated",
                        description: "Your report has been generated and is ready to download.",
                        duration: 3000,
                      });
                    }}
                  >
                    Generate Report
                  </CustomButton>
                </div>
              </CardContent>
            </CustomCard>
          )}

          {/* Student list */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Students</h2>

            <div className="space-y-3">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <CustomCard
                    key={student.id}
                    className="hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <CustomAvatar
                          size="md"
                          fallback={student.name}
                          className={getStatusColor(student.status)}
                        />
                        <div>
                          <h3 className="font-medium flex items-center">
                            {student.name}
                            <span className={`ml-2 inline-flex items-center text-xs px-2 py-0.5 rounded-full ${getStatusColor(student.status)}`}>
                              {getStatusIcon(student.status)}
                              <span className="ml-1 capitalize">{student.status}</span>
                            </span>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {student.rollNumber} • {student.course}, {student.year}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 sm:gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">CGPA</p>
                          <p className="font-semibold">{student.cgpa}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Attendance</p>
                          <p className="font-semibold">{student.attendance}%</p>
                        </div>
                        <CustomButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProfile(student.id)}
                        >
                          View Profile
                        </CustomButton>
                      </div>
                    </CardContent>
                  </CustomCard>
                ))
              ) : (
                <CustomCard className="p-8 text-center">
                  <p className="text-muted-foreground">No students found.</p>
                </CustomCard>
              )}
            </div>
          </div>

          {/* Performance trend */}
          <PerformanceChart
            data={performanceData}
            title="Class Average Performance Trend"
            type="line"
          />
        </div>

        {/* Sidebar - 4/12 width on large screens */}
        <div className="lg:col-span-4 space-y-6">
          {/* Stats overview */}
          <div className="grid grid-cols-2 gap-4">
            <CustomCard className="p-4 text-center">
              <div className="rounded-full p-2 bg-primary/10 text-primary mx-auto mb-2">
                <Users size={20} />
              </div>
              <p className="text-2xl font-bold">54</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CustomCard>
            <CustomCard className="p-4 text-center">
              <div className="rounded-full p-2 bg-amber-500/10 text-amber-500 mx-auto mb-2">
                <AlertTriangle size={20} />
              </div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">At Risk</p>
            </CustomCard>
          </div>

          {/* Upcoming sessions */}
          <CustomCard>
            <CardHeader>
              <CardTitle>Your Sessions</CardTitle>
              <CardDescription>Upcoming counseling sessions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {sessions.map((session) => (
                  <div key={session.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{session.title}</h4>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                        {session.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar size={14} className="mr-1" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={14} className="mr-1" />
                      <span>
                        {session.time} ({session.duration})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t border-border">
              <CustomButton variant="outline" size="sm" className="w-full">
                View All Sessions
              </CustomButton>
            </CardFooter>
          </CustomCard>

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
                    onClick={() => handleQuickAction("groupSession")}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <Users size={18} />
                      </div>
                      <span>Schedule Group Session</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    onClick={() => handleQuickAction("flagStudent")}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <AlertTriangle size={18} />
                      </div>
                      <span>Flag Student Concerns</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    onClick={() => handleQuickAction("reports")}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <Download size={18} />
                      </div>
                      <span>Generate Reports</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    onClick={() => {
                      toast({
                        title: "Email Template",
                        description: "Opening email templates for student communication.",
                        duration: 3000,
                      });
                    }}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <Mail size={18} />
                      </div>
                      <span>Email Templates</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    onClick={() => {
                      toast({
                        title: "Meeting Notes",
                        description: "Opening meeting notes templates.",
                        duration: 3000,
                      });
                    }}
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <FileText size={18} />
                      </div>
                      <span>Meeting Notes</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                </li>
              </ul>
            </CardContent>
          </CustomCard>
        </div>
      </div>
    </Dashboard>
  );
};

export default TeacherDashboard;
