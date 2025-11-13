"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { useTheme } from "../../components/ThemeProvider";
import Cookies from "js-cookie";
import { apiUrl } from "../../lib/apiConfig";

const SIDEBAR_SECTIONS = [
  { id: "profile", label: "Profile details", icon: PersonIcon },
  { id: "orders", label: "Orders & history", icon: ShoppingCartIcon },
];

export default function AccountPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState(SIDEBAR_SECTIONS[0].id);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [customerId, setCustomerId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  const statusLabels = {
    1: "Queued",
    2: "In progress",
    3: "Shipping",
    4: "Completed",
  };

  const paymentLabels = {
    1: "Cash on Delivery",
    2: "Credit / Debit Card",
  };

  const formatCurrency = useCallback((value) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      return "Rs. 0.00";
    }
    return `Rs. ${numeric.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, []);

  const formatDateTime = useCallback((value) => {
    if (!value) {
      return "Unknown date";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }
    return date.toLocaleString("en-LK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!customerId) {
      return;
    }

    setOrdersLoading(true);
    setOrdersError(null);

    try {
      const response = await fetch(apiUrl(`ECommerce/GetOnlineOrdersByCustomerId?customerId=${customerId}`));
      if (!response.ok) {
        throw new Error("Failed to load your orders. Please try again.");
      }

      const data = await response.json().catch(() => null);
      if (data?.statusCode && data.statusCode !== 200) {
        throw new Error(data?.message || "Failed to load your orders. Please try again.");
      }
      const results = Array.isArray(data?.result) ? data.result : [];
      setOrders(results);
    } catch (error) {
      setOrdersError(error?.message || "Failed to load your orders. Please try again.");
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    const raw = Cookies.get("authUser");
    if (!raw) {
      router.replace(`/login?redirect=${encodeURIComponent("/account")}`);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const userPayload = parsed?.user?.result ?? parsed?.user ?? {};

      const normalizedFirstName = userPayload.firstName || userPayload.FirstName || "";
      const normalizedLastName = userPayload.lastName || userPayload.LastName || "";
      const normalizedEmail = userPayload.email || userPayload.Email || parsed?.email || "";
      const normalizedPhone =
        userPayload.mobileNo ||
        userPayload.MobileNo ||
        userPayload.mobileNumber ||
        userPayload.MobileNumber ||
        userPayload.phone ||
        userPayload.Phone ||
        "";
      const normalizedAddress =
        userPayload.address ||
        userPayload.Address ||
        userPayload.addressLine1 ||
        userPayload.AddressLine1 ||
        "";
      const normalizedCity = userPayload.city || userPayload.City || userPayload.addressLine2 || userPayload.AddressLine2 || "";
      const normalizedPostal =
        userPayload.postalCode || userPayload.PostalCode || userPayload.zipCode || userPayload.ZipCode || "";

      setProfileData({
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        email: normalizedEmail,
        phone: normalizedPhone ? String(normalizedPhone) : "",
        address: normalizedAddress || "",
        city: normalizedCity || "",
        postalCode: normalizedPostal ? String(normalizedPostal) : "",
      });

      const idFromPayload =
        userPayload.customerId ||
        userPayload.CustomerId ||
        userPayload.id ||
        userPayload.Id ||
        parsed?.customerId ||
        parsed?.userId ||
        null;
      const numericId = Number(idFromPayload);
      setCustomerId(Number.isFinite(numericId) ? numericId : null);
    } catch (error) {
      Cookies.remove("authUser");
      router.replace(`/login?redirect=${encodeURIComponent("/account")}`);
      return;
    } finally {
      setAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    if (!authChecked || !customerId) {
      return;
    }

    fetchOrders();
  }, [authChecked, customerId, fetchOrders]);

  useEffect(() => {
    if (!authChecked || !customerId) {
      return;
    }

    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab, authChecked, customerId, fetchOrders]);

  const initials = useMemo(() => {
    const firstInitial = profileData.firstName?.charAt(0)?.toUpperCase() ?? "";
    const lastInitial = profileData.lastName?.charAt(0)?.toUpperCase() ?? "";
    return `${firstInitial}${lastInitial}` || "OP";
  }, [profileData.firstName, profileData.lastName]);

  const displayName = [profileData.firstName, profileData.lastName].filter(Boolean).join(" ") || "Customer";

  const tileData = useMemo(() => {
    const orderCount = orders.length;
    const activeOrders = orders.filter((order) => (order.orderStatus ?? 0) > 0 && (order.orderStatus ?? 0) < 4).length;
    const totalSpend = orders.reduce((sum, order) => sum + (Number(order.netTotal) || 0), 0);
    const latestOrderDate = orders
      .map((order) => order.createdOn)
      .filter(Boolean)
      .sort((a, b) => new Date(b) - new Date(a))[0];

    const lastOrderText = latestOrderDate ? formatDateTime(latestOrderDate) : null;

    return [
      {
        label: "Orders placed",
        value: orderCount.toString(),
        helper: orderCount ? `Last order ${lastOrderText ?? "recently"}` : "No orders yet",
        icon: ReceiptLongIcon,
        gradient: isDark
          ? "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(56,189,248,0.25))"
          : "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(56,189,248,0.22))",
      },
      {
        label: "Active orders",
        value: activeOrders.toString(),
        helper: activeOrders ? "We're preparing your items" : "All orders completed",
        icon: ShoppingCartIcon,
        gradient: isDark
          ? "linear-gradient(135deg, rgba(251,191,36,0.26), rgba(59,130,246,0.2))"
          : "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(59,130,246,0.16))",
      },
      {
        label: "Lifetime spend",
        value: formatCurrency(totalSpend),
        helper: orderCount ? `${orderCount} order${orderCount > 1 ? "s" : ""} to date` : "Start shopping to build history",
        icon: LoyaltyIcon,
        gradient: isDark
          ? "linear-gradient(135deg, rgba(34,197,94,0.23), rgba(59,130,246,0.2))"
          : "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(59,130,246,0.16))",
      },
    ];
  }, [orders, isDark, formatDateTime, formatCurrency]);

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
  return (
          <Stack spacing={2.5}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 20 }, color: "var(--color-text)" }}>
                Recent orders
              </Typography>
              <Typography sx={{ color: "var(--color-muted-text)", fontSize: 13 }}>
                Track your latest purchases and reorder favourites in one tap.
              </Typography>
            </Box>

            {ordersLoading && (
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ py: 4 }}>
                <CircularProgress size={22} />
                <Typography sx={{ fontSize: 14, color: "var(--color-muted-text)" }}>Loading your orders...</Typography>
              </Stack>
            )}

            {ordersError && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {ordersError}
              </Alert>
            )}

            {!ordersLoading && !ordersError && orders.length === 0 && (
              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "var(--color-border)" }}>
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Stack spacing={1.5} alignItems="center" textAlign="center">
                    <Typography sx={{ fontWeight: 600, color: "var(--color-text)" }}>No orders yet</Typography>
                    <Typography sx={{ color: "var(--color-muted-text)", fontSize: 13, maxWidth: 320 }}>
                      When you place an order, it will appear here with live status updates and item details.
                    </Typography>
                    <Button component={Link} href="/shop" variant="contained" size="small" sx={{ textTransform: "none", fontWeight: 600 }}>
                      Start shopping
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            )}

            {!ordersLoading &&
              !ordersError &&
              orders.map((order) => {
                const lines = Array.isArray(order.lines) ? order.lines : [];
                const itemsCount = lines.reduce((sum, line) => sum + (Number(line.quantity) || 0), 0);
                const statusLabel = statusLabels[order.orderStatus] || "Queued";
                const paymentLabel = paymentLabels[order.paymentOption] || "Payment pending";

                const statusStyles =
                  statusLabel === "Completed"
                    ? { bgcolor: "rgba(34,197,94,0.12)", color: "rgb(21,128,61)" }
                    : statusLabel === "Shipping"
                    ? { bgcolor: "rgba(59,130,246,0.12)", color: "rgb(37,99,235)" }
                    : statusLabel === "In progress"
                    ? { bgcolor: "rgba(251,191,36,0.18)", color: "rgb(161,98,7)" }
                    : { bgcolor: "rgba(148,163,184,0.2)", color: "rgb(71,85,105)" };

                return (
                  <Card
                    key={order.orderId ?? order.orderNo}
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      borderColor: "var(--color-border)",
                      "&:hover": {
                        borderColor: "var(--color-primary)",
                        boxShadow: isDark ? "0 18px 30px rgba(15,23,42,0.32)" : "0 16px 30px rgba(15,23,42,0.12)",
                      },
                      transition: "all 220ms ease",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, md: 2.75 } }}>
                      <Stack spacing={2}>
                        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2}>
                          <Box>
                            <Typography sx={{ fontWeight: 700, color: "var(--color-text)" }}>
                              {order.orderNo || `Order #${order.orderId}`}
                            </Typography>
                            <Typography sx={{ color: "var(--color-muted-text)", fontSize: 13 }}>
                              {formatDateTime(order.createdOn)}
                            </Typography>
          </Box>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip label={statusLabel} size="small" sx={{ fontWeight: 600, ...statusStyles }} />
                            <Chip
                              label={paymentLabel}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                bgcolor: "var(--color-primary)12",
                                color: "var(--color-primary)",
                              }}
                            />
                            <Chip
                              label={`${itemsCount || lines.length} item${(itemsCount || lines.length) === 1 ? "" : "s"}`}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                bgcolor: "var(--color-surface)",
                                color: "var(--color-muted-text)",
                              }}
                            />
                          </Stack>
                        </Stack>

                        <Grid container spacing={{ xs: 2, md: 3 }}>
                          <Grid item xs={12} md={4}>
                            <Stack spacing={0.6}>
                              <Typography
          sx={{
                                  fontSize: 12,
                                  color: "var(--color-muted-text)",
                                  textTransform: "uppercase",
                                  letterSpacing: 0.4,
                                }}
                              >
                                Order totals
                              </Typography>
                              <Typography sx={{ fontWeight: 600, color: "var(--color-text)" }}>
                                Net total: {formatCurrency(order.netTotal)}
                              </Typography>
                              <Typography sx={{ color: "var(--color-muted-text)", fontSize: 13 }}>
                                Subtotal {formatCurrency(order.subTotal)} · Delivery {formatCurrency(order.deliveryCharge)}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <Stack spacing={1.2}>
                              <Typography
            sx={{
                                  fontSize: 12,
                                  color: "var(--color-muted-text)",
                                  textTransform: "uppercase",
                                  letterSpacing: 0.4,
                                }}
                              >
                                Items in this order
                              </Typography>
                              {lines.length > 0 ? (
                                <Stack spacing={1.2}>
                                  {lines.map((line, index) => (
                                    <Stack
                                      key={line.lineId ?? `${order.orderId}-${index}`}
                                      direction={{ xs: "column", sm: "row" }}
                                      spacing={{ xs: 0.5, sm: 1.5 }}
                                      justifyContent="space-between"
                                    >
                                      <Typography sx={{ fontWeight: 600, color: "var(--color-text)" }}>
                                        {line.productName || `Item ${index + 1}`}
                                      </Typography>
                                      <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Typography sx={{ color: "var(--color-muted-text)", fontSize: 13 }}>
                                          Qty {Number(line.quantity) || 0}
                                        </Typography>
                                        <Typography sx={{ color: "var(--color-text)", fontWeight: 600 }}>
                                          {formatCurrency(line.lineTotal ?? line.price)}
                                        </Typography>
                                      </Stack>
                                    </Stack>
                                  ))}
                                </Stack>
                              ) : (
                                <Typography sx={{ color: "var(--color-muted-text)", fontSize: 13 }}>
                                  Item details are not available for this order.
                                </Typography>
                              )}
                            </Stack>
                          </Grid>
                        </Grid>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
          </Stack>
        );
      case "profile":
      default:
        return (
          <Stack spacing={2.5}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 20 }, color: "var(--color-text)" }}>
                Profile details
              </Typography>
              <Typography sx={{ color: "var(--color-muted-text)", fontSize: 13 }}>
                Review the contact information linked to your account.
              </Typography>
            </Box>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                borderColor: "var(--color-border)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography sx={{ fontWeight: 600, color: "var(--color-text)", mb: 2 }}>
                  Contact overview
                </Typography>
                <Stack spacing={2.2}>
                  {[
                    {
                      icon: PersonIcon,
                      label: "Customer name",
                      value: displayName || "Customer",
                    },
                    {
                      icon: EmailIcon,
                      label: "Email",
                      value: profileData.email || "Not provided",
                    },
                    {
                      icon: PhoneIcon,
                      label: "Mobile number",
                      value: profileData.phone || "Not provided",
                    },
                    {
                      icon: LocationOnIcon,
                      label: "Primary address",
                      value:
                        [profileData.address, profileData.city, profileData.postalCode].filter(Boolean).join(", ") ||
                        "Not provided",
                    },
                  ].map((entry) => {
                    const IconComponent = entry.icon;
                    return (
                      <Stack key={entry.label} direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1.8,
                            background: "var(--color-primary)12",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                            color: "var(--color-primary)",
                      }}
                    >
                          <IconComponent sx={{ fontSize: 18 }} />
                    </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: 13, color: "var(--color-muted-text)" }}>
                            {entry.label}
                          </Typography>
                          <Typography sx={{ color: "var(--color-text)", fontSize: 14, fontWeight: 600 }}>
                            {entry.value}
                    </Typography>
                  </Box>
                      </Stack>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        );
    }
  };

  if (!authChecked) {
    return null;
  }

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
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={3}>
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: 3,
                      border: "1px solid var(--color-border)",
                  boxShadow: isDark ? "0 16px 34px rgba(15,23,42,0.32)" : "0 18px 34px rgba(15,23,42,0.12)",
                    }}
                  >
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar
                      sx={{
                        width: 90,
                        height: 90,
                        fontSize: 36,
                        fontWeight: 700,
                        background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                      }}
                    >
                      {initials}
                    </Avatar>
                    <Stack spacing={0.6} alignItems="center" textAlign="center">
                      <Typography sx={{ fontWeight: 700, fontSize: 17, color: "var(--color-text)" }}>{displayName}</Typography>
                      <Typography sx={{ color: "var(--color-muted-text)", fontSize: 13 }}>{profileData.email}</Typography>
                      {profileData.phone && (
                        <Typography sx={{ color: "var(--color-muted-text)", fontSize: 13 }}>{profileData.phone}</Typography>
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                      sx={{
                  borderRadius: 3,
                  border: "1px solid var(--color-border)",
                  boxShadow: isDark ? "0 12px 28px rgba(15,23,42,0.24)" : "0 14px 28px rgba(15,23,42,0.1)",
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                  <Typography sx={{ fontWeight: 600, color: "var(--color-muted-text)", mb: 1.5, fontSize: 13 }}>
                    Navigation
                  </Typography>
                  <List>
                    {SIDEBAR_SECTIONS.map((section) => {
                      const SectionIcon = section.icon;
                      const selected = activeTab === section.id;
                      return (
                        <ListItem key={section.id} disablePadding>
                          <ListItemButton
                            selected={selected}
                            onClick={() => {
                              setActiveTab(section.id);
                    }}
                    sx={{
                          borderRadius: 2,
                              mb: 0.5,
                              "&.Mui-selected": {
                                bgcolor: "var(--color-primary)15",
                                color: "var(--color-primary)",
                                "&:hover": { bgcolor: "var(--color-primary)18" },
                              },
                          "&:hover": {
                            bgcolor: "var(--color-primary)08",
                          },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 36, color: selected ? "var(--color-primary)" : "var(--color-muted-text)" }}>
                              <SectionIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={section.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 13.5 }} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
              </CardContent>
            </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} md={9}>
            <Stack spacing={3}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {tileData.map((tile) => {
                  const TileIcon = tile.icon;
                  return (
                    <Grid item xs={12} md={4} key={tile.label}>
            <Card
              sx={{
                          borderRadius: 3,
                border: "1px solid var(--color-border)",
                          background: tile.gradient,
                          backdropFilter: "blur(10px)",
                          boxShadow: isDark ? "0 18px 36px rgba(15,23,42,0.32)" : "0 20px 40px rgba(15,23,42,0.12)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                          <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                background: "var(--color-surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                                color: "var(--color-primary)",
                                boxShadow: isDark ? "0 8px 20px rgba(15,23,42,0.45)" : "0 10px 20px rgba(15,23,42,0.12)",
                    }}
                  >
                              <TileIcon sx={{ fontSize: 24 }} />
                  </Box>
                            <Box>
                              <Typography sx={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.4, color: "var(--color-muted-text)" }}>
                                {tile.label}
                  </Typography>
                              <Typography sx={{ fontWeight: 700, fontSize: 22, color: "var(--color-text)" }}>{tile.value}</Typography>
                              <Typography sx={{ fontSize: 12, color: "var(--color-muted-text)" }}>{tile.helper}</Typography>
                </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              <Card
                        sx={{
                  borderRadius: 3,
                          border: "1px solid var(--color-border)",
                  boxShadow: isDark ? "0 14px 34px rgba(15,23,42,0.28)" : "0 18px 34px rgba(15,23,42,0.12)",
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>{renderContent()}</CardContent>
            </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

