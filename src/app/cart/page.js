"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTheme } from "../../components/ThemeProvider";
import { useCart } from "@/context/CartContext";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CartPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { items, updateItemQuantity, removeItem, subtotal } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const readAuthCookie = useCallback(() => {
    try {
      const raw = Cookies.get("authUser");
      if (!raw) {
        setIsAuthenticated(false);
        return;
      }
      JSON.parse(raw);
      setIsAuthenticated(true);
    } catch (error) {
      Cookies.remove("authUser");
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    readAuthCookie();
    window.addEventListener("auth-changed", readAuthCookie);
    return () => window.removeEventListener("auth-changed", readAuthCookie);
  }, [readAuthCookie]);

  const handleQuantityChange = (id, change) => {
    const item = items.find((entry) => String(entry.id) === String(id));
    if (!item) return;
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateItemQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=/checkout");
    }
  };

  const totalDiscount = items.reduce((sum, item) => {
    const original = item.originalPrice ?? item.price ?? 0;
    const current = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    return sum + Math.max(0, original - current) * quantity;
  }, 0);
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--color-background)",
        pt: { xs: 12, md: 14 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Button
            component={Link}
            href="/shop"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "var(--color-text)",
              textTransform: "none",
              mb: 3,
              px: 2,
              py: 1,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "var(--color-surface)",
                color: "var(--color-primary)",
              },
              transition: "all 200ms ease",
            }}
          >
            Continue Shopping
          </Button>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "var(--color-text)",
                  mb: 0.5,
                  fontSize: { xs: 24, md: 32 },
                }}
              >
                Shopping Cart
              </Typography>
              <Typography variant="body1" sx={{ color: "var(--color-muted-text)", fontSize: { xs: 14, md: 16 } }}>
                {items.length} item{items.length !== 1 ? "s" : ""} in your cart
              </Typography>
            </Box>
          </Box>
        </Box>

        {items.length === 0 ? (
          // Empty Cart State
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 8, md: 12 },
            }}
          >
            <Box
              sx={{
                width: { xs: 120, md: 160 },
                height: { xs: 120, md: 160 },
                borderRadius: "50%",
                background: `linear-gradient(135deg, var(--color-primary)15, var(--color-secondary)10)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                mb: 4,
              }}
            >
              <ShoppingCartIcon
                sx={{
                  fontSize: { xs: 64, md: 80 },
                  color: "var(--color-primary)",
                  opacity: 0.6,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: "var(--color-text)",
                mb: 1.5,
                fontWeight: 600,
                fontSize: { xs: 22, md: 28 },
              }}
            >
              Your cart is empty
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "var(--color-muted-text)",
                mb: 4,
                fontSize: { xs: 15, md: 17 },
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Start shopping to add items to your cart and checkout when you're ready.
            </Typography>
            <Button
              component={Link}
              href="/shop"
              variant="contained"
              sx={{
                bgcolor: "var(--color-primary)",
                color: "white",
                textTransform: "none",
                fontWeight: 700,
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontSize: { xs: 15, md: 16 },
                boxShadow: "0 4px 12px rgba(0, 119, 182, 0.3)",
                "&:hover": {
                  bgcolor: "var(--color-secondary)",
                  boxShadow: "0 6px 16px rgba(0, 119, 182, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 250ms ease",
              }}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 3 },
              width: "100%",
            }}
          >
            {/* Cart Items */}
            <Box
              sx={{
                flex: { xs: "0 0 100%", md: "0 0 calc(66.666% - 12px)" },
                width: { xs: "100%", md: "calc(66.666% - 12px)" },
                minWidth: 0,
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 3,
                  boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {items.map((item, index) => (
                    <Box key={item.id}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: 2, md: 3 },
                          p: { xs: 2, md: 3 },
                          transition: "background 200ms ease",
                          "&:hover": {
                            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                          },
                        }}
                      >
                        {/* Product Image */}
                        <Box
                          sx={{
                            position: "relative",
                            width: { xs: 100, md: 140 },
                            height: { xs: 100, md: 140 },
                            flexShrink: 0,
                            borderRadius: 2,
                            overflow: "hidden",
                            background: "var(--color-background)",
                            border: "1px solid var(--color-border)",
                            boxShadow: isDark ? "0 2px 4px rgba(0,0,0,0.2)" : "0 2px 4px rgba(0,0,0,0.08)",
                          }}
                        >
                          <img
                            src={item.image || "/images/no-image.jpg"}
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = "/images/no-image.jpg";
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          {item.originalPrice > item.price && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: 8,
                                left: 8,
                                bgcolor: "var(--color-primary)",
                                color: "white",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: 10,
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                              }}
                            >
                              <LocalOfferIcon sx={{ fontSize: 12 }} />
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                            </Box>
                          )}
                        </Box>

                        {/* Product Details */}
                        <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: "var(--color-text)",
                                fontSize: { xs: 15, md: 17 },
                                mb: 0.5,
                                lineHeight: 1.3,
                              }}
                            >
                              {item.name}
                            </Typography>
                            {(() => {
                              const detailLine =
                                item.dosage ??
                                item.raw?.dosage ??
                                item.raw?.code ??
                                item.raw?.description ??
                                "";
                              if (!detailLine) {
                                return null;
                              }
                              return (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "var(--color-muted-text)",
                                    fontSize: { xs: 12, md: 13 },
                                    mb: 1.5,
                                  }}
                                >
                                  {detailLine}
                                </Typography>
                              );
                            })()}

                            {/* Price */}
                            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 2.5, flexWrap: "wrap" }}>
                              <Typography
                                sx={{
                                  fontSize: { xs: 17, md: 19 },
                                  fontWeight: 700,
                                  color: "var(--color-primary)",
                                }}
                              >
                                Rs. {item.price.toLocaleString()}
                              </Typography>
                              {item.originalPrice > item.price && (
                                <>
                                  <Typography
                                    sx={{
                                      fontSize: { xs: 13, md: 14 },
                                      color: "var(--color-muted-text)",
                                      textDecoration: "line-through",
                                    }}
                                  >
                                    Rs. {item.originalPrice.toLocaleString()}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: { xs: 11, md: 12 },
                                      color: "var(--color-primary)",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Save Rs. {(item.originalPrice - item.price).toLocaleString()}
                                  </Typography>
                                </>
                              )}
                            </Box>
                          </Box>

                          {/* Quantity Controls and Actions */}
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                            {/* Quantity Controls */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "var(--color-muted-text)",
                                  fontSize: { xs: 12, md: 13 },
                                  mr: 1,
                                }}
                              >
                                Qty:
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                disabled={item.quantity <= 1}
                                sx={{
                                  border: "1px solid var(--color-border)",
                                  color: "var(--color-text)",
                                  width: 36,
                                  height: 36,
                                  "&:hover": {
                                    borderColor: "var(--color-primary)",
                                    bgcolor: "var(--color-primary)15",
                                    color: "var(--color-primary)",
                                  },
                                  "&:disabled": {
                                    opacity: 0.4,
                                  },
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <TextField
                                value={item.quantity}
                                inputProps={{
                                  readOnly: true,
                                  style: {
                                    textAlign: "center",
                                    padding: "6px 8px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                  },
                                }}
                                sx={{
                                  width: 64,
                                  "& .MuiOutlinedInput-root": {
                                    background: "var(--color-surface)",
                                    "& fieldset": {
                                      borderColor: "var(--color-border)",
                                    },
                                  },
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                sx={{
                                  border: "1px solid var(--color-border)",
                                  color: "var(--color-text)",
                                  width: 36,
                                  height: 36,
                                  "&:hover": {
                                    borderColor: "var(--color-primary)",
                                    bgcolor: "var(--color-primary)15",
                                    color: "var(--color-primary)",
                                  },
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>

                            {/* Item Total and Remove */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "var(--color-muted-text)",
                                    fontSize: { xs: 11, md: 12 },
                                    mb: 0.5,
                                  }}
                                >
                                  Item Total
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 700,
                                    color: "var(--color-primary)",
                                    fontSize: { xs: 16, md: 18 },
                                  }}
                                >
                                  Rs. {(item.price * item.quantity).toLocaleString()}
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={() => handleRemoveItem(item.id)}
                                sx={{
                                  color: "var(--color-muted-text)",
                                  border: "1px solid var(--color-border)",
                                  width: { xs: 36, md: 40 },
                                  height: { xs: 36, md: 40 },
                                  "&:hover": {
                                    color: "error.main",
                                    borderColor: "error.main",
                                    bgcolor: "error.10",
                                  },
                                  transition: "all 200ms ease",
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {index < items.length - 1 && (
                        <Divider sx={{ borderColor: "var(--color-border)", mx: { xs: 2, md: 3 } }} />
                      )}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>

            {/* Order Summary */}
            <Box
              sx={{
                flex: { xs: "0 0 100%", md: "0 0 calc(33.333% - 12px)" },
                width: { xs: "100%", md: "calc(33.333% - 12px)" },
                minWidth: 0,
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 3,
                  boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                  position: { md: "sticky" },
                  top: { md: 100 },
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      mb: 3,
                      fontSize: { xs: 17, md: 19 },
                      pb: 2,
                      borderBottom: "2px solid var(--color-border)",
                    }}
                  >
                    Order Summary
                  </Typography>

                  {/* Price Breakdown */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ color: "var(--color-muted-text)", fontSize: { xs: 13, md: 14 } }}>
                        Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})
                      </Typography>
                      <Typography variant="body2" sx={{ color: "var(--color-text)", fontWeight: 600, fontSize: { xs: 14, md: 15 } }}>
                        Rs. {subtotal.toLocaleString()}
                      </Typography>
                    </Box>

                    {totalDiscount > 0 && (
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ color: "var(--color-primary)", fontWeight: 600, fontSize: { xs: 13, md: 14 } }}>
                          Discount
                        </Typography>
                        <Typography variant="body2" sx={{ color: "var(--color-primary)", fontWeight: 700, fontSize: { xs: 14, md: 15 } }}>
                          -Rs. {totalDiscount.toLocaleString()}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ color: "var(--color-muted-text)", fontSize: { xs: 13, md: 14 } }}>
                        Shipping
                      </Typography>
                      <Typography variant="body2" sx={{ color: shipping === 0 ? "var(--color-primary)" : "var(--color-text)", fontWeight: 600, fontSize: { xs: 14, md: 15 } }}>
                        {shipping === 0 ? "Free" : `Rs. ${shipping.toLocaleString()}`}
                      </Typography>
                    </Box>

                  <Divider sx={{ borderColor: "var(--color-border)", my: 1 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "var(--color-text)", fontSize: { xs: 18, md: 20 } }}
                      >
                        Total
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: "var(--color-primary)", fontSize: { xs: 20, md: 24 } }}
                      >
                        Rs. {total.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Free Shipping Message */}
                  {subtotal < 2000 && (
                    <Box
                      sx={{
                        p: 1.5,
                        mb: 3,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, var(--color-primary)15, var(--color-secondary)10)`,
                        border: "1px solid var(--color-primary)30",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--color-primary)",
                          fontSize: { xs: 12, md: 13 },
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        🎁 Add Rs. {(2000 - subtotal).toLocaleString()} more for free shipping!
                      </Typography>
                    </Box>
                  )}

                  {/* Checkout Button */}
                  <Button
                    onClick={handleCheckout}
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "var(--color-primary)",
                      color: "white",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: { xs: 15, md: 16 },
                      py: { xs: 1.5, md: 1.75 },
                      mb: 2,
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(0, 119, 182, 0.3)",
                      "&:hover": {
                        bgcolor: "var(--color-secondary)",
                        boxShadow: "0 6px 16px rgba(0, 119, 182, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 250ms ease",
                    }}
                  >
                    Proceed to Checkout
                  </Button>

                  {/* Continue Shopping */}
                  <Button
                    component={Link}
                    href="/shop"
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                      textTransform: "none",
                      fontWeight: 600,
                      py: { xs: 1.2, md: 1.5 },
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "var(--color-primary)",
                        color: "var(--color-primary)",
                        bgcolor: "var(--color-primary)08",
                      },
                      transition: "all 250ms ease",
                    }}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

