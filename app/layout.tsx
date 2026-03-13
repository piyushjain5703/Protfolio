import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Chat from "@/components/Chat";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piyush Jain | Software Engineer",
  description:
    "Software Engineer with deep expertise in Java, AWS, System Design, and microservices. IIT Dharwad graduate. Currently at Traveloka.",
  keywords: [
    "Piyush Jain",
    "Software Engineer",
    "Backend Developer",
    "Java",
    "AWS",
    "System Design",
    "IIT Dharwad",
    "Traveloka",
  ],
  openGraph: {
    title: "Piyush Jain | Software Engineer",
    description:
      "Software Engineer with deep expertise in Java, AWS, System Design, and microservices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Chat />
        </ThemeProvider>
      </body>
    </html>
  );
}
