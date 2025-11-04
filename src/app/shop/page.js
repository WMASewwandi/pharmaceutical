"use client";

import { useState } from "react";
import { Box, Container, TextField, InputAdornment, Grid, Card, CardContent, CardMedia, Typography, Button, Chip, Select, MenuItem, FormControl, InputLabel, Modal, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTheme } from "../../components/ThemeProvider";

// Sample products data
const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    dosage: "Tablets - 10's",
    price: 250,
    originalPrice: 300,
    rating: 4.5,
    category: "Pain Relief",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    dosage: "Tablets - 10's",
    price: 350,
    originalPrice: 400,
    rating: 4.8,
    category: "Pain Relief",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    dosage: "Tablets - 30's",
    price: 850,
    originalPrice: 950,
    rating: 4.7,
    category: "Vitamins",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: "Cetirizine 10mg",
    dosage: "Tablets - 10's",
    price: 180,
    originalPrice: 220,
    rating: 4.6,
    category: "Allergy",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 5,
    name: "Omeprazole 20mg",
    dosage: "Capsules - 14's",
    price: 450,
    originalPrice: 500,
    rating: 4.4,
    category: "Digestive",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 6,
    name: "Amoxicillin 500mg",
    dosage: "Capsules - 10's",
    price: 380,
    originalPrice: 420,
    rating: 4.9,
    category: "Antibiotics",
    image: "/images/no-image.jpg",
    inStock: false,
  },
  {
    id: 7,
    name: "Calcium + Vitamin D3",
    dosage: "Tablets - 60's",
    price: 1200,
    originalPrice: 1400,
    rating: 4.5,
    category: "Vitamins",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 8,
    name: "Aspirin 75mg",
    dosage: "Tablets - 30's",
    price: 280,
    originalPrice: 320,
    rating: 4.3,
    category: "Pain Relief",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 9,
    name: "Loratadine 10mg",
    dosage: "Tablets - 10's",
    price: 320,
    originalPrice: 360,
    rating: 4.7,
    category: "Allergy",
    image: "/images/no-image.jpg",
    inStock: true,
  },
  {
    id: 10,
    name: "Metformin 500mg",
    dosage: "Tablets - 30's",
    price: 550,
    originalPrice: 600,
    rating: 4.6,
    category: "Diabetes",
    image: "/images/no-image.jpg",
    inStock: true,
  },
];

const categories = ["All", "Pain Relief", "Vitamins", "Allergy", "Digestive", "Antibiotics", "Diabetes"];

