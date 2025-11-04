"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTheme } from "../../components/ThemeProvider";

export default function CheckoutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // Sample order summary (in real app, this would come from cart/state)
  const subtotal = 12500;
  const shipping = 500;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout submission
    console.log("Checkout submitted", { shippingAddress, paymentMethod });
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
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "var(--color-text)",
              fontSize: { xs: 24, md: 28 },
              mb: 1,
            }}
          >
            Checkout
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--color-muted-text)",
              fontSize: { xs: 13, md: 14 },
            }}
          >
            Complete your order by filling in the details below
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* Left Column - Form */}
          <Box sx={{ flex: { xs: "0 0 100%", md: "0 0 calc(66.666% - 16px)" } }}>
            {/* Shipping Address */}
            <Card
              sx={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                mb: 3,
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                  <LocalShippingIcon sx={{ color: "var(--color-primary)", fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    Shipping Address
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon sx={{ color: "var(--color-muted-text)", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "var(--color-background)",
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

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon sx={{ color: "var(--color-muted-text)", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "var(--color-background)",
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
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "var(--color-muted-text)", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "var(--color-background)",
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

                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "var(--color-background)",
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

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="City"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "var(--color-background)",
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
                    <TextField
                      fullWidth
                      label="Postal Code"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "var(--color-background)",
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
                </Box>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card
              sx={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                  <CreditCardIcon sx={{ color: "var(--color-primary)", fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    Payment Method
                  </Typography>
                </Box>

                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel
                      value="card"
                      control={
                        <Radio
                          sx={{
                            color: "var(--color-primary)",
                            "&.Mui-checked": {
                              color: "var(--color-primary)",
                            },
                          }}
                        />
                      }
                      label="Credit/Debit Card"
                      sx={{
                        color: "var(--color-text)",
                        mb: 2,
                        p: 2,
                        border: paymentMethod === "card" ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                        borderRadius: 2,
                        transition: "all 200ms ease",
                      }}
                    />
                    <FormControlLabel
                      value="cod"
                      control={
                        <Radio
                          sx={{
                            color: "var(--color-primary)",
                            "&.Mui-checked": {
                              color: "var(--color-primary)",
                            },
                          }}
                        />
                      }
                      label="Cash on Delivery"
                      sx={{
                        color: "var(--color-text)",
                        mb: 2,
                        p: 2,
                        border: paymentMethod === "cod" ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                        borderRadius: 2,
                        transition: "all 200ms ease",
                      }}
                    />
                    <FormControlLabel
                      value="bank"
                      control={
                        <Radio
                          sx={{
                            color: "var(--color-primary)",
                            "&.Mui-checked": {
                              color: "var(--color-primary)",
                            },
                          }}
                        />
                      }
                      label="Bank Transfer"
                      sx={{
                        color: "var(--color-text)",
                        p: 2,
                        border: paymentMethod === "bank" ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                        borderRadius: 2,
                        transition: "all 200ms ease",
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Order Summary */}
          <Box sx={{ flex: { xs: "0 0 100%", md: "0 0 calc(33.333% - 16px)" } }}>
            <Card
              sx={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                position: { md: "sticky" },
                top: { md: 100 },
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

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ color: "var(--color-muted-text)", fontSize: { xs: 13, md: 14 } }}>
                      Subtotal
                    </Typography>
                    <Typography variant="body2" sx={{ color: "var(--color-text)", fontWeight: 600, fontSize: { xs: 14, md: 15 } }}>
                      Rs. {subtotal.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ color: "var(--color-muted-text)", fontSize: { xs: 13, md: 14 } }}>
                      Shipping
                    </Typography>
                    <Typography variant="body2" sx={{ color: "var(--color-text)", fontWeight: 600, fontSize: { xs: 14, md: 15 } }}>
                      Rs. {shipping.toLocaleString()}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: "var(--color-border)", my: 1 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--color-text)", fontSize: { xs: 16, md: 18 } }}>
                      Total
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--color-primary)", fontSize: { xs: 16, md: 18 } }}>
                      Rs. {total.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "var(--color-primary)",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: { xs: 15, md: 16 },
                    py: { xs: 1.5, md: 1.75 },
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 119, 182, 0.3)",
                    "&:hover": {
                      bgcolor: "var(--color-secondary)",
                      boxShadow: "0 6px 16px rgba(0, 119, 182, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 250ms ease",
                    mb: 2,
                  }}
                >
                  Place Order
                </Button>

                <Button
                  component={Link}
                  href="/cart"
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
                  Back to Cart
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

