import { Geist, Geist_Mono, Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import CssBaseline from "@mui/material/CssBaseline";
import AppMain from "../components/AppMain";
import { CartProvider } from "../context/CartContext";

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

const montserrat = Montserrat({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Company | Pharmaceutical E‑commerce",
  description: "Trusted online pharmacy with curated healthcare products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${montserrat.variable}`}>
        <ThemeProvider>
          <CartProvider>
            <CssBaseline />
            <SiteHeader />
            <AppMain>{children}</AppMain>
            <SiteFooter />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
