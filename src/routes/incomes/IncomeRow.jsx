import Row from "../../templates/Row";
import styles from "./IncomeRow.module.css";
const IncomeRow = ({ id, workPlace, description, incomeDate, price }) => {
  return (
    <Row className={styles.row}>
      <span className={styles.span_id}>{id}</span>
      <span className={styles.span_work_place}>{workPlace}</span>
      <span className={styles.span_desc}>{description}</span>
      <span className={styles.span_price}>{price}</span>
      <span className={styles.span_date}>
        {incomeDate.toLocaleString("fa-ir", { dateStyle: "long" })}
      </span>
    </Row>
  );
};
export default IncomeRow;
