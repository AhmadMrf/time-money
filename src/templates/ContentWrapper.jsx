import styles from "./ContentWrapper.module.css";
const ContentWrapper = ({ children, className }) => {
  return (
    <div className={`${styles.wrapper} ${className || ""}`}>{children}</div>
  );
};
export default ContentWrapper;
