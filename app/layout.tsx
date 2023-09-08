import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import VertNav from "@/components/NavbarVertical";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Demo blog e2e crud",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <VertNav />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
