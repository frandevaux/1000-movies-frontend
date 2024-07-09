"use client";
import { registerRequest } from "@/app/api/user/auth";
import { UserForm } from "@/interfaces/userFormInteface";
import { User } from "@/interfaces/userInteface";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  user: null as User | null,
  signUp: async (userForm: UserForm) => {},
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUp = async (userForm: UserForm) => {
    try {
      const res = await registerRequest(userForm);
      if (!res) {
        throw new Error("Failed to register user");
      }
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
