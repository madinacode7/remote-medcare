
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "patient" | "doctor" | "admin";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock users for demo purposes
  const mockUsers = [
    { id: "1", email: "patient@example.com", password: "password", name: "John Doe", role: "patient" as UserRole },
    { id: "2", email: "doctor@example.com", password: "password", name: "Dr. Jane Smith", role: "doctor" as UserRole },
    { id: "3", email: "admin@example.com", password: "password", name: "Admin User", role: "admin" as UserRole }
  ];
  
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("telemedicine_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error("Invalid email or password");
      }
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = user;
      
      // Save to state and localStorage
      setCurrentUser(userWithoutPassword);
      localStorage.setItem("telemedicine_user", JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API call
      if (mockUsers.some(u => u.email === email)) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role
      };
      
      // Save to state and localStorage
      setCurrentUser(newUser);
      localStorage.setItem("telemedicine_user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("telemedicine_user");
  };
  
  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
