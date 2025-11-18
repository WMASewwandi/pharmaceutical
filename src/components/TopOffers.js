"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "./ThemeProvider";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useCart } from "@/context/CartContext";
import { apiUrl } from "@/lib/apiConfig";

const FALLBACK_IMAGE = "/images/no-image.jpg";
const DEALS_LIMIT = 10;
const CAROUSEL_DUPLICATION_COUNT = 3;
const DEALS_ENDPOINT = apiUrl("Items/GetAllItemsForWeb");

const normalizeDeal = (item, index) => {
  const rawId = item?.id ?? item?.itemId ?? item?.internalId ?? item?.code ?? `deal-${index}`;
  const id = String(rawId);
  const title =
    item?.name ??
    item?.productName ??
    item?.itemName ??
    `Deal ${index + 1}`;
  const salePrice = Number(
    item?.discountedPrice ?? item?.price ?? item?.averagePrice ?? item?.sellingPrice ?? 0
  ) || 0;
  const originalCandidate =
    item?.originalPrice ?? item?.mrp ?? item?.listPrice ?? item?.price ?? salePrice;
  const originalPrice = Number(originalCandidate) > 0 ? Number(originalCandidate) : salePrice;
  const image =
    typeof item?.productImage === "string" && item.productImage.trim() !== ""
      ? item.productImage
      : FALLBACK_IMAGE;

  const computedDiscount =
    originalPrice > salePrice && salePrice >= 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;
  const discountPercentage =
    item?.discountPercentage ??
    item?.discountPercent ??
    computedDiscount;
  const discountLabel =
    typeof discountPercentage === "number" && Number.isFinite(discountPercentage) && discountPercentage > 0
      ? `${Math.round(discountPercentage)}% OFF`
      : null;

  return {
    id,
    title,
    salePrice,
    originalPrice: originalPrice >= salePrice ? originalPrice : salePrice,
    image,
    discountLabel,
    href: `/shop?product=${encodeURIComponent(id)}`,
    inStock: item?.isActive !== false,
    raw: item,
  };
};

