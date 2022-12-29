import { useState } from "react";

import useSendData from "../hooks/useSendData";
import SelectInput from "../templates/SelectInput";
import Total from "../templates/Total";
import Button from "../templates/Button";
import styles from "./TotalIncomes.module.css";

const TotalIncomes = ({
  selected,
  selectedId,
  total,
  onSelect,
  workPlaces,
}) => {
  const [selectedItem, setSelectedItem] = useState(selectedId);
  const { sendData, loading, error, result } = useSendData();
  const noId = selectedId === "noId";
  const options = workPlaces.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));
  const selectHandler = (e) => {
    onSelect(e.target.value);
    setSelectedItem(e.target.value);
  };
  return (
    <Total>
      <div className={styles.total_incomes}> کل دریافتی : {total}</div>
      <div className={styles.selected_income}>
        <SelectInput
          disabled={noId}
          className={styles.select}
          onChange={selectHandler}
          value={selectedItem}>
          {<option value={"all"}>همه </option>}
          {options}
          {noId && <option value={"noId"}>بدون اطلاعات</option>}
        </SelectInput>
        <span>: {selected}</span>
      </div>
      <Button onClick={() => sendData("income", {})} className={styles.button}>
        افزودن دریافتی
      </Button>
    </Total>
  );
};
export default TotalIncomes;
