
import React, { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface DashboardProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  children, 
  title = "Dashboard",
  description
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 pt-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2 max-w-3xl">{description}</p>
          )}
        </div>

        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
