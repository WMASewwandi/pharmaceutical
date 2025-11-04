"use client";

import { Box, Typography } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MedicationIcon from "@mui/icons-material/Medication";
import LockIcon from "@mui/icons-material/Lock";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useTheme } from "./ThemeProvider";

const trustPoints = [
  {
    id: 1,
    icon: VerifiedUserIcon,
    title: "Certified Pharmacists",
    description: "Expert guidance from licensed professionals",
    color: "#0077B6",
  },
  {
    id: 2,
    icon: LocalShippingIcon,
    title: "Fast & Safe Delivery",
    description: "Secure packaging & timely doorstep delivery",
    color: "#00B4D8",
  },
  {
    id: 3,
    icon: MedicationIcon,
    title: "100% Genuine Medicines",
    description: "Authentic products directly from manufacturers",
    color: "#90E0EF",
  },
  {
    id: 4,
    icon: LockIcon,
    title: "Secure Payments",
    description: "Safe & encrypted payment transactions",
    color: "#0077B6",
  },
  {
    id: 5,
    icon: MedicalServicesIcon,
    title: "Licensed Pharmacy",
    description: "Fully licensed & regulated pharmacy service",
    color: "#00B4D8",
  },
];

export default function WhyChooseUs() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
        maxWidth: '85vw',
        margin: "0 auto",
        background: "var(--color-background)",
        width: "100%",
      }}
    >
      <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: "left" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: "var(--color-text)",
            mb: 0.5,
          }}
        >
          Why Choose Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--color-primary)",
            fontWeight: 500,
            fontSize: { xs: 14, md: 16 },
          }}
        >
          Trusted Healthcare Partner
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        {trustPoints.map((point) => {
          const IconComponent = point.icon;
          return (
            <Box
              key={point.id}
              sx={{
                flex: { xs: "0 0 calc(50% - 8px)", sm: "0 0 calc(33.333% - 13.33px)", md: "0 0 calc(20% - 12px)" },
                minWidth: { xs: "calc(50% - 8px)", sm: "calc(33.333% - 13.33px)", md: "calc(20% - 12px)" },
                maxWidth: { xs: "calc(50% - 8px)", sm: "calc(33.333% - 13.33px)", md: "calc(20% - 12px)" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${point.color}, ${point.color}dd)`,
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 250ms ease",
                },
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: isDark
                    ? "0 8px 24px rgba(0, 119, 182, 0.3)"
                    : "0 8px 24px rgba(0, 119, 182, 0.12)",
                  borderColor: point.color,
                  "&::before": {
                    transform: "scaleX(1)",
                  },
                  "& .trust-icon": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
              }}
            >
              <Box
                className="trust-icon"
                sx={{
                  width: { xs: 56, md: 64 },
                  height: { xs: 56, md: 64 },
                  borderRadius: "50%",
                  background: isDark
                    ? `linear-gradient(135deg, ${point.color}35, ${point.color}18)`
                    : `linear-gradient(135deg, ${point.color}20, ${point.color}08)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: { xs: 1.5, md: 2 },
                  border: `2px solid ${point.color}40`,
                  transition: "transform 250ms ease",
                }}
              >
                <IconComponent
                  sx={{
                    fontSize: { xs: 28, md: 32 },
                    color: point.color,
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: "var(--color-text)",
                  fontSize: { xs: 14, md: 16 },
                  mb: 0.5,
                  lineHeight: 1.3,
                }}
              >
                {point.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-muted-text)",
                  fontSize: { xs: 12, md: 13 },
                  lineHeight: 1.5,
                }}
              >
                {point.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

