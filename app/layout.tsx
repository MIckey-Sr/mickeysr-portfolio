import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MickeySr — Minecraft 3D Artist & Model Creator",
  description: "Portafolio oficial de MickeySr. Modelos, armas, armaduras y colecciones 3D creadas para Minecraft.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
