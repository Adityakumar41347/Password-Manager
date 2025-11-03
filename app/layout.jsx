
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/sessionWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PassOp - Password Manager",
  description: "Manage your passwords securely with PassOp, the ultimate password manager built with Next.js and NextAuth.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
         >
        <SessionWrapper>
         
          <div >

            {children}
          </div> 
          
        </SessionWrapper>
      </body>
    </html>
  );
}