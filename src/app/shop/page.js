"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Collapse,
  Stack,
  Checkbox,
  FormControlLabel,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "../../components/ThemeProvider";

// Sample products data
const products = [
  {
    id: 1,
    name: "Aurora Wireless Earbuds",
    description: "Active noise cancelling earbuds with 24h playtime",
    price: 14990,
    originalPrice: 19990,
    rating: 4.6,
    category: "Tech",
    subcategory: "Audio",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Pulse Pro Smartwatch",
    description: "Fitness tracking with AMOLED display and GPS",
    price: 23990,
    originalPrice: 26990,
    rating: 4.8,
    category: "Tech",
    subcategory: "Wearables",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Nimbus Laptop Sleeve",
    description: "Water-resistant sleeve for 13\" laptops",
    price: 4990,
    originalPrice: 6490,
    rating: 4.4,
    category: "Tech",
    subcategory: "Accessories",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: "BrewPro Coffee Grinder",
    description: "Stainless steel burr grinder with 15 settings",
    price: 8990,
    originalPrice: 10990,
    rating: 4.7,
    category: "Home",
    subcategory: "Kitchen",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 5,
    name: "Glow Smart Lamp",
    description: "Voice-controlled ambient lighting with scenes",
    price: 5990,
    originalPrice: 7490,
    rating: 4.5,
    category: "Home",
    subcategory: "Smart Home",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 6,
    name: "Harmony Yoga Mat",
    description: "Non-slip mat with alignment guide for daily flow",
    price: 3990,
    originalPrice: 4590,
    rating: 4.6,
    category: "Wellness",
    subcategory: "Fitness",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 7,
    name: "Vitality Multivitamins",
    description: "Daily multivitamin with added adaptogens",
    price: 2590,
    originalPrice: 2990,
    rating: 4.4,
    category: "Wellness",
    subcategory: "Supplements",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 8,
    name: "Serene Spa Gift Set",
    description: "Aromatherapy oils, diffuser and soy candles",
    price: 6990,
    originalPrice: 7990,
    rating: 4.3,
    category: "Wellness",
    subcategory: "Personal Care",
    image: "/images/no-image.jpg",
    inStock: false,
  },
  {
    id: 9,
    name: "Vista Denim Jacket",
    description: "Classic fit denim jacket with stretch comfort",
    price: 10990,
    originalPrice: 12990,
    rating: 4.5,
    category: "Fashion",
    subcategory: "Men",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 10,
    name: "Luxe Leather Tote",
    description: "Full-grain leather tote with padded laptop sleeve",
    price: 15990,
    originalPrice: 18990,
    rating: 4.7,
    category: "Fashion",
    subcategory: "Women",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 11,
    name: "Spectrum Polarized Sunglasses",
    description: "UV400 protection with scratch-resistant lenses",
    price: 7990,
    originalPrice: 8990,
    rating: 4.2,
    category: "Fashion",
    subcategory: "Accessories",
    image: "/images/no-image.jpg",
    inStock: true,
  },
];

const categoryGroups = [
  { name: "All", label: "All Products", subcategories: [] },
  {
    name: "Tech",
    label: "Tech Gadgets",
    subcategories: ["Audio", "Wearables", "Computing", "Accessories"],
  },
  {
    name: "Home",
    label: "Home & Living",
    subcategories: ["Kitchen", "Decor", "Smart Home"],
  },
  {
    name: "Wellness",
    label: "Health & Wellness",
    subcategories: ["Supplements", "Fitness", "Personal Care"],
  },
  {
    name: "Fashion",
    label: "Fashion",
    subcategories: ["Women", "Men", "Accessories"],
  },
];

