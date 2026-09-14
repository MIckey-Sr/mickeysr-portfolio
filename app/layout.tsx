import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MickeySr — Minecraft 3D Artist & Model Creator",
  description: "Official MickeySr portfolio. Models, weapons, armor, and 3D collections created for Minecraft.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
