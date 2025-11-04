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
  Divider,
  Avatar,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "../../components/ThemeProvider";

export default function AccountPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+94 11 234 5678",
    address: "123 Healthcare Street",
    city: "Colombo",
    postalCode: "00500",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic
  };

  const quickActions = [
    { icon: ShoppingBagIcon, label: "My Orders", href: "/orders", color: "var(--color-primary)" },
    { icon: ReceiptIcon, label: "Order History", href: "/order-history", color: "#10b981" },
    { icon: FavoriteIcon, label: "Wishlist", href: "/wishlist", color: "#ef4444" },
    { icon: SettingsIcon, label: "Settings", href: "/settings", color: "var(--color-muted-text)" },
  ];

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
            My Account
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--color-muted-text)",
              fontSize: { xs: 13, md: 14 },
            }}
          >
            Manage your account information and preferences
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column - Profile */}
          <Grid item xs={12} md={8}>
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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    Profile Information
                  </Typography>
                  {!isEditing && (
                    <Button
                      startIcon={<EditIcon />}
                      onClick={() => setIsEditing(true)}
                      sx={{
                        color: "var(--color-primary)",
                        textTransform: "none",
                        fontSize: { xs: 13, md: 14 },
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar
                      sx={{
                        width: { xs: 64, md: 80 },
                        height: { xs: 64, md: 80 },
                        bgcolor: "var(--color-primary)",
                        fontSize: { xs: 24, md: 32 },
                      }}
                    >
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "var(--color-text)",
                          fontSize: { xs: 16, md: 18 },
                        }}
                      >
                        {profileData.firstName} {profileData.lastName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--color-muted-text)",
                          fontSize: { xs: 13, md: 14 },
                        }}
                      >
                        {profileData.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <PersonIcon sx={{ color: "var(--color-muted-text)", fontSize: 20, mr: 1 }} />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: isEditing ? "var(--color-background)" : "transparent",
                          "& fieldset": {
                            borderColor: "var(--color-border)",
                          },
                          "&:hover fieldset": {
                            borderColor: "var(--color-primary)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--color-primary)",
                          },
                          "&.Mui-disabled": {
                            background: "transparent",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <PersonIcon sx={{ color: "var(--color-muted-text)", fontSize: 20, mr: 1 }} />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: isEditing ? "var(--color-background)" : "transparent",
                          "& fieldset": {
                            borderColor: "var(--color-border)",
                          },
                          "&:hover fieldset": {
                            borderColor: "var(--color-primary)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--color-primary)",
                          },
                          "&.Mui-disabled": {
                            background: "transparent",
                          },
                        },
                      }}
                    />
                  </Box>

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: "var(--color-muted-text)", fontSize: 20, mr: 1 }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: isEditing ? "var(--color-background)" : "transparent",
                        "& fieldset": {
                          borderColor: "var(--color-border)",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--color-primary)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--color-primary)",
                        },
                        "&.Mui-disabled": {
                          background: "transparent",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ color: "var(--color-muted-text)", fontSize: 20, mr: 1 }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: isEditing ? "var(--color-background)" : "transparent",
                        "& fieldset": {
                          borderColor: "var(--color-border)",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--color-primary)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--color-primary)",
                        },
                        "&.Mui-disabled": {
                          background: "transparent",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={2}
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <LocationOnIcon sx={{ color: "var(--color-muted-text)", fontSize: 20, mr: 1, mt: 1, alignSelf: "flex-start" }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: isEditing ? "var(--color-background)" : "transparent",
                        "& fieldset": {
                          borderColor: "var(--color-border)",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--color-primary)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--color-primary)",
                        },
                        "&.Mui-disabled": {
                          background: "transparent",
                        },
                      },
                    }}
                  />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="City"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      disabled={!isEditing}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: isEditing ? "var(--color-background)" : "transparent",
                          "& fieldset": {
                            borderColor: "var(--color-border)",
                          },
                          "&:hover fieldset": {
                            borderColor: "var(--color-primary)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--color-primary)",
                          },
                          "&.Mui-disabled": {
                            background: "transparent",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Postal Code"
                      value={profileData.postalCode}
                      onChange={(e) => setProfileData({ ...profileData, postalCode: e.target.value })}
                      disabled={!isEditing}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: isEditing ? "var(--color-background)" : "transparent",
                          "& fieldset": {
                            borderColor: "var(--color-border)",
                          },
                          "&:hover fieldset": {
                            borderColor: "var(--color-primary)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--color-primary)",
                          },
                          "&.Mui-disabled": {
                            background: "transparent",
                          },
                        },
                      }}
                    />
                  </Box>

                  {isEditing && (
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                          bgcolor: "var(--color-primary)",
                          color: "white",
                          textTransform: "none",
                          fontWeight: 600,
                          px: 3,
                          "&:hover": {
                            bgcolor: "var(--color-secondary)",
                          },
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditing(false)}
                        sx={{
                          borderColor: "var(--color-border)",
                          color: "var(--color-text)",
                          textTransform: "none",
                          fontWeight: 600,
                          px: 3,
                          "&:hover": {
                            borderColor: "var(--color-primary)",
                            color: "var(--color-primary)",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "var(--color-text)",
                    mb: 3,
                    fontSize: { xs: 16, md: 18 },
                  }}
                >
                  Quick Actions
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={index}
                        component={Link}
                        href={action.href}
                        startIcon={<IconComponent sx={{ color: action.color }} />}
                        fullWidth
                        sx={{
                          justifyContent: "flex-start",
                          textTransform: "none",
                          color: "var(--color-text)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 2,
                          py: 1.5,
                          px: 2,
                          "&:hover": {
                            borderColor: "var(--color-primary)",
                            bgcolor: "var(--color-primary)08",
                            color: "var(--color-primary)",
                          },
                          transition: "all 200ms ease",
                        }}
                      >
                        {action.label}
                      </Button>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

