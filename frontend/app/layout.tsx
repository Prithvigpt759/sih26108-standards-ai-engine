import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Standards Analyzer — SIH26108",
  description:
    "AI-powered procurement standards assistant for Indian Standards recommendations, tender health checks, and compliance analysis.",
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
