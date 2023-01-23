import { useLocalStorage } from "../../hooks/useLocalStorage";
import Button from "../../templates/Button";
import Card from "../../templates/Card";
import styles from "./TimeCard.module.css";

const TimeCard = ({ setLocalStorage, work_place, start_time, id }) => {
  const { deletLocalData, setLocalData, getLocalData } = useLocalStorage();
  let formattedStartTime = new Intl.DateTimeFormat("fa-ir", {
    timeStyle: "short",
  }).format(start_time);
  const handleCancle = () => {
    const newData = deletLocalData("record", id);
    setLocalStorage(newData);
  };
  const handleSubmit = () => {
    const end_time = Date.now();
    const newRecord = { id, work_place, start_time, end_time };
    deletLocalData("record", id);
    const newData = setLocalData("record", newRecord);
    setLocalStorage(newData);
  };
  return (
    <Card className={styles.card}>
      <span className={styles.title}>{work_place.name}</span>
      <div className={styles.record_info}>
        <span>شروع :</span>
        <span>{formattedStartTime}</span>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleSubmit} className={styles.submit_button}>
          پایان
        </Button>
        <Button onClick={handleCancle} className={styles.cancel_button}>
          لغو
        </Button>
      </div>
    </Card>
  );
};
export default TimeCard;
