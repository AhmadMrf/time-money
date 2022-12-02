import styles from "./Card.module.css";
export default function Card({ className, children, title }) {
  if (title) {
    return (
      <div className={`${styles.card_wrapper} ${className || ""}`}>
        <span>{title}</span>
        <div className={styles.card}>{children}</div>
      </div>
    );
  }
  return <div className={`${styles.card} ${className || ""}`}>{children}</div>;
}
