"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  Box,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Menu,
  MenuItem,
  Divider as MuiDivider,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import { useEffect, useState, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function SiteHeader() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();
  const helpline = "(+94) 077 377 1726";
  const isHomePage = pathname === "/";
  const shouldShowBackground = scrolled || !isHomePage;
  const [authUser, setAuthUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const readAuthCookie = useCallback(() => {
    try {
      const raw = Cookies.get("authUser");
      if (!raw) {
        setAuthUser(null);
        return;
      }
      const parsed = JSON.parse(raw);
      setAuthUser(parsed);
    } catch (error) {
      setAuthUser(null);
      Cookies.remove("authUser");
    }
  }, []);

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

  useEffect(() => {
    readAuthCookie();
    window.addEventListener("auth-changed", readAuthCookie);
    return () => window.removeEventListener("auth-changed", readAuthCookie);
  }, [readAuthCookie]);

  const isAuthenticated = Boolean(authUser);
  const userDetails = authUser?.user;
  const displayName =
    (userDetails?.fullName ?? userDetails?.FullName) ||
    (userDetails?.firstName && userDetails?.lastName
      ? `${userDetails.firstName} ${userDetails.lastName}`
      : userDetails?.firstName ||
        userDetails?.FirstName ||
        (authUser?.email ?? "My Account"));

  const accountHref = isAuthenticated ? "/account" : "/login";
  const checkoutHref = isAuthenticated ? "/checkout" : "/login?redirect=/checkout";

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Sign out?",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Log out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "var(--color-primary)",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("authUser");
        window.dispatchEvent(new Event("auth-changed"));
        Swal.fire({
          icon: "success",
          title: "Signed out",
          text: "You have been logged out successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/login");
      }
    });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/categories", label: "CATEGORIES" },
    { href: "/deals", label: "DEALS" },
    { href: "/new-arrivals", label: "NEW ARRIVALS" },
    { href: "/best-sellers", label: "BEST SELLERS" },
    { href: "/about", label: "ABOUT US" },
    { href: "/contact", label: "CONTACT US" },
  ];

  const ctaLinks = [
    { href: accountHref, label: isAuthenticated ? "My Account" : "Sign In" },
    { href: "/cart", label: "View Cart" },
    { href: checkoutHref, label: "Checkout" },
  ];

  return (
    <>
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
      {/* Main header */}
      <Box
        sx={{
          background: "var(--color-background)",
          color: "var(--color-text)",
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            margin: "0 auto",
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: { xs: "nowrap", md: "wrap" },
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <Link 
            href="/" 
            style={{ textDecoration: "none", color: "inherit", flexShrink: 0 }}
          >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 0, md: 2 },
                  }}
                >
              <Box
                component="img"
                src="/images/logo.png"
                alt="Opus Marketplace logo"
                sx={{
                      width: { xs: 56, md: 80 },
                      height: { xs: 56, md: 80 },
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
                  <Box sx={{ lineHeight: 1.1, display: { xs: "none", md: "block" } }}>
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
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              alignItems: { xs: "center", md: "flex-end" },
              justifyContent: { xs: "space-between", md: "flex-start" },
              gap: { xs: 0, md: 2 },
              order: { xs: 2, md: 2 },
              alignSelf: { xs: "center", md: "auto" },
              width: { xs: "auto", md: "auto" },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1.5,
              }}
            >
              {isAuthenticated && (
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted-text)" }}>
                  {displayName}
                </Typography>
              )}
              {isAuthenticated ? (
                <IconButton
                  aria-label="Account menu"
                  onClick={handleMenuOpen}
                  sx={{
                    color: "inherit",
                    width: 38,
                    height: 38,
                  }}
                  size="small"
                >
                  <AccountCircleOutlinedIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton
                  component={Link}
                  href={accountHref}
                  aria-label="Account"
                  sx={{
                    color: "inherit",
                    width: 38,
                    height: 38,
                  }}
                  size="small"
                >
                  <AccountCircleOutlinedIcon fontSize="small" />
                </IconButton>
              )}
              <Menu
                anchorEl={anchorEl}
                open={isAuthenticated && Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem component={Link} href="/account" onClick={handleMenuClose}>
                  My Account
                </MenuItem>
                <MuiDivider />
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>

              <IconButton
                component={Link}
                href={isAuthenticated ? "/cart" : "/login?redirect=/cart"}
                aria-label="Cart"
                sx={{
                  color: "inherit",
                  width: 38,
                  height: 38,
                }}
                size="small"
              >
                <Badge
                  badgeContent={cartCount}
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'var(--color-text)',
                      color: 'var(--color-primary-contrast)',
                    },
                  }}
                  showZero
                >
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Box>

            <IconButton
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              sx={{
                color: "inherit",
                width: 38,
                height: 38,
                marginLeft: "auto",
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                justifyContent: "center",
              }}
              size="small"
            >
              {menuOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
            </IconButton>

            <Box
              component="nav"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
            gap: 1.5,
              }}
            >
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
          {!isAuthenticated && (
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ ml: 2 }}>
              <Button
                component={Link}
                href={accountHref}
                variant="contained"
                sx={{
                  bgcolor: "var(--color-primary)",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 13,
                  px: 2.5,
                  '&:hover': {
                    bgcolor: "var(--color-secondary)",
                  },
                }}
              >
                Sign In
              </Button>
            </Stack>
          )}
            </Box>
          </Box>
        </Box>
      </Box>


      <Drawer
        anchor="left"
        open={isMobile && menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            width: "80vw",
            maxWidth: 320,
            background: "var(--color-background)",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Menu</Typography>
          <IconButton
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <List>
          {navLinks.map((link) => {
            const isActive = pathname === (link.match ?? link.href);
            return (
              <ListItemButton
                key={link.href}
                component={Link}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                sx={{
                  color: isActive ? "var(--color-primary)" : "inherit",
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            );
          })}

          {ctaLinks.map((cta) => (
            <ListItemButton
              key={cta.href}
              component={Link}
              href={cta.href}
              onClick={() => setMenuOpen(false)}
            >
              <ListItemText
                primary={cta.label}
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-primary)",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

    </header>

    {isMobile && (
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          py: 1,
          px: 2,
          zIndex: 120,
        }}
      >
        <IconButton component={Link} href="/" aria-label="Home" sx={{ color: "inherit" }}>
          <HomeOutlinedIcon />
        </IconButton>
        <IconButton component={Link} href="/shop" aria-label="Shop" sx={{ color: "inherit" }}>
          <StorefrontOutlinedIcon />
        </IconButton>
        <IconButton component={Link} href="/search" aria-label="Search" sx={{ color: "inherit" }}>
          <SearchOutlinedIcon />
        </IconButton>
        <IconButton component={Link} href="/cart" aria-label="Cart" sx={{ color: "inherit" }}>
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <IconButton component={Link} href={accountHref} aria-label="Account" sx={{ color: "inherit" }}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    )}
    </>
  );
}


