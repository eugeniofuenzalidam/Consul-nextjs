import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fuenzalida Consulting - Servicios de Consultoría Estratégica",
  description: "Impulsamos tu negocio con soluciones estratégicas y personalizadas. Consultoría profesional para alcanzar tus objetivos empresariales.",
  keywords: ["consultoría", "estrategia", "negocios", "transformación digital", "análisis de datos"],
  authors: [{ name: "Eugenio Fuenzalida" }],
  openGraph: {
    title: "Fuenzalida Consulting",
    description: "Servicios profesionales de consultoría estratégica",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
