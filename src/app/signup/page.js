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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "../../components/ThemeProvider";

export default function SignupPage() {
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

  const redirectTo = searchParams.get("redirect") || "/account";

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signup process
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
                Create Account
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-muted-text)",
                  fontSize: { xs: 13, md: 14 },
                }}
              >
                Sign up to get started with your pharmacy needs
              </Typography>
            </Box>

            {/* Signup Form */}
            <Box component="form" onSubmit={handleSignup}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/* Name Fields */}
                <Box sx={{ display: "flex", gap: 2 }}>
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
                </Box>

                {/* Email Field */}
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

                {/* Phone Field */}
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

                {/* Password Field */}
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

                {/* Confirm Password Field */}
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

                {/* Terms Checkbox */}
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

                {/* Sign Up Button */}
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
                  {loading ? "Creating Account..." : "Create Account"}
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

            {/* Login Link */}
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
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

