"use client";

import { Box, Typography, TextField, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
        maxWidth: '100vw',
        margin: "0 auto",
        background: `linear-gradient(135deg, rgba(0, 119, 182, 0.08), rgba(0, 180, 216, 0.06), rgba(144, 224, 239, 0.08))`,
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        width: "100%",
        position: "relative",
        overflow: "hidden",
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
          maxWidth: 800,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: { xs: 64, md: 80 },
              height: { xs: 64, md: 80 },
              borderRadius: "50%",
              background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0, 119, 182, 0.3)",
            }}
          >
            <EmailIcon
              sx={{
                fontSize: { xs: 32, md: 40 },
                color: "white",
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            color: "var(--color-text)",
            mb: 1.5,
            fontSize: { xs: 24, md: 32 },
            background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Stay Updated with Health Tips
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--color-muted-text)",
            fontSize: { xs: 15, md: 18 },
            lineHeight: 1.7,
            mb: 3,
          }}
        >
          Get health tips and exclusive offers straight to your inbox.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubscribe}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <TextField
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "var(--color-surface)",
                color: "var(--color-text)",
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
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              bgcolor: "var(--color-primary)",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              fontSize: { xs: 15, md: 16 },
              px: { xs: 4, md: 5 },
              py: { xs: 1.5, md: 1.75 },
              borderRadius: 2,
              boxShadow: "0 6px 20px rgba(0, 119, 182, 0.35)",
              whiteSpace: "nowrap",
              minWidth: { xs: "100%", sm: 160 },
              "&:hover": {
                bgcolor: "var(--color-secondary)",
                boxShadow: "0 8px 28px rgba(0, 119, 182, 0.45)",
                transform: "translateY(-2px)",
              },
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

