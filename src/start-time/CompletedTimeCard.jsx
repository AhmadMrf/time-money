import Button from "../templates/Button";
import Card from "../templates/Card";
import Input from "../templates/Input";
import styles from "./CompletedTimeCard.module.css";
import { useRef } from "react";
export default function CompletedTimeCard() {
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  return (
    <Card className={styles.card}>
      <span className={styles.title}>مطب</span>
      <div className={styles.record_info}>
        <div className={styles.times}>
          <span>12:45</span>
          تا
          <span>15:55</span>
        </div>
        <div className={styles.info}>
          <Input className={styles.input} ref={priceRef} id="price" title="مبلغ" type="text" />
          <Input className={styles.input}
            ref={descriptionRef}
            id="description"
            title="توضیحات"
            type="text"
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={() => console.log(priceRef.current.value)}
          className={styles.submit_button}
        >
          ثبت
        </Button>
      </div>
    </Card>
  );
}
