import styles from "./Row.module.css";
export default function Row(props) {
  return (
    <div className={`${styles.row} ${props.className}`}>{props.children}</div>
  );
}
