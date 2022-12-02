import { useState } from "react";
import SelectInput from "../templates/SelectInput";
import Total from "../templates/Total";
import Button from "../templates/Button";

import styles from "./TotalIncomes.module.css";
export default function TotalIncomes({
  selected,
  total,
  onSelect,
  workPlaces
}) {
  const [selectedItem, setSelectedItem] = useState(1);

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
          className={styles.select}
          onChange={selectHandler}
          value={selectedItem}
        >
          {options}
        </SelectInput>
        <span>: {selected}</span>
      </div>
      <Button className={styles.button}> افزودن دریافتی </Button>
    </Total>
  );
}
