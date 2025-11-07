import styles from "./page.module.css";
import FeaturedCategories from "../components/FeaturedCategories";
import TopOffers from "../components/TopOffers";
import UploadPrescription from "../components/UploadPrescription";
import FeaturedProducts from "../components/FeaturedProducts";
import HealthBlog from "../components/HealthBlog";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";
import BrandPartners from "../components/BrandPartners";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <img
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop"
          alt="Person shopping online using laptop and credit card"
          className={styles.heroImg}
        />
        <div className={styles.heroContent}>
          <h1>Everything you love, delivered fast</h1>
          <p>
            Discover curated tech, fashion, wellness, and home picks from brands you trust.
          </p>
          <div className={styles.heroActions}>
            <a href="/shop" className="cta-button">Start shopping</a>
          </div>
        </div>
      </section>
      <FeaturedCategories />
      <TopOffers />
      <UploadPrescription />
      <FeaturedProducts />
      <HealthBlog />
      <WhyChooseUs />
      <Newsletter />
      <BrandPartners />
    </div>
  );
}
