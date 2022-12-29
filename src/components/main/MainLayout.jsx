import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  return <section className={styles.main_layout}>{children}</section>;
};
export default MainLayout;
