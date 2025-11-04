"use client";

import Link from "next/link";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "./ThemeProvider";

const blogPosts = [
  {
    id: 1,
    title: "How to Boost Your Immunity Naturally",
    excerpt: "Discover natural ways to strengthen your immune system with vitamins, herbs, and healthy lifestyle habits that support your body's defense mechanisms.",
    href: "/blog/boost-immunity-naturally",
    category: "Wellness",
  },
  {
    id: 2,
    title: "Understanding Blood Pressure Medicines",
    excerpt: "Learn about different types of blood pressure medications, how they work, and important considerations for managing hypertension effectively.",
    href: "/blog/understanding-blood-pressure-medicines",
    category: "Health Tips",
  },
  {
    id: 3,
    title: "Essential Vitamins for Daily Health",
    excerpt: "A comprehensive guide to essential vitamins your body needs daily, their benefits, natural sources, and when supplements might be necessary.",
    href: "/blog/essential-vitamins-daily-health",
    category: "Nutrition",
  },
];

export default function HealthBlog() {
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
          Health & Wellness Blog
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--color-primary)",
            fontWeight: 500,
            fontSize: { xs: 14, md: 16 },
          }}
        >
          Expert Tips & Advice
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: { xs: 2, md: 3 },
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            component={Link}
            href={post.href}
            sx={{
              flex: { xs: "0 0 100%", md: "0 0 calc(33.333% - 16px)" },
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "all 250ms ease",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 3,
              boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
              overflow: "hidden",
              height: "100%",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: isDark
                  ? "0 8px 24px rgba(0, 119, 182, 0.3)"
                  : "0 8px 24px rgba(0, 119, 182, 0.12)",
                borderColor: "var(--color-primary)",
              },
            }}
          >
            <Box
              sx={{
                height: { xs: 160, md: 180 },
                background: `linear-gradient(135deg, var(--color-primary)15, var(--color-secondary)08)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <ArticleIcon
                sx={{
                  fontSize: { xs: 48, md: 56 },
                  color: "var(--color-primary)",
                  opacity: 0.6,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  bgcolor: "var(--color-primary)",
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {post.category}
              </Box>
            </Box>

            <CardContent sx={{ p: { xs: 2, md: 2.5 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: "var(--color-text)",
                  fontSize: { xs: 16, md: 18 },
                  mb: 1,
                  lineHeight: 1.4,
                  minHeight: { xs: "50px", md: "54px" },
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-muted-text)",
                  fontSize: { xs: 13, md: 14 },
                  lineHeight: 1.6,
                  mb: 2,
                  flexGrow: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.excerpt}
              </Typography>

              <Button
                variant="text"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                sx={{
                  color: "var(--color-primary)",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: 13, md: 14 },
                  px: 0,
                  py: 0.5,
                  alignSelf: "flex-start",
                  "&:hover": {
                    color: "var(--color-secondary)",
                    bgcolor: "transparent",
                  },
                }}
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

