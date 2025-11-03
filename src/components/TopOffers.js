"use client";

import Link from "next/link";
import { Box, Card, CardContent, Typography, IconButton, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "./ThemeProvider";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const offers = [
  {
    id: 1,
    title: "Vitamin D3 Supplements",
    discount: "30% OFF",
    originalPrice: 2999,
    salePrice: 2099,
    image: "/images/no-image.jpg",
    href: "/shop/vitamin-d3",
  },
  {
    id: 2,
    title: "Multivitamin Bundle",
    discount: "25% OFF",
    originalPrice: 4500,
    salePrice: 3375,
    image: "/images/no-image.jpg",
    href: "/shop/multivitamin-bundle",
  },
  {
    id: 3,
    title: "Omega-3 Fish Oil",
    discount: "20% OFF",
    originalPrice: 3500,
    salePrice: 2800,
    image: "/images/no-image.jpg",
    href: "/shop/omega-3",
  },
  {
    id: 4,
    title: "Protein Powder",
    discount: "35% OFF",
    originalPrice: 5500,
    salePrice: 3575,
    image: "/images/no-image.jpg",
    href: "/shop/protein-powder",
  },
  {
    id: 5,
    title: "Herbal Immunity Boost",
    discount: "28% OFF",
    originalPrice: 3200,
    salePrice: 2304,
    image: "/images/no-image.jpg",
    href: "/shop/immunity-boost",
  },
];

export default function TopOffers() {
  const [cardsPerView, setCardsPerView] = useState(5);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // For circular carousel, duplicate items for seamless infinite loop
  // Desktop: [set1][set2][set3] = [0-4][5-9][10-14] - 5 items per view
  // Mobile: All items individually - 1 item per view
  const circularOffers = [...offers, ...offers, ...offers];
  const [actualIndex, setActualIndex] = useState(offers.length); // Start at middle set

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      const newCardsPerView = width >= 768 ? 5 : 1;
      setCardsPerView(newCardsPerView);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Reset actualIndex when cardsPerView changes to ensure smooth transitions
  useEffect(() => {
    setActualIndex(offers.length);
  }, [cardsPerView]);

  const handleNext = () => {
    setActualIndex((prev) => {
      const next = prev + 1;
      // If we reach end of duplicated set, reset to middle set for seamless loop
      // Wait for transition to complete before resetting
      if (next >= offers.length * 2) {
        setTimeout(() => {
          setActualIndex(offers.length);
        }, 400);
      }
      return next;
    });
  };

  const handlePrev = () => {
    setActualIndex((prev) => {
      const next = prev - 1;
      // If we go below start of middle set, jump to end of middle set for seamless loop
      if (next < offers.length) {
        const newIndex = offers.length * 2 - 1;
        setTimeout(() => {
          setActualIndex(offers.length * 2 - 1);
        }, 400);
        return newIndex;
      }
      return next;
    });
  };

  // Calculate transform based on cardsPerView
  // Transform is relative to the container width
  // Mobile: Container is 1500% wide, each card is 6.67% of container (100% of viewport)
  // Desktop: Container is 300% wide, each card is 6.67% of container (20% of viewport)
  // So we always move by 6.67% of container per item = 100% / circularOffers.length
  // OR we can use: (100 / cardsPerView) / (circularOffers.length / cardsPerView) = 100 / circularOffers.length
  // Since container width = (100 / cardsPerView) * circularOffers.length
  // Moving by one item = moving by (container width / items) = 100% / circularOffers.length of container
  const itemWidthPercent = 100 / circularOffers.length; // 6.67% of container per item
  const transformPercent = (actualIndex - offers.length) * itemWidthPercent;

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
        maxWidth: 1200,
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
            Today's Deals
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "var(--color-primary)",
              fontWeight: 500,
              fontSize: { xs: 14, md: 16 },
            }}
          >
            Save Up To 30% on Supplements
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <IconButton
            onClick={handlePrev}
            sx={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
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
            sx={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
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

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          mb: 3,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, md: 3 },
            transform: `translateX(-${transformPercent}%)`,
            transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
            // Container width: responsive based on cardsPerView
            // Desktop: 300% (15 items showing 5 at a time)
            // Mobile: 1500% (15 items showing 1 at a time)
            width: `${(100 / cardsPerView) * circularOffers.length}%`,
          }}
        >
          {circularOffers.map((offer, index) => {
            // Card width calculation - responsive
            // Mobile (cardsPerView = 1): Each card should be 100% of viewport minus gaps
            // Desktop (cardsPerView = 5): Each card should be 20% of viewport minus gaps
            const gapSize = cardsPerView === 5 ? 24 : 16;
            const totalGapsPx = (circularOffers.length - 1) * gapSize;
            
            // Calculate card width based on container width
            // Container width = (100 / cardsPerView) * circularOffers.length
            // - Mobile: (100 / 1) * 15 = 1500% of viewport
            // - Desktop: (100 / 5) * 15 = 300% of viewport
            // Each card as % of container = 100% / circularOffers.length = 100% / 15 = 6.67%
            // This gives us:
            // - Mobile: 6.67% of 1500% = 100% of viewport ✓
            // - Desktop: 6.67% of 300% = 20% of viewport ✓
            // Account for gaps: subtract gap portion per card
            const cardWidthPercent = 100 / circularOffers.length; // 6.67% of container
            const gapPerCard = totalGapsPx / circularOffers.length;
            const cardWidth = `calc(${cardWidthPercent}% - ${gapPerCard}px)`;
            
            return (
              <Box
                key={`${offer.id}-${index}`}
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
                href={offer.href}
                  sx={{
                    height: "100%",
                    position: "relative",
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
                    {offer.discount}
                  </Box>

                  <Box
                    sx={{
                      height: 180,
                      background: `var(--color-surface)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={offer.image || "/images/no-image.jpg"}
                      alt={offer.title}
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

                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "var(--color-text)",
                        fontWeight: 600,
                        mb: 1.5,
                        fontSize: { xs: 14, md: 16 },
                        lineHeight: 1.4,
                        minHeight: { xs: "40px", md: "48px" },
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {offer.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1.5 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: 18, md: 22 },
                          fontWeight: 700,
                          color: "var(--color-primary)",
                        }}
                      >
                        Rs. {offer.salePrice.toLocaleString()}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: 12, md: 14 },
                          color: "var(--color-muted-text)",
                          textDecoration: "line-through",
                        }}
                      >
                        Rs. {offer.originalPrice.toLocaleString()}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Add to cart functionality
                        console.log("Add to bag:", offer.id);
                      }}
                      sx={{
                        bgcolor: "var(--color-primary)",
                        color: "white",
                        textTransform: "none",
                        fontWeight: 600,
                        py: 1,
                        "&:hover": {
                          bgcolor: "var(--color-secondary)",
                        },
                      }}
                    >
                      Add to Bag
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Mobile navigation */}
      <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center", gap: 2, mt: 2 }}>
        <IconButton
          onClick={handlePrev}
          sx={{
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

