import { useState, useEffect } from "react";

import { useGlobalContext } from "../../context/record-context";
import { mergeDayRecords } from "../../utils/mergeDayRecords";
import ContentWrapper from "../../templates/ContentWrapper";
import RowWrapper from "../../templates/RowWrapper";
import TotalDaily from "./TotalDaily";
import DailyRow from "./DailyRow";
import styles from "./DailyTab.module.css";

const DailyTab = () => {
  const [day, setDay] = useState(null);
  const {
    inMonthObject,
    loading: { inMonthLoading },
    error,
  } = useGlobalContext();
  const daysRecords = mergeDayRecords(inMonthObject);
  const dayRecord = daysRecords[day];
  const activeDays = Object.keys(daysRecords);
  console.log(dayRecord);
  const changeSelect = (day) => {
    setDay(day);
  };
  console.log(inMonthLoading);
  useEffect(() => {
    const firstDay = Object.keys(daysRecords)[0];
    if (firstDay) setDay(firstDay);
  }, [inMonthLoading]);
  return (
    <ContentWrapper>
      <RowWrapper>
        <DailyRow title='منزل'></DailyRow>
        <DailyRow title='مطب'></DailyRow>
      </RowWrapper>
      <TotalDaily
        changeSelect={changeSelect}
        totalTime={4}
        totalPrice={200}
        activeDays={activeDays}
        // defaultSelected={day}
      />
    </ContentWrapper>
  );
};
export default DailyTab;
