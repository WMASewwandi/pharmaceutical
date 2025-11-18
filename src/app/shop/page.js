"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Collapse,
  Stack,
  Checkbox,
  FormControlLabel,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "../../components/ThemeProvider";
import { fetchCategoriesWithCounts } from "@/lib/api/categories";
import { apiUrl } from "@/lib/apiConfig";
import { useCart } from "@/context/CartContext";

const PAGE_SIZE = 9;
const DEFAULT_CATEGORY_IDS = [];
const DEFAULT_SUBCATEGORY_KEYS = [];
const DEFAULT_SORT_TYPE = 1;
const PRODUCTS_ENDPOINT = apiUrl("Items/GetAllItemsForWeb");

const makeSubKey = (categoryId, subcategoryId) => `${categoryId}::${subcategoryId}`;

const parseQueryList = (params, keys) => {
  if (!params) return [];
  const normalizedKeys = Array.isArray(keys) ? keys : [keys];
  const values = new Set();

  normalizedKeys.forEach((key) => {
    params.getAll(key).forEach((value) => {
      if (!value) return;
      value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .forEach((part) => values.add(String(part)));
    });
  });

  return Array.from(values);
};

const arraysShallowEqual = (left, right) => {
  if (left === right) return true;
  if (!Array.isArray(left) || !Array.isArray(right)) return false;
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((value, index) => value === sortedRight[index]);
};

function ShopPageContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(DEFAULT_CATEGORY_IDS);
  const [selectedSubcategories, setSelectedSubcategories] = useState(DEFAULT_SUBCATEGORY_KEYS);
  const [expandedSections, setExpandedSections] = useState([]);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_TYPE);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const CONTROL_HEIGHT = 48;
  const [apiCategories, setApiCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState(null);
  const [productItems, setProductItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productError, setProductError] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const { addItem, updateItemQuantity, removeItem, items: cartItems } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams?.toString() ?? "";

  const toggleSectionExpansion = (categoryName) => {
    setExpandedSections((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleCategorySelection = (categoryId) => {
    const id = String(categoryId);
    setSelectedCategories((prev) => {
      if (prev.includes(id)) {
        setSelectedSubcategories((subs) =>
          subs.filter((key) => !key.startsWith(`${id}::`))
        );
        return prev.filter((name) => name !== id);
      }
      setExpandedSections((prevExpanded) =>
        prevExpanded.includes(id) ? prevExpanded : [...prevExpanded, id]
      );
      return [...prev, id];
    });
    setCurrentPage(1);
  };

  const toggleSubcategorySelection = (categoryId, subcategoryId) => {
    const categoryKey = String(categoryId);
    const subKeyPart = String(subcategoryId);
    const key = makeSubKey(categoryKey, subKeyPart);
    setSelectedSubcategories((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      }
      setSelectedCategories((cats) =>
        cats.includes(categoryKey) ? cats : [...cats, categoryKey]
      );
      setExpandedSections((prev) =>
        prev.includes(categoryKey) ? prev : [...prev, categoryKey]
      );
      return [...prev, key];
    });
    setCurrentPage(1);
  };

  const clearCategorySelection = (categoryId) => {
    const id = String(categoryId);
    setSelectedCategories((prev) => prev.filter((name) => name !== id));
    setSelectedSubcategories((subs) =>
      subs.filter((key) => !key.startsWith(`${id}::`))
    );
    setCurrentPage(1);
  };

  const clearSubcategorySelection = (categoryId, subcategoryId) => {
    const key = makeSubKey(String(categoryId), String(subcategoryId));
    setSelectedSubcategories((prev) => prev.filter((item) => item !== key));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setExpandedSections([]);
    setSearchQuery("");
    setSortBy(DEFAULT_SORT_TYPE);
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    const numericValue = Number(value);
    setSortBy(Number.isNaN(numericValue) ? DEFAULT_SORT_TYPE : numericValue);
    setCurrentPage(1);
  };

  useEffect(() => {
    const controller = new AbortController();
    setIsLoadingCategories(true);
    setCategoryError(null);

    fetchCategoriesWithCounts(controller.signal)
      .then((data) => {
        setApiCategories(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setCategoryError(error.message || "Failed to load categories");
        }
      })
      .finally(() => {
        setIsLoadingCategories(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!searchParams) return;

    const categoryValuesSet = new Set(
      parseQueryList(searchParams, ["category", "categories", "Category", "Categories"]).map(
        (value) => String(value)
      )
    );

    const rawSubcategoryValues = parseQueryList(searchParams, [
      "subcategory",
      "subcategories",
      "subCategory",
      "subCategories",
    ]);

    const normalizedSubcategoryKeys = new Set();

    rawSubcategoryValues.forEach((value) => {
      const trimmed = String(value).trim();
      if (!trimmed || !trimmed.includes("::")) return;
      const [categoryId, subId] = trimmed.split("::");
      if (!categoryId || !subId) return;
      const normalizedCategoryId = String(categoryId);
      const normalizedSubId = String(subId);
      normalizedSubcategoryKeys.add(makeSubKey(normalizedCategoryId, normalizedSubId));
      categoryValuesSet.add(normalizedCategoryId);
    });

    const categoryValues = Array.from(categoryValuesSet);
    const subcategoryValues = Array.from(normalizedSubcategoryKeys);
    const searchParamValue =
      searchParams.get("search") ?? searchParams.get("q") ?? searchParams.get("term");

    let shouldResetPage = false;

    if (categoryValues.length > 0) {
      setSelectedCategories((prev) => {
        if (arraysShallowEqual(prev, categoryValues)) {
          return prev;
        }
        shouldResetPage = true;
        return categoryValues;
      });

      setExpandedSections((prev) => {
        const nextSet = new Set(prev);
        categoryValues.forEach((value) => nextSet.add(value));
        const next = Array.from(nextSet);
        return arraysShallowEqual(prev, next) ? prev : next;
      });
    }

    if (subcategoryValues.length > 0) {
      setSelectedSubcategories((prev) => {
        if (arraysShallowEqual(prev, subcategoryValues)) {
          return prev;
        }
        shouldResetPage = true;
        return subcategoryValues;
      });
    }

    if (searchParamValue !== null && searchParamValue !== undefined) {
      const normalizedSearchParam = String(searchParamValue);
      setSearchQuery((prev) => {
        if (prev === normalizedSearchParam) {
          return prev;
        }
        shouldResetPage = true;
        return normalizedSearchParam;
      });
    }

    if (shouldResetPage) {
      setCurrentPage(1);
    }
  }, [searchParamsKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const normalizeProduct = (item) => {
    const rawPrice = item?.averagePrice ?? item?.price ?? 0;
    const priceNumber = Number(rawPrice) || 0;
    const originalPriceNumber = Number(item?.originalPrice ?? rawPrice) || priceNumber;
    const image =
      item?.productImage && item.productImage.trim() !== ""
        ? item.productImage
        : "/images/no-image.jpg";
    const id =
      item?.id ??
      item?.internalId ??
      item?.code ??
      `product-${Math.random().toString(36).slice(2)}`;

    return {
      id,
      name: item?.name ?? "Unnamed product",
      code: item?.code ?? "",
      price: priceNumber,
      originalPrice: originalPriceNumber,
      image,
      inStock: item?.isActive !== false,
      raw: item,
    };
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      setProductError(null);

      const skipCount = Math.max(0, (currentPage - 1) * PAGE_SIZE);
      const sortTypeValue = Number(sortBy) || DEFAULT_SORT_TYPE;
      const trimmedSearch = debouncedSearch.trim();

      const categoryIds =
        selectedCategories.length > 0
          ? Array.from(
              new Set(
                selectedCategories
                  .map((value) => Number(value))
                  .filter((value) => !Number.isNaN(value))
              )
            )
          : null;

      const subCategoryIds =
        selectedSubcategories.length > 0
          ? Array.from(
              new Set(
                selectedSubcategories
                  .map((key) => key.split("::")[1])
                  .filter(Boolean)
                  .map((value) => Number(value))
                  .filter((value) => !Number.isNaN(value))
              )
            )
          : null;

      const payload = {
        input: {
          skipCount,
          maxResultCount: PAGE_SIZE,
          search: trimmedSearch,
        },
        categoryIds: categoryIds && categoryIds.length > 0 ? categoryIds : null,
        subCategoryIds:
          subCategoryIds && subCategoryIds.length > 0 ? subCategoryIds : null,
        sortType: sortTypeValue,
      };

      try {
        const response = await fetch(PRODUCTS_ENDPOINT, {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok || (data && data.statusCode && data.statusCode !== 200)) {
          throw new Error(data?.message || "Failed to load products");
        }

        const result = data?.result ?? {};
        const items = Array.isArray(result.items) ? result.items : [];
        setProductItems(items.map((item) => normalizeProduct(item)));
        setTotalCount(Number(result.totalCount) || items.length);
      } catch (error) {
        if (error.name !== "AbortError") {
          setProductError(error.message || "Failed to load products");
          setProductItems([]);
          setTotalCount(0);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingProducts(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [currentPage, debouncedSearch, selectedCategories, selectedSubcategories, sortBy]);

  const totalPages = Math.max(1, Math.ceil((totalCount || 0) / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    sortBy !== DEFAULT_SORT_TYPE ||
    selectedCategories.length > 0 ||
    selectedSubcategories.length > 0;

  const derivedCategories = useMemo(
    () =>
      apiCategories.map((category, index) => {
        const categoryIdSource =
          category?.categoryId ?? category?.categoryName ?? `category-${index}`;
        const categoryId = String(categoryIdSource);

        return {
          key: categoryId,
          id: categoryId,
          name: category?.categoryName || categoryId,
          itemCount: category?.itemCount ?? 0,
          subcategories: (category?.subCategories ?? []).map((sub, subIndex) => {
            const subCategorySource =
              sub?.subCategoryId ?? sub?.subCategoryName ?? `${categoryIdSource}-${subIndex}`;
            const subId = String(subCategorySource);
            return {
              key: makeSubKey(categoryId, subId),
              id: subId,
              name: sub?.subCategoryName || subId,
              itemCount: sub?.itemCount ?? 0,
            };
          }),
        };
      }),
    [apiCategories]
  );
  const categoriesToRender = derivedCategories;

  const cartItemsMap = useMemo(() => {
    const map = new Map();
    cartItems.forEach((item) => {
      map.set(String(item.id), item);
    });
    return map;
  }, [cartItems]);

  const goToPage = (page) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--color-background)",
        pt: { xs: 12, md: 14 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
            sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: { md: "280px 1fr" },
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box
          sx={{
                position: "sticky",
                top: "calc(var(--header-offset) + 24px)",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 3,
                p: 3,
                boxShadow: isDark
                  ? "0 6px 18px rgba(0,0,0,0.35)"
                  : "0 12px 32px rgba(15,23,42,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700, fontSize: 18, color: "var(--color-text)" }}>
                  Filters
                </Typography>
          <Button
                  variant="text"
                  onClick={handleResetFilters}
                  disabled={!hasActiveFilters}
            sx={{
              textTransform: "none",
                    color: "var(--color-muted-text)",
                    fontWeight: 500,
                    opacity: hasActiveFilters ? 1 : 0.4,
            }}
          >
                  Clear All
          </Button>
              </Box>

              <Box>
                <Typography
                  variant="overline"
                  sx={{ fontWeight: 600, letterSpacing: 1.4, color: "var(--color-muted-text)" }}
                >
                  Categories
                </Typography>

                {categoryError && (
                  <Typography variant="body2" sx={{ color: "#dc2626", mt: 1.5 }}>
                    {categoryError}
                  </Typography>
                )}

                <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
                  {isLoadingCategories && derivedCategories.length === 0 ? (
                    <Typography variant="body2" sx={{ color: "var(--color-muted-text)" }}>
                      Loading categories...
                    </Typography>
                  ) : (
                    categoriesToRender.map((group) => {
                      const groupKey = String(group.key);
                      const isSelected = selectedCategories.includes(groupKey);
                      const isExpanded = expandedSections.includes(groupKey);
                      const count = group.itemCount ?? 0;
                      return (
                        <Box key={groupKey} sx={{ borderBottom: "1px solid rgba(148,163,184,0.2)", pb: 1.5 }}>
                          <Box
            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 1,
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isSelected}
                                  onChange={() => toggleCategorySelection(groupKey)}
                                  sx={{
                                    color: "var(--color-border)",
                                    '&.Mui-checked': { color: "var(--color-primary)" },
                                  }}
                                />
                              }
                              label={
                                <Typography sx={{ fontWeight: 600, letterSpacing: 0.5, color: "var(--color-text)" }}>
                                  {group.name}
                                </Typography>
                              }
                              sx={{ margin: 0, flexGrow: 1 }}
                            />
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <Typography sx={{ fontSize: 12, color: "var(--color-muted-text)", fontWeight: 600 }}>
                                {group.itemCount}
                              </Typography>
                              <IconButton size="small" onClick={() => toggleSectionExpansion(groupKey)}>
                                {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                              </IconButton>
                            </Box>
        </Box>

                          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                            <Box sx={{ pl: 1, pt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                              {(group.subcategories || []).map((subcategory) => {
                                const subId = String(subcategory.id);
                                const subLabel = subcategory.name || subId;
                                const subKey = makeSubKey(groupKey, subId);
                                const subSelected = selectedSubcategories.includes(subKey);
                                const subCount = subcategory.itemCount ?? 0;
                                return (
                                  <Box
                                    key={subKey}
          sx={{
                                      display: "flex",
            alignItems: "center",
                                      justifyContent: "space-between",
                                      gap: 1,
                                    }}
                                  >
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={subSelected}
                                          onChange={() => toggleSubcategorySelection(groupKey, subId)}
              sx={{
                                            color: "var(--color-border)",
                                            '&.Mui-checked': { color: "var(--color-secondary)" },
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography sx={{ fontSize: 14, color: "var(--color-text)" }}>
                                          {subLabel}
                                        </Typography>
                                      }
                                      sx={{ margin: 0, flexGrow: 1, pl: 1.5 }}
                                    />
                                    <Typography sx={{ fontSize: 12, color: "var(--color-muted-text)", fontWeight: 600 }}>
                                      {subCount}
                                    </Typography>
          </Box>
                                );
                              })}
                            </Box>
                          </Collapse>
                        </Box>
                      );
                    })
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "stretch", md: "center" },
                gap: 2,
                mb: 3,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setFilterModalOpen(true)}
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  borderColor: "var(--color-border)",
              color: "var(--color-text)",
                  textTransform: "none",
                  height: CONTROL_HEIGHT,
                  px: 2,
          }}
        >
              Filters
            </Button>

              <TextField
                fullWidth
                placeholder="Search products, categories, or collections..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "var(--color-muted-text)" }} />
                    </InputAdornment>
                  ),
                }}
                      sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "var(--color-surface)",
                    borderRadius: 2,
                    height: CONTROL_HEIGHT,
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

                <FormControl
                  size="small"
                  sx={{
                  width: { xs: "100%", md: 220 },
                    "& .MuiOutlinedInput-root": {
                      background: "var(--color-surface)",
                      color: "var(--color-text)",
                    height: CONTROL_HEIGHT,
                      "& fieldset": {
                        borderColor: "var(--color-border)",
                      },
                    },
                  }}
                >
                  <InputLabel sx={{ color: "var(--color-text)" }}>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value={1}>Price: Low to High</MenuItem>
                    <MenuItem value={2}>Price: High to Low</MenuItem>
                    <MenuItem value={3}>Newest On Top</MenuItem>
                    <MenuItem value={4}>Oldest On Top</MenuItem>
                  </Select>
                </FormControl>
              </Box>

            <Box
          sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
            mb: 3,
          }}
        >
              <Box>
                <Typography variant="subtitle2" sx={{ color: "var(--color-muted-text)" }}>
                  Showing {totalCount} product{totalCount !== 1 ? "s" : ""}
        </Typography>
                <Stack
                  direction="row"
          spacing={1} 
          sx={{ 
                    mt: 1,
            flexWrap: "wrap",
                    display: hasActiveFilters ? "flex" : "none",
                  }}
                >
                  {selectedCategories.map((category) => {
                    const categoryLabel =
                      categoriesToRender.find((group) => String(group.id) === category)?.name || category;
                    return (
                      <Chip
                        key={`category-${category}`}
                        label={`Category: ${categoryLabel}`}
                        onDelete={() => clearCategorySelection(category)}
                        sx={{ background: "var(--color-primary)", color: "white" }}
                      />
                    );
                  })}
                  {selectedSubcategories.map((subKey) => {
                    const [categoryId, subcategoryId] = subKey.split("::");
                    const categoryGroup = categoriesToRender.find(
                      (group) => String(group.id) === String(categoryId)
                    );
                    const subcategoryLabel =
                      categoryGroup?.subcategories.find(
                        (subcategory) => String(subcategory.id) === String(subcategoryId)
                      )?.name || subcategoryId;
                    return (
                      <Chip
                        key={`subcategory-${subKey}`}
                        label={`Subcategory: ${subcategoryLabel}`}
                        onDelete={() => clearSubcategorySelection(categoryId, subcategoryId)}
                        sx={{ background: "var(--color-secondary)", color: "var(--color-text)" }}
                      />
                    );
                  })}
                  {hasActiveFilters && (
                    <Chip
                      label="Reset filters"
                      variant="outlined"
                      onDelete={handleResetFilters}
                    />
                  )}
                </Stack>
              </Box>
            </Box>

            {productError && (
              <Typography variant="body2" sx={{ color: "#dc2626", mb: 2 }}>
                {productError}
              </Typography>
            )}

            <Box
              sx={{ 
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, minmax(0, 1fr))",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(3, minmax(0, 1fr))",
                  xl: "repeat(4, minmax(0, 1fr))",
                },
              }}
            >
              {isLoadingProducts && (
                <Typography
                  variant="body2"
                  sx={{ color: "var(--color-muted-text)", gridColumn: "1 / -1" }}
                >
                  Loading products...
                </Typography>
              )}
              {productItems.map((product) => (
              <Card
                  key={product.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                    borderRadius: 3,
                  border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                    boxShadow: isDark
                      ? "0 6px 18px rgba(0,0,0,0.3)"
                      : "0 12px 32px rgba(15,23,42,0.08)",
                    transition: "transform 200ms ease, box-shadow 200ms ease",
                  "&:hover": {
                      transform: "translateY(-6px)",
                    boxShadow: isDark
                        ? "0 12px 32px rgba(0,119,182,0.35)"
                        : "0 16px 32px rgba(0,119,182,0.16)",
                    borderColor: "var(--color-primary)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: { xs: 240, md: 260 },
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = "/images/no-image.jpg";
                    }}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                  {!product.inStock && (
                      <Chip
                        label="Out of stock"
                        size="small"
                      sx={{
                        position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(15,23,42,0.85)",
                          color: "#fff",
                        fontWeight: 600,
                      }}
                      />
                  )}
                  {product.originalPrice > product.price && (
                    <Chip
                      label={`${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`}
                      size="small"
                      sx={{
                        position: "absolute",
                          top: 12,
                          left: 12,
                          background: "var(--color-primary)",
                          color: "#fff",
                        fontWeight: 700,
                      }}
                    />
                  )}
                </Box>
                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.25,
                      flexGrow: 1,
                    }}
                  >
                   
                  <Typography
                      variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                        lineHeight: 1.3,
                    }}
                  >
                    {product.name}
                  </Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 700, color: "var(--color-primary)" }}>
                      Rs. {product.price.toLocaleString()}
                    </Typography>
                    {product.originalPrice > product.price && (
                        <Typography sx={{ color: "var(--color-muted-text)", textDecoration: "line-through" }}>
                        Rs. {product.originalPrice.toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                    <Box sx={{ mt: "auto" }}>
                  {(() => {
                    const cartEntry = cartItemsMap.get(String(product.id));
                    const quantity = cartEntry?.quantity ?? 0;
                    if (quantity > 0) {
                      return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        border: "1px solid var(--color-border)",
                            borderRadius: 999,
                            py: 1,
                        px: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          quantity <= 1
                            ? removeItem(product.id)
                            : updateItemQuantity(product.id, quantity - 1)
                        }
                        disabled={quantity <= 0}
                        sx={{
                              width: 36,
                              height: 36,
                          color: "var(--color-text)",
                          "&:hover": {
                            bgcolor: "var(--color-primary)15",
                            color: "var(--color-primary)",
                          },
                        }}
                      >
                            <RemoveIcon fontSize="small" />
                      </IconButton>
                          <Typography sx={{ minWidth: 36, textAlign: "center", fontWeight: 600 }}>
                        {quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateItemQuantity(product.id, quantity + 1)}
                        disabled={!product.inStock}
                        sx={{
                              width: 36,
                              height: 36,
                          color: "var(--color-text)",
                          "&:hover": {
                            bgcolor: "var(--color-primary)15",
                            color: "var(--color-primary)",
                          },
                        }}
                      >
                            <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                      );
                    }
                    return (
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                      disabled={!product.inStock}
                      onClick={() => addItem(product, 1)}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                            bgcolor: "var(--color-primary)",
                            "&:hover": { bgcolor: "var(--color-secondary)" },
                          }}
                        >
                          {product.inStock ? "Add to cart" : "Out of stock"}
                    </Button>
                    );
                  })()}
                    </Box>
                </CardContent>
              </Card>
              ))}
            </Box>

            {productItems.length > 0 && totalPages > 1 && (
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => goToPage(page)}
                  color="primary"
                  shape="rounded"
                />
              </Box>
            )}

        {!isLoadingProducts && !productError && productItems.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 6, md: 8 },
            }}
          >
                <Typography variant="h6" sx={{ color: "var(--color-text)", mb: 1 }}>
                  No products found
                </Typography>
                <Typography variant="body2" sx={{ color: "var(--color-muted-text)" }}>
                  Try adjusting your search or filter criteria.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Dialog
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              background: "var(--color-surface)",
                color: "var(--color-text)",
            },
              }}
            >
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filters
            </Typography>
            <IconButton onClick={() => setFilterModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Categories
                </Typography>
                <Button
                  onClick={handleResetFilters}
                  disabled={!hasActiveFilters}
              sx={{
                    textTransform: "none",
                color: "var(--color-muted-text)",
                    opacity: hasActiveFilters ? 1 : 0.4,
                  }}
                >
                  Clear All
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {categoriesToRender
                  .filter((group) => group.name !== "All")
                  .map((group) => {
                    const groupKey = String(group.key);
                    const isSelected = selectedCategories.includes(groupKey);
                    const isExpanded = expandedSections.includes(groupKey);
                    const count = group.itemCount ?? 0;
                    return (
                      <Box key={`mobile-${groupKey}`} sx={{ borderBottom: "1px solid rgba(148,163,184,0.2)", pb: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isSelected}
                                onChange={() => toggleCategorySelection(groupKey)}
                                sx={{
                                  color: "var(--color-border)",
                                  '&.Mui-checked': { color: "var(--color-primary)" },
                                }}
                              />
                            }
                            label={
                              <Typography sx={{ fontWeight: 600, color: "var(--color-text)" }}>
                                {group.name}
            </Typography>
                            }
                            sx={{ margin: 0, flexGrow: 1 }}
                          />
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Typography sx={{ fontSize: 12, color: "var(--color-muted-text)", fontWeight: 600 }}>
                              {count}
                            </Typography>
                            <IconButton size="small" onClick={() => toggleSectionExpansion(groupKey)}>
                              {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                            </IconButton>
          </Box>
                        </Box>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{ pl: 1, pt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                            {(group.subcategories || []).map((subcategory) => {
                              const subId = String(subcategory.id);
                              const subLabel = subcategory.name || subId;
                              const subKey = makeSubKey(groupKey, subId);
                              const subSelected = selectedSubcategories.includes(subKey);
                              const subCount = subcategory.itemCount ?? 0;
                              return (
                                <Box
                                  key={`mobile-${subKey}`}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={subSelected}
                                        onChange={() => toggleSubcategorySelection(groupKey, subId)}
                                        sx={{
                                          color: "var(--color-border)",
                                          '&.Mui-checked': { color: "var(--color-secondary)" },
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography sx={{ fontSize: 14, color: "var(--color-text)" }}>
                                        {subLabel}
                                      </Typography>
                                    }
                                    sx={{ margin: 0, flexGrow: 1, pl: 1.5 }}
                                  />
                                  <Typography sx={{ fontSize: 12, color: "var(--color-muted-text)", fontWeight: 600 }}>
                                    {subCount}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        </Collapse>
                      </Box>
                    );
                  })}
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Sort By
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "var(--color-surface)",
                      color: "var(--color-text)",
                      "& fieldset": {
                        borderColor: "var(--color-border)",
                      },
                    },
                  }}
                >
                  <InputLabel sx={{ color: "var(--color-text)" }}>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value={1}>Price: Low to High</MenuItem>
                    <MenuItem value={2}>Price: High to Low</MenuItem>
                    <MenuItem value={3}>Newest On Top</MenuItem>
                    <MenuItem value={4}>Oldest On Top</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              onClick={handleResetFilters}
              disabled={!hasActiveFilters}
              sx={{
                textTransform: "none",
                color: "var(--color-muted-text)",
                opacity: hasActiveFilters ? 1 : 0.4,
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => setFilterModalOpen(false)}
              variant="contained"
              sx={{ textTransform: "none", bgcolor: "var(--color-primary)", "&:hover": { bgcolor: "var(--color-secondary)" } }}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-muted-text)",
            fontWeight: 500,
          }}
        >
          Loading shop…
        </Box>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}

