
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, Video } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const upcomingAppointments = [
  {
    id: "1",
    doctor: "Dr. Jane Smith",
    specialty: "Cardiology",
    date: "2025-05-25",
    time: "10:00 AM",
    type: "Video Consultation"
  },
  {
    id: "2",
    doctor: "Dr. Michael Johnson",
    specialty: "Dermatology",
    date: "2025-06-02",
    time: "2:30 PM",
    type: "Video Consultation"
  }
];

const PatientDashboard = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar role="patient" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome, {currentUser?.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{upcomingAppointments.length}</div>
                </CardContent>
                <CardFooter>
                  <Link to="/patient/appointments" className="text-sm text-medical hover:underline">
                    View all appointments
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Unread Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3</div>
                </CardContent>
                <CardFooter>
                  <Link to="/patient/messages" className="text-sm text-medical hover:underline">
                    View all messages
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Prescription Refills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1</div>
                </CardContent>
                <CardFooter>
                  <Link to="/patient/prescriptions" className="text-sm text-medical hover:underline">
                    View all prescriptions
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
            {upcomingAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden">
                    <CardHeader className="bg-medical/10 pb-2">
                      <CardTitle>{appointment.doctor}</CardTitle>
                      <CardDescription>{appointment.specialty}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-medical" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-medical" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Video className="h-4 w-4 mr-2 text-medical" />
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Reschedule</Button>
                      <Button className="bg-medical hover:bg-medical-dark">
                        Join Session
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500 mb-4">You have no upcoming appointments</p>
                  <Button className="bg-medical hover:bg-medical-dark">
                    Schedule an Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Find a Doctor</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Specialty</h3>
                    <select className="w-full p-2 border rounded">
                      <option>All Specialties</option>
                      <option>Cardiology</option>
                      <option>Dermatology</option>
                      <option>Neurology</option>
                      <option>Pediatrics</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Date</h3>
                    <input type="date" className="w-full p-2 border rounded" />
                  </div>
                  
                  <div className="flex items-end">
                    <Button className="bg-medical hover:bg-medical-dark w-full">
                      Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
