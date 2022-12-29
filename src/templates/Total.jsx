import styles from "./Total.module.css";
const Total = ({ children, className, ...rest }) => {
  return <div className={`${styles.total} ${className || ""}`}>{children}</div>;
};
export default Total;
