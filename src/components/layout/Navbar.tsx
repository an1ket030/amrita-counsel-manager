
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu, Moon, Sun, LogIn, LogOut, User } from "lucide-react";
import CustomButton from "../ui/CustomButton";
import CustomAvatar from "../ui/CustomAvatar";

interface NavbarProps {
  authContext?: {
    isLoggedIn: boolean;
    userRole: 'student' | 'teacher' | null;
    onSignIn: (role: 'student' | 'teacher') => void;
    onSignOut: () => void;
  };
}

const Navbar: React.FC<NavbarProps> = ({ authContext }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSignInOptions, setShowSignInOptions] = useState(false);
  const location = useLocation();

  const isLoggedIn = authContext?.isLoggedIn || false;
  const userRole = authContext?.userRole || null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    
    // Log for debugging
    console.log("Dark mode toggled:", newDarkMode);
    console.log("Dark class present:", document.documentElement.classList.contains("dark"));
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Initialize dark mode state from localStorage or system preference
    const storedDarkMode = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If there's a stored preference, use it; otherwise, check system preference
    const initialDarkMode = storedDarkMode !== null 
      ? storedDarkMode === "true" 
      : systemPrefersDark;
    
    setDarkMode(initialDarkMode);
    document.documentElement.classList.toggle("dark", initialDarkMode);
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setShowSignInOptions(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignIn = (role: 'student' | 'teacher') => {
    if (authContext?.onSignIn) {
      authContext.onSignIn(role);
    }
    setShowSignInOptions(false);
  };

  const handleSignOut = () => {
    if (authContext?.onSignOut) {
      authContext.onSignOut();
    }
  };

  const navLinks = [
    { text: "Home", path: "/" },
    ...(isLoggedIn && userRole === 'student' ? [
      { text: "Dashboard", path: "/student" },
      { text: "My Profile", path: "/student/profile" }
    ] : []),
    ...(isLoggedIn && userRole === 'teacher' ? [
      { text: "Dashboard", path: "/teacher" }
    ] : []),
    ...(isLoggedIn ? [] : [
      { text: "Student Portal", path: "/student" },
      { text: "Teacher Portal", path: "/teacher" }
    ]),
    { text: "About", path: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-background/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-semibold animate-fade-in"
        >
          <span className="text-gradient">Amrita Counselling</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm font-medium relative transition-colors hover:text-primary ${
                    isActive(link.path)
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-foreground/70 hover:text-primary hover:bg-background transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isLoggedIn ? (
              <div className="relative">
                <CustomAvatar 
                  src="" 
                  alt="User Profile" 
                  size="sm" 
                  className="cursor-pointer"
                  onClick={() => setShowSignInOptions(!showSignInOptions)}
                />
                {showSignInOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg overflow-hidden z-20 border border-border">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-foreground border-b border-border">
                        Signed in as <span className="font-medium">{userRole}</span>
                      </div>
                      <Link
                        to={userRole === 'student' ? "/student/profile" : "/teacher"}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-background hover:text-primary"
                        onClick={() => setShowSignInOptions(false)}
                      >
                        <User size={16} className="inline mr-2" />
                        Profile
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background hover:text-destructive"
                        onClick={handleSignOut}
                      >
                        <LogOut size={16} className="inline mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <CustomButton 
                  variant="primary" 
                  size="sm" 
                  className="animate-fade-in"
                  onClick={() => setShowSignInOptions(!showSignInOptions)}
                >
                  <LogIn size={16} className="mr-2" />
                  Sign In
                </CustomButton>
                
                {showSignInOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg overflow-hidden z-20 border border-border">
                    <div className="py-2">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background hover:text-primary"
                        onClick={() => handleSignIn('student')}
                      >
                        Sign in as Student
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background hover:text-primary"
                        onClick={() => handleSignIn('teacher')}
                      >
                        Sign in as Teacher
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center md:hidden space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-foreground/70 hover:text-primary hover:bg-background transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-foreground hover:bg-background transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg shadow-lg border-t border-border animate-slide-in-top">
          <nav className="container mx-auto px-4 py-5">
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-background hover:text-primary"
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              
              {!isLoggedIn ? (
                <>
                  <li className="pt-3 border-t border-border">
                    <CustomButton 
                      variant="primary" 
                      className="w-full justify-center mb-2"
                      onClick={() => handleSignIn('student')}
                    >
                      <LogIn size={16} className="mr-2" />
                      Sign In as Student
                    </CustomButton>
                  </li>
                  <li>
                    <CustomButton 
                      variant="outline" 
                      className="w-full justify-center"
                      onClick={() => handleSignIn('teacher')}
                    >
                      <LogIn size={16} className="mr-2" />
                      Sign In as Teacher
                    </CustomButton>
                  </li>
                </>
              ) : (
                <li className="pt-3 border-t border-border">
                  <CustomButton 
                    variant="outline" 
                    className="w-full justify-center text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </CustomButton>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
