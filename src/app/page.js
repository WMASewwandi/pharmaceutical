import styles from "./page.module.css";
import FeaturedCategories from "../components/FeaturedCategories";
import TopOffers from "../components/TopOffers";
import UploadPrescription from "../components/UploadPrescription";
import FeaturedProducts from "../components/FeaturedProducts";
import HealthBlog from "../components/HealthBlog";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <img src="/images/home2.png" alt="Pharmacy hero" className={styles.heroImg} />
        <div className={styles.heroContent}>
          <h1>Your trusted online pharmacy</h1>
          <p>
            Shop genuine medicines, wellness, and healthcare essentials delivered to your door.
          </p>
          
        </div>
      </section>
      <FeaturedCategories />
      <TopOffers />
      <UploadPrescription />
      <FeaturedProducts />
      <HealthBlog />
      <WhyChooseUs />
    </div>
  );
}
