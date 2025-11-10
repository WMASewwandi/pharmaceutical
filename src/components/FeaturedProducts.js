"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, Typography, Button, Grid, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "./ThemeProvider";
import { apiUrl } from "@/lib/apiConfig";
import { useCart } from "@/context/CartContext";

const FALLBACK_IMAGE = "/images/no-image.jpg";
const FEATURED_COUNT = 4;

export default function FeaturedProducts() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { addItem, updateItemQuantity, removeItem, items: cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl(`Items/GetFeaturedProducts?count=${FEATURED_COUNT}`), {
          method: "GET",
          signal: controller.signal,
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok || (payload && payload.statusCode && payload.statusCode !== 200)) {
          throw new Error(payload?.message || "Failed to load featured products");
        }

        const result = Array.isArray(payload?.result) ? payload.result : [];
        setProducts(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load featured products");
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchFeaturedProducts();

    return () => controller.abort();
  }, []);

  const normalizedProducts = useMemo(
    () =>
      products.map((item) => {
        const rawPrice = item?.averagePrice ?? item?.price ?? 0;
        const priceNumber = Number(rawPrice) || 0;
        return {
          id: item?.id ?? item?.internalId ?? item?.code ?? `product-${Math.random()}`,
          name: item?.name ?? "Unnamed product",
          price: priceNumber,
          image:
            typeof item?.productImage === "string" && item.productImage.trim() !== ""
              ? item.productImage
              : FALLBACK_IMAGE,
          raw: item,
        };
      }),
    [products]
  );

  const handleAddToCart = (product) => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        raw: product.raw,
      },
      1
    );
  };

  const cartMap = useMemo(() => {
    const map = new Map();
    cartItems.forEach((item) => {
      map.set(String(item.id), item);
    });
    return map;
  }, [cartItems]);

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

      {error && (
        <Typography variant="body2" sx={{ color: "#dc2626", mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={1} sx={{ justifyContent: { xs: "center", md: "space-between" } }}>
        {isLoading && normalizedProducts.length === 0
          ? Array.from({ length: FEATURED_COUNT }).map((_, index) => (
              <Grid key={`placeholder-${index}`} item xs={6} sm={6} md={3} lg={3}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
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
              </Grid>
            ))
          : normalizedProducts.map((product) => (
              <Grid key={product.id} item xs={6} sm={6} md={3} lg={3} sx={{ display: "flex" }}>
                <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 250ms ease",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                    boxShadow: isDark
                      ? "0 2px 8px rgba(0,0,0,0.3)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
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
                sx={
                  {
                    width: "100%",
                    height: { xs: 200, md: 220 },
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                  }
                }
              >
                    <Link
                      href={`/shop?product=${product.id}`}
                      style={{ display: "block", width: "100%", height: "100%" }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: 12,
                        }}
                      />
                    </Link>
              </Box>

              <CardContent sx={{ p: { xs: 1.5, md: 2 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Link
                      href={`/shop?product=${product.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "var(--color-text)",
                          fontSize: { xs: 13, md: 15 },
                          lineHeight: 1.4,
                          mb: 1,
                          minHeight: { xs: "36px", md: "42px" },
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.name}
                      </Typography>
                    </Link>

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

                    {(() => {
                      const cartEntry = cartMap.get(String(product.id));
                      const quantity = cartEntry?.quantity ?? 0;
                      if (quantity > 0) {
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                              border: "1px solid var(--color-border)",
                              borderRadius: 999,
                              py: 0.75,
                              px: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                quantity <= 1
                                  ? removeItem(product.id)
                                  : updateItemQuantity(product.id, quantity - 1)
                              }
                              disabled={quantity <= 0}
                              sx={{
                                width: 32,
                                height: 32,
                                color: "var(--color-text)",
                                "&:hover": {
                                  bgcolor: "var(--color-primary)15",
                                  color: "var(--color-primary)",
                                },
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ minWidth: 32, textAlign: "center", fontWeight: 600 }}>
                              {quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => updateItemQuantity(product.id, quantity + 1)}
                              disabled={!product.raw?.isActive}
                              sx={{
                                width: 32,
                                height: 32,
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
                        );
                      }

                      return (
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
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
                          Add to Cart
                        </Button>
                      );
                    })()}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!isLoading && !error && normalizedProducts.length === 0 && (
        <Typography
          variant="body2"
          sx={{ color: "var(--color-muted-text)", textAlign: "center", mt: 2 }}
        >
          No featured products available right now. Please check back soon.
        </Typography>
      )}

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

