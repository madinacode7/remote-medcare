
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";

// Import mock data and charts
import { Calendar, ChevronUp, Users, VideoIcon } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for charts
const userActivityData = [
  { name: "Mon", patients: 12, doctors: 5 },
  { name: "Tue", patients: 15, doctors: 6 },
  { name: "Wed", patients: 18, doctors: 8 },
  { name: "Thu", patients: 16, doctors: 7 },
  { name: "Fri", patients: 21, doctors: 9 },
  { name: "Sat", patients: 14, doctors: 4 },
  { name: "Sun", patients: 10, doctors: 3 },
];

const appointmentData = [
  { name: "Jan", completed: 120, canceled: 20, noshow: 8 },
  { name: "Feb", completed: 132, canceled: 18, noshow: 6 },
  { name: "Mar", completed: 145, canceled: 22, noshow: 10 },
  { name: "Apr", completed: 158, canceled: 16, noshow: 7 },
  { name: "May", completed: 170, canceled: 23, noshow: 9 },
];

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar role="admin" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,245</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ChevronUp className="h-4 w-4 mr-1" />
                    <span>12% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Active Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">48</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ChevronUp className="h-4 w-4 mr-1" />
                    <span>3 new this week</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Today's Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">32</div>
                  <div className="text-sm text-gray-500">
                    <span>92% completion rate</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">Excellent</div>
                  <Progress value={98} className="h-2" />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Daily active users over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="patients" stroke="#1E88E5" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="doctors" stroke="#26C6DA" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Monthly Appointments</CardTitle>
                  <CardDescription>Statistics for the last 5 months</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={appointmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#1E88E5" />
                      <Bar dataKey="canceled" fill="#FFA726" />
                      <Bar dataKey="noshow" fill="#EF5350" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-medical" />
                    <span>User Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Users</span>
                      <span className="font-medium">1,245</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active Users</span>
                      <span className="font-medium">980</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Suspended Accounts</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-medical hover:bg-medical-dark">
                    View User List
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <VideoIcon className="h-5 w-5 mr-2 text-medical" />
                    <span>Video Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Active Sessions</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Duration</span>
                      <span className="font-medium">18 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Technical Issues</span>
                      <span className="font-medium text-amber-600">3 reported</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-medical hover:bg-medical-dark">
                    View Session Logs
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-medical" />
                    <span>System Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>API Response Time</span>
                      <span className="font-medium text-green-600">120ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Database Load</span>
                      <span className="font-medium text-green-600">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Storage Used</span>
                      <span className="font-medium">450GB / 1TB</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-medical hover:bg-medical-dark">
                    System Diagnostics
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
