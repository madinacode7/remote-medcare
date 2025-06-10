
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/patient/Dashboard";
import DoctorDashboard from "./pages/doctor/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import Appointment from "./pages/Appointment";
import PatientProfile from "./pages/patient/Profile";
import DoctorProfile from "./pages/doctor/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Patient routes */}
            <Route path="/patient/*" element={
              <ProtectedRoute allowedRole="patient">
                <Routes>
                  <Route path="/" element={<PatientDashboard />} />
                  <Route path="/profile" element={<PatientProfile />} />
                  <Route path="/appointment/:id" element={<Appointment />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* Doctor routes */}
            <Route path="/doctor/*" element={
              <ProtectedRoute allowedRole="doctor">
                <Routes>
                  <Route path="/" element={<DoctorDashboard />} />
                  <Route path="/profile" element={<DoctorProfile />} />
                  <Route path="/appointment/:id" element={<Appointment />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRole="admin">
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
