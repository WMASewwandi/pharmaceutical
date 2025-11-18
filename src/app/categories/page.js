"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

import { useTheme } from "@/components/ThemeProvider";
import { fetchCategoriesWithCounts } from "@/lib/api/categories";

const FALLBACK_CATEGORY_NAME = "Unnamed category";

const normalizeCategory = (category, index) => {
  const rawId = category?.categoryId ?? category?.id ?? `category-${index}`;
  const id = String(rawId);
  const name = category?.categoryName ?? category?.name ?? id ?? FALLBACK_CATEGORY_NAME;
  const itemCount = Number(category?.itemCount ?? category?.itemsCount ?? 0) || 0;
  const subCategories = Array.isArray(category?.subCategories)
    ? category.subCategories.map((sub, subIndex) => {
        const subRawId = sub?.subCategoryId ?? sub?.id ?? `${rawId}-${subIndex}`;
        const subId = String(subRawId);
        return {
          id: subId,
          name: sub?.subCategoryName ?? sub?.name ?? subId,
          itemCount: Number(sub?.itemCount ?? sub?.itemsCount ?? 0) || 0,
        };
      })
    : [];

  return {
    id,
    name,
    itemCount,
    subCategories,
  };
};

export default function CategoriesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [rawCategories, setRawCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetchCategoriesWithCounts(controller.signal)
      .then((result) => {
        setRawCategories(Array.isArray(result) ? result : []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load categories");
          setRawCategories([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => rawCategories.map((category, index) => normalizeCategory(category, index)),
    [rawCategories]
  );

  const searchValue = search.trim().toLowerCase();
  const filteredCategories = useMemo(() => {
    if (!searchValue) {
      return categories;
    }
    return categories.filter((category) => {
      const categoryNameMatch = category.name?.toLowerCase().includes(searchValue);
      const subcategoryMatch = category.subCategories.some((sub) =>
        sub.name?.toLowerCase().includes(searchValue)
      );
      return categoryNameMatch || subcategoryMatch;
    });
  }, [categories, searchValue]);

  const toggleExpanded = (id) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--color-background)",
        pt: { xs: 12, md: 14 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "var(--color-text)",
              mb: 1,
              fontSize: { xs: 28, md: 36 },
            }}
          >
            Browse Categories
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "var(--color-muted-text)",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Discover our full catalog of product categories and explore the collections
            that match your needs.
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: { xs: "stretch", md: "center" },
          }}
        >
          <TextField
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            fullWidth
            placeholder="Search categories or subcategories"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "var(--color-muted-text)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: { xs: "100%", md: 420 },
              "& .MuiOutlinedInput-root": {
                background: "var(--color-surface)",
                borderRadius: 2,
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
            }}
          />
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            sx={{ color: "var(--color-muted-text)" }}
          >
            <Typography variant="body2">
              {isLoading ? "Loading categories…" : `${filteredCategories.length} categories`}
            </Typography>
            {searchValue && (
              <Button
                onClick={() => setSearch("")}
                variant="text"
                sx={{ textTransform: "none", alignSelf: { xs: "flex-start", md: "center" } }}
              >
                Clear search
              </Button>
            )}
          </Stack>
        </Box>

        {error && (
          <Typography variant="body2" sx={{ color: "#dc2626", mb: 3 }}>
            {error}
          </Typography>
        )}

        {isLoading && categories.length === 0 && (
          <Typography variant="body2" sx={{ color: "var(--color-muted-text)", mb: 3 }}>
            Loading categories…
          </Typography>
        )}

        {!isLoading && !error && filteredCategories.length === 0 && (
          <Typography variant="body2" sx={{ color: "var(--color-muted-text)", mb: 3 }}>
            No categories match your search. Try a different keyword.
          </Typography>
        )}

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          {filteredCategories.map((category) => {
            const subCount = category.subCategories.length;
            const isExpanded = expanded.includes(category.id);
            const hasSubs = subCount > 0;
            const shopHref = `/shop?category=${encodeURIComponent(category.id)}`;

            return (
              <Card
                key={category.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  boxShadow: isDark
                    ? "0 12px 26px rgba(0,0,0,0.35)"
                    : "0 12px 32px rgba(15,23,42,0.08)",
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: isDark
                      ? "0 18px 36px rgba(0,0,0,0.45)"
                      : "0 18px 36px rgba(15,23,42,0.12)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flexGrow: 1,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "var(--color-text)", mb: 0.5 }}
                      >
                        {category.name || FALLBACK_CATEGORY_NAME}
                      </Typography>
                      <Typography sx={{ color: "var(--color-muted-text)", fontSize: 14 }}>
                        {category.itemCount} product{category.itemCount === 1 ? "" : "s"}
                      </Typography>
                    </Box>
                    {hasSubs && (
                      <IconButton
                        size="small"
                        onClick={() => toggleExpanded(category.id)}
                        sx={{
                          alignSelf: "flex-start",
                          color: "var(--color-text)",
                        }}
                      >
                        {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                      </IconButton>
                    )}
                  </Box>

                  {hasSubs && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Stack spacing={1} sx={{ mt: 1 }}>
                        {category.subCategories.map((sub) => (
                          <Chip
                            key={`${category.id}-${sub.id}`}
                            label={`${sub.name} (${sub.itemCount})`}
                            sx={{
                              alignSelf: "flex-start",
                              background: "var(--color-background)",
                              color: "var(--color-text)",
                              borderColor: "var(--color-border)",
                            }}
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Collapse>
                  )}

                  <Box sx={{ mt: "auto" }}>
                    <Button
                      component={Link}
                      href={shopHref}
                      variant="contained"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        bgcolor: "var(--color-primary)",
                        "&:hover": { bgcolor: "var(--color-secondary)" },
                      }}
                    >
                      Browse products
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}


