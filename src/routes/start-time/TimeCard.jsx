import Button from "../../templates/Button";
import Card from "../../templates/Card";
import styles from "./TimeCard.module.css";

const TimeCard = ({ id, place, startTime }) => {
  let formattedStartTime = new Intl.DateTimeFormat("fa-ir", {
    timeStyle: "short",
  }).format(startTime);
  return (
    <Card className={styles.card}>
      <span className={styles.title}>{place}</span>
      <div className={styles.record_info}>
        <span>شروع :</span>
        <span>{formattedStartTime}</span>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.submit_button}>پایان</Button>
        <Button className={styles.cancel_button}>لغو</Button>
      </div>
    </Card>
  );
};
export default TimeCard;
