
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Calendar, Video, MessageSquare, FileText, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, currentUser } = useAuth();
  
  const getStartedLink = () => {
    if (!isAuthenticated) return "/login";
    
    switch (currentUser?.role) {
      case "patient": return "/patient";
      case "doctor": return "/doctor";
      case "admin": return "/admin";
      default: return "/login";
    }
  };

  const features = [
    {
      title: "Easy Appointment Scheduling",
      description: "Book, reschedule, and manage appointments with just a few clicks.",
      icon: <Calendar className="h-10 w-10 text-medical" />
    },
    {
      title: "High-Quality Video Consultations",
      description: "Connect with healthcare providers through secure, high-definition video.",
      icon: <Video className="h-10 w-10 text-medical" />
    },
    {
      title: "Secure Messaging",
      description: "Communicate directly with your healthcare provider before and after visits.",
      icon: <MessageSquare className="h-10 w-10 text-medical" />
    },
    {
      title: "Digital Medical Records",
      description: "Access your medical history, prescriptions, and lab results anytime.",
      icon: <FileText className="h-10 w-10 text-medical" />
    },
    {
      title: "24/7 Availability",
      description: "Access healthcare whenever you need it, day or night.",
      icon: <Clock className="h-10 w-10 text-medical" />
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Healthcare At Your Fingertips
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with licensed medical professionals from the comfort of your home with our secure, easy-to-use telemedicine platform.
          </p>
          <Button 
            className="bg-medical hover:bg-medical-dark text-white py-6 px-8 text-lg rounded-md"
            asChild
          >
            <Link to={getStartedLink()}>
              {isAuthenticated ? "Go to Dashboard" : "Get Started"}
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-medical text-white flex items-center justify-center mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account and complete your profile with relevant medical information.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-medical text-white flex items-center justify-center mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Book an Appointment</h3>
              <p className="text-gray-600">Find a doctor and schedule a video consultation at your preferred time.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-medical text-white flex items-center justify-center mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Care</h3>
              <p className="text-gray-600">Connect with your doctor via video, receive treatment, and access your medical records.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-medical hover:bg-medical-dark text-white"
              asChild
            >
              <Link to={getStartedLink()}>
                {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-xl font-bold mr-2">MediConnect</span>
                <span className="text-sm bg-medical px-2 py-1 rounded">Telemedicine</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} MediConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
