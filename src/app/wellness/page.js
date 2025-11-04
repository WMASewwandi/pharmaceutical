"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "../../components/ThemeProvider";

export default function HealthWellnessPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const categories = [
    {
      icon: LocalHospitalIcon,
      title: "Preventive Care",
      description: "Learn about preventive measures and health screenings to maintain optimal wellness.",
      color: "#0077B6",
      link: "/wellness/preventive-care",
    },
    {
      icon: FavoriteIcon,
      title: "Heart Health",
      description: "Guidance on maintaining cardiovascular health through diet, exercise, and medication.",
      color: "#EF4444",
      link: "/wellness/heart-health",
    },
    {
      icon: FitnessCenterIcon,
      title: "Fitness & Exercise",
      description: "Tips and resources for staying active and maintaining physical fitness.",
      color: "#10B981",
      link: "/wellness/fitness",
    },
    {
      icon: PsychologyIcon,
      title: "Mental Health",
      description: "Resources and information about mental wellness and emotional well-being.",
      color: "#8B5CF6",
      link: "/wellness/mental-health",
    },
    {
      icon: RestaurantIcon,
      title: "Nutrition & Diet",
      description: "Expert advice on healthy eating habits and nutritional supplements.",
      color: "#F59E0B",
      link: "/wellness/nutrition",
    },
    {
      icon: SelfImprovementIcon,
      title: "Stress Management",
      description: "Techniques and strategies to manage stress and improve overall quality of life.",
      color: "#06B6D4",
      link: "/wellness/stress-management",
    },
  ];

  const articles = [
    {
      title: "How to Boost Your Immunity Naturally",
      excerpt: "Discover natural ways to strengthen your immune system with vitamins, herbs, and lifestyle changes.",
      category: "Preventive Care",
      readTime: "5 min read",
      image: "/images/no-image.jpg",
    },
    {
      title: "Understanding Blood Pressure Medicines",
      excerpt: "Learn about different types of blood pressure medications and how they work to protect your heart.",
      category: "Heart Health",
      readTime: "7 min read",
      image: "/images/no-image.jpg",
    },
    {
      title: "The Importance of Regular Exercise",
      excerpt: "Find out why regular physical activity is crucial for maintaining good health at any age.",
      category: "Fitness & Exercise",
      readTime: "6 min read",
      image: "/images/no-image.jpg",
    },
    {
      title: "Managing Anxiety and Stress",
      excerpt: "Practical tips and techniques to help you manage anxiety and reduce stress in daily life.",
      category: "Mental Health",
      readTime: "8 min read",
      image: "/images/no-image.jpg",
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
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "var(--color-text)",
              mb: 2,
              fontSize: { xs: 28, md: 40 },
            }}
          >
            Health & Wellness
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
            Your trusted source for health information, wellness tips, and expert advice to help you live a healthier, happier life.
          </Typography>
        </Box>

        {/* Categories Grid */}
        <Box sx={{ mb: { xs: 5, md: 6 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "var(--color-text)",
              mb: 3,
              fontSize: { xs: 20, md: 24 },
            }}
          >
            Wellness Categories
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Box
                  key={index}
                  sx={{
                    width: { xs: "100%", md: "calc(50% - 4px)" },
                    display: "flex",
                  }}
                >
                  <Card
                    component={Link}
                    href={category.link}
                    sx={{
                      width: "100%",
                      height: "100%",
                      minHeight: { xs: 280, md: 300 },
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 3,
                      boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      transition: "all 250ms ease",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: isDark
                          ? "0 8px 24px rgba(0, 119, 182, 0.3)"
                          : "0 8px 24px rgba(0, 119, 182, 0.12)",
                        borderColor: category.color,
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, md: 3 }, flexGrow: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: `${category.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                          flexShrink: 0,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 32, color: category.color }} />
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
                        {category.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--color-muted-text)",
                          fontSize: { xs: 13, md: 14 },
                          lineHeight: 1.6,
                          flexGrow: 1,
                          mb: 2,
                        }}
                      >
                        {category.description}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: "auto", color: category.color, flexShrink: 0 }}>
                        <Typography
                          sx={{
                            fontSize: { xs: 13, md: 14 },
                            fontWeight: 600,
                            mr: 0.5,
                          }}
                        >
                          Learn More
                        </Typography>
                        <ArrowForwardIcon sx={{ fontSize: 18 }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Featured Articles */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "var(--color-text)",
                fontSize: { xs: 20, md: 24 },
              }}
            >
              Featured Articles
            </Typography>
            <Button
              component={Link}
              href="/wellness/blog"
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: "var(--color-primary)",
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: 13, md: 14 },
                display: { xs: "none", sm: "flex" },
              }}
            >
              View All Articles
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {articles.map((article, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: "100%", md: "calc(33.333% - 16px)" },
                  display: "flex",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: { xs: 380, md: 400 },
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 3,
                    boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 250ms ease",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: isDark
                        ? "0 8px 24px rgba(0, 119, 182, 0.3)"
                        : "0 8px 24px rgba(0, 119, 182, 0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: 160, md: 180 },
                      background: "var(--color-background)",
                      backgroundImage: `url(${article.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <Chip
                      label={article.category}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        bgcolor: "var(--color-primary)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: 10,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: { xs: 2, md: 2.5 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "var(--color-text)",
                        mb: 1,
                        fontSize: { xs: 15, md: 16 },
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: { xs: 44, md: 48 },
                        flexShrink: 0,
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--color-muted-text)",
                        fontSize: { xs: 12, md: 13 },
                        mb: 1.5,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        flexGrow: 1,
                        minHeight: { xs: 60, md: 65 },
                      }}
                    >
                      {article.excerpt}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--color-muted-text)",
                        fontSize: 11,
                        flexShrink: 0,
                        mt: "auto",
                      }}
                    >
                      {article.readTime}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
          <Box sx={{ textAlign: "center", mt: 4, display: { xs: "block", sm: "none" } }}>
            <Button
              component={Link}
              href="/wellness/blog"
              variant="outlined"
              sx={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              View All Articles
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

