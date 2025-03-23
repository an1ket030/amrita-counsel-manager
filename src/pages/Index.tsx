
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, BarChart3, MessageSquare, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomButton from "@/components/ui/CustomButton";
import { CustomCard, CardContent } from "@/components/ui/CustomCard";

interface IndexProps {
  authContext?: {
    isLoggedIn: boolean;
    userRole: 'student' | 'teacher' | null;
    onSignIn: (role: 'student' | 'teacher') => void;
    onSignOut: () => void;
  };
}

const Index: React.FC<IndexProps> = ({ authContext }) => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => {
      if (!el.classList.contains("animate-fade-in")) {
        el.classList.add("opacity-0");
      }
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Intelligent Scheduling",
      description:
        "AI-powered scheduling system that matches students with the right faculty based on their needs and availability.",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance Analytics",
      description:
        "Comprehensive dashboards displaying student performance metrics with predictive analytics to identify at-risk students.",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Real-time Communication",
      description:
        "Secure messaging system allowing students to communicate with counselors before and after sessions.",
    },
    {
      icon: <Users className="h-8 w-8" />,
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

  const getStudentLink = () => {
    if (authContext?.isLoggedIn) {
      if (authContext.userRole === 'student') {
        return "/student";
      }
      return "/"; // If logged in but not a student, just stay on home
    }
    return "/student"; // If not logged in, go to student portal (will redirect to sign in)
  };

  const getTeacherLink = () => {
    if (authContext?.isLoggedIn) {
      if (authContext.userRole === 'teacher') {
        return "/teacher";
      }
      return "/"; // If logged in but not a teacher, just stay on home
    }
    return "/teacher"; // If not logged in, go to teacher portal (will redirect to sign in)
  };

  const studentLink = getStudentLink();
  const teacherLink = getTeacherLink();

  return (
    <div className="flex flex-col min-h-screen home-page">
      <Navbar authContext={authContext} />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6 animate-fade-in">
              <img 
                src="/amrita-logo.png" 
                alt="Amrita University Logo" 
                className="h-16 md:h-20"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-in-bottom" style={{ textWrap: "balance" }}>
              AI-Powered <span className="text-gradient">Counselling Management</span> for Academic Success
            </h1>
            <p className="text-lg md:text-xl text-yellow-100/80 mb-8 max-w-2xl mx-auto animate-slide-in-bottom" style={{ animationDelay: "0.1s", textWrap: "balance" }}>
              A comprehensive platform connecting students with faculty for personalized academic counseling and performance tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
              <Link to={getStudentLink()}>
                <CustomButton size="lg" className="custom-button-primary w-full sm:w-auto">
                  Student Portal
                  <ArrowRight size={16} className="ml-2" />
                </CustomButton>
              </Link>
              <Link to={getTeacherLink()}>
                <CustomButton variant="outline" size="lg" className="custom-button-secondary w-full sm:w-auto">
                  Teacher Portal
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      <section
        ref={featuresRef}
        className="py-20 bg-rose-900/30"
        id="features"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-100">
              Streamlined Counselling Experience
            </h2>
            <p className="text-lg text-yellow-100/70">
              Our platform offers innovative tools to enhance the academic counselling process for both students and faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <CustomCard
                key={index}
                className="scroll-reveal hover-scale feature-card"
                style={{ animationDelay: `${0.1 * index}s` }}
                variant="default"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="rounded-full p-3 feature-card-icon">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-yellow-100">{feature.title}</h3>
                  <p className="text-yellow-100/70">{feature.description}</p>
                </CardContent>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto cta-section rounded-2xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-yellow-500/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-100">
                  Ready to transform academic counselling?
                </h2>
                <p className="text-yellow-100/80 mb-0">
                  Join Amrita University's innovative platform connecting students with faculty for personalized guidance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={getStudentLink()}>
                  <CustomButton
                    size="lg"
                    className="custom-button-primary w-full sm:w-auto"
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
