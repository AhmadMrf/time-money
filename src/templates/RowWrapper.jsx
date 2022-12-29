import { useEffect, useRef, useState } from "react";
import styles from "./RowWrapper.module.css";

const RowWrapper = ({ children, className, ...rest }) => {
  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledBottom, setScrolledBottom] = useState(false);
  const rowWrapperRef = useRef(null);

  function creatShadowIfScrollable({ current: rowWrapper }) {
    setScrolledTop(true);
    setScrolledBottom(true);
    if (rowWrapper.scrollTop < 2) {
      setScrolledTop(false);
    }
    if (
      rowWrapper.scrollTop + rowWrapper.offsetHeight + 2 >
      rowWrapper.scrollHeight
    ) {
      setScrolledBottom(false);
    }
  }
  useEffect(() => {
    creatShadowIfScrollable(rowWrapperRef);
  }, []);
  return (
    <div
      onScroll={() => creatShadowIfScrollable(rowWrapperRef)}
      ref={rowWrapperRef}
      className={`${styles.row_wrapper} ${
        scrolledBottom ? styles.scrolled_bottom : ""
      } ${scrolledTop ? styles.scrolled_top : ""} ${className ?? ""}`}
      {...rest}>
      {children}
    </div>
  );
};
export default RowWrapper;
