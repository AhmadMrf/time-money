import NavItem from "./NavItem";
import styles from "./Navbar.module.css";

export default function Layout() {
  return (
    <section className={styles.navbar}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.items}>
            <NavItem
              color="var(--bg-items-navbar-active-1)"
              className={styles.active}
              to="/add-recordes"
            >
              شروع زمان
            </NavItem>
          </li>
          <li className={styles.items}>
            <NavItem
              color="var(--bg-items-navbar-active-2)"
              className={styles.active}
              to="/daily-recordes"
            >
              گزارش روزانه
            </NavItem>
          </li>
          <li className={styles.items}>
            <NavItem
              color="var(--bg-items-navbar-active-3)"
              className={styles.active}
              to="/weekly-recordes"
            >
              گزارش هفتگی
            </NavItem>
          </li>
          <li className={styles.items}>
            <NavItem
              color="var(--bg-items-navbar-active-4)"
              className={styles.active}
              to="/mouthly-recordes"
            >
              گزارش ماهانه
            </NavItem>
          </li>
          <li className={styles.items}>
            <NavItem
              color="var(--bg-items-navbar-active-5)"
              className={styles.active}
              to="/incomes"
            >
              درآمد
            </NavItem>
          </li>
        </ul>
      </nav>
    </section>
  );
}
