"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Box, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const cartCount = 0;
  const helpline = "(+94) 077 377 1726";
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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const ctaLinks = [
    { href: "/orders-tracking", label: "Orders Tracking" },
  ];

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: "var(--color-background)",
      borderBottom: "1px solid var(--color-border)",
      boxShadow: shouldShowBackground ? "var(--shadow-sm)" : "none",
      backdropFilter: shouldShowBackground ? "saturate(180%) blur(6px)" : "none",
      transition: "background 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
    }}>
      {/* Top helpline & social bar */}
      <Box
        sx={{
        background: "var(--color-surface)",
          color: "var(--color-text-muted, var(--color-text))",
        borderBottom: "1px solid var(--color-border)",
        fontSize: 12,
        }}
      >
        <Box
          sx={{
            maxWidth: '85vw',
          margin: "0 auto",
            px: { xs: 2, md: 4 },
            py: 0.5,
          display: "flex",
          alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, whiteSpace: "nowrap" }}>
            <PhoneEnabledIcon sx={{ fontSize: 16 }} />
            <a
              href={`tel:${helpline.replace(/[^+\d]/g, "")}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Customer care {helpline}
            </a>
          </Box>
        </Box>
      </Box>

      {/* Main header */}
      <Box
        sx={{
          background: "var(--color-background)",
          color: "var(--color-text)",
        }}
      >
        <Box
          sx={{
            maxWidth: '85vw',
        margin: "0 auto",
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 3 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
            flexWrap: "wrap",
            gap: { xs: 2, md: 4 },
          }}
        >
          <Link 
            href="/" 
            style={{ textDecoration: "none", color: "inherit", flexShrink: 0 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component="img"
                src="/images/logo.png"
                alt="Opus Marketplace logo"
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <Box sx={{ lineHeight: 1.1 }}>
                <Typography component="span" sx={{ fontWeight: 700, fontSize: 20 }}>
                  Opus Marketplace
                </Typography>
                <Typography component="span" sx={{ display: "block", fontSize: 13, color: "var(--color-text-muted, #725f3a)" }}>
                  Lifestyle & tech essentials online
                </Typography>
                <Typography component="span" sx={{ display: "block", fontSize: 11, color: "var(--color-text-muted, #8f8f8f)", mt: 0.5 }}>
                  Since 2025
                </Typography>
              </Box>
            </Box>
          </Link>

          <Box
                    sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              order: { xs: 2, md: 2 },
            }}
          >
            {!isMobile && <ThemeToggle />}

            <IconButton
              component={Link}
              href="/account"
              aria-label="Account"
              sx={{
                border: "1px solid var(--color-border)",
                color: "inherit",
                width: 38,
                height: 38,
              }}
              size="small"
            >
              <AccountCircleIcon fontSize="small" />
            </IconButton>

            <IconButton
              component={Link}
              href="/cart"
              aria-label="Cart"
              sx={{
                border: "1px solid var(--color-border)",
                color: "inherit",
                width: 38,
                height: 38,
              }}
              size="small"
            >
              <Badge badgeContent={cartCount} color="primary" showZero>
                <ShoppingBagIcon fontSize="small" />
              </Badge>
            </IconButton>

            {isMobile && (
            <IconButton
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              sx={{
                border: "1px solid var(--color-border)",
                color: "inherit",
                  width: 38,
                  height: 38,
              }}
              size="small"
            >
                {menuOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
            </IconButton>
          )}
          </Box>
        </Box>
      </Box>

      {/* Navigation row */}
      <Box
        sx={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          display: isMobile ? "none" : "block",
        }}
      >
        <Box
          sx={{
            maxWidth: '85vw',
            margin: "0 auto",
            px: { xs: 2, md: 4 },
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box component="nav" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) => {
              const isActive = pathname === (link.match ?? link.href);
              return (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  disableRipple
                  sx={{
                    position: "relative",
                    color: isActive ? "var(--color-primary)" : "inherit",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: 15,
                    px: 1,
                    '&::after': {
                      content: '""',
                      position: "absolute",
                      left: 8,
                      right: 8,
                      bottom: 4,
                      height: 2,
                      borderRadius: 999,
                      background: "var(--color-primary)",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scaleX(1)" : "scaleX(0.5)",
                      transition: "opacity 200ms ease, transform 200ms ease",
                    },
                    '&:hover': {
                      color: "var(--color-primary)",
                      '&::after': { opacity: 1, transform: "scaleX(1)" },
                    },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {ctaLinks.map((cta) => (
              <Button
                key={cta.href}
                component={Link}
                href={cta.href}
                sx={{
                  background: "var(--color-primary)",
                  color: "var(--color-primary-contrast)",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: "0 10px 20px rgba(0, 119, 182, 0.24)",
                  border: "1px solid transparent",
                  '&:hover': {
                    background: "var(--color-secondary)",
                    boxShadow: "0 12px 24px rgba(0, 180, 216, 0.28)",
                  },
                }}
              >
                {cta.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {isMobile && menuOpen && (
        <Box
          sx={{
          position: "absolute",
          top: "100%",
            left: 0,
            right: 0,
          background: "var(--color-background)",
            borderTop: "1px solid var(--color-border)",
            boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
          zIndex: 60,
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === (link.match ?? link.href);
              return (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    justifyContent: "flex-start",
                    color: isActive ? "var(--color-primary)" : "inherit",
                    textTransform: "none",
                    fontSize: 16,
                    py: 1.25,
                  }}
                >
                  {link.label}
                </Button>
              );
            })}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
              {ctaLinks.map((cta) => (
                <Button
                  key={cta.href}
                  component={Link}
                  href={cta.href}
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    background: "var(--color-primary)",
                    color: "var(--color-primary-contrast)",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 1.5,
                    py: 1.25,
                    boxShadow: "0 10px 20px rgba(0, 119, 182, 0.24)",
                    border: "1px solid transparent",
                    '&:hover': {
                      background: "var(--color-secondary)",
                    },
                  }}
                >
                  {cta.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <ThemeToggle />
            </Box>
          </Box>
        </Box>
      )}
    </header>
  );
}


