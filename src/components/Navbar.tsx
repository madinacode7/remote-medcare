
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { 
  Bell,
  Calendar, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Settings,
  User,
  X
} from "lucide-react";

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const getHomeLink = () => {
    if (!isAuthenticated) return "/";
    
    switch (currentUser?.role) {
      case "patient": return "/patient";
      case "doctor": return "/doctor";
      case "admin": return "/admin";
      default: return "/";
    }
  };

  const getProfileLink = () => {
    switch (currentUser?.role) {
      case "patient": return "/patient/profile";
      case "doctor": return "/doctor/profile";
      default: return "/";
    }
  };
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to={getHomeLink()} className="flex items-center space-x-2">
            <span className="h-8 w-8 bg-medical rounded-md flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="white" 
                className="w-5 h-5"
              >
                <path d="M11.25 4.5v15m-4.5-8.25h9" 
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-xl font-bold text-medical">MediConnect</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:text-medical"
                  onClick={() => navigate("/messages")}
                >
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span>Messages</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:text-medical"
                  onClick={() => navigate("/notifications")}
                >
                  <Bell className="h-5 w-5 mr-1" />
                  <span>Notifications</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:text-medical"
                  onClick={() => navigate(getProfileLink())}
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>Profile</span>
                </Button>
                
                <Button 
                  variant="ghost"
                  size="sm" 
                  className="text-gray-600 hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button 
                  variant="default"
                  className="bg-medical hover:bg-medical-dark"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-medical focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 border-t">
          {isAuthenticated ? (
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-gray-600 hover:text-medical"
                onClick={() => {
                  navigate("/messages");
                  setMobileMenuOpen(false);
                }}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                <span>Messages</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-gray-600 hover:text-medical"
                onClick={() => {
                  navigate("/notifications");
                  setMobileMenuOpen(false);
                }}
              >
                <Bell className="h-5 w-5 mr-2" />
                <span>Notifications</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-gray-600 hover:text-medical"
                onClick={() => {
                  navigate(getProfileLink());
                  setMobileMenuOpen(false);
                }}
              >
                <User className="h-5 w-5 mr-2" />
                <span>Profile</span>
              </Button>
              
              <Button 
                variant="ghost"
                size="sm" 
                className="w-full justify-start text-gray-600 hover:text-destructive"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button 
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button 
                variant="default"
                className="w-full justify-start bg-medical hover:bg-medical-dark"
                onClick={() => {
                  navigate("/register");
                  setMobileMenuOpen(false);
                }}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
