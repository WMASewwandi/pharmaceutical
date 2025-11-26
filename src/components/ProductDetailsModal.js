"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTheme } from "./ThemeProvider";
import { useCart } from "@/context/CartContext";
import { useMemo } from "react";

const FALLBACK_IMAGE = "/images/no-image.jpg";

export default function ProductDetailsModal({ open, onClose, product }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { addItem, updateItemQuantity, removeItem, items: cartItems } = useCart();

  const cartMap = useMemo(() => {
    const map = new Map();
    cartItems.forEach((item) => {
      map.set(String(item.id), item);
    });
    return map;
  }, [cartItems]);

  if (!product) return null;

  const cartEntry = cartMap.get(String(product.id));
  const quantity = cartEntry?.quantity ?? 0;
  const rawProduct = product.raw || {};
  const originalPrice = Number(rawProduct?.originalPrice ?? product.originalPrice ?? product.price) || product.price;
  const hasDiscount = originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
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

  const handleIncreaseQuantity = () => {
    if (quantity === 0) {
      handleAddToCart();
    } else {
      updateItemQuantity(product.id, quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      removeItem(product.id);
    } else {
      updateItemQuantity(product.id, quantity - 1);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: "var(--color-surface)",
          color: "var(--color-text)",
          borderRadius: 3,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          borderBottom: "1px solid var(--color-border)",
          fontWeight: 600,
          color: "var(--color-text)",
        }}
      >
        Product Details
        <IconButton
          onClick={onClose}
          sx={{
            color: "var(--color-text)",
            "&:hover": {
              bgcolor: "var(--color-primary)15",
              color: "var(--color-primary)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, overflow: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            p: 3,
          }}
        >
          {/* Product Image */}
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              minWidth: { xs: "100%", md: 300 },
              height: { xs: 300, md: 400 },
              background: "#ffffff",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
              border: "1px solid var(--color-border)",
            }}
          >
            <img
              src={product.image || FALLBACK_IMAGE}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: 16,
              }}
            />
            {hasDiscount && (
              <Chip
                label={`${discountPercentage}% OFF`}
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
            {!product.inStock && (
              <Chip
                label="Out of Stock"
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
          </Box>

          {/* Product Details */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "var(--color-text)",
                  mb: 1,
                  lineHeight: 1.3,
                }}
              >
                {product.name}
              </Typography>
              {product.code && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--color-muted-text)",
                    mb: 2,
                  }}
                >
                  Product Code: {product.code}
                </Typography>
              )}
            </Box>

            <Divider />

            {/* Price Section */}
            <Box>
              <Stack direction="row" spacing={2} alignItems="baseline" flexWrap="wrap">
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "var(--color-primary)",
                  }}
                >
                  Rs. {product.price.toLocaleString()}
                </Typography>
                {hasDiscount && (
                  <>
                    <Typography
                      sx={{
                        color: "var(--color-muted-text)",
                        textDecoration: "line-through",
                        fontSize: 20,
                      }}
                    >
                      Rs. {originalPrice.toLocaleString()}
                    </Typography>
                    <Chip
                      label={`Save Rs. ${(originalPrice - product.price).toLocaleString()}`}
                      size="small"
                      sx={{
                        background: "var(--color-primary)15",
                        color: "var(--color-primary)",
                        fontWeight: 600,
                      }}
                    />
                  </>
                )}
              </Stack>
            </Box>

            <Divider />

            {/* Description Section */}
            {(rawProduct?.description && rawProduct?.description != "null" ) && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: "var(--color-text)",
                    mb: 1,
                  }}
                >
                  Description
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--color-muted-text)",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {rawProduct.description}
                </Typography>
              </Box>
            )}

            {/* Additional Product Info */}
            <Box>
              <Stack spacing={1}>
                {rawProduct?.manufacturer && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "var(--color-text)",
                        minWidth: 120,
                      }}
                    >
                      Manufacturer:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "var(--color-muted-text)" }}>
                      {rawProduct.manufacturer}
                    </Typography>
                  </Box>
                )}
                {rawProduct?.categoryName && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "var(--color-text)",
                        minWidth: 120,
                      }}
                    >
                      Category:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "var(--color-muted-text)" }}>
                      {rawProduct.categoryName}
                    </Typography>
                  </Box>
                )}
                {rawProduct?.subCategoryName && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "var(--color-text)",
                        minWidth: 120,
                      }}
                    >
                      Subcategory:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "var(--color-muted-text)" }}>
                      {rawProduct.subCategoryName}
                    </Typography>
                  </Box>
                )}
                {/* <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      minWidth: 120,
                    }}
                  >
                    Availability:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: product.inStock ? "var(--color-primary)" : "#dc2626",
                      fontWeight: 600,
                    }}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Typography>
                </Box> */}
              </Stack>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid var(--color-border)",
          gap: 2,
        }}
      >
        {quantity > 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flex: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-text)",
                fontWeight: 600,
                minWidth: 100,
              }}
            >
              Quantity:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid var(--color-border)",
                borderRadius: 999,
                py: 0.75,
                px: 1,
              }}
            >
              <IconButton
                size="small"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 0}
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
              <Typography sx={{ minWidth: 40, textAlign: "center", fontWeight: 600 }}>
                {quantity}
              </Typography>
              <IconButton
                size="small"
                onClick={handleIncreaseQuantity}
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
          </Box>
        ) : (
          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            sx={{
              bgcolor: "var(--color-primary)",
              color: "white",
              textTransform: "none",
              fontWeight: 600,
              py: 1.5,
              "&:hover": {
                bgcolor: "var(--color-secondary)",
              },
              "&:disabled": {
                bgcolor: "var(--color-muted-text)",
              },
            }}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        )}
        {/* <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
            "&:hover": {
              borderColor: "var(--color-primary)",
              bgcolor: "var(--color-primary)08",
            },
          }}
        >
          Close
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}

