
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen,
  Edit,
  Save,
  X
} from "lucide-react";
import Dashboard from "./Dashboard";
import { CustomCard, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/CustomCard";
import CustomButton from "@/components/ui/CustomButton";
import CustomAvatar from "@/components/ui/CustomAvatar";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

// Mock student data
const studentData = {
  id: "AM.EN.U4CSE19001",
  name: "Rahul Sharma",
  email: "rahul.s@amrita.edu",
  phone: "+91 9876543210",
  dob: "15 May 2001",
  address: "Amritapuri Campus, Kollam, Kerala",
  department: "Computer Science & Engineering",
  year: "4th Year",
  cgpa: 8.75,
  attendance: 91,
  advisor: "Dr. Srinivas Rao",
  courses: [
    { code: "CSE401", name: "Database Systems", grade: "A", professor: "Prof. Rajesh Kumar" },
    { code: "CSE402", name: "Machine Learning", grade: "A-", professor: "Dr. Srinivas Rao" },
    { code: "CSE403", name: "Computer Networks", grade: "B+", professor: "Dr. Ananya Sharma" },
    { code: "CSE404", name: "Operating Systems", grade: "A", professor: "Dr. Lakshmi Menon" },
  ],
  achievements: [
    "Dean's List: Semesters 1-4",
    "1st Place, Amrita Hackathon 2022",
    "Technical Paper Presenter at IEEE Conference 2022",
    "Member, Amrita Coding Club"
  ]
};

interface StudentProfileProps {
  authContext?: {
    isLoggedIn: boolean;
    userRole: 'student' | 'teacher' | null;
    onSignIn: (role: 'student' | 'teacher') => void;
    onSignOut: () => void;
  };
}

const StudentProfile: React.FC<StudentProfileProps> = ({ authContext }) => {
  const [editing, setEditing] = useState(false);
  const [student, setStudent] = useState({ ...studentData });
  const [editForm, setEditForm] = useState({ ...studentData });
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditForm({ ...student });
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    setStudent({ ...editForm });
    setEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
      duration: 3000,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
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
      title="My Profile"
      description="View and manage your personal and academic information"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main profile - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <CustomCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              {!editing ? (
                <CustomButton 
                  variant="outline" 
                  size="sm"
                  onClick={handleEdit}
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </CustomButton>
              ) : (
                <div className="flex space-x-2">
                  <CustomButton 
                    variant="outline" 
                    size="sm"
                    onClick={handleCancel}
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </CustomButton>
                  <CustomButton 
                    variant="primary" 
                    size="sm"
                    onClick={handleSave}
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </CustomButton>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-6">
                <CustomAvatar
                  size="xl"
                  fallback={student.name}
                  className="bg-primary/10 text-primary"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{student.name}</h2>
                  <p className="text-muted-foreground">{student.id}</p>
                  <p className="mt-1">{student.department}, {student.year}</p>
                </div>
              </div>

              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                    <Input
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                    <Input
                      name="email"
                      value={editForm.email}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                    <Input
                      name="phone"
                      value={editForm.phone}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Date of Birth</label>
                    <Input
                      name="dob"
                      value={editForm.dob}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Address</label>
                    <Input
                      name="address"
                      value={editForm.address}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p>{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p>{student.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                      <p>{student.dob}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Faculty Advisor</p>
                      <p>{student.advisor}</p>
                    </div>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <MapPin className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p>{student.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </CustomCard>

          {/* Academic Information */}
          <CustomCard>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">CGPA</p>
                  <p className="text-2xl font-bold text-primary">{student.cgpa}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Attendance</p>
                  <p className="text-2xl font-bold text-primary">{student.attendance}%</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Credits Completed</p>
                  <p className="text-2xl font-bold text-primary">132/160</p>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-3">Current Courses</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Course Code</th>
                      <th className="text-left py-3 px-4 font-medium">Course Name</th>
                      <th className="text-left py-3 px-4 font-medium">Professor</th>
                      <th className="text-left py-3 px-4 font-medium">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.courses.map((course, index) => (
                      <tr key={index} className={index < student.courses.length - 1 ? "border-b border-border" : ""}>
                        <td className="py-3 px-4">{course.code}</td>
                        <td className="py-3 px-4">{course.name}</td>
                        <td className="py-3 px-4">{course.professor}</td>
                        <td className="py-3 px-4">{course.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </CustomCard>
        </div>

        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-6">
          {/* Achievements */}
          <CustomCard>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {student.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </CustomCard>

          {/* Upcoming Appointments */}
          <CustomCard>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <p className="font-medium">Academic Performance Review</p>
                  <div className="text-sm text-muted-foreground mt-1">
                    <p>May 25, 2023 • 10:00 AM</p>
                    <p>Dr. Srinivas Rao • Online Meeting</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border pt-4">
              <CustomButton 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigate('/student')}
              >
                <BookOpen size={16} className="mr-2" />
                View All Sessions
              </CustomButton>
            </CardFooter>
          </CustomCard>

          {/* Documents */}
          <CustomCard>
            <CardHeader>
              <CardTitle>Important Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <p className="font-medium">Grade Card (Sem 5)</p>
                    <p className="text-sm text-muted-foreground">PDF • 245 KB</p>
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <p className="font-medium">Scholarship Certificate</p>
                    <p className="text-sm text-muted-foreground">PDF • 312 KB</p>
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <p className="font-medium">Internship Verification</p>
                    <p className="text-sm text-muted-foreground">PDF • 189 KB</p>
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

export default StudentProfile;
