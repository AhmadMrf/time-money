import SelectInput from "../../templates/SelectInput";
import Total from "../../templates/Total";
import styles from "./TotalDaily.module.css";

const TotalDaily = ({ children, className, ...rest }) => {
  const dayOption = 30;
  const monthOption = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
  ];
  const yearOption = ["1400", "1401"];
  return (
    <Total>
      <div className={styles.select_wrapper}>
        <SelectInput className={styles.select}>
          {Array.from({ length: dayOption }).map((_, i) => (
            <option key={i}>{i + 1}</option>
          ))}
        </SelectInput>
        <span> فروردین 1400 (شنبه)</span>
      </div>
      <span>مبلغ کل : 500</span> <span>زمان کل : 5</span>{" "}
    </Total>
  );
};
export default TotalDaily;
