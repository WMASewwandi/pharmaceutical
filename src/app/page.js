import styles from "./page.module.css";
import FeaturedCategories from "../components/FeaturedCategories";
import TopOffers from "../components/TopOffers";

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
    </div>
  );
}
