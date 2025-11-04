"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Button, IconButton, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const cartCount = 0; // TODO: wire to store
  const helpline = "+94 11 234 5678";
  const email = "help@pharmacia.com";
  const { theme, toggleTheme } = useTheme();
  
  const isHomePage = pathname === "/";
  const shouldShowBackground = scrolled || !isHomePage;

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
    { href: "/wellness", label: "Health & Wellness" },
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
      background: shouldShowBackground ? "var(--color-background)" : "transparent",
      borderBottom: shouldShowBackground ? "1px solid var(--color-border)" : "transparent",
      boxShadow: shouldShowBackground ? "var(--shadow-sm)" : "none",
      backdropFilter: shouldShowBackground ? "saturate(180%) blur(6px)" : "none",
      transition: "background 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
    }}>
      {/* Top helpline bar */}
      <div style={{
        background: "var(--color-surface)",
        color: "var(--color-text)",
        borderBottom: "1px solid var(--color-border)",
        fontSize: 12,
        lineHeight: "24px",
      }}>
        <div style={{
          maxWidth: '100vw',
          margin: "0 auto",
          padding: "2px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href={`tel:${helpline.replace(/\s+/g, "")}`} style={{ color: "inherit" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <PhoneEnabledIcon style={{ fontSize: 14 }} /> {helpline} 
              </span>
            </a>
            {!isMobile && (
              <a href={`mailto:${email}`} style={{ color: "inherit" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <EmailOutlinedIcon style={{ fontSize: 14 }} /> {email}
                </span>
              </a>
            )}
          </div>
          {/* aligned to right */}
        </div>
      </div>
      <div style={{
        maxWidth: '100vw',
        margin: "0 auto",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        color: shouldShowBackground ? "var(--color-text)" : "var(--color-dark-bg)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/" style={{ fontWeight: 700, color: "inherit", fontSize: 18 }}>
            Logo
          </Link>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {links.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Button
                    key={l.href}
                    component={Link}
                    href={l.href}
                    disableRipple
                    sx={{
                      color: "inherit",
                      textTransform: "none",
                      px: 1,
                      py: 1,
                      position: "relative",
                      '&::before': {
                        content: '""',
                        position: "absolute",
                        inset: "-2px -8px",
                        borderRadius: "10px",
                        background: "var(--color-accent)",
                        opacity: isActive ? 0.2 : 0,
                        transform: isActive ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.96)',
                        transition: "opacity 160ms ease, transform 200ms ease",
                        zIndex: -1,
                      },
                      '&:hover': {
                        color: "var(--color-primary)",
                        transform: "translateY(-1px)",
                        '&::before': { opacity: 0.16, transform: 'translateY(0) scale(1)' },
                      },
                    }}
                  >
                    {l.label}
                  </Button>
                );
              })}
            </Box>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          
          {isMobile && (
            <IconButton
              href="/cart"
              component={Link}
              aria-label="Cart"
              sx={{ border: "1px solid var(--color-border)", color: "inherit", width: 36, height: 36 }}
              size="small"
            >
              <Badge badgeContent={cartCount} color="primary" showZero>
                <ShoppingBagIcon fontSize="small" />
              </Badge>
            </IconButton>
          )}
          {/* mobile menu icon should be last; add theme toggle before it */}
          {isMobile && (
            <div style={{ width: 36, height: 36 }}>
              <ThemeToggle />
            </div>
          )}
          {isMobile && (
            <IconButton
              aria-label="Open menu"
              onClick={() => setMenuOpen((v) => !v)}
              sx={{
                border: "1px solid var(--color-border)",
                color: "inherit",
                width: 36,
                height: 36,
              }}
              size="small"
            >
              ☰
            </IconButton>
          )}
          {!isMobile && (
            <IconButton
              href="/cart"
              component={Link}
              aria-label="Cart"
              sx={{ border: "1px solid var(--color-border)", color: "inherit", width: 36, height: 36 }}
              size="small"
            >
              <Badge badgeContent={cartCount} color="primary" showZero>
                <ShoppingBagIcon fontSize="small" />
              </Badge>
            </IconButton>
          )}
          {/* Theme toggle only on desktop in the nav bar */}
          {!isMobile && <ThemeToggle />}
          {!isMobile && (
            <IconButton
              href="/account"
              component={Link}
              aria-label="Account"
              className="userIcon"
              sx={{
                border: "1px solid var(--color-border)",
                color: "inherit",
                width: 36,
                height: 36,
              }}
              size="small"
            >
              <AccountCircleIcon fontSize="small" />
            </IconButton>
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
          color: "var(--color-text)",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4, padding: 12 }}>
            {[...links,
              { href: "/login", label: "Login / Register" },
              { href: "/cart", label: "Cart" },
              { href: "/account", label: "Account" },
            ].map((l) => {
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


