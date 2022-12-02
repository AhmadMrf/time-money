import styles from "./StartTab.module.css";

import Button from "../templates/Button";
import ContentWrapper from "../templates/ContentWrapper";
import RowWrapper from "../templates/RowWrapper";
import SelectInput from "../templates/SelectInput";
import Total from "../templates/Total";
import TimeCard from "./TimeCard";
import CompletedTimeCard from "./CompletedTimeCard";

export default function StartTab() {
  return (
    <ContentWrapper>
      <RowWrapper>
        <TimeCard />
        <TimeCard />
        <CompletedTimeCard />
      </RowWrapper>
      <Total>
        <SelectInput>
          <option value='0'>مطب</option>
          <option value='1'>منزل</option>
        </SelectInput>
        <Button className={styles.button}> افزودن </Button>
      </Total>
    </ContentWrapper>
  );
}