export default function TopOffers() {
  const [cardsPerView, setCardsPerView] = useState(5);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { addItem, items: cartItems } = useCart();
  const [rawItems, setRawItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actualIndex, setActualIndex] = useState(0);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = typeof window === "undefined" ? 0 : window.innerWidth;
      setCardsPerView(width >= 768 ? 5 : 1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const payload = {
      input: {
        skipCount: 0,
        maxResultCount: DEALS_LIMIT * 3,
        search: "",
      },
      categoryIds: null,
      subCategoryIds: null,
      sortType: 1,
    };

    fetch(DEALS_ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok || (data && data.statusCode && data.statusCode !== 200)) {
          throw new Error(data?.message || "Failed to load products");
        }
        const result = data?.result ?? {};
        const items = Array.isArray(result.items) ? result.items : [];
        setRawItems(items);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load today's deals");
          setRawItems([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const deals = useMemo(
    () => {
      if (!Array.isArray(rawItems) || rawItems.length === 0) {
        return [];
      }
      const normalized = rawItems.map((item, index) => normalizeDeal(item, index));
      const withDiscount = normalized.filter((deal) => Boolean(deal.discountLabel));
      const prioritized = withDiscount.length > 0 ? withDiscount : normalized;
      return prioritized.slice(0, DEALS_LIMIT);
    },
    [rawItems]
  );

  const dealsLength = deals.length;
  const hasDeals = dealsLength > 0;

  const circularDeals = useMemo(() => {
    if (!hasDeals) return [];
    const duplicated = [];
    for (let i = 0; i < CAROUSEL_DUPLICATION_COUNT; i += 1) {
      duplicated.push(...deals);
    }
    return duplicated;
  }, [deals, hasDeals]);

  useEffect(() => {
    if (hasDeals) {
      setActualIndex(dealsLength);
    } else {
      setActualIndex(0);
    }
  }, [hasDeals, dealsLength, cardsPerView]);

  const middleStart = hasDeals ? dealsLength : 0;
  const middleEnd = hasDeals ? dealsLength * 2 - 1 : 0;
  const itemWidthPercent = hasDeals && circularDeals.length > 0 ? 100 / circularDeals.length : 0;
  const transformPercent = hasDeals ? (actualIndex - middleStart) * itemWidthPercent : 0;

  const handleNext = () => {
    if (!hasDeals) return;
    setActualIndex((prev) => {
      const next = prev + 1;
      if (next >= dealsLength * 2) {
        setTimeout(() => {
          setActualIndex(middleStart);
        }, 400);
      }
      return next;
    });
  };

  const handlePrev = () => {
    if (!hasDeals) return;
    setActualIndex((prev) => {
      const next = prev - 1;
      if (next < dealsLength) {
        const resetIndex = middleEnd;
        setTimeout(() => {
          setActualIndex(resetIndex);
        }, 400);
        return resetIndex;
      }
      return next;
    });
  };

  const cartQuantities = useMemo(() => {
    const map = new Map();
    cartItems.forEach((item) => {
      map.set(String(item.id), item.quantity ?? 0);
    });
    return map;
  }, [cartItems]);

  const placeholders = cardsPerView === 5 ? 5 : 1;

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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
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
            Curated tech, fashion, and lifestyle steals updated daily
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <IconButton
            onClick={handlePrev}
            disabled={!hasDeals}
            sx={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              opacity: hasDeals ? 1 : 0.4,
              "&:hover": {
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={!hasDeals}
            sx={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              opacity: hasDeals ? 1 : 0.4,
              "&:hover": {
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {error && (
        <Typography variant="body2" sx={{ color: "#dc2626", mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          mb: 3,
          width: "100%",
        }}
      >
        {isLoading && !hasDeals ? (
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, md: 3 },
              gridTemplateColumns: { xs: "repeat(1, 1fr)", md: `repeat(${Math.min(placeholders, 5)}, 1fr)` },
            }}
          >
            {Array.from({ length: placeholders }).map((_, index) => (
              <Card
                key={`deal-placeholder-${index}`}
                sx={{
                  height: 260,
                  borderRadius: 3,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-muted-text)",
                }}
              >
                Loading…
              </Card>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, md: 3 },
              transform: `translateX(-${transformPercent}%)`,
              transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
              width: hasDeals ? `${(100 / cardsPerView) * circularDeals.length}%` : "100%",
            }}
          >
            {hasDeals
              ? circularDeals.map((deal, index) => {
                  const gapSize = cardsPerView === 5 ? 24 : 16;
                  const totalGapsPx = (circularDeals.length - 1) * gapSize;
                  const cardWidthPercent = 100 / circularDeals.length;
                  const gapPerCard = totalGapsPx / circularDeals.length;
                  const cardWidth = `calc(${cardWidthPercent}% - ${gapPerCard}px)`;
                  const quantityInCart = cartQuantities.get(deal.id) ?? 0;
                  const isInCart = quantityInCart > 0;

                  return (
                    <Box
                      key={`${deal.id}-${index}`}
                      sx={{
                        flexShrink: 0,
                        flexGrow: 0,
                        width: cardWidth,
                        minWidth: cardWidth,
                        maxWidth: cardWidth,
                        boxSizing: "border-box",
                      }}
                    >
                      <Card
                        component={Link}
                        href={deal.href}
                        sx={{
                          height: "100%",
                          position: "relative",
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
                        {deal.discountLabel && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              bgcolor: "var(--color-primary)",
                              color: "white",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: 12,
                              fontWeight: 700,
                              zIndex: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <LocalOfferIcon sx={{ fontSize: 14 }} />
                            {deal.discountLabel}
                          </Box>
                        )}

                        <Box
                          sx={{
                            height: 180,
                            background: "var(--color-surface)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={deal.image || FALLBACK_IMAGE}
                            alt={deal.title}
                            onError={(event) => {
                              event.currentTarget.src = FALLBACK_IMAGE;
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>

                        <CardContent sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "var(--color-text)",
                              fontWeight: 600,
                              fontSize: { xs: 14, md: 16 },
                              lineHeight: 1.4,
                              minHeight: { xs: "40px", md: "48px" },
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {deal.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                            <Typography
                              sx={{
                                fontSize: { xs: 18, md: 22 },
                                fontWeight: 700,
                                color: "var(--color-primary)",
                              }}
                            >
                              Rs. {deal.salePrice.toLocaleString()}
                            </Typography>
                            {deal.originalPrice > deal.salePrice && (
                              <Typography
                                sx={{
                                  fontSize: { xs: 12, md: 14 },
                                  color: "var(--color-muted-text)",
                                  textDecoration: "line-through",
                                }}
                              >
                                Rs. {deal.originalPrice.toLocaleString()}
                              </Typography>
                            )}
                          </Box>
                          <Button
                            variant={isInCart ? "outlined" : "contained"}
                            fullWidth
                            disabled={!deal.inStock}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              addItem(
                                {
                                  id: deal.id,
                                  name: deal.title,
                                  price: deal.salePrice,
                                  image: deal.image,
                                  raw: deal.raw,
                                },
                                1
                              );
                            }}
                            sx={{
                              bgcolor: isInCart ? "transparent" : "var(--color-primary)",
                              color: isInCart ? "var(--color-primary)" : "white",
                              textTransform: "none",
                              fontWeight: 600,
                              py: 1,
                              "&:hover": {
                                bgcolor: isInCart ? "var(--color-primary)08" : "var(--color-secondary)",
                              },
                            }}
                          >
                            {deal.inStock
                              ? isInCart
                                ? `Add another (${quantityInCart} in cart)`
                                : "Add to Cart"
                              : "Out of Stock"}
                          </Button>
                        </CardContent>
                      </Card>
                    </Box>
                  );
                })
              : (
                  <Card
                    sx={{
                      width: "100%",
                      height: 260,
                      borderRadius: 3,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-muted-text)",
                    }}
                  >
                    No deals available right now. Please check back later.
                  </Card>
                )}
          </Box>
        )}
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center", gap: 2, mt: 2 }}>
        <IconButton
          onClick={handlePrev}
          disabled={!hasDeals}
          sx={{
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            opacity: hasDeals ? 1 : 0.4,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={!hasDeals}
          sx={{
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            opacity: hasDeals ? 1 : 0.4,
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
