import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HireMind",
  description: "Train your mind to succeed in interviews and career growth.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} bg-background text-foreground antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {/* Header */}
            <Header />

            {/* Toast */}
            <Toaster richColors />

            {/* Main Content */}
            <main className="min-h-screen">
              {children}
            </main>

            <footer className="border-t border-border/70 bg-card/45 py-10 backdrop-blur">
              <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
                <p className="font-semibold text-foreground">HireMind</p>
                <p>Built for sharper interviews, resumes, and career decisions.</p>
              </div>
            </footer>

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
