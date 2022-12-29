import Row from "../templates/Row";
import styles from "./WeaklyRow.module.css";

const WeaklyRow = ({ weekDay, date, price, time, outOfMonth, empty }) => {
  const className = `${styles.row} ${outOfMonth ? styles.out_of_month : ""} ${
    empty ? styles.empty : ""
  }`;
  return (
    <Row className={className}>
      <span>{weekDay}</span>
      <span>{date}</span>
      <span>{price}</span>
      <span>{time}</span>
    </Row>
  );
};
export default WeaklyRow;
