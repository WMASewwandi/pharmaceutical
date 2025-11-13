"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Divider,
  Checkbox,
  FormControlLabel,
  Stack,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "../../components/ThemeProvider";
import { apiUrl } from "../../lib/apiConfig";
import Swal from "sweetalert2";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const redirectTo = searchParams.get("redirect") || "/account";

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please confirm your password.");
      return;
    }

    const payload = {
      FirstName: formData.firstName.trim(),
      LastName: formData.lastName.trim(),
      Email: formData.email.trim(),
      MobileNumber: formData.phone.trim(),
      Password: formData.password,
      WarehouseId: 1,
    };

    setLoading(true);

    try {
      const response = await fetch(apiUrl("ECommerce/CreateECommerceCustomer"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          (data && (data.message || data.error || data?.Message)) ||
          "We could not create your account. Please try again.";
        throw new Error(message);
      }

      Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Your account has been created successfully. You can sign in now.",
      });

      router.push(`/login${redirectTo !== "/account" ? `?redirect=${redirectTo}` : ""}`);
    } catch (err) {
      const message = err?.message || "Something went wrong. Please try again.";
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Sign up failed",
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
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
            <Box
              sx={{
                height: "100%",
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                background: isDark
                  ? "linear-gradient(135deg, rgba(3,7,18,0.92), rgba(8,33,60,0.85))"
                  : "linear-gradient(135deg, rgba(223,246,255,0.95), rgba(216,237,255,0.85))",
                border: "1px solid rgba(0,119,182,0.18)",
                boxShadow: isDark
                  ? "0 28px 50px rgba(6,24,44,0.55)"
                  : "0 26px 50px rgba(15,23,42,0.15)",
                p: { xs: 3, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: { xs: 3, md: 4 },
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: 4,
                  color: "var(--color-primary)",
                  fontWeight: 700,
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
                  fontSize: { xs: 30, md: 36 },
                  lineHeight: 1.15,
                }}
              >
                Join a smarter way to manage your health essentials.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "var(--color-muted-text)",
                  fontSize: { xs: 14, md: 15 },
                  maxWidth: 500,
                  lineHeight: 1.7,
                }}
              >
                Build secure profiles for your family, track prescriptions in real time, and discover curated wellness
                picks tailored to your lifestyle the moment you sign up.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
            <Card
              sx={{
                borderRadius: 4,
                border: "1px solid var(--color-border)",
                boxShadow: isDark ? "0 24px 44px rgba(0,0,0,0.45)" : "0 20px 44px rgba(15,23,42,0.16)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "var(--color-text)",
                      mb: 0.5,
                      fontSize: { xs: 20, md: 22 },
                    }}
                  >
                    Create your account
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--color-muted-text)",
                      fontSize: { xs: 13, md: 14 },
                    }}
                  >
                    Set up your secure profile to manage prescriptions and wellness plans.
                  </Typography>
                </Box>

                <Box
                  component="form"
                  onSubmit={handleSignup}
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  {error && (
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "var(--color-muted-text)", fontSize: 20 }} />
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
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "var(--color-muted-text)", fontSize: 20 }} />
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
                  </Stack>

                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange("email")}
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
                    type="tel"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: "var(--color-muted-text)", fontSize: 20 }} />
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
                    value={formData.password}
                    onChange={handleChange("password")}
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
                            {showPassword ? <VisibilityOffIcon sx={{ fontSize: 20 }} /> : <VisibilityIcon sx={{ fontSize: 20 }} />}
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

                  <TextField
                    fullWidth
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
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
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                            {showConfirmPassword ? (
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

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        required
                        sx={{
                          color: "var(--color-primary)",
                          "&.Mui-checked": {
                            color: "var(--color-primary)",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: { xs: 12, md: 13 },
                          color: "var(--color-muted-text)",
                        }}
                      >
                        I agree to the{" "}
                        <Link href="/terms-conditions" style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-policy" style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                    sx={{ mt: 1 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading || !acceptTerms}
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
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </Box>

                <Divider sx={{ my: 3, borderColor: "var(--color-border)" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--color-muted-text)",
                      px: 1.5,
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: 1.2,
                    }}
                  >
                    already a member?
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--color-muted-text)",
                      fontSize: { xs: 13, md: 14 },
                    }}
                  >
                    Already have an account?{" "}
                    <Link
                      href={`/login${redirectTo !== "/account" ? `?redirect=${redirectTo}` : ""}`}
                      style={{
                        color: "var(--color-primary)",
                        textDecoration: "none",
                        fontWeight: 700,
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function SignupPage() {
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
      <SignupForm />
    </Suspense>
  );
}

