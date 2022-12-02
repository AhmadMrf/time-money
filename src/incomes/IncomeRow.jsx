import Row from "../templates/Row";
import styles from "./IncomeRow.module.css";
export default function IncomeRow({ id, description, incomeDate, price }) {
  return (
    <Row className={styles.row}>
      <span className={styles.span_id}>{id}</span>
      <span className={styles.span_desc}>{description}</span>
      <span className={styles.span_price}>{price}</span>
      <span className={styles.span_date}>
        {incomeDate.toLocaleString("fa-ir")}
      </span>
    </Row>
  );
}
