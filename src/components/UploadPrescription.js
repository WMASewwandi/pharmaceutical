"use client";

import { Box, Typography, Button } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

export default function UploadPrescription() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 3 },
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, rgba(0, 119, 182, 0.08), rgba(0, 180, 216, 0.06), rgba(144, 224, 239, 0.08))`,
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0, 119, 182, 0.15), transparent)`,
          opacity: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0, 180, 216, 0.12), transparent)`,
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: { xs: 80, md: 100 },
              height: { xs: 80, md: 100 },
              borderRadius: "50%",
              background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0, 119, 182, 0.3)",
              mb: 2,
            }}
          >
            <ShoppingCartCheckoutIcon
              sx={{
                fontSize: { xs: 42, md: 52 },
                color: "white",
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                color: "var(--color-text)",
                mb: 1.5,
                fontSize: { xs: 24, md: 36 },
                background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Need A Personal Shopping Assistant?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "var(--color-muted-text)",
                fontSize: { xs: 15, md: 19 },
                lineHeight: 1.7,
                maxWidth: 650,
                mb: 1,
              }}
            >
              Tell us what you’re hunting for and our concierge team will curate the best deals, drops, and bundles for you—in minutes.
            </Typography>
          </Box>
          <Button
            href="/concierge"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              bgcolor: "var(--color-primary)",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              fontSize: { xs: 15, md: 17 },
              px: { xs: 5, md: 6 },
              py: { xs: 1.8, md: 2.2 },
              borderRadius: 3,
              boxShadow: "0 6px 20px rgba(0, 119, 182, 0.35)",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                transition: "left 0.5s",
              },
              "&:hover": {
                bgcolor: "var(--color-secondary)",
                boxShadow: "0 8px 28px rgba(0, 119, 182, 0.45)",
                transform: "translateY(-3px)",
                "&::before": {
                  left: "100%",
                },
              },
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <ShoppingCartCheckoutIcon sx={{ fontSize: 22 }} />
            <span>Start A Concierge Request</span>
          </Button>
        </Box>

        {/* Feature icons row */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 4, md: 6 },
            mt: 4,
            pt: 4,
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {[
            {
              icon: SupportAgentIcon,
              title: "Dedicated Stylists",
              description: "Real humans scouting trending products that match your vibe & budget.",
            },
            {
              icon: Inventory2Icon,
              title: "Curated Drops",
              description: "Hand-picked bundles and limited releases sourced from top global sellers.",
            },
            {
              icon: ShoppingCartCheckoutIcon,
              title: "Seamless Checkout",
              description: "One consolidated cart with tracked shipping from multiple brands.",
            },
            {
              icon: CreditScoreIcon,
              title: "Flexible Payments",
              description: "Buy now, pay later, split payments, or use your favourite wallet in seconds.",
            },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <Box
                key={feature.title}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  flex: { xs: "1 1 100%", sm: "0 0 auto" },
                  maxWidth: 240,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 56, md: 64 },
                    height: { xs: 56, md: 64 },
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, var(--color-primary)20, var(--color-primary)05)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid var(--color-primary)",
                    color: "var(--color-primary)",
                  }}
                >
                  <Icon sx={{ fontSize: { xs: 30, md: 34 } }} />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "var(--color-text)",
                    fontSize: { xs: 14, md: 16 },
                    textAlign: "center",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--color-muted-text)",
                    fontSize: { xs: 12, md: 13 },
                    textAlign: "center",
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}


