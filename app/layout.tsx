// app/layout.tsx
import GlobalMouseCursor from "@/src/components/organisms/GlobalMouseCursor/GlobalMouseCursor";
import Navbar from "@/src/components/organisms/Navbar/Navbar";
import { MouseCursorProvider } from "@/src/contexts/MouseCursorContext/MouseCursorContext";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "App with global mouse loading animation",
};

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={firaCode.variable}>
        {/* Set theme before hydration to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const s = localStorage.getItem('theme'); const d = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const t = (s === 'light' || s === 'dark') ? s : (d ? 'dark' : 'light'); document.documentElement.dataset.theme = t; } catch (e) {} })();`,
          }}
        />
        <MouseCursorProvider>
          <Navbar />
          {children}
          <GlobalMouseCursor />
        </MouseCursorProvider>
      </body>
    </html>
  );
}