export default function ShopPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const CONTROL_HEIGHT = 48;

  const makeSubKey = (categoryName, subcategoryName) => `${categoryName}::${subcategoryName}`;

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const subcategoryCounts = products.reduce((acc, product) => {
    const key = makeSubKey(product.category, product.subcategory);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const toggleSectionExpansion = (categoryName) => {
    setExpandedSections((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleCategorySelection = (categoryName) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        setSelectedSubcategories((subs) =>
          subs.filter((key) => !key.startsWith(`${categoryName}::`))
        );
        return prev.filter((name) => name !== categoryName);
      }
      setExpandedSections((prev) =>
        prev.includes(categoryName) ? prev : [...prev, categoryName]
      );
      return [...prev, categoryName];
    });
  };

  const toggleSubcategorySelection = (categoryName, subcategoryName) => {
    const key = makeSubKey(categoryName, subcategoryName);
    setSelectedSubcategories((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      }
      setSelectedCategories((cats) =>
        cats.includes(categoryName) ? cats : [...cats, categoryName]
      );
      setExpandedSections((prev) =>
        prev.includes(categoryName) ? prev : [...prev, categoryName]
      );
      return [...prev, key];
    });
  };

  const clearCategorySelection = (categoryName) => {
    setSelectedCategories((prev) => prev.filter((name) => name !== categoryName));
    setSelectedSubcategories((subs) =>
      subs.filter((key) => !key.startsWith(`${categoryName}::`))
    );
  };

  const clearSubcategorySelection = (categoryName, subcategoryName) => {
    const key = makeSubKey(categoryName, subcategoryName);
    setSelectedSubcategories((prev) => prev.filter((item) => item !== key));
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setExpandedSections([]);
    setCurrentPage(1); // Reset page to 1 when filters are cleared
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const currentQty = prev[productId] || 0;
      const newQty = Math.max(0, currentQty + change);
      if (newQty === 0) {
        const { [productId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const handleAddToBag = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.subcategory.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery);
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesSubcategory =
      selectedSubcategories.length === 0 ||
      selectedSubcategories.includes(makeSubKey(product.category, product.subcategory));
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_XL = 9;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_XL));
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_XL,
    currentPage * ITEMS_XL
  );

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedSubcategories.length > 0;

  const goToPage = (page) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
  };


  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--color-background)",
        pt: { xs: 12, md: 14 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: { md: "280px 1fr" },
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              sx={{
                position: "sticky",
                top: "calc(var(--header-offset) + 24px)",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                p: 3,
                boxShadow: isDark
                  ? "0 6px 18px rgba(0,0,0,0.35)"
                  : "0 12px 32px rgba(15,23,42,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700, fontSize: 18, color: "var(--color-text)" }}>
                  Filters
                </Typography>
                <Button
                  variant="text"
                  onClick={handleResetFilters}
                  disabled={!hasActiveFilters}
                  sx={{
                    textTransform: "none",
                    color: "var(--color-muted-text)",
                    fontWeight: 500,
                    opacity: hasActiveFilters ? 1 : 0.4,
                  }}
                >
                  Clear All
                </Button>
              </Box>

              <Box>
                <Typography
                  variant="overline"
                  sx={{ fontWeight: 600, letterSpacing: 1.4, color: "var(--color-muted-text)" }}
                >
                  Categories
                </Typography>

                <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
                  {categoryGroups
                    .filter((group) => group.name !== "All")
                    .map((group) => {
                      const isSelected = selectedCategories.includes(group.name);
                      const isExpanded = expandedSections.includes(group.name);
                      const count = categoryCounts[group.name] || 0;
                      return (
                        <Box key={group.name} sx={{ borderBottom: "1px solid rgba(148,163,184,0.2)", pb: 1.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 1,
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isSelected}
                                  onChange={() => toggleCategorySelection(group.name)}
                                  sx={{
                                    color: "var(--color-border)",
                                    '&.Mui-checked': { color: "var(--color-primary)" },
                                  }}
                                />
                              }
                              label={
                                <Typography sx={{ fontWeight: 600, letterSpacing: 0.5, color: "var(--color-text)" }}>
                                  {group.label}
                                </Typography>
                              }
                              sx={{ margin: 0, flexGrow: 1 }}
                            />
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <Typography sx={{ fontSize: 12, color: "var(--color-muted-text)", fontWeight: 600 }}>
                                {count}
                              </Typography>
                              <IconButton size="small" onClick={() => toggleSectionExpansion(group.name)}>
                                {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                              </IconButton>
                            </Box>
                          </Box>

                          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                            <Box sx={{ pl: 1, pt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                              {group.subcategories.map((subcategory) => {
                                const subKey = makeSubKey(group.name, subcategory);
                                const subSelected = selectedSubcategories.includes(subKey);
                                const subCount = subcategoryCounts[subKey] || 0;
                                return (
                                  <Box
                                    key={subKey}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      gap: 1,
                                    }}
                                  >
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={subSelected}
                                          onChange={() => toggleSubcategorySelection(group.name, subcategory)}
                                          sx={{
                                            color: "var(--color-border)",
                                            '&.Mui-checked': { color: "var(--color-secondary)" },
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography sx={{ fontSize: 14, color: "var(--color-text)" }}>
                                          {subcategory}
                                        </Typography>
                                      }
                                      sx={{ margin: 0, flexGrow: 1, pl: 1.5 }}
                                    />
                                    <Typography sx={{ fontSize: 12, color: "var(--color-muted-text)", fontWeight: 600 }}>
                                      {subCount}
                                    </Typography>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Collapse>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "stretch", md: "center" },
                gap: 2,
                mb: 3,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setFilterModalOpen(true)}
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                  textTransform: "none",
                  height: CONTROL_HEIGHT,
                  px: 2,
                }}
              >
                Filters
              </Button>

              <TextField
                fullWidth
                placeholder="Search products, categories, or collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "var(--color-muted-text)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "var(--color-surface)",
                    borderRadius: 2,
                    height: CONTROL_HEIGHT,
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

              <FormControl
                size="small"
                sx={{
                  width: { xs: "100%", md: 220 },
                  "& .MuiOutlinedInput-root": {
                    background: "var(--color-surface)",
                    color: "var(--color-text)",
                    height: CONTROL_HEIGHT,
                    "& fieldset": {
                      borderColor: "var(--color-border)",
                    },
                  },
                }}
              >
                <InputLabel sx={{ color: "var(--color-text)" }}>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
                mb: 3,
              }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ color: "var(--color-muted-text)" }}>
                  Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mt: 1,
                    flexWrap: "wrap",
                    display: hasActiveFilters ? "flex" : "none",
                  }}
                >
                  {selectedCategories.map((category) => {
                    const categoryLabel =
                      categoryGroups.find((group) => group.name === category)?.label || category;
                    return (
                      <Chip
                        key={`category-${category}`}
                        label={`Category: ${categoryLabel}`}
                        onDelete={() => clearCategorySelection(category)}
                        sx={{ background: "var(--color-primary)", color: "white" }}
                      />
                    );
                  })}
                  {selectedSubcategories.map((subKey) => {
                    const [categoryName, subcategoryName] = subKey.split("::");
                    return (
                      <Chip
                        key={`subcategory-${subKey}`}
                        label={`Subcategory: ${subcategoryName}`}
                        onDelete={() => clearSubcategorySelection(categoryName, subcategoryName)}
                        sx={{ background: "var(--color-secondary)", color: "var(--color-text)" }}
                      />
                    );
                  })}
                  {hasActiveFilters && (
                    <Chip
                      label="Reset filters"
                      variant="outlined"
                      onDelete={handleResetFilters}
                    />
                  )}
                </Stack>
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, minmax(0, 1fr))",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(3, minmax(0, 1fr))",
                  xl: "repeat(4, minmax(0, 1fr))",
                },
              }}
            >
              {visibleProducts.map((product) => (
                <Card
                  key={product.id}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                    boxShadow: isDark
                      ? "0 6px 18px rgba(0,0,0,0.3)"
                      : "0 12px 32px rgba(15,23,42,0.08)",
                    transition: "transform 200ms ease, box-shadow 200ms ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: isDark
                        ? "0 12px 32px rgba(0,119,182,0.35)"
                        : "0 16px 32px rgba(0,119,182,0.16)",
                      borderColor: "var(--color-primary)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "/images/no-image.jpg";
                      }}
                      sx={{ objectFit: "cover" }}
                    />
                    {!product.inStock && (
                      <Chip
                        label="Out of stock"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(15,23,42,0.85)",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    )}
                    {product.originalPrice > product.price && (
                      <Chip
                        label={`${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: "var(--color-primary)",
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </Box>
                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.25,
                      flexGrow: 1,
                    }}
                  >
                   
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "var(--color-text)",
                        lineHeight: 1.3,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 700, color: "var(--color-primary)" }}>
                        Rs. {product.price.toLocaleString()}
                      </Typography>
                      {product.originalPrice > product.price && (
                        <Typography sx={{ color: "var(--color-muted-text)", textDecoration: "line-through" }}>
                          Rs. {product.originalPrice.toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ mt: "auto" }}>
                      {quantities[product.id] && quantities[product.id] > 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            border: "1px solid var(--color-border)",
                            borderRadius: 999,
                            py: 1,
                            px: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(product.id, -1)}
                            disabled={quantities[product.id] <= 1}
                            sx={{
                              width: 36,
                              height: 36,
                              color: "var(--color-text)",
                              "&:hover": {
                                bgcolor: "var(--color-primary)15",
                                color: "var(--color-primary)",
                              },
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ minWidth: 36, textAlign: "center", fontWeight: 600 }}>
                            {quantities[product.id]}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            disabled={!product.inStock}
                            sx={{
                              width: 36,
                              height: 36,
                              color: "var(--color-text)",
                              "&:hover": {
                                bgcolor: "var(--color-primary)15",
                                color: "var(--color-primary)",
                              },
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                          disabled={!product.inStock}
                          onClick={() => handleAddToBag(product.id)}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            bgcolor: "var(--color-primary)",
                            "&:hover": { bgcolor: "var(--color-secondary)" },
                          }}
                        >
                          {product.inStock ? "Add to bag" : "Out of stock"}
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {sortedProducts.length > 0 && totalPages > 1 && (
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => goToPage(page)}
                  color="primary"
                  shape="rounded"
                />
              </Box>
            )}

            {sortedProducts.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: { xs: 6, md: 8 },
                }}
              >
                <Typography variant="h6" sx={{ color: "var(--color-text)", mb: 1 }}>
                  No products found
                </Typography>
                <Typography variant="body2" sx={{ color: "var(--color-muted-text)" }}>
                  Try adjusting your search or filter criteria.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Dialog
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              background: "var(--color-surface)",
              color: "var(--color-text)",
            },
          }}
        >
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filters
            </Typography>
            <IconButton onClick={() => setFilterModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Categories
                </Typography>
                <Button
                  variant="text"
                  onClick={handleResetFilters}
                  disabled={!hasActiveFilters}
                  sx={{
                    textTransform: "none",
                    color: "var(--color-muted-text)",
                    opacity: hasActiveFilters ? 1 : 0.4,
                  }}
                >
                  Clear All
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {categoryGroups
                  .filter((group) => group.name !== "All")
                  .map((group) => {
                    const isSelected = selectedCategories.includes(group.name);
                    const isExpanded = expandedSections.includes(group.name);
                    const count = categoryCounts[group.name] || 0;
                    return (
                      <Box key={`mobile-${group.name}`} sx={{ borderBottom: "1px solid rgba(148,163,184,0.2)", pb: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isSelected}
                                onChange={() => toggleCategorySelection(group.name)}
                                sx={{
                                  color: "var(--color-border)",
                                  '&.Mui-checked': { color: "var(--color-primary)" },
                                }}
                              />
                            }
                            label={
                              <Typography sx={{ fontWeight: 600, color: "var(--color-text)" }}>
                                {group.label}
                              </Typography>
                            }
                            sx={{ margin: 0, flexGrow: 1 }}
                          />
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Typography sx={{ fontSize: 12, color: "var(--color-muted-text)", fontWeight: 600 }}>
                              {count}
                            </Typography>
                            <IconButton size="small" onClick={() => toggleSectionExpansion(group.name)}>
                              {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                            </IconButton>
                          </Box>
                        </Box>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{ pl: 1, pt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                            {group.subcategories.map((subcategory) => {
                              const subKey = makeSubKey(group.name, subcategory);
                              const subSelected = selectedSubcategories.includes(subKey);
                              const subCount = subcategoryCounts[subKey] || 0;
                              return (
                                <Box
                                  key={`mobile-${subKey}`}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={subSelected}
                                        onChange={() => toggleSubcategorySelection(group.name, subcategory)}
                                        sx={{
                                          color: "var(--color-border)",
                                          '&.Mui-checked': { color: "var(--color-secondary)" },
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography sx={{ fontSize: 14, color: "var(--color-text)" }}>
                                        {subcategory}
                                      </Typography>
                                    }
                                    sx={{ margin: 0, flexGrow: 1, pl: 1.5 }}
                                  />
                                  <Typography sx={{ fontSize: 12, color: "var(--color-muted-text)", fontWeight: 600 }}>
                                    {subCount}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        </Collapse>
                      </Box>
                    );
                  })}
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Sort By
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "var(--color-surface)",
                      color: "var(--color-text)",
                      "& fieldset": {
                        borderColor: "var(--color-border)",
                      },
                    },
                  }}
                >
                  <InputLabel sx={{ color: "var(--color-text)" }}>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              onClick={handleResetFilters}
              disabled={!hasActiveFilters}
              sx={{
                textTransform: "none",
                color: "var(--color-muted-text)",
                opacity: hasActiveFilters ? 1 : 0.4,
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => setFilterModalOpen(false)}
              variant="contained"
              sx={{ textTransform: "none", bgcolor: "var(--color-primary)", "&:hover": { bgcolor: "var(--color-secondary)" } }}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

