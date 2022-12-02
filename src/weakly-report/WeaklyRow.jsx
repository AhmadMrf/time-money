import styles from "./WeaklyRow.module.css";
import Row from "../templates/Row";

export default function WeaklyRow({ weekDay, date, price, time }) {
  return (
    <Row className={styles.row}>
      <span>{weekDay}</span>
      <span>{date}</span>
      <span>{price}</span>
      <span>{time}</span>
    </Row>
  );
}
