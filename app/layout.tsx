import type { Metadata } from "next";
import "./globals.css";
import "@excalidraw/excalidraw/index.css";
import AuthProvider from "@/components/AuthProvider";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "PLCR STUDIO - AI Product Composition",
  description: "Composite products into photorealistic environments using AI",
};

const isAuthEnabled = process.env.AUTH_ENABLED === "true";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = isAuthEnabled ? await auth() : null;

  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
