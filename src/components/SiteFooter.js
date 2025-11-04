"use client";

import Link from "next/link";
import { Box, Typography, Container, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTheme } from "./ThemeProvider";

export default function SiteFooter() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
    customer: [
      { href: "/faqs", label: "FAQs" },
      { href: "/returns-refunds", label: "Returns & Refunds" },
      { href: "/shipping", label: "Shipping Info" },
      { href: "/track-order", label: "Track Order" },
    ],
    legal: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-conditions", label: "Terms & Conditions" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  };

  const socialLinks = [
    { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
    { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
    { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: YouTubeIcon, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-text)",
        marginTop: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Company Info & Logo */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                color: "var(--color-text)",
                mb: 2,
                fontSize: { xs: 20, md: 24 },
              }}
            >
              Pharmacia
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-muted-text)",
                mb: 2,
                lineHeight: 1.7,
                fontSize: { xs: 13, md: 14 },
              }}
            >
              Your trusted online pharmacy providing genuine medicines, wellness products, and healthcare essentials delivered safely to your door.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Box
                    key={social.label}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text)",
                      transition: "all 250ms ease",
                      "&:hover": {
                        background: "var(--color-primary)",
                        borderColor: "var(--color-primary)",
                        color: "white",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <IconComponent sx={{ fontSize: 18 }} />
                  </Box>
                );
              })}
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: "var(--color-text)",
                mb: 2,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="navLink"
                  style={{
                    fontSize: "13px",
                    color: "var(--color-muted-text)",
                    transition: "color 200ms ease",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: "var(--color-text)",
                mb: 2,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Customer Service
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.customer.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="navLink"
                  style={{
                    fontSize: "13px",
                    color: "var(--color-muted-text)",
                    transition: "color 200ms ease",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Legal & Policies */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: "var(--color-text)",
                mb: 2,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Legal
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="navLink"
                  style={{
                    fontSize: "13px",
                    color: "var(--color-muted-text)",
                    transition: "color 200ms ease",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: "var(--color-text)",
                mb: 2,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 16, color: "var(--color-primary)", mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "var(--color-muted-text)",
                      lineHeight: 1.5,
                    }}
                  >
                    <a href="tel:+94112345678" style={{ color: "inherit", textDecoration: "none" }}>
                      +94 11 234 5678
                    </a>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <EmailIcon sx={{ fontSize: 16, color: "var(--color-primary)", mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "var(--color-muted-text)",
                      lineHeight: 1.5,
                    }}
                  >
                    <a href="mailto:help@pharmacia.com" style={{ color: "inherit", textDecoration: "none" }}>
                      help@pharmacia.com
                    </a>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: 16, color: "var(--color-primary)", mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "var(--color-muted-text)",
                      lineHeight: 1.5,
                    }}
                  >
                    123 Healthcare Street,<br />
                    Colombo 05, Sri Lanka
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Regulatory Info */}
        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            pt: { xs: 3, md: 4 },
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: { xs: 2, md: 0 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "var(--color-muted-text)",
                  mb: 1,
                }}
              >
                © {currentYear} Pharmacia. All rights reserved.
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "var(--color-muted-text)",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                License & Regulatory Information
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "var(--color-muted-text)",
                  lineHeight: 1.6,
                }}
              >
                Licensed Pharmacy: SL/PH/2024/001<br />
                Registration No: SL-REG-2024-12345<br />
                Regulated by: National Medicines Regulatory Authority (NMRA)
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 2, md: 3 }, mt: { xs: 2, md: 0 } }}>
              <Link
                href="/privacy-policy"
                style={{
                  fontSize: "12px",
                  color: "var(--color-muted-text)",
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                style={{
                  fontSize: "12px",
                  color: "var(--color-muted-text)",
                  textDecoration: "none",
                }}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/license"
                style={{
                  fontSize: "12px",
                  color: "var(--color-muted-text)",
                  textDecoration: "none",
                }}
              >
                View License
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}
