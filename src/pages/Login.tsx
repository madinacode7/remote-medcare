
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success("Login successful!");
      
      // Redirect based on user role
      const user = JSON.parse(localStorage.getItem("telemedicine_user") || "{}");
      if (user.role === "patient") {
        navigate("/patient");
      } else if (user.role === "doctor") {
        navigate("/doctor");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Log In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Password</label>
                  <Link to="/forgot-password" className="text-xs text-medical hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="text-sm text-gray-500">
                <p>Demo accounts:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>Patient: patient@example.com / password</li>
                  <li>Doctor: doctor@example.com / password</li>
                  <li>Admin: admin@example.com / password</li>
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-medical hover:bg-medical-dark"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
              
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-medical hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
