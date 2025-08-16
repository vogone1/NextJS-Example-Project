// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { MouseCursorProvider } from "@/src/contexts/MouseCursorContext/MouseCursorContext";
import GlobalMouseCursor from "@/src/components/organisms/GlobalMouseCursor/GlobalMouseCursor";

export const metadata: Metadata = {
  title: "My App",
  description: "App with global mouse loading animation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MouseCursorProvider>
          {children}
          <GlobalMouseCursor /> {/* This handles both default AND loading states */}
        </MouseCursorProvider>
      </body>
    </html>
  );
}