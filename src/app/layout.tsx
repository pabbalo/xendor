import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext"; // Import AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xendor CRM",
  description: "Mobile CRM Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider> {/* Wrap children with AuthProvider */}
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            {/* La TabBar sarà gestita all'interno delle pagine che la necessitano 
                o da un layout specifico per le sezioni autenticate */}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

