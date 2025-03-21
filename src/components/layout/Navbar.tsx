
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu, Moon, Sun, LogIn } from "lucide-react";
import CustomButton from "../ui/CustomButton";
import CustomAvatar from "../ui/CustomAvatar";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would connect to actual auth state
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode ? "true" : "false");
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle("dark", storedDarkMode);
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Student Portal", path: "/student" },
    { text: "Teacher Portal", path: "/teacher" },
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

        {/* Desktop Navigation */}
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
              <CustomAvatar 
                src="" 
                alt="User Profile" 
                size="sm" 
                className="cursor-pointer"
              />
            ) : (
              <CustomButton 
                variant="primary" 
                size="sm" 
                className="animate-fade-in"
              >
                <LogIn size={16} className="mr-2" />
                Sign In
              </CustomButton>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
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
              
              {!isLoggedIn && (
                <li className="pt-3 border-t border-border">
                  <CustomButton 
                    variant="primary" 
                    className="w-full justify-center"
                  >
                    <LogIn size={16} className="mr-2" />
                    Sign In
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
