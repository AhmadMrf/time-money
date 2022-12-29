import { useGlobalContext } from "../../context/record-context";
import SelectInput from "../../templates/SelectInput";
import Total from "../../templates/Total";
import styles from "./TotalWeak.module.css";

const TotalWeak = ({
  weekIncome,
  weekTime,
  dateSepratedWithWeek,
  handleChangeWeek,
  defaultSeleced,
}) => {
  const {
    inMonthObject,
    loading: { inMonthLoading },
    error: { inMonthError },
  } = useGlobalContext();
  const selectOptions = dateSepratedWithWeek.map((item) => {
    const startTime = item.startDate.toLocaleDateString("fa-ir", {
      day: "numeric",
      month: "short",
    });
    const endTime = item.endDate.toLocaleDateString("fa-ir", {
      day: "numeric",
      month: "short",
    });
    const value = `${endTime}${startTime} `;
    const empty = item.recordes.length ? false : true;
    return (
      <option
        className={`${empty ? styles.empty : ""}`}
        key={item.id}
        disabled={empty}
        title={empty ? "اطلااتی ثبت نشده" : ""}
        value={item.id}>
        {value}
      </option>
    );
  });
  return (
    <Total>
      <SelectInput
        defaultValue={defaultSeleced || 1}
        disabled={
          inMonthError || inMonthLoading || !inMonthObject?.records?.length
        }
        onChange={(e) => handleChangeWeek(e.target.value)}
        className={styles.select}>
        {selectOptions}
      </SelectInput>
      <span className={styles.price}>مبلغ کل : {weekIncome}</span>
      <span className={styles.time}>زمان کل : {weekTime}</span>
    </Total>
  );
};
export default TotalWeak;
