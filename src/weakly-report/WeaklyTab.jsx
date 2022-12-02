import { useContext } from "react";
import RowWrapper from "../templates/RowWrapper";
import WeaklyRow from "./WeaklyRow";
import TotalWeak from "./TotalWeak";
import { Records } from "../context/record-context";
import styles from "./WeaklyTab.module.css";
import ContentWrapper from "../templates/ContentWrapper";

export default function WeaklyTab() {
  // const RECORDS = useContext(Records);

  return (
    <ContentWrapper>
      <RowWrapper>
        <WeaklyRow weekDay="روز هفته" date="تاریخ" price="مبلغ" time="زمان" />
        <WeaklyRow weekDay="شنبه" date="1/5/1401" price={200} time={1} />
        <WeaklyRow weekDay="شنبه" date="1/5/1401" price={200} time={1} />
        <WeaklyRow weekDay="شنبه" date="1/5/1401" price={200} time={1} />
        <WeaklyRow weekDay="شنبه" date="1/5/1401" price={200} time={1} />
        <WeaklyRow weekDay="شنبه" date="1/5/1401" price={200} time={1} />
        <WeaklyRow weekDay="شنبه" date="1/5/1401" price={200} time={1} />
        <WeaklyRow weekDay="شنبه" date="1/5/1401" price={200} time={1} />
      </RowWrapper>
      <TotalWeak weekIncome={500} weekNumber={14} weekTime={6} />
    </ContentWrapper>
  );
}
