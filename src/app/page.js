'use client';

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import FeaturedCategories from "../components/FeaturedCategories";
import TopOffers from "../components/TopOffers";
import UploadPrescription from "../components/UploadPrescription";
import FeaturedProducts from "../components/FeaturedProducts";
import HealthBlog from "../components/HealthBlog";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";
import BrandPartners from "../components/BrandPartners";

const HERO_SLIDES = [
  {
    image: "https://www.entrepreneurshipinabox.com/wp-content/uploads/Tips-When-Buying-Retail-Return-Stock-For-Your-eCommerce-Business-From-Auction-1024x682.jpg",
    tagline: "Immersive Commerce",
    headline: "Shop Bold, 3D-Rendered Collections",
    description: "Explore vibrant storefronts packed with colourful tech, fashion, and wellness drops curated just for you.",
    ctaLabel: "Browse Collections",
    ctaLink: "/categories",
    secondaryLabel: "Latest Drops",
    secondaryLink: "/new-arrivals",
  },
  {
    image: "https://learn.g2.com/hs-fs/hubfs/iStock-1024926532.jpg?width=3862&name=iStock-1024926532.jpg",
    tagline: "Personalised Deals",
    headline: "Cart Smart With AI-Picked Favourites",
    description: "Unlock limited-time offers on everyday essentials, prepared by your data-driven shopping assistant.",
    ctaLabel: "View Deals",
    ctaLink: "/deals",
    secondaryLabel: "Go To Cart",
    secondaryLink: "/cart",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroSlider}>
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.headline}
              className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ""}`}
            >
              <div
                className={styles.slideImage}
                style={{ backgroundImage: `url(${slide.image})` }}
                role="presentation"
              />
              <div className={styles.heroContent}>
                {slide.tagline && <span className={styles.heroTagline}>{slide.tagline}</span>}
                <h1>{slide.headline}</h1>
                <p>{slide.description}</p>
                <div className={styles.heroActions}>
                  <a href={slide.ctaLink} className="cta-button">{slide.ctaLabel}</a>
                  {slide.secondaryLink && (
                    <a href={slide.secondaryLink} className={styles.heroGhost}>
                      {slide.secondaryLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={`${styles.heroNav} ${styles.heroNavPrev}`}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.heroNav} ${styles.heroNavNext}`}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className={styles.heroIndicators}>
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.heroIndicator} ${index === currentSlide ? styles.heroIndicatorActive : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      <FeaturedCategories />
      <TopOffers />
      <UploadPrescription />
      {/* <FeaturedProducts /> */}
      <HealthBlog />
      <WhyChooseUs />
      <Newsletter />
      <BrandPartners />
    </div>
  );
}
