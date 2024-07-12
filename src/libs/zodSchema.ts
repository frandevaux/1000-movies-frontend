import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "El correo electrónico no es válido" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    repeatPassword: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    name: z.string().min(1, { message: "El nombre no puede estar vacio" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"],
  });
