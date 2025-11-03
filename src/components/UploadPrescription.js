"use client";

import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

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
            <DescriptionIcon
              sx={{
                fontSize: { xs: 40, md: 50 },
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
              Need a Doctor-Prescribed Medicine?
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
              Upload your valid prescription & we'll deliver securely to your door.
            </Typography>
          </Box>
          <Box
            component="label"
            htmlFor="prescription-upload"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
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
            <CloudUploadIcon sx={{ fontSize: 22 }} />
            <span>Upload Prescription</span>
            <input
              type="file"
              id="prescription-upload"
              accept="image/*,.pdf"
              style={{
                position: "absolute",
                opacity: 0,
                width: 0,
                height: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
            />
          </Box>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              flex: { xs: "1 1 100%", sm: "0 0 auto" },
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
              }}
            >
              <DescriptionIcon
                sx={{
                  fontSize: { xs: 28, md: 32 },
                  color: "var(--color-primary)",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-text)",
                fontWeight: 600,
                fontSize: { xs: 12, md: 14 },
                textAlign: "center",
              }}
            >
              Easy Upload
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              flex: { xs: "1 1 100%", sm: "0 0 auto" },
            }}
          >
            <Box
              sx={{
                width: { xs: 56, md: 64 },
                height: { xs: 56, md: 64 },
                borderRadius: "50%",
                background: `linear-gradient(135deg, var(--color-secondary)20, var(--color-secondary)05)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--color-secondary)",
              }}
            >
              <VerifiedUserIcon
                sx={{
                  fontSize: { xs: 28, md: 32 },
                  color: "var(--color-secondary)",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-text)",
                fontWeight: 600,
                fontSize: { xs: 12, md: 14 },
                textAlign: "center",
              }}
            >
              Verified & Secure
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              flex: { xs: "1 1 100%", sm: "0 0 auto" },
            }}
          >
            <Box
              sx={{
                width: { xs: 56, md: 64 },
                height: { xs: 56, md: 64 },
                borderRadius: "50%",
                background: `linear-gradient(135deg, var(--color-accent)20, var(--color-accent)05)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--color-accent)",
              }}
            >
              <LocalShippingIcon
                sx={{
                  fontSize: { xs: 28, md: 32 },
                  color: "var(--color-accent)",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-text)",
                fontWeight: 600,
                fontSize: { xs: 12, md: 14 },
                textAlign: "center",
              }}
            >
              Fast Delivery
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


