import SelectInput from "../templates/SelectInput";
import Total from "../templates/Total";
import styles from "./TotalWeak.module.css";

const TotalWeak = ({
  weekIncome,
  weekTime,
  dateSepratedWithWeek,
  handleChangeWeek,
}) => {
  const selectOptions = dateSepratedWithWeek.map((item) => {
    const startTime = item.startDate.toLocaleDateString("fa-ir", {
      month: "short",
      day: "numeric",
    });
    const endTime = item.endDate.toLocaleDateString("fa-ir", {
      month: "short",
      day: "numeric",
    });
    const value = `${startTime} تا ${endTime}`;
    return (
      <option key={item.id} value={item.id}>
        {value}
      </option>
    );
  });
  return (
    <Total>
      <SelectInput className={styles.select}>{selectOptions}</SelectInput>
      <span className={styles.price}>مبلغ کل : {weekIncome}</span>
      <span className={styles.time}>زمان کل : {weekTime}</span>
    </Total>
  );
};
export default TotalWeak;
