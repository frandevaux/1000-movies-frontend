"use client";
import React, { useEffect, useState } from "react";
import { registerRequest } from "../api/user/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signUp, isAuthenticated } = useAuth();

  const handleRegister = async () => {
    signUp({ username, password, email });
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/movies");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="flex h-screen flex-col items-center text-2xl overflow-hidden bg-cover w-screen">
      <h1 className="text-4xl font-bold mt-10">Registro</h1>
      <div className="flex flex-col items-center mt-5">
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn mt-5" onClick={handleRegister}>
          Registrarse
        </button>
      </div>
    </main>
  );
};

export default RegisterPage;
