import SelectInput from "../templates/SelectInput";
import Total from "../templates/Total";
import styles from "./TotalWeak.module.css";

export default function TotalWeak({
  weekIncome,
  weekNumber,
  weekTime,
  className
}) {
  return (
    <Total>
      <SelectInput className={styles.select}>
        <option value="">هفته {weekNumber} (1 تا 8 فروردین)</option>
        <option value="">هفته {weekNumber} (9 تا 12 فروردین)</option>
        <option value="">هفته {weekNumber} (13 تا 18 فروردین)</option>
        <option value="">هفته {weekNumber} (19 تا 28 فروردین)</option>
      </SelectInput>
      <span className={styles.price}>مبلغ کل : {weekIncome}</span>
      <span className={styles.time}>زمان کل : {weekTime}</span>
    </Total>
  );
}
