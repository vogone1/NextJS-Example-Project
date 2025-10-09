// app/layout.tsx
import GlobalMouseCursor from "@/src/components/organisms/GlobalMouseCursor/GlobalMouseCursor";
import Navbar from "@/src/components/organisms/Navbar/Navbar";
import { MouseCursorProvider } from "@/src/contexts/MouseCursorContext/MouseCursorContext";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { cookies } from "next/headers";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get("showCustomCursor")?.value; // '1' | '0' | undefined
  const initialShowCustomCursor = cookieVal ? cookieVal === "1" : true; // default ON

  // Read theme from cookie; if absent, CSS @media fallback in globals.css will apply
  const themeCookie = cookieStore.get("theme")?.value as 'light' | 'dark' | undefined;

  return (
    <html lang="en" data-theme={themeCookie} suppressHydrationWarning>
      <body className={firaCode.variable}>
        {/* removed inline script; CSS handles system fallback, cookie handles SSR */}
        <MouseCursorProvider initialShowCustomCursor={initialShowCustomCursor}>
          <Navbar />
          {children}
          <GlobalMouseCursor />
        </MouseCursorProvider>
      </body>
    </html>
  );
}