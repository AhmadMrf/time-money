import styles from "./SelectInput.module.css";

const SelectInput = ({ children, className, ...rest }) => {
  return (
    <select className={`${styles.select} ${className || ""}`} {...rest}>
      {children}
    </select>
  );
};
export default SelectInput;
