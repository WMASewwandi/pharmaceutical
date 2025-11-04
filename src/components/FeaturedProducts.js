"use client";

import Link from "next/link";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "./ThemeProvider";

const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    dosage: "Tablets - 10's",
    price: 250,
    rating: 4.5,
    image: "/images/no-image.jpg",
    href: "/shop/paracetamol-500mg",
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    dosage: "Tablets - 10's",
    price: 350,
    rating: 4.8,
    image: "/images/no-image.jpg",
    href: "/shop/ibuprofen-400mg",
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    dosage: "Tablets - 30's",
    price: 850,
    rating: 4.7,
    image: "/images/no-image.jpg",
    href: "/shop/vitamin-c-1000mg",
  },
  {
    id: 4,
    name: "Cetirizine 10mg",
    dosage: "Tablets - 10's",
    price: 180,
    rating: 4.6,
    image: "/images/no-image.jpg",
    href: "/shop/cetirizine-10mg",
  },
];

export default function FeaturedProducts() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon
            key={i}
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "#FFB800",
            }}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarIcon
            key={i}
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "#FFB800",
              opacity: 0.5,
            }}
          />
        );
      } else {
        stars.push(
          <StarBorderIcon
            key={i}
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "#FFB800",
              opacity: 0.3,
            }}
          />
        );
      }
    }
    return stars;
  };

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
          Featured Products
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--color-primary)",
            fontWeight: 500,
            fontSize: { xs: 14, md: 16 },
          }}
        >
          Best Sellers
        </Typography>
      </Box>

      <Grid container spacing={1} sx={{ justifyContent: { xs: "center", md: "space-between" } }}>
        {products.map((product) => (
          <Grid key={product.id} item xs={6} sm={6} md={3} lg={3} sx={{ display: "flex" }}>
            <Card
              component={Link}
              href={product.href}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 250ms ease",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
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
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 140, md: 160 },
                  background: "var(--color-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={product.image || "/images/no-image.jpg"}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = "/images/no-image.jpg";
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <CardContent sx={{ p: { xs: 1.5, md: 2 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "var(--color-text)",
                    fontSize: { xs: 13, md: 15 },
                    lineHeight: 1.4,
                    mb: 0.5,
                    minHeight: { xs: "36px", md: "42px" },
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
                    fontSize: { xs: 11, md: 12 },
                    mb: 1,
                  }}
                >
                  {product.dosage}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 1.5,
                  }}
                >
                  {renderStars(product.rating)}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--color-muted-text)",
                      fontSize: { xs: 11, md: 12 },
                      ml: 0.5,
                    }}
                  >
                    ({product.rating})
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 1.5 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 16, md: 18 },
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    Rs. {product.price.toLocaleString()}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // TODO: Add to bag functionality
                    console.log("Add to bag:", product.id);
                  }}
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
                  }}
                >
                  Add to Bag
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 3, md: 4 } }}>
        <Button
          component={Link}
          href="/shop"
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: 14, md: 16 },
            px: { xs: 4, md: 5 },
            py: { xs: 1.2, md: 1.5 },
            borderRadius: 2,
            "&:hover": {
              borderColor: "var(--color-secondary)",
              color: "var(--color-secondary)",
              bgcolor: "var(--color-primary)08",
            },
            transition: "all 250ms ease",
          }}
        >
          View All
        </Button>
      </Box>
    </Box>
  );
}

