
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";
import StudentProfile from "./pages/StudentProfile";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);

  // Check dark mode preference and auth state on initial load
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    document.documentElement.classList.toggle("dark", darkModePreference);
    
    // Check if user is logged in from localStorage
    const authState = localStorage.getItem("authState");
    if (authState) {
      const { isLoggedIn, role } = JSON.parse(authState);
      setIsLoggedIn(isLoggedIn);
      setUserRole(role);
    }
  }, []);

  // Function to handle sign in
  const handleSignIn = (role: 'student' | 'teacher') => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem("authState", JSON.stringify({ isLoggedIn: true, role }));
  };

  // Function to handle sign out
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("authState");
  };

  // Auth context values to be passed down to components
  const authContextValue = {
    isLoggedIn,
    userRole,
    onSignIn: handleSignIn,
    onSignOut: handleSignOut
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index authContext={authContextValue} />} />
            <Route 
              path="/dashboard" 
              element={
                isLoggedIn ? (
                  userRole === 'student' ? 
                    <Navigate to="/student" replace /> : 
                    <Navigate to="/teacher" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/student" 
              element={
                <StudentDashboard authContext={authContextValue} />
              } 
            />
            <Route 
              path="/student/profile" 
              element={
                <StudentProfile authContext={authContextValue} />
              } 
            />
            <Route 
              path="/teacher" 
              element={
                <TeacherDashboard authContext={authContextValue} />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
