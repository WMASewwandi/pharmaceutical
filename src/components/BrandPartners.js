"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect, useRef } from "react";

const brandPartners = [
  {
    id: 1,
    name: "GSK",
    logo: "/images/brands/gsk.png", // Placeholder - replace with actual logo
    alt: "GSK Logo",
  },
  {
    id: 2,
    name: "Abbott",
    logo: "/images/brands/abbott.png",
    alt: "Abbott Logo",
  },
  {
    id: 3,
    name: "Himalaya",
    logo: "/images/brands/himalaya.png",
    alt: "Himalaya Logo",
  },
  {
    id: 4,
    name: "Pfizer",
    logo: "/images/brands/pfizer.png",
    alt: "Pfizer Logo",
  },
  {
    id: 5,
    name: "Novartis",
    logo: "/images/brands/novartis.png",
    alt: "Novartis Logo",
  },
  {
    id: 6,
    name: "Sanofi",
    logo: "/images/brands/sanofi.png",
    alt: "Sanofi Logo",
  },
];

export default function BrandPartners() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [imageErrors, setImageErrors] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const handleImageError = (brandId) => {
    setImageErrors((prev) => ({ ...prev, [brandId]: true }));
  };

  // Duplicate brands for seamless infinite loop
  const duplicatedBrands = [...brandPartners, ...brandPartners, ...brandPartners];
  
  // Calculate item width including gap
  // Mobile: 140px width + 16px gap = 156px per item
  // Desktop: 180px width + 24px gap = 204px per item
  const itemWidthMobile = 140 + 16; // width + gap
  const itemWidthDesktop = 180 + 24; // width + gap
  const setWidth = brandPartners.length * itemWidthDesktop; // One full set width

  useEffect(() => {
    let animationFrameId;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      setScrollPosition((prev) => {
        const newPosition = prev + scrollSpeed;
        // Reset seamlessly when we've scrolled through one full set
        if (newPosition >= setWidth) {
          return 0;
        }
        return newPosition;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [setWidth]);

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
      <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: "var(--color-text)",
            mb: 0.5,
          }}
        >
          Trusted Brand Partners
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--color-primary)",
            fontWeight: 500,
            fontSize: { xs: 14, md: 16 },
          }}
        >
          Authentic Products from Leading Manufacturers
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            gap: { xs: 2, md: 3 },
            transform: `translateX(-${scrollPosition}px)`,
            width: "fit-content",
            willChange: "transform",
            transition: "none", // No transition for smooth animation
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <Box
              key={`${brand.id}-${index}`}
              sx={{
                flexShrink: 0,
                width: { xs: 140, md: 180 },
                minHeight: { xs: 80, md: 100 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: isDark
                    ? "0 8px 24px rgba(0, 119, 182, 0.2)"
                    : "0 8px 24px rgba(0, 119, 182, 0.1)",
                  borderColor: "var(--color-primary)",
                },
              }}
            >
              {imageErrors[brand.id] ? (
                <Typography
                  sx={{
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    fontSize: { xs: 14, md: 16 },
                    textAlign: "center",
                  }}
                >
                  {brand.name}
                </Typography>
              ) : (
                <Box
                  component="img"
                  src={brand.logo}
                  alt={brand.alt}
                  onError={() => handleImageError(brand.id)}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: { xs: 60, md: 80 },
                    objectFit: "contain",
                    filter: isDark ? "brightness(1.1)" : "none",
                    transition: "transform 250ms ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

