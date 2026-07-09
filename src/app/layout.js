import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuroraBackground from "./components/AuroraBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zohair Ahmed — Creative Frontend Developer",
  description:
    "Crafting immersive digital experiences through motion, code, and storytelling.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-[#0a0a0a] text-white">
        {/* Site-wide animated aurora backdrop — sits behind every page's
            content (pages are transparent above it). */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <AuroraBackground className="absolute inset-0 h-full w-full opacity-70 [filter:blur(30px)]" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        {children}
      </body>
    </html>
  );
}
