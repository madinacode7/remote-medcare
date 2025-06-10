
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const DoctorProfile = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Personal information form
  const [personalInfo, setPersonalInfo] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "555-987-6543",
    specialty: "Cardiology",
    licenseNumber: "MD12345678",
    experience: "15"
  });
  
  // Professional information form
  const [professionalInfo, setProfessionalInfo] = useState({
    education: "Harvard Medical School, M.D.",
    certifications: "American Board of Internal Medicine, Cardiovascular Disease",
    hospital: "City Medical Center",
    bio: "Board-certified cardiologist with over 15 years of experience in treating cardiovascular conditions."
  });
  
  // Availability settings
  const [availability, setAvailability] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
    startTime: "09:00",
    endTime: "17:00",
    appointmentDuration: "30",
    breakTime: "12:00",
    breakDuration: "60"
  });
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleProfessionalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfessionalInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAvailability((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleDayToggle = (day: string) => {
    setAvailability((prev) => ({ 
      ...prev, 
      [day]: !prev[day as keyof typeof availability]
    }));
  };
  
  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Personal information updated successfully");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSaveProfessional = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Professional information updated successfully");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSaveAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Availability settings updated successfully");
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar role="doctor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Doctor Profile</h1>
            
            <Tabs defaultValue="personal">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="professional">Professional Details</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your contact information
                    </CardDescription>
                  </CardHeader>
                  
                  <form onSubmit={handleSavePersonal}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <Input
                            name="name"
                            value={personalInfo.name}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            type="email"
                            name="email"
                            value={personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone Number</label>
                          <Input
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Specialty</label>
                          <Input
                            name="specialty"
                            value={personalInfo.specialty}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">License Number</label>
                          <Input
                            name="licenseNumber"
                            value={personalInfo.licenseNumber}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Years of Experience</label>
                          <Input
                            type="number"
                            name="experience"
                            value={personalInfo.experience}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button
                        type="submit"
                        className="bg-medical hover:bg-medical-dark"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="professional">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                    <CardDescription>
                      Update your qualifications and professional information
                    </CardDescription>
                  </CardHeader>
                  
                  <form onSubmit={handleSaveProfessional}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Education</label>
                        <Input
                          name="education"
                          value={professionalInfo.education}
                          onChange={handleProfessionalInfoChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Certifications</label>
                        <Input
                          name="certifications"
                          value={professionalInfo.certifications}
                          onChange={handleProfessionalInfoChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Hospital Affiliation</label>
                        <Input
                          name="hospital"
                          value={professionalInfo.hospital}
                          onChange={handleProfessionalInfoChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Professional Bio</label>
                        <Textarea
                          name="bio"
                          value={professionalInfo.bio}
                          onChange={handleProfessionalInfoChange}
                          rows={5}
                        />
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button
                        type="submit"
                        className="bg-medical hover:bg-medical-dark"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability Settings</CardTitle>
                    <CardDescription>
                      Configure your working days and hours
                    </CardDescription>
                  </CardHeader>
                  
                  <form onSubmit={handleSaveAvailability}>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Working Days</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                              <div key={day} className="flex items-center space-x-2">
                                <Switch
                                  checked={availability[day as keyof typeof availability] as boolean}
                                  onCheckedChange={() => handleDayToggle(day)}
                                  id={day}
                                />
                                <Label htmlFor={day} className="capitalize">{day}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Working Hours</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Start Time</label>
                              <Input
                                type="time"
                                name="startTime"
                                value={availability.startTime}
                                onChange={handleAvailabilityChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">End Time</label>
                              <Input
                                type="time"
                                name="endTime"
                                value={availability.endTime}
                                onChange={handleAvailabilityChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Break Start Time</label>
                              <Input
                                type="time"
                                name="breakTime"
                                value={availability.breakTime}
                                onChange={handleAvailabilityChange}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Break Duration (minutes)</label>
                              <Input
                                type="number"
                                name="breakDuration"
                                value={availability.breakDuration}
                                onChange={handleAvailabilityChange}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Appointment Settings</h3>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Appointment Duration (minutes)</label>
                            <select
                              name="appointmentDuration"
                              value={availability.appointmentDuration}
                              onChange={(e) => setAvailability((prev) => ({ ...prev, appointmentDuration: e.target.value }))}
                              className="w-full p-2 border rounded"
                            >
                              <option value="15">15 minutes</option>
                              <option value="30">30 minutes</option>
                              <option value="45">45 minutes</option>
                              <option value="60">60 minutes</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button
                        type="submit"
                        className="bg-medical hover:bg-medical-dark"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorProfile;
