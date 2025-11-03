import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Pharmacia | Pharmaceutical E‑commerce",
  description: "Trusted online pharmacy with curated healthcare products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
        <ThemeProvider>
          <SiteHeader />
          <main style={{ width: "100%", margin: 0, padding: 0 }}>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
