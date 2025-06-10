
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const PatientProfile = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Personal information form
  const [personalInfo, setPersonalInfo] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "555-123-4567",
    dob: "1985-06-15",
    gender: "Male",
    address: "123 Main St, Anytown, CA 12345"
  });
  
  // Medical information form
  const [medicalInfo, setMedicalInfo] = useState({
    allergies: "Penicillin",
    medications: "None",
    conditions: "Hypertension",
    primaryCare: "Dr. Johnson",
    emergencyName: "Jane Doe",
    emergencyPhone: "555-987-6543"
  });
  
  // Insurance information form
  const [insuranceInfo, setInsuranceInfo] = useState({
    provider: "Blue Cross Blue Shield",
    memberId: "XYZ123456789",
    groupNumber: "GROUP-987",
    planType: "PPO",
    effectiveDate: "2025-01-01"
  });
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleMedicalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMedicalInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleInsuranceInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInsuranceInfo((prev) => ({ ...prev, [name]: value }));
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
  
  const handleSaveMedical = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Medical information updated successfully");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSaveInsurance = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Insurance information updated successfully");
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar role="patient" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
            
            <Tabs defaultValue="personal">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="medical">Medical Information</TabsTrigger>
                <TabsTrigger value="insurance">Insurance Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your basic profile information
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
                          <label className="text-sm font-medium">Date of Birth</label>
                          <Input
                            type="date"
                            name="dob"
                            value={personalInfo.dob}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Gender</label>
                          <select
                            name="gender"
                            value={personalInfo.gender}
                            onChange={(e) => setPersonalInfo((prev) => ({ ...prev, gender: e.target.value }))}
                            className="w-full p-2 border rounded"
                            required
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Textarea
                          name="address"
                          value={personalInfo.address}
                          onChange={handlePersonalInfoChange}
                          required
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
              
              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                    <CardDescription>
                      Provide your medical history and emergency contacts
                    </CardDescription>
                  </CardHeader>
                  
                  <form onSubmit={handleSaveMedical}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Allergies</label>
                        <Textarea
                          name="allergies"
                          value={medicalInfo.allergies}
                          onChange={handleMedicalInfoChange}
                          placeholder="List any allergies..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Current Medications</label>
                        <Textarea
                          name="medications"
                          value={medicalInfo.medications}
                          onChange={handleMedicalInfoChange}
                          placeholder="List any medications you're currently taking..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Medical Conditions</label>
                        <Textarea
                          name="conditions"
                          value={medicalInfo.conditions}
                          onChange={handleMedicalInfoChange}
                          placeholder="List any existing conditions..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Primary Care Physician</label>
                        <Input
                          name="primaryCare"
                          value={medicalInfo.primaryCare}
                          onChange={handleMedicalInfoChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Emergency Contact Name</label>
                          <Input
                            name="emergencyName"
                            value={medicalInfo.emergencyName}
                            onChange={handleMedicalInfoChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Emergency Contact Phone</label>
                          <Input
                            name="emergencyPhone"
                            value={medicalInfo.emergencyPhone}
                            onChange={handleMedicalInfoChange}
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
              
              <TabsContent value="insurance">
                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Information</CardTitle>
                    <CardDescription>
                      Update your insurance coverage details
                    </CardDescription>
                  </CardHeader>
                  
                  <form onSubmit={handleSaveInsurance}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Insurance Provider</label>
                          <Input
                            name="provider"
                            value={insuranceInfo.provider}
                            onChange={handleInsuranceInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Member ID</label>
                          <Input
                            name="memberId"
                            value={insuranceInfo.memberId}
                            onChange={handleInsuranceInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Group Number</label>
                          <Input
                            name="groupNumber"
                            value={insuranceInfo.groupNumber}
                            onChange={handleInsuranceInfoChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Plan Type</label>
                          <select
                            name="planType"
                            value={insuranceInfo.planType}
                            onChange={(e) => setInsuranceInfo((prev) => ({ ...prev, planType: e.target.value }))}
                            className="w-full p-2 border rounded"
                          >
                            <option value="PPO">PPO</option>
                            <option value="HMO">HMO</option>
                            <option value="EPO">EPO</option>
                            <option value="POS">POS</option>
                            <option value="HDHP">HDHP</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Effective Date</label>
                          <Input
                            type="date"
                            name="effectiveDate"
                            value={insuranceInfo.effectiveDate}
                            onChange={handleInsuranceInfoChange}
                          />
                        </div>
                      </div>
                      
                      <div className="border p-4 rounded-md bg-blue-50">
                        <p className="text-sm text-blue-800">
                          In this demonstration, insurance information is not being processed or stored.
                        </p>
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

export default PatientProfile;
