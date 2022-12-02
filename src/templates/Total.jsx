import styles from "./Total.module.css";
export default function Total({ children, className, ...rest }) {
  return <div className={`${styles.total} ${className || ""}`}>{children}</div>;
}
