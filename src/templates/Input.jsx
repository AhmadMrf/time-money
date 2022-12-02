import styles from "./Input.module.css";
import { forwardRef } from "react";
export default forwardRef(function Input(
  { className, title = "title", id = "id", ...rest },
  ref
) {
  return (
    <div className={`${styles.input_wrapper} ${className || ""}`}>
      <label className={styles.label} htmlFor={id}>
        {title}
      </label>
      <input ref={ref} className={styles.input} {...rest} id={id} />
    </div>
  );
});
