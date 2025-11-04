"use client";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "../../components/ThemeProvider";

export default function AboutUsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const values = [
    {
      icon: VerifiedUserIcon,
      title: "Genuine Medicines",
      description: "We guarantee 100% authentic pharmaceutical products sourced directly from licensed manufacturers.",
    },
    {
      icon: LocalShippingIcon,
      title: "Fast & Safe Delivery",
      description: "Secure packaging and timely delivery to ensure your medications reach you in perfect condition.",
    },
    {
      icon: SupportAgentIcon,
      title: "Expert Support",
      description: "Our licensed pharmacists are available to answer your questions and provide professional guidance.",
    },
    {
      icon: LocalPharmacyIcon,
      title: "Licensed Pharmacy",
      description: "Fully licensed and regulated by the National Medicines Regulatory Authority (NMRA).",
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
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "var(--color-text)",
              mb: 2,
              fontSize: { xs: 28, md: 40 },
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "var(--color-muted-text)",
              fontSize: { xs: 14, md: 16 },
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Pharmacia is your trusted online pharmacy, committed to providing genuine medicines, wellness products, and healthcare essentials delivered safely to your door.
          </Typography>
        </Box>

        {/* Statistics Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: { xs: 5, md: 6 },
          }}
        >
          {[
            { icon: GroupsIcon, value: "50K+", label: "Happy Customers", color: "#0077B6" },
            { icon: LocalPharmacyIcon, value: "10K+", label: "Products Available", color: "#10B981" },
            { icon: TrendingUpIcon, value: "98%", label: "Customer Satisfaction", color: "#F59E0B" },
            { icon: StarIcon, value: "4.9/5", label: "Average Rating", color: "#EF4444" },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Box
                key={index}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 18px)" },
                  minWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(25% - 18px)" },
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 3,
                    boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 250ms ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: isDark
                        ? "0 8px 24px rgba(0, 119, 182, 0.3)"
                        : "0 8px 24px rgba(0, 119, 182, 0.12)",
                      borderColor: stat.color,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2.5, md: 3 }, textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        background: `${stat.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 32, color: stat.color }} />
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: stat.color,
                        mb: 1,
                        fontSize: { xs: 24, md: 32 },
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--color-muted-text)",
                        fontSize: { xs: 13, md: 14 },
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>

        {/* Mission & Vision Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: { xs: 5, md: 6 },
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },
              minWidth: { xs: "100%", md: "calc(50% - 12px)" },
            }}
          >
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(135deg, var(--color-primary)15 0%, var(--color-surface) 100%)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 }, position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: "var(--color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 24, color: "white" }}>🎯</Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      fontSize: { xs: 20, md: 24 },
                    }}
                  >
                    Our Mission
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "var(--color-muted-text)",
                    fontSize: { xs: 14, md: 16 },
                    lineHeight: 1.8,
                  }}
                >
                  At Pharmacia, our mission is to make healthcare accessible, affordable, and convenient for everyone. We believe that quality healthcare shouldn't be a luxury, and we're dedicated to providing genuine pharmaceutical products at competitive prices, backed by expert advice and exceptional customer service.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },
              minWidth: { xs: "100%", md: "calc(50% - 12px)" },
            }}
          >
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(135deg, var(--color-secondary)15 0%, var(--color-surface) 100%)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 }, position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: "var(--color-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 24, color: "white" }}>👁️</Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      fontSize: { xs: 20, md: 24 },
                    }}
                  >
                    Our Vision
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "var(--color-muted-text)",
                    fontSize: { xs: 14, md: 16 },
                    lineHeight: 1.8,
                  }}
                >
                  To become the most trusted and preferred online pharmacy in Sri Lanka, known for our commitment to quality, customer satisfaction, and innovation in healthcare delivery. We envision a future where everyone has easy access to genuine medicines and reliable health information.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Core Values */}
        <Box sx={{ mb: { xs: 5, md: 6 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "var(--color-text)",
              mb: 3,
              textAlign: "center",
              fontSize: { xs: 20, md: 24 },
            }}
          >
            Our Core Values
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Box
                  key={index}
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 18px)" },
                    minWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(25% - 18px)" },
                    display: "flex",
                  }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      minHeight: { xs: 220, md: 240 },
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 3,
                      boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 250ms ease",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: isDark
                          ? "0 8px 24px rgba(0, 119, 182, 0.3)"
                          : "0 8px 24px rgba(0, 119, 182, 0.12)",
                        borderColor: "var(--color-primary)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, md: 3 }, textAlign: "center", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          background: "var(--color-primary)15",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                          flexShrink: 0,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 32, color: "var(--color-primary)" }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "var(--color-text)",
                          mb: 1.5,
                          fontSize: { xs: 16, md: 18 },
                          flexShrink: 0,
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--color-muted-text)",
                          fontSize: { xs: 13, md: 14 },
                          lineHeight: 1.6,
                          flexGrow: 1,
                        }}
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Why Choose Us */}
        <Box>
          <Card
            sx={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 3,
              boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "var(--color-text)",
                  mb: 3,
                  fontSize: { xs: 20, md: 24 },
                  textAlign: "center",
                }}
              >
                Why Choose Pharmacia?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                }}
              >
                {[
                  {
                    title: "Licensed & Regulated",
                    description: "We are fully licensed by the National Medicines Regulatory Authority (NMRA) and comply with all pharmaceutical regulations.",
                    icon: "✓",
                  },
                  {
                    title: "Expert Pharmacists",
                    description: "Our team of licensed pharmacists is available to provide professional guidance and answer your medication questions.",
                    icon: "✓",
                  },
                  {
                    title: "100% Genuine Products",
                    description: "All our medicines are sourced directly from authorized manufacturers and distributors, ensuring authenticity and quality.",
                    icon: "✓",
                  },
                  {
                    title: "Convenient & Secure",
                    description: "Shop from the comfort of your home with secure payment options and reliable delivery services across Sri Lanka.",
                    icon: "✓",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },
                      minWidth: { xs: "100%", md: "calc(50% - 12px)" },
                    }}
                  >
                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                        border: "1px solid var(--color-border)",
                        transition: "all 200ms ease",
                        "&:hover": {
                          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                          borderColor: "var(--color-primary)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "var(--color-primary)15",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: "var(--color-primary)",
                            fontWeight: 700,
                            fontSize: 20,
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: "var(--color-text)",
                              mb: 1,
                              fontSize: { xs: 16, md: 18 },
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "var(--color-muted-text)",
                              fontSize: { xs: 13, md: 14 },
                              lineHeight: 1.7,
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

