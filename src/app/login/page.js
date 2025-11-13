"use client";

import { useState, Suspense } from "react";
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
  Grid,
  Stack,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "../../components/ThemeProvider";
import { apiUrl } from "../../lib/apiConfig";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);

  const redirectTo = searchParams.get("redirect") || "/account";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Enter a valid email address to continue.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Your password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(apiUrl("ECommerce/LoginECommerceCustomer"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email.trim(),
          Password: password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          (data && (data.message || data.error || data?.Message)) ||
          "Unable to sign in. Please check your credentials and try again.";
        throw new Error(message);
      }

      const cookiePayload = {
        email: email.trim(),
        rememberMe,
        user: data,
        timestamp: Date.now(),
      };

      Cookies.set("authUser", JSON.stringify(cookiePayload), {
        expires: rememberMe ? 30 : undefined,
      });

      window.dispatchEvent(new Event("auth-changed"));

      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "You have signed in successfully.",
      });

      router.push(redirectTo);
    } catch (err) {
      const message = err?.message || "Something went wrong. Please try again.";
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Sign in failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
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
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 6, md: 8 }}
          alignItems="stretch"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: { xs: 2, md: 1 },
            }}
          >
            <Box
              sx={{
                height: "100%",
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                background: isDark
                  ? "linear-gradient(135deg, rgba(3,7,18,0.92), rgba(8,33,60,0.85))"
                  : "linear-gradient(135deg, rgba(224,244,255,0.95), rgba(235,249,255,0.8))",
                border: "1px solid rgba(0,119,182,0.18)",
                boxShadow: isDark
                  ? "0 28px 50px rgba(6,24,44,0.55)"
                  : "0 26px 50px rgba(15,23,42,0.15)",
                p: { xs: 3, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: { xs: 4, md: 6 },
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: 4,
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    mb: 2,
                    display: "block",
                  }}
                >
                  Opus Marketplace
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "var(--color-text)",
                    mb: 2,
                    fontSize: { xs: 32, md: 38 },
                    lineHeight: 1.1,
                  }}
                >
                  Designed to keep your wellness routine on track.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "var(--color-muted-text)",
                    fontSize: { xs: 14, md: 15 },
                    maxWidth: 440,
                    lineHeight: 1.7,
                  }}
                >
                  Access tailored prescriptions, refill alerts, and curated lifestyle picks all in one place. Your
                  secure dashboard remembers your preferences so you can focus on feeling your best.
                </Typography>
              </Box>

              <Stack spacing={3}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: "0 10px 22px rgba(0,119,182,0.35)",
                    }}
                  >
                    24/7
                  </Box>
                  <Typography sx={{ color: "var(--color-text)", fontWeight: 600, fontSize: 14 }}>
                    Pharmacist-backed chat and phone support round the clock for urgent assistance.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--color-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-text)",
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: "0 10px 22px rgba(15,23,42,0.15)",
                    }}
                  >
                    %
                  </Box>
                  <Typography sx={{ color: "var(--color-text)", fontWeight: 600, fontSize: 14 }}>
                    Unlock bundles, loyalty credits, and personalized offers curated for you.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "rgba(34,197,94,0.16)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgb(20,155,68)",
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    ★
                  </Box>
                  <Typography sx={{ color: "var(--color-text)", fontWeight: 600, fontSize: 14 }}>
                    Manage scripts, reorder favorites, and sync prescriptions effortlessly.
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: { xs: 1, md: 2 },
            }}
          >
        <Card
          sx={{
                borderRadius: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            border: "1px solid var(--color-border)",
                boxShadow: isDark
                  ? "0 24px 44px rgba(0,0,0,0.45)"
                  : "0 20px 44px rgba(15,23,42,0.16)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box
                  component="form"
                  onSubmit={handleLogin}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
              <Typography
                      variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "var(--color-text)",
                        mb: 0.5,
                        fontSize: { xs: 20, md: 22 },
                }}
              >
                      Sign in to continue
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-muted-text)",
                  fontSize: { xs: 13, md: 14 },
                }}
              >
                      Secure access to your prescriptions, favorites, and order history.
              </Typography>
            </Box>

                  {error && (
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Stack spacing={2}>
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

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            sx={{
                              color: "var(--color-border)",
                              "&.Mui-checked": { color: "var(--color-primary)" },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: 13, color: "var(--color-muted-text)" }}>
                            Remember me
                          </Typography>
                        }
                      />

                  <Link
                    href="/forgot-password"
                    style={{
                      fontSize: "13px",
                      color: "var(--color-primary)",
                      textDecoration: "none",
                          fontWeight: 600,
                    }}
                  >
                        Forgot password?
                  </Link>
                    </Stack>
                  </Stack>

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
                    py: { xs: 1.4, md: 1.5 },
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
                  }}
                >
                  {loading ? (
                    <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center">
                      <CircularProgress size={18} thickness={5} sx={{ color: "white" }} />
                      <span>Signing in...</span>
                    </Stack>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                  <Box sx={{ textAlign: "center", mt: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-muted-text)",
                  fontSize: { xs: 13, md: 14 },
                }}
              >
                    Don&apos;t have an account?{" "}
                <Link
                  href={`/signup${redirectTo !== "/account" ? `?redirect=${redirectTo}` : ""}`}
                  style={{
                    color: "var(--color-primary)",
                    textDecoration: "none",
                        fontWeight: 700,
                      }}
                    >
                      Create one now
                    </Link>
                  </Typography>
                  </Box>
                </Box>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
      </Container>
    </Box>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
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
        <Typography sx={{ color: "var(--color-text)" }}>Loading...</Typography>
      </Box>
    }>
      <LoginForm />
    </Suspense>
  );
}

