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
    workPlaces,
    loading: { inMonthLoading },
    error: { inMonthError },
  } = useGlobalContext();
  console.log(workPlaces);
  const daysRecords = mergeDayRecords(inMonthObject);
  const dayRecord = daysRecords[day];
  const activeDays = Object.keys(daysRecords);

  const dailyRowsObject = dayRecord?.reduce((total, item) => {
    if (!total[item.work_place.id]) {
      total[item.work_place.id] = [item];
    } else {
      total[item.work_place.id] = [...total[item.work_place.id], item];
    }
    return total;
  }, {});
  const dailyRows = Object.entries(dailyRowsObject).map((dailyRow) => {
    console.log(dailyRow);
    return <DailyRow title={dailyRow[0]}></DailyRow>;
  });

  const changeSelect = (day) => {
    setDay(day);
  };
  useEffect(() => {
    const firstDay = Object.keys(daysRecords)[0];
    if (firstDay) setDay(firstDay);
  }, [inMonthLoading]);

  let noResult = null;
  if (!inMonthObject.records.length) {
    noResult = (
      <RowWrapper className={styles.center}>
        <h4> اطلاعاتی ثبت نشده</h4>
      </RowWrapper>
    );
  }
  if (inMonthError) {
    noResult = (
      <RowWrapper className={styles.center}>
        <h4> خطا در دریافت اطلاعات</h4>
      </RowWrapper>
    );
  }
  if (inMonthLoading) {
    noResult = (
      <RowWrapper className={styles.center}>
        <h4> در حال دریافت اطلاعات ...</h4>
      </RowWrapper>
    );
  }

  return (
    <ContentWrapper>
      {noResult || <RowWrapper>{dailyRows}</RowWrapper>}
      <TotalDaily
        changeSelect={changeSelect}
        totalTime={4}
        totalPrice={200}
        activeDays={activeDays}
      />
    </ContentWrapper>
  );
};
export default DailyTab;
