"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "./ThemeProvider";
import { apiUrl } from "@/lib/apiConfig";

const FEATURED_LIMIT = 5;
const FALLBACK_IMAGE = "/images/no-image.jpg";

export default function FeaturedCategories() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl("Category/GetAllWebCategory"), {
          method: "GET",
          signal: controller.signal,
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok || (payload && payload.statusCode && payload.statusCode !== 200)) {
          throw new Error(payload?.message || "Failed to load featured categories");
        }

        const result = Array.isArray(payload?.result) ? payload.result : [];
        setCategories(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load featured categories");
          setCategories([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, []);

  const categoriesToDisplay = useMemo(
    () => categories.slice(0, FEATURED_LIMIT),
    [categories]
  );

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

      {error && (
        <Typography variant="body2" sx={{ color: "#dc2626", mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: { xs: 2, md: 3 },
          justifyContent: "center",
        }}
      >
        {isLoading && categoriesToDisplay.length === 0
          ? Array.from({ length: FEATURED_LIMIT }).map((_, index) => (
              <Card
                key={`placeholder-${index}`}
                sx={{
                  flex: {
                    xs: "0 0 calc(50% - 8px)",
                    sm: "0 0 calc(33.333% - 13.33px)",
                    md: "0 0 calc(20% - 12px)",
                  },
                  minWidth: {
                    xs: "calc(50% - 8px)",
                    sm: "calc(33.333% - 13.33px)",
                    md: "calc(20% - 12px)",
                  },
                  height: { xs: 170, md: 200 },
                  borderRadius: 0,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  boxShadow: isDark
                    ? "0 2px 8px rgba(0,0,0,0.4)"
                    : "0 2px 8px rgba(15,23,42,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" sx={{ color: "var(--color-muted-text)" }}>
                  Loading...
                </Typography>
              </Card>
            ))
          : categoriesToDisplay.map((category) => {
              const imageSource =
                typeof category?.categoryImage === "string" && category.categoryImage.trim() !== ""
                  ? category.categoryImage
                  : FALLBACK_IMAGE;
              const linkHref = `/shop?category=${category?.id ?? ""}`;

              return (
                <Box
                  key={category.id ?? category.internalId ?? category.name}
                  sx={{
                    flex: {
                      xs: "0 0 calc(50% - 8px)",
                      sm: "0 0 calc(33.333% - 13.33px)",
                      md: "0 0 calc(20% - 12px)",
                    },
                    minWidth: {
                      xs: "calc(50% - 8px)",
                      sm: "calc(33.333% - 13.33px)",
                      md: "calc(20% - 12px)",
                    },
                    maxWidth: {
                      xs: "calc(50% - 8px)",
                      sm: "calc(33.333% - 13.33px)",
                      md: "calc(20% - 12px)",
                    },
                  }}
                >
                  <Link href={linkHref} style={{ textDecoration: "none" }}>
                    <Card
                      sx={{
                        height: { xs: 170, md: 200 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        borderRadius: 0,
                        overflow: "hidden",
                        position: "relative",
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.05), rgba(15, 23, 42, 0.6)), url(${imageSource})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: isDark
                          ? "0 10px 30px rgba(0,0,0,0.45)"
                          : "0 12px 24px rgba(15,23,42,0.12)",
                        transition: "transform 250ms ease, box-shadow 250ms ease",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: isDark
                            ? "0 18px 36px rgba(0,0,0,0.6)"
                            : "0 18px 36px rgba(15,23,42,0.18)",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          width: "100%",
                          p: { xs: 2, md: 2.5 },
                          pt: { xs: 8, md: 9 },
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "flex-start",
                          "&:last-child": { pb: { xs: 2, md: 2.5 } },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "#fff",
                            textShadow: "0 4px 12px rgba(0,0,0,0.35)",
                            letterSpacing: 0.5,
                            fontSize: { xs: 14, md: 16 },
                          }}
                        >
                          {category?.name ?? "Unnamed Category"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Box>
              );
            })}
      </Box>
      {!isLoading && !error && categoriesToDisplay.length === 0 && (
        <Typography
          variant="body2"
          sx={{ color: "var(--color-muted-text)", textAlign: "center", mt: 2 }}
        >
          No featured categories available right now. Please check back soon.
        </Typography>
      )}
    </Box>
  );
}

