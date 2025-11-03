"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/upload", label: "Upload Prescription" },
    { href: "/wellness", label: "Health & Wellness" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: scrolled ? "var(--color-background)" : "transparent",
      borderBottom: scrolled ? "1px solid var(--color-border)" : "transparent",
      boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      backdropFilter: scrolled ? "saturate(180%) blur(6px)" : "none",
      transition: "background 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        color: scrolled ? "var(--color-text)" : "var(--color-dark-bg)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/" style={{ fontWeight: 700, color: "inherit", fontSize: 18 }}>
            Logo
          </Link>
          {!isMobile && (
            <nav style={{ display: "flex", gap: 20 }}>
              {links.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`navLink ${isActive ? "navLinkActive" : ""}`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isMobile && (
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                background: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                padding: "6px 10px",
                color: "inherit",
              }}
            >
              ☰
            </button>
          )}
          <ThemeToggle />
          {!isMobile && (
            <Link
              href="/account"
              aria-label="Account"
              className="userIcon"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 18,
                border: "1px solid var(--color-border)",
                color: "inherit",
              }}
            >
              <AccountCircleIcon fontSize="small" />
            </Link>
          )}
        </div>
      </div>
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 20,
          right: 20,
          marginTop: 8,
          background: "var(--color-background)",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          zIndex: 60,
        }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4, padding: 12 }}>
            {[...links, { href: "/account", label: "Account" }].map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`navLink ${isActive ? "navLinkActive" : ""}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}


