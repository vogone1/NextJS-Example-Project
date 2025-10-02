// app/layout.tsx
import GlobalMouseCursor from "@/src/components/organisms/GlobalMouseCursor/GlobalMouseCursor";
import { MouseCursorProvider } from "@/src/contexts/MouseCursorContext/MouseCursorContext";
import type { Metadata } from "next";
import "./globals.css";

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
          <GlobalMouseCursor />
        </MouseCursorProvider>
      </body>
    </html>
  );
}