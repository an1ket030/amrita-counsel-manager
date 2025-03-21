
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, BarChart3, MessageSquare, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomButton from "@/components/ui/CustomButton";
import { CustomCard, CardContent } from "@/components/ui/CustomCard";

const Index: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => {
      el.classList.add("opacity-0");
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Intelligent Scheduling",
      description:
        "AI-powered scheduling system that matches students with the right faculty based on their needs and availability.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Performance Analytics",
      description:
        "Comprehensive dashboards displaying student performance metrics with predictive analytics to identify at-risk students.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Real-time Communication",
      description:
        "Secure messaging system allowing students to communicate with counselors before and after sessions.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Role-based Access",
      description:
        "Tailored experiences for students, teachers and administrators with appropriate access controls.",
    },
  ];

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              Amrita University
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-in-bottom" style={{ textWrap: "balance" }}>
              AI-Powered <span className="text-gradient">Counselling Management</span> for Academic Success
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in-bottom" style={{ animationDelay: "0.1s", textWrap: "balance" }}>
              A comprehensive platform connecting students with faculty for personalized academic counseling and performance tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
              <Link to="/student">
                <CustomButton size="lg" className="w-full sm:w-auto">
                  Student Portal
                  <ArrowRight size={16} className="ml-2" />
                </CustomButton>
              </Link>
              <Link to="/teacher">
                <CustomButton variant="outline" size="lg" className="w-full sm:w-auto">
                  Teacher Portal
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 bg-secondary/50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Streamlined Counselling Experience
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform offers innovative tools to enhance the academic counselling process for both students and faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <CustomCard
                key={index}
                className="scroll-reveal hover-scale"
                style={{ animationDelay: `${0.1 * index}s` }}
                variant="default"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="rounded-full p-3 bg-primary/10">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary/80 to-blue-600/80 rounded-2xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden shadow-lg">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to transform academic counselling?
                </h2>
                <p className="text-white/80 mb-0">
                  Join Amrita University's innovative platform connecting students with faculty for personalized guidance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/student">
                  <CustomButton
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
                  >
                    Get Started
                    <ArrowRight size={16} className="ml-2" />
                  </CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
