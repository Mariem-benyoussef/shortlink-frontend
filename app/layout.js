import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./redux/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shortlinks",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="bg-background text-foreground min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </Providers>
  );
}
