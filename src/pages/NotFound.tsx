
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import CustomButton from "@/components/ui/CustomButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-500/10 p-3">
              <AlertTriangle size={50} className="text-red-500" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">404</h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Oops! The page you are looking for doesn't exist.
          </p>
          
          <Link to="/" className="inline-block animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CustomButton className="gap-2">
              <Home size={16} /> Return to Home
            </CustomButton>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
