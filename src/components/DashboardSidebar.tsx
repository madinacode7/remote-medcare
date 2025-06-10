
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Settings,
  User,
  Users
} from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ href, icon, label, isActive }: SidebarLinkProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2",
        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50"
      )}
    >
      <Link to={href}>
        {icon}
        <span>{label}</span>
      </Link>
    </Button>
  );
};

interface DashboardSidebarProps {
  role: "patient" | "doctor" | "admin";
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const patientLinks = [
    { href: "/patient", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { href: "/patient/appointments", icon: <Calendar className="h-5 w-5" />, label: "Appointments" },
    { href: "/patient/messages", icon: <MessageSquare className="h-5 w-5" />, label: "Messages" },
    { href: "/patient/records", icon: <FileText className="h-5 w-5" />, label: "Medical Records" },
    { href: "/patient/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
  ];
  
  const doctorLinks = [
    { href: "/doctor", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { href: "/doctor/appointments", icon: <Calendar className="h-5 w-5" />, label: "Appointments" },
    { href: "/doctor/patients", icon: <Users className="h-5 w-5" />, label: "Patients" },
    { href: "/doctor/messages", icon: <MessageSquare className="h-5 w-5" />, label: "Messages" },
    { href: "/doctor/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
  ];
  
  const adminLinks = [
    { href: "/admin", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { href: "/admin/users", icon: <Users className="h-5 w-5" />, label: "Users" },
    { href: "/admin/reports", icon: <FileText className="h-5 w-5" />, label: "Reports" },
    { href: "/admin/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ];
  
  let links;
  if (role === "patient") {
    links = patientLinks;
  } else if (role === "doctor") {
    links = doctorLinks;
  } else {
    links = adminLinks;
  }
  
  return (
    <div className="h-screen w-60 border-r bg-sidebar flex flex-col">
      <div className="p-4 border-b">
        <div className="font-medium text-lg">{currentUser?.name}</div>
        <div className="text-sm text-muted-foreground capitalize">{role}</div>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {links.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              isActive={isActive(link.href)}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/settings">
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
