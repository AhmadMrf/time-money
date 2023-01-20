import { useEffect } from "react";
import { useGlobalContext } from "../../context/record-context";
import useSendData from "../../hooks/useSendData";
import Button from "../../templates/Button";
import Card from "../../templates/Card";
import Input from "../../templates/Input";
import styles from "./CompletedTimeCard.module.css";
import { useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
const CompletedTimeCard = ({
  id,
  work_place,
  start_time,
  end_time,
  setLocalStorage,
}) => {
  const { getRecords } = useGlobalContext();
  const { sendData, loading, error, result } = useSendData();
  const { deletLocalData } = useLocalStorage();
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const handleSendData = () => {
    const recordData = {
      work_place: {
        __type: "Pointer",
        className: "work_place",
        objectId: work_place.id,
      },
      price: +priceRef.current.value,
      description: descriptionRef.current.value,
      time: end_time - start_time,
      start_time: new Date(start_time),
    };
    sendData("records", recordData);
  };

  useEffect(() => {
    if (result) {
      deletLocalData("record", id);
      setLocalStorage(result);
      getRecords(result.id);
    }
  }, [result]);
  let formattedStartTime = new Intl.DateTimeFormat("fa-ir", {
    timeStyle: "short",
  }).format(start_time);
  let formattedEndTime = new Intl.DateTimeFormat("fa-ir", {
    timeStyle: "short",
  }).format(end_time);
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
          disabled={loading || error}
          onClick={handleSendData}
          className={styles.submit_button}>
          ثبت
        </Button>
      </div>
    </Card>
  );
};
export default CompletedTimeCard;
