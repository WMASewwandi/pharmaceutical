"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Divider,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTheme } from "../../components/ThemeProvider";
import Cookies from "js-cookie";
import { apiUrl } from "../../lib/apiConfig";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartContext";

const initialAddressState = {
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  postalCode: "",
  email: "",
  mobileNumber: "",
  landmark: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { items, subtotal: cartSubtotal, clearCart } = useCart();
  const isDark = theme === "dark";
  const [authChecked, setAuthChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("2");
  const [customerId, setCustomerId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(initialAddressState);
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressesError, setAddressesError] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [addressForm, setAddressForm] = useState(initialAddressState);
  const [addressFormError, setAddressFormError] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const [addressSaving, setAddressSaving] = useState(false);

  useEffect(() => {
    const raw = Cookies.get("authUser");
    if (!raw) {
      router.replace(`/login?redirect=${encodeURIComponent("/checkout")}`);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const userPayload = parsed?.user;
      const user = userPayload?.result ?? userPayload ?? {};
      const email = user.email || user.Email || parsed?.email || "";
      const mobile = user.mobileNumber || user.MobileNumber || "";
      const addressLine1 = user.addressLine1 || user.AddressLine1 || user.address || user.Address || "";
      const addressLine2 = user.addressLine2 || user.AddressLine2 || "";
      const addressLine3 = user.addressLine3 || user.AddressLine3 || user.city || user.City || "";
      const postalCode = user.postalCode || user.PostalCode || "";
      const landmark = user.landmark || user.Landmark || "";

      setShippingAddress((prev) => ({
        addressLine1: addressLine1 || prev.addressLine1,
        addressLine2: addressLine2 || prev.addressLine2,
        addressLine3: addressLine3 || prev.addressLine3,
        postalCode: postalCode || prev.postalCode,
        email: email || prev.email,
        mobileNumber: mobile || prev.mobileNumber,
        landmark: landmark || prev.landmark,
      }));

      setAddressForm((prev) => ({
        addressLine1: addressLine1 || prev.addressLine1,
        addressLine2: addressLine2 || prev.addressLine2,
        addressLine3: addressLine3 || prev.addressLine3,
        postalCode: postalCode || prev.postalCode,
        email: email || prev.email,
        mobileNumber: mobile || prev.mobileNumber,
        landmark: landmark || prev.landmark,
      }));

      const derivedCustomerId = user.id ?? null;

      setCustomerId(derivedCustomerId);
    } catch (error) {
      Cookies.remove("authUser");
      router.replace(`/login?redirect=${encodeURIComponent("/checkout")}`);
      return;
    } finally {
      setAuthChecked(true);
    }
  }, [router]);

  const applyShippingAddress = useCallback((address) => {
    setShippingAddress({
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      addressLine3: address.addressLine3 || "",
      postalCode: address.postalCode || "",
      email: address.email || "",
      mobileNumber: address.mobileNumber || "",
      landmark: address.landmark || "",
    });
  }, []);

  const fetchAddresses = useCallback(
    async (preselectId) => {
      if (!customerId) {
        setAddresses([]);
        setSelectedAddressId("");
        return [];
      }

      setAddressesLoading(true);
      setAddressesError(null);

      try {
        const response = await fetch(
          apiUrl(`ECommerce/GetAllCheckoutAddressByCustomerId?customerId=${customerId}`)
        );
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          const message =
            (data && (data.message || data.error || data.Message || data?.title)) ||
            "Unable to load saved addresses.";
          throw new Error(message);
        }

        const rawList = Array.isArray(data?.result)
          ? data.result
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.value)
          ? data.value
          : Array.isArray(data)
          ? data
          : [];

        const mapped = rawList
          .map((item, index) => {
            const idValue =
              item?.id ??
              item?.Id ??
              item?.addressId ??
              item?.AddressId ??
              item?.checkoutAddressId ??
              item?.CheckoutAddressId ??
              `addr_${Date.now()}_${index}`;
            return {
              id: String(idValue),
              addressLine1: item?.addressLine1 ?? item?.AddressLine1 ?? "",
              addressLine2: item?.addressLine2 ?? item?.AddressLine2 ?? "",
              addressLine3: item?.addressLine3 ?? item?.AddressLine3 ?? "",
              postalCode: item?.postalCode ?? item?.PostalCode ?? "",
              email: item?.email ?? item?.Email ?? "",
              mobileNumber: item?.mobileNo ?? item?.MobileNo ?? item?.mobileNumber ?? item?.MobileNumber ?? "",
              landmark: item?.landmark ?? item?.Landmark ?? "",
            };
          })
          .filter((entry) => entry.addressLine1 && entry.addressLine2 && entry.postalCode);

        setAddresses(mapped);

        if (mapped.length > 0) {
          const preferredId = preselectId != null ? String(preselectId) : null;
          const preferred =
            (preferredId && mapped.find((entry) => entry.id === preferredId)) ?? mapped[mapped.length - 1];
          setSelectedAddressId(preferred.id);
          applyShippingAddress(preferred);
        } else {
          setSelectedAddressId("");
        }

        return mapped;
      } catch (error) {
        const message = error?.message || "Unable to load saved addresses.";
        setAddresses([]);
        setSelectedAddressId("");
        setAddressesError(message);
        return [];
      } finally {
        setAddressesLoading(false);
      }
    },
    [customerId, applyShippingAddress]
  );

  useEffect(() => {
    if (!authChecked || !customerId) return;
    fetchAddresses();
  }, [authChecked, customerId, fetchAddresses]);

  const handlePaymentChange = (event) => setPaymentMethod(event.target.value);

  const handleSelectAddress = (addressId) => {
    const normalizedId = addressId ? String(addressId) : "";
    if (!normalizedId) {
      setSelectedAddressId("");
      return;
    }
    const selected = addresses.find((entry) => entry.id === normalizedId);
    if (!selected) {
      setSelectedAddressId("");
      return;
    }
    setSelectedAddressId(normalizedId);
    applyShippingAddress(selected);
    setCheckoutError(null);
  };

  const openAddressDialog = () => {
    setAddressForm({
      addressLine1: shippingAddress.addressLine1,
      addressLine2: shippingAddress.addressLine2,
      addressLine3: shippingAddress.addressLine3,
      postalCode: shippingAddress.postalCode,
      email: shippingAddress.email,
      mobileNumber: shippingAddress.mobileNumber,
      landmark: shippingAddress.landmark,
    });
    setAddressFormError(null);
    setAddressDialogOpen(true);
  };

  const closeAddressDialog = () => {
    setAddressDialogOpen(false);
  };

  const handleAddressFormChange = (field) => (event) => {
    setAddressForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAddressFormSubmit = async () => {
    if (addressSaving) {
      return;
    }
    if (!addressForm.addressLine1.trim() || !addressForm.addressLine2.trim() || !addressForm.postalCode.trim()) {
      setAddressFormError("Address line 1, address line 2, and postal code are required.");
      return;
    }
    if (!addressForm.email.trim() || !addressForm.mobileNumber.trim()) {
      setAddressFormError("Email and mobile number are required.");
      return;
    }
    if (!customerId) {
      setAddressFormError("Missing customer details. Please sign in again.");
      return;
    }

    const payload = {
      CustomerId: customerId,
      AddressLine1: addressForm.addressLine1.trim(),
      AddressLine2: addressForm.addressLine2.trim(),
      AddressLine3: addressForm.addressLine3.trim(),
      MobileNo: addressForm.mobileNumber.trim(),
      Email: addressForm.email.trim(),
      PostalCode: addressForm.postalCode.trim(),
      IsActive: true,
    };

    setAddressSaving(true);

    try {
      const response = await fetch(apiUrl("ECommerce/CreateCheckoutAddress"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          (data && (data.message || data.error || data.Message || data?.title)) ||
          "We couldn’t save your address. Please try again.";
        throw new Error(message);
      }

      const addressId =
        data?.id ??
        data?.Id ??
        data?.addressId ??
        data?.AddressId ??
        data?.resultId ??
        `addr_${Date.now()}`;

      const newAddressId = String(addressId);
      const refreshed = await fetchAddresses(newAddressId);
      if (!refreshed || refreshed.length === 0) {
        applyShippingAddress({
          addressLine1: payload.AddressLine1,
          addressLine2: payload.AddressLine2,
          addressLine3: payload.AddressLine3,
          postalCode: payload.PostalCode,
          email: payload.Email,
          mobileNumber: payload.MobileNo,
          landmark: addressForm.landmark.trim(),
          id: newAddressId,
        });
        setSelectedAddressId(newAddressId);
      }
      setAddressDialogOpen(false);
      setCheckoutError(null);
      setAddressForm(initialAddressState);
      Swal.fire({
        icon: "success",
        title: "Address saved",
        text: "Your new delivery address has been added.",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (error) {
      const message = error?.message || "Failed to save the address. Please try again.";
      setAddressFormError(message);
      Swal.fire({
        icon: "error",
        title: "Couldn’t save address",
        text: message,
      });
    } finally {
      setAddressSaving(false);
    }
  };

  const savedAddressList = useMemo(
    () =>
      addresses.map((address) => ({
        ...address,
        displayLines: [
          address.addressLine2,
          address.addressLine3,
          address.postalCode ? `Postal Code: ${address.postalCode}` : null,
          address.landmark ? `Landmark: ${address.landmark}` : null,
          address.mobileNumber ? `Mobile: ${address.mobileNumber}` : null,
          address.email ? `Email: ${address.email}` : null,
        ].filter(Boolean),
      })),
    [addresses]
  );

  const subtotalValue = cartSubtotal ?? 0;
  const shipping = subtotalValue > 2000 ? 0 : 150;
  const total = subtotalValue + shipping;

  const handleSubmit = (event) => {
    event.preventDefault();
    setCheckoutError(null);
    if (!selectedAddressId) {
      setCheckoutError("Select a delivery address before placing your order.");
      return;
    }

    const requiredFields = ["addressLine1", "addressLine2", "postalCode", "email", "mobileNumber"];
    const missingField = requiredFields.find((field) => !shippingAddress[field]?.trim());
    if (missingField) {
      setCheckoutError("The selected address is missing required details. Please add or choose another address.");
      return;
    }

    if (!items || items.length === 0) {
      setCheckoutError("Your cart is empty. Please add items before placing an order.");
      return;
    }

    const orderNumber = `ORD-${Math.floor(Math.random() * 900000 + 100000)}`;
    const deliveryCharge = shipping;
    const discountRate = 0;
    const discountAmount = 0;
    const netTotal = subtotalValue + deliveryCharge - discountAmount;

    const orderPayload = {
      OrderNo: orderNumber,
      CustomerId: customerId,
      CheckoutAddressId: parseInt(selectedAddressId),
      SubTotal: Number(subtotalValue.toFixed(2)),
      DeliveryCharge: Number(deliveryCharge.toFixed(2)),
      NetTotal: Number(netTotal.toFixed(2)),
      DiscountRate: discountRate,
      DiscountAmount: discountAmount,
      OrderStatus: 1,
      PaymentOption: Number(paymentMethod),
      Lines: items.map((item) => ({
        ProductId: item.id ?? item.productId ?? item.ProductId ?? Math.floor(Math.random() * 100000),
        ProductName: item.name ?? item.ProductName ?? item.title ?? "Unknown Item",
        Price: Number((item.price ?? 0).toFixed(2)),
        Quantity: item.quantity ?? 1,
        LineTotal: Number(((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)),
      })),
    };
    

    Swal.fire({
      icon: "info",
      title: "Placing order",
      text: "Please wait while we place your order.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch(apiUrl("ECommerce/CreateOnlineOrder"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          const message =
            (data && (data.message || data.error || data.Message || data?.title)) ||
            "We couldn’t place your order. Please try again.";
          throw new Error(message);
        }
        clearCart();
        Swal.fire({
          icon: "success",
          title: "Order placed",
          text: "Your order has been placed successfully.",
          showConfirmButton: false,
          timer: 2200,
          willClose: () => {
            router.push("/");
          },
        });
      })
      .catch((error) => {
        const message = error?.message || "We couldn’t place your order. Please try again.";
        Swal.fire({
          icon: "error",
          title: "Order failed",
          text: message,
        });
      });
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
          <Box sx={{ flex: { xs: "0 0 100%", md: "0 0 calc(66.666% - 16px)" } }}>
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
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} mb={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
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
                  </Stack>
                  <Button variant="outlined" size="small" onClick={openAddressDialog}>
                    Add Address
                  </Button>
                </Stack>

                {(savedAddressList.length > 0 || addressesLoading || addressesError) && (
                  <Box
                    sx={{
                      border: "1px solid var(--color-border)",
                      borderRadius: 2,
                      p: 2,
                      mb: 3,
                      background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: "var(--color-text)", mb: 1, fontSize: 14 }}>
                      Saved addresses
                    </Typography>
                    {addressesLoading && (
                      <Typography sx={{ fontSize: 13, color: "var(--color-muted-text)" }}>Loading addresses...</Typography>
                    )}
                    {addressesError && (
                      <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }}>
                        {addressesError}
                      </Alert>
                    )}
                    {!addressesLoading && !addressesError && savedAddressList.length === 0 && (
                      <Typography sx={{ fontSize: 13, color: "var(--color-muted-text)" }}>
                        You haven&apos;t added any delivery addresses yet.
                      </Typography>
                    )}
                    {savedAddressList.length > 0 && !addressesLoading && (
                      <RadioGroup value={selectedAddressId} onChange={(event) => handleSelectAddress(event.target.value)}>
                        {savedAddressList.map((address) => (
                          <Box
                            key={address.id}
                      sx={{
                              display: "flex",
                              gap: 1.5,
                              border: "1px solid var(--color-border)",
                              borderRadius: 2,
                              p: 1.5,
                              mb: 1.5,
                              alignItems: "flex-start",
                              background:
                                selectedAddressId === address.id ? "var(--color-primary)08" : "var(--color-background)",
                            }}
                          >
                            <Radio
                              value={address.id}
                              checked={selectedAddressId === address.id}
                      sx={{
                                color: "var(--color-primary)",
                                "&.Mui-checked": {
                                  color: "var(--color-primary)",
                        },
                      }}
                    />
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontWeight: 600, color: "var(--color-text)", mb: 0.5, fontSize: 14 }}>
                                {address.addressLine1}
                              </Typography>
                              {address.displayLines.map((line, index) => (
                                <Typography key={`${address.id}-${index}`} sx={{ color: "var(--color-muted-text)", fontSize: 13 }}>
                                  {line}
                                </Typography>
                              ))}
                            </Box>
                          </Box>
                        ))}
                      </RadioGroup>
                    )}
                  </Box>
                )}

                {selectedAddressId ? (
                  <Box
                    sx={{
                      border: "1px solid var(--color-border)",
                      borderRadius: 2,
                      p: 2.5,
                      background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: "var(--color-text)", mb: 1, fontSize: 15 }}>
                      Selected address
                    </Typography>
                    <Stack spacing={0.5}>
                      <Typography sx={{ color: "var(--color-text)" }}>{shippingAddress.addressLine1}</Typography>
                      <Typography sx={{ color: "var(--color-text)" }}>{shippingAddress.addressLine2}</Typography>
                      {shippingAddress.addressLine3 && (
                        <Typography sx={{ color: "var(--color-text)" }}>{shippingAddress.addressLine3}</Typography>
                      )}
                      <Typography sx={{ color: "var(--color-text)", fontWeight: 600 }}>
                        Postal Code: {shippingAddress.postalCode}
                      </Typography>
                      {shippingAddress.landmark && (
                        <Typography sx={{ color: "var(--color-muted-text)" }}>
                          Landmark: {shippingAddress.landmark}
                        </Typography>
                      )}
                      <Typography sx={{ color: "var(--color-muted-text)" }}>
                        Email: {shippingAddress.email}
                      </Typography>
                      <Typography sx={{ color: "var(--color-muted-text)" }}>
                        Mobile: {shippingAddress.mobileNumber}
                      </Typography>
                    </Stack>
                  </Box>
                ) : (
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    Add a delivery address to continue with checkout.
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card
              sx={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={3}>
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
                </Stack>

                <FormControl component="fieldset" fullWidth>
                  <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
                    <FormControlLabel
                    value="2"
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
                      value="1"
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
                        border: paymentMethod === "1" ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                        borderRadius: 2,
                        transition: "all 200ms ease",
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Box>

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
                      Rs. {subtotalValue.toLocaleString()}
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

                <Stack spacing={2}>
                  {checkoutError && (
                    <Alert severity="warning" sx={{ borderRadius: 2 }}>
                      {checkoutError}
                    </Alert>
                  )}

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
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      <Dialog open={addressDialogOpen} onClose={closeAddressDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add delivery address</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            {addressFormError && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {addressFormError}
              </Alert>
            )}
            <TextField
              label="Address Line 1"
              value={addressForm.addressLine1}
              onChange={handleAddressFormChange("addressLine1")}
              required
            />
            <TextField
              label="Address Line 2"
              value={addressForm.addressLine2}
              onChange={handleAddressFormChange("addressLine2")}
              required
            />
            <TextField
              label="Address Line 3 (Optional)"
              value={addressForm.addressLine3}
              onChange={handleAddressFormChange("addressLine3")}
            />
            <TextField
              label="Postal Code"
              value={addressForm.postalCode}
              onChange={handleAddressFormChange("postalCode")}
              required
            />
            <TextField
              label="Email"
              value={addressForm.email}
              onChange={handleAddressFormChange("email")}
              type="email"
              required
            />
            <TextField
              label="Mobile Number"
              value={addressForm.mobileNumber}
              onChange={handleAddressFormChange("mobileNumber")}
              required
            />
            <TextField
              label="Landmark (Optional)"
              value={addressForm.landmark}
              onChange={handleAddressFormChange("landmark")}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddressDialog} disabled={addressSaving}>
            Cancel
          </Button>
          <Button onClick={handleAddressFormSubmit} variant="contained" disabled={addressSaving}>
            {addressSaving ? "Saving..." : "Save Address"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

