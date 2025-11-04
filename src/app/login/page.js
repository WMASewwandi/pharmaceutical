"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "../../components/ThemeProvider";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get("redirect") || "/account";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      // Navigate based on redirect parameter
      router.push(redirectTo);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--color-background)",
        pt: { xs: 12, md: 14 },
        pb: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 3,
            boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "var(--color-text)",
                  mb: 1,
                  fontSize: { xs: 24, md: 28 },
                }}
              >
              Sign In
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-muted-text)",
                  fontSize: { xs: 13, md: 14 },
                }}
              >
                Sign in to your account to continue
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleLogin}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/* Email Field */}
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "var(--color-muted-text)", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "var(--color-background)",
                      "& fieldset": {
                        borderColor: "var(--color-border)",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--color-primary)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--color-primary)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--color-muted-text)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "var(--color-primary)",
                    },
                  }}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "var(--color-muted-text)", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{
                            minWidth: "auto",
                            p: 0.5,
                            color: "var(--color-muted-text)",
                            "&:hover": {
                              bgcolor: "transparent",
                              color: "var(--color-primary)",
                            },
                          }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <VisibilityIcon sx={{ fontSize: 20 }} />
                          )}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "var(--color-background)",
                      "& fieldset": {
                        borderColor: "var(--color-border)",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--color-primary)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--color-primary)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--color-muted-text)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "var(--color-primary)",
                    },
                  }}
                />

                {/* Forgot Password Link */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                  <Link
                    href="/forgot-password"
                    style={{
                      fontSize: "13px",
                      color: "var(--color-primary)",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    bgcolor: "var(--color-primary)",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: { xs: 15, md: 16 },
                    py: { xs: 1.5, md: 1.75 },
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 119, 182, 0.3)",
                    "&:hover": {
                      bgcolor: "var(--color-secondary)",
                      boxShadow: "0 6px 16px rgba(0, 119, 182, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    "&:disabled": {
                      bgcolor: "var(--color-border)",
                      color: "var(--color-muted-text)",
                    },
                    transition: "all 250ms ease",
                    mt: 2,
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Box>
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 3, borderColor: "var(--color-border)" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-muted-text)",
                  px: 2,
                  fontSize: 12,
                }}
              >
                OR
              </Typography>
            </Divider>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-muted-text)",
                  fontSize: { xs: 13, md: 14 },
                }}
              >
                Don't have an account?{" "}
                <Link
                  href={`/signup${redirectTo !== "/account" ? `?redirect=${redirectTo}` : ""}`}
                  style={{
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