export default function ShopPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});

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
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<StarIcon key={i} sx={{ fontSize: 16, color: "#FFD700" }} />);
      } else if (rating >= i - 0.5) {
        stars.push(<StarIcon key={i} sx={{ fontSize: 16, color: "#FFD700", opacity: 0.5 }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ fontSize: 16, color: "#FFD700" }} />);
      }
    }
    return stars;
  };

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
        {/* Search Bar Section */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <TextField
            fullWidth
            placeholder="Search medicines, categories, or products..."
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
        </Box>

        {/* Filters and Sort Section */}
        {/* Mobile: Filter and Sort buttons inline */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFilterModalOpen(true)}
            sx={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
              textTransform: "none",
              flex: 1,
              py: 1.5,
            }}
          >
            Filters
          </Button>
          <FormControl
            size="small"
            sx={{
              flex: 1,
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

        {/* Desktop: Original filters layout */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 2,
            mb: { xs: 3, md: 4 },
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", flex: 1 }}>
            <Chip
              icon={<FilterListIcon sx={{ fontSize: 18 }} />}
              label="Filters"
              sx={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            />
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  background: selectedCategory === category ? "var(--color-primary)" : "var(--color-surface)",
                  color: selectedCategory === category ? "white" : "var(--color-text)",
                  border: selectedCategory === category ? "none" : "1px solid var(--color-border)",
                  "&:hover": {
                    background: selectedCategory === category ? "var(--color-primary)" : "var(--color-surface)",
                  },
                }}
              />
            ))}
          </Box>
          <FormControl
            size="small"
            sx={{
              minWidth: 200,
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

        {/* Filter Modal for Mobile */}
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
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filters
            </Typography>
            <Button
              onClick={() => setFilterModalOpen(false)}
              sx={{ minWidth: "auto", p: 0.5 }}
            >
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Categories */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Categories
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {categories.map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      onClick={() => setSelectedCategory(category)}
                      sx={{
                        background: selectedCategory === category ? "var(--color-primary)" : "var(--color-surface)",
                        color: selectedCategory === category ? "white" : "var(--color-text)",
                        border: selectedCategory === category ? "none" : "1px solid var(--color-border)",
                        "&:hover": {
                          background: selectedCategory === category ? "var(--color-primary)" : "var(--color-surface)",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Sort */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
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
          <DialogActions sx={{ p: 2, pt: 1 }}>
            <Button
              onClick={() => {
                setSelectedCategory("All");
                setSortBy("default");
              }}
              sx={{ color: "var(--color-muted-text)" }}
            >
              Reset
            </Button>
            <Button
              onClick={() => setFilterModalOpen(false)}
              variant="contained"
              sx={{
                bgcolor: "var(--color-primary)",
                "&:hover": {
                  bgcolor: "var(--color-secondary)",
                },
              }}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>

        {/* Results Count */}
        <Typography
          variant="body2"
          sx={{
            color: "var(--color-muted-text)",
            mb: 3,
            fontSize: { xs: 13, md: 14 },
          }}
        >
          Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
        </Typography>

        {/* Products Grid */}
        <Grid 
          container 
          spacing={1} 
          sx={{ 
            justifyContent: { xs: "center", sm: "space-between", lg: "flex-start", xl: "flex-start" },
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {sortedProducts.map((product) => (
            <Grid 
              item 
              xs={12} 
              sm={4} 
              md={3} 
              lg={false}
              xl={false}
              key={product.id} 
              sx={{ 
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
                flex: { 
                  xs: "0 0 100%", 
                  sm: "0 0 calc(33.333% - 6.67px)", 
                  md: "0 0 calc(25% - 6px)",
                  lg: "0 0 calc(20% - 6.4px)", 
                  xl: "0 0 calc(20% - 6.4px)" 
                },
                maxWidth: { 
                  xs: "100%", 
                  sm: "calc(33.333% - 6.67px)", 
                  md: "calc(25% - 6px)",
                  lg: "calc(20% - 6.4px)", 
                  xl: "calc(20% - 6.4px)" 
                },
                minWidth: { 
                  xs: "100%", 
                  sm: "calc(33.333% - 6.67px)", 
                  md: "calc(25% - 6px)",
                  lg: "calc(20% - 6.4px)", 
                  xl: "calc(20% - 6.4px)" 
                },
                width: {
                  lg: "calc(20% - 6.4px)",
                  xl: "calc(20% - 6.4px)",
                },
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "all 250ms ease",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 2,
                  boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: isDark
                      ? "0 8px 24px rgba(0, 119, 182, 0.3)"
                      : "0 8px 24px rgba(0, 119, 182, 0.12)",
                    borderColor: "var(--color-primary)",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = "/images/no-image.jpg";
                    }}
                    sx={{
                      objectFit: "cover",
                      background: "var(--color-surface)",
                    }}
                  />
                  {!product.inStock && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(0,0,0,0.7)",
                        color: "white",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Out of Stock
                    </Box>
                  )}
                  {product.originalPrice > product.price && (
                    <Chip
                      label={`${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        bgcolor: "var(--color-primary)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 10,
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      fontSize: { xs: 13, md: 14 },
                      mb: 0.5,
                      lineHeight: 1.4,
                      minHeight: { xs: "38px", md: "40px" },
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--color-muted-text)",
                      mb: 1,
                      fontSize: { xs: 11, md: 12 },
                    }}
                  >
                    {product.dosage}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    {renderStars(product.rating)}
                    <Typography
                      variant="body2"
                      sx={{ ml: 0.5, fontSize: { xs: 11, md: 12 }, color: "var(--color-muted-text)" }}
                    >
                      ({product.rating})
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1.5 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: 16, md: 18 },
                        fontWeight: 700,
                        color: "var(--color-primary)",
                      }}
                    >
                      Rs. {product.price.toLocaleString()}
                    </Typography>
                    {product.originalPrice > product.price && (
                      <Typography
                        sx={{
                          fontSize: { xs: 12, md: 13 },
                          color: "var(--color-muted-text)",
                          textDecoration: "line-through",
                        }}
                      >
                        Rs. {product.originalPrice.toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                  {quantities[product.id] && quantities[product.id] > 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        border: "1px solid var(--color-border)",
                        borderRadius: 2,
                        py: { xs: 0.75, md: 1 },
                        px: 1,
                        background: "var(--color-surface)",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={quantities[product.id] <= 1}
                        sx={{
                          color: "var(--color-text)",
                          width: { xs: 32, md: 36 },
                          height: { xs: 32, md: 36 },
                          "&:hover": {
                            bgcolor: "var(--color-primary)15",
                            color: "var(--color-primary)",
                          },
                          "&:disabled": {
                            opacity: 0.4,
                          },
                        }}
                      >
                        <RemoveIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                      </IconButton>
                      <Typography
                        sx={{
                          minWidth: { xs: 32, md: 40 },
                          textAlign: "center",
                          fontSize: { xs: 14, md: 15 },
                          fontWeight: 600,
                          color: "var(--color-text)",
                        }}
                      >
                        {quantities[product.id]}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        disabled={!product.inStock}
                        sx={{
                          color: "var(--color-text)",
                          width: { xs: 32, md: 36 },
                          height: { xs: 32, md: 36 },
                          "&:hover": {
                            bgcolor: "var(--color-primary)15",
                            color: "var(--color-primary)",
                          },
                          "&:disabled": {
                            opacity: 0.4,
                          },
                        }}
                      >
                        <AddIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
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
                        bgcolor: "var(--color-primary)",
                        color: "white",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: { xs: 12, md: 13 },
                        py: { xs: 0.75, md: 1 },
                        "&:hover": {
                          bgcolor: "var(--color-secondary)",
                        },
                        "&:disabled": {
                          bgcolor: "var(--color-border)",
                          color: "var(--color-muted-text)",
                        },
                      }}
                    >
                      {product.inStock ? "Add to Bag" : "Out of Stock"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {sortedProducts.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 6, md: 8 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "var(--color-text)",
                mb: 1,
              }}
            >
              No products found
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-muted-text)",
              }}
            >
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

