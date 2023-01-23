import { useGlobalContext } from "../../context/record-context";
import { jalaaliMonthLength } from "jalaali-js";
import { showTime } from "../../utils/showTime";
import { monthes } from "../../data/dates";
import SelectInput from "../../templates/SelectInput";
import Total from "../../templates/Total";
import styles from "./TotalDaily.module.css";
const TotalDaily = ({
  totalTime,
  totalPrice,
  activeDays,
  changeSelect,
  // defaultSelected,
}) => {
  const {
    inMonthObject,
    loading: { inMonthLoading },
    error: { inMonthError },
  } = useGlobalContext();
  const handleSelect = (e) => {
    changeSelect(+e.target.value + 1);
  };
  const monthLength = jalaaliMonthLength(
    inMonthObject.year,
    inMonthObject.month
  );
  return (
    <Total>
      <div className={styles.select_wrapper}>
        <SelectInput
          // defaultValue={defaultSelected || 1}
          onChange={handleSelect}
          disabled={inMonthLoading || inMonthError || !activeDays.length}
          className={styles.select}>
          {Array.from({ length: monthLength }).map((_, i) => {
            const enable = activeDays.find((day) => day - 1 === i);
            return (
              <option
                title={!enable ? "اطلاعاتی ثبت نشده است" : ""}
                value={i}
                disabled={!enable}
                key={i}>
                {i + 1}
              </option>
            );
          })}
        </SelectInput>
        <span>
          {monthes[inMonthObject.month - 1]} {inMonthObject.year}
        </span>
      </div>
      <span>مبلغ کل : {totalPrice}</span>{" "}
      <span>زمان کل : {showTime(totalTime)}</span>
    </Total>
  );
};
export default TotalDaily;
