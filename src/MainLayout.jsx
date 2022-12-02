import styles from "./MainLayout.module.css";

export default function MainLayout({ children }) {
  return <section className={styles.main_layout}>{children}</section>;
}
