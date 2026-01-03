import "../globals.css";
import React from "react";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Directorio de Podólogos - Encuentra tu especialista",
  description: "Encuentra y reserva cita con los mejores podólogos verificados cerca de ti. Profesionales expertos en tratamientos de pies, plantillas, fascitis plantar y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <div className={`${geistSans.className}`}>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
