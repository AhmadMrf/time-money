import Button from "../templates/Button";
import Card from "../templates/Card";
import styles from "./TimeCard.module.css";

export default function TimeCard() {
  return (
    <Card className={styles.card}>
      <span className={styles.title}>مطب</span>
      <div className={styles.record_info}>
        <span>شروع :</span>
        <span> 12:45</span>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.submit_button}>پایان</Button>
        <Button className={styles.cancel_button}>لغو</Button>
      </div>
    </Card>
  );
}
