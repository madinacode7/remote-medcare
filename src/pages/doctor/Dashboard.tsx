
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, User, Video } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const todayAppointments = [
  {
    id: "1",
    patient: "John Doe",
    age: 45,
    time: "10:00 AM",
    type: "Video Consultation",
    reason: "Follow-up on hypertension medication"
  },
  {
    id: "2",
    patient: "Sarah Johnson",
    age: 32,
    time: "11:30 AM",
    type: "Video Consultation",
    reason: "Annual physical check-up"
  },
  {
    id: "3",
    patient: "Robert Smith",
    age: 58,
    time: "2:00 PM",
    type: "Video Consultation",
    reason: "Chest pain and shortness of breath"
  }
];

const DoctorDashboard = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar role="doctor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome, {currentUser?.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Today's Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{todayAppointments.length}</div>
                </CardContent>
                <CardFooter>
                  <Link to="/doctor/appointments" className="text-sm text-medical hover:underline">
                    View schedule
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5</div>
                </CardContent>
                <CardFooter>
                  <Link to="/doctor/requests" className="text-sm text-medical hover:underline">
                    Review requests
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Unread Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8</div>
                </CardContent>
                <CardFooter>
                  <Link to="/doctor/messages" className="text-sm text-medical hover:underline">
                    Open inbox
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">124</div>
                </CardContent>
                <CardFooter>
                  <Link to="/doctor/patients" className="text-sm text-medical hover:underline">
                    View all patients
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold">Today's Schedule</h2>
                {todayAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{appointment.patient}</CardTitle>
                          <CardDescription>Age: {appointment.age} • {appointment.time}</CardDescription>
                        </div>
                        <Button className="bg-medical hover:bg-medical-dark">
                          Start Session
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Video className="h-4 w-4 mr-2 text-medical" />
                          <span>{appointment.type}</span>
                        </div>
                        <div className="flex items-start text-sm">
                          <span className="font-medium mr-2">Reason for visit:</span>
                          <span>{appointment.reason}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">View Patient History</Button>
                      <Button variant="ghost">Reschedule</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Weekly Stats</h2>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Appointments Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">12 / 15</div>
                    <Progress value={80} className="h-2" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Available Time Slots</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Tomorrow</span>
                      <span className="font-medium text-medical">3 slots</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Week</span>
                      <span className="font-medium text-medical">8 slots</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Next Week</span>
                      <span className="font-medium text-medical">15 slots</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Manage Availability
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Patients</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center p-4">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">Patient Name {i}</div>
                            <div className="text-sm text-gray-500">Last visit: {i} day{i !== 1 ? 's' : ''} ago</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/doctor/patients" className="text-sm text-medical hover:underline">
                      View all patients
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
