"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "../../components/ThemeProvider";

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: "Phone",
      content: "+94 11 234 5678",
      link: "tel:+94112345678",
      color: "#0077B6",
    },
    {
      icon: EmailIcon,
      title: "Email",
      content: "help@pharmacia.com",
      link: "mailto:help@pharmacia.com",
      color: "#10B981",
    },
    {
      icon: LocationOnIcon,
      title: "Address",
      content: "123 Healthcare Street, Colombo 05, Sri Lanka",
      link: null,
      color: "#EF4444",
    },
    {
      icon: AccessTimeIcon,
      title: "Business Hours",
      content: "Mon - Sat: 8:00 AM - 8:00 PM\nSun: 10:00 AM - 6:00 PM",
      link: null,
      color: "#8B5CF6",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--color-background)",
        pt: { xs: 12, md: 14 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "var(--color-text)",
              mb: 2,
              fontSize: { xs: 28, md: 40 },
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "var(--color-muted-text)",
              fontSize: { xs: 14, md: 16 },
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Have a question or need assistance? We're here to help! Reach out to us through any of the channels below.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {/* Left Column - Contact Form */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 calc(58.333% - 16px)" },
              minWidth: { xs: "100%", md: "calc(58.333% - 16px)" },
            }}
          >
            <Card
              sx={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: "var(--color-primary)15",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SendIcon sx={{ fontSize: 24, color: "var(--color-primary)" }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      fontSize: { xs: 20, md: 24 },
                    }}
                  >
                    Send us a Message
                  </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      value={formData.name}
                      onChange={handleChange("name")}
                      required
                      placeholder="Enter your full name"
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
                    <Box sx={{ display: "flex", gap: 2 }}>
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
                        placeholder="Optional"
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
                    </Box>
                    <TextField
                      fullWidth
                      label="Subject"
                      value={formData.subject}
                      onChange={handleChange("subject")}
                      required
                      placeholder="What is this regarding?"
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
                      label="Message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange("message")}
                      required
                      placeholder="Tell us how we can help you..."
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
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      startIcon={<SendIcon />}
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
                        mt: 1,
                      }}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Contact Information */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 calc(41.666% - 16px)" },
              minWidth: { xs: "100%", md: "calc(41.666% - 16px)" },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = info.content.split("\n");
                return (
                  <Card
                    key={index}
                    component={info.link ? "a" : Box}
                    href={info.link || undefined}
                    sx={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 3,
                      boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 250ms ease",
                      textDecoration: "none",
                      cursor: info.link ? "pointer" : "default",
                      "&:hover": info.link
                        ? {
                            transform: "translateY(-4px)",
                            boxShadow: isDark
                              ? "0 8px 24px rgba(0, 119, 182, 0.3)"
                              : "0 8px 24px rgba(0, 119, 182, 0.12)",
                            borderColor: info.color,
                          }
                        : {},
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            background: `${info.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 200ms ease",
                          }}
                        >
                          <IconComponent sx={{ fontSize: 28, color: info.color }} />
                        </Box>
                        <Box sx={{ flexGrow: 1, pt: 0.5 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: "var(--color-text)",
                              mb: 1,
                              fontSize: { xs: 16, md: 18 },
                            }}
                          >
                            {info.title}
                          </Typography>
                          {content.map((line, idx) => (
                            <Typography
                              key={idx}
                              variant="body2"
                              sx={{
                                color: info.link ? "var(--color-primary)" : "var(--color-muted-text)",
                                fontSize: { xs: 13, md: 14 },
                                lineHeight: 1.7,
                                fontWeight: info.link ? 500 : 400,
                              }}
                            >
                              {line}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

