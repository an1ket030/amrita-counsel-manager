
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { text: "Privacy Policy", path: "/privacy" },
    { text: "Terms of Service", path: "/terms" },
    { text: "Contact Us", path: "/contact" },
    { text: "Help & Support", path: "/support" },
  ];
  
  return (
    <footer className="w-full bg-background border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Amrita Counselling</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              A comprehensive AI-powered counseling management system designed for students and faculty at Amrita University.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/student" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/teacher" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Teacher Portal
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Contact</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground">Amrita University</p>
              <p className="text-sm text-muted-foreground">Amritapuri, Kollam</p>
              <p className="text-sm text-muted-foreground">Kerala, India</p>
              <p className="text-sm text-muted-foreground mt-2">contact@amrita.edu</p>
            </address>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center mb-4 md:mb-0">
            <span>© {currentYear} Amrita Counselling. All rights reserved.</span>
          </div>
          
          <ul className="flex flex-wrap gap-4 items-center">
            {footerLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className="hover:text-primary transition-colors"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-center mt-6">
          <p className="text-xs text-muted-foreground flex items-center">
            Made with <Heart size={12} className="text-red-500 mx-1" /> at Amrita University
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
