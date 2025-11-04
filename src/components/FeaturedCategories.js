"use client";

import Link from "next/link";
import { Box, Card, CardContent, Typography } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useTheme } from "./ThemeProvider";

const categories = [
  {
    href: "/categories/herbal-ayurvedic",
    label: "Herbal & Ayurvedic",
    icon: SpaIcon,
    color: "#00B4D8",
  },
  {
    href: "/categories/personal-care",
    label: "Personal Care",
    icon: FavoriteIcon,
    color: "#90E0EF",
  },
  {
    href: "/categories/baby-care",
    label: "Baby Care",
    icon: ChildCareIcon,
    color: "#0077B6",
  },
  {
    href: "/categories/vitamins-supplements",
    label: "Vitamins & Supplements",
    icon: FitnessCenterIcon,
    color: "#00B4D8",
  },
  {
    href: "/categories/health-devices",
    label: "Health Devices",
    icon: MedicalServicesIcon,
    color: "#90E0EF",
  },
];

export default function FeaturedCategories() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
        maxWidth: "85vw",
        margin: "0 auto",
        background: "var(--color-background)",
        width: "100%",
      }}
    >
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: "var(--color-text)",
            mb: 0.5,
          }}
        >
          Featured Categories
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--color-primary)",
            fontWeight: 500,
            fontSize: { xs: 14, md: 16 },
          }}
        >
          Quick Shop by Category
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: { xs: 2, md: 3 },
          justifyContent: "center",
        }}
      >
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Box
              key={category.href}
              sx={{
                flex: { xs: "0 0 calc(50% - 8px)", sm: "0 0 calc(33.333% - 13.33px)", md: "0 0 calc(20% - 12px)" },
                minWidth: { xs: "calc(50% - 8px)", sm: "calc(33.333% - 13.33px)", md: "calc(20% - 12px)" },
                maxWidth: { xs: "calc(50% - 8px)", sm: "calc(33.333% - 13.33px)", md: "calc(20% - 12px)" },
              }}
            >
              <Link href={category.href} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    height: { xs: 140, md: 160 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: { xs: 2, md: 3 },
                    cursor: "pointer",
                    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 3,
                    boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.04)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${category.color}, ${category.color}dd)`,
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 250ms ease",
                    },
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: isDark 
                        ? "0 12px 32px rgba(0, 119, 182, 0.5)" 
                        : "0 12px 32px rgba(0, 119, 182, 0.16)",
                      borderColor: category.color,
                      "&::before": {
                        transform: "scaleX(1)",
                      },
                      "& .category-icon": {
                        transform: "scale(1.1) rotate(5deg)",
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: { xs: 1.5, md: 2 },
                      p: "0 !important",
                      "&:last-child": { pb: "0 !important" },
                      width: "100%",
                    }}
                  >
                    <Box
                      className="category-icon"
                      sx={{
                        width: { xs: 56, md: 64 },
                        height: { xs: 56, md: 64 },
                        borderRadius: "50%",
                        background: isDark
                          ? `linear-gradient(135deg, ${category.color}35, ${category.color}18)`
                          : `linear-gradient(135deg, ${category.color}20, ${category.color}08)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 250ms ease",
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: { xs: 28, md: 32 },
                          color: category.color,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        color: "var(--color-text)",
                        fontSize: { xs: 12, sm: 13, md: 14 },
                        lineHeight: 1.4,
                      }}
                    >
                      {category.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

