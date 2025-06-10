
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Calendar, Clock, FileText, MessageSquare, User, Video } from "lucide-react";

// Mock appointment data
const appointmentData = {
  id: "1",
  doctor: {
    name: "Dr. Jane Smith",
    specialty: "Cardiology",
    image: "/placeholder.svg"
  },
  patient: {
    name: "John Doe",
    age: 45,
    image: "/placeholder.svg"
  },
  date: "2025-05-25",
  time: "10:00 AM",
  duration: 30,
  type: "Video Consultation",
  status: "Confirmed",
  reason: "Follow-up on hypertension medication",
  notes: "Patient reported occasional headaches. Blood pressure was 130/85."
};

const Appointment = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [appointment, setAppointment] = useState<any>(null);
  const [notes, setNotes] = useState("");
  const [isVideoActive, setIsVideoActive] = useState(false);
  
  // Determine if user is a doctor or patient
  const isDoctor = currentUser?.role === "doctor";
  const isPatient = currentUser?.role === "patient";
  
  useEffect(() => {
    // Simulate API call to fetch appointment details
    setIsLoading(true);
    setTimeout(() => {
      setAppointment(appointmentData);
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  const handleEndConsultation = () => {
    setIsVideoActive(false);
    toast.info("Consultation ended");
  };
  
  const handleSaveNotes = () => {
    toast.success("Notes saved successfully");
  };
  
  const handlePrescribe = () => {
    toast.success("Prescription saved and sent to patient");
  };
  
  const renderAppointmentDetails = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center p-10">
          <div className="animate-pulse flex flex-col w-full max-w-md">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-24 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      );
    }
    
    if (!appointment) {
      return (
        <div className="text-center p-10">
          <p className="text-lg text-gray-600">Appointment not found</p>
        </div>
      );
    }
    
    const otherParty = isDoctor ? appointment.patient : appointment.doctor;
    const otherPartyRole = isDoctor ? "Patient" : "Doctor";
    
    return (
      <div className="space-y-6">
        {!isVideoActive && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Appointment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">{otherParty.name}</p>
                  <p className="text-sm text-gray-500">
                    {isDoctor ? `Age: ${otherParty.age}` : otherParty.specialty}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-medical" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p>{new Date(appointment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-medical" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p>{appointment.time} ({appointment.duration} minutes)</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Video className="h-5 w-5 text-medical" />
                  <div>
                    <p className="text-sm font-medium">Appointment Type</p>
                    <p>{appointment.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-medical" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p>{appointment.status}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Reason for Visit</p>
                <p className="text-sm">{appointment.reason}</p>
              </div>
              
              {isDoctor && appointment.notes && (
                <div>
                  <p className="text-sm font-medium mb-1">Previous Notes</p>
                  <p className="text-sm">{appointment.notes}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-medical hover:bg-medical-dark w-full"
                onClick={() => setIsVideoActive(true)}
              >
                <Video className="h-5 w-5 mr-2" />
                Join Video Consultation
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {isVideoActive && (
          <>
            <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="text-white text-center">
                <Video className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                <p className="text-2xl font-medium">Video Consultation with {otherParty.name}</p>
                <p className="text-lg text-gray-400">{isDoctor ? "Patient" : "Doctor"}</p>
              </div>
              
              {/* Self view */}
              <div className="absolute bottom-4 right-4 w-1/5 aspect-video bg-gray-800 rounded-lg border-2 border-medical shadow-lg">
                <div className="flex items-center justify-center h-full">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
              
              {/* Controls */}
              <div className="absolute bottom-4 left-0 right-0 mx-auto w-fit bg-gray-900/70 rounded-full py-2 px-4 flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-700 hover:bg-gray-600 text-white">
                  <Video className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="icon" className="rounded-full bg-red-600 hover:bg-red-700 text-white" onClick={handleEndConsultation}>
                  <span className="sr-only">End Call</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </Button>
                
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-700 hover:bg-gray-600 text-white">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {isDoctor && (
              <Tabs defaultValue="notes">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="notes">Consultation Notes</TabsTrigger>
                  <TabsTrigger value="prescribe">Prescribe</TabsTrigger>
                </TabsList>
                
                <TabsContent value="notes">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Consultation Notes</CardTitle>
                      <CardDescription>
                        Document your observations and treatment plan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Enter your consultation notes here..."
                        className="min-h-[150px]"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="bg-medical hover:bg-medical-dark"
                        onClick={handleSaveNotes}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Save Notes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="prescribe">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Prescription</CardTitle>
                      <CardDescription>
                        Create a digital prescription for the patient
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Medication</label>
                        <Input placeholder="Medication name" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Dosage</label>
                          <Input placeholder="e.g. 20mg" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Frequency</label>
                          <Input placeholder="e.g. Twice daily" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Instructions</label>
                        <Textarea placeholder="Additional instructions..." />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Duration</label>
                        <Input placeholder="e.g. 2 weeks" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="bg-medical hover:bg-medical-dark"
                        onClick={handlePrescribe}
                      >
                        Create Prescription
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
            
            {isPatient && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">During Your Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Feel free to discuss your medical concerns with the doctor. 
                    The doctor may take notes and provide a prescription if needed.
                  </p>
                  <div className="mt-4">
                    <h3 className="font-medium">Questions you may want to ask:</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>What are the potential side effects of any prescribed medications?</li>
                      <li>Are there any lifestyle changes I should make?</li>
                      <li>When should I schedule a follow-up appointment?</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    );
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {isPatient && <DashboardSidebar role="patient" />}
      {isDoctor && <DashboardSidebar role="doctor" />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
              {isVideoActive ? "Video Consultation" : "Appointment Details"}
            </h1>
            
            {renderAppointmentDetails()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Appointment;
