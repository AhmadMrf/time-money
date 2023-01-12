import Button from "../../templates/Button";
import Card from "../../templates/Card";
import Input from "../../templates/Input";
import styles from "./CompletedTimeCard.module.css";
import { useRef } from "react";
const CompletedTimeCard = ({
  id,
  work_place,
  start_time,
  end_time,
  description,
  price,
}) => {
  let formattedStartTime = new Intl.DateTimeFormat("fa-ir", {
    timeStyle: "short",
  }).format(start_time);
  let formattedEndTime = new Intl.DateTimeFormat("fa-ir", {
    timeStyle: "short",
  }).format(end_time);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  return (
    <Card className={styles.card}>
      <span className={styles.title}>{work_place.name}</span>
      <div className={styles.record_info}>
        <div className={styles.times}>
          <span>{formattedStartTime}</span>
          تا
          <span>{formattedEndTime}</span>
        </div>
        <div className={styles.info}>
          <Input
            className={styles.input}
            ref={priceRef}
            id='price'
            // value={price}
            title='مبلغ'
            type='text'
          />
          <Input
            className={styles.input}
            ref={descriptionRef}
            id='description'
            title='توضیحات'
            type='text'
            // value={description}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={() => console.log(priceRef.current.value)}
          className={styles.submit_button}>
          ثبت
        </Button>
      </div>
    </Card>
  );
};
export default CompletedTimeCard;
