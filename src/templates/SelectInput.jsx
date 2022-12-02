import styles from "./SelectInput.module.css";

export default function SelectInput({ children, className, ...rest }) {
  return (
    <select className={`${styles.select} ${className || ""}`} {...rest}>
      {children}
    </select>
  );
}
