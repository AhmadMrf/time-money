import { useState, useEffect } from "react";

import { useGlobalContext } from "../../context/record-context";
import { mergeDayRecords } from "../../utils/mergeDayRecords";
import ContentWrapper from "../../templates/ContentWrapper";
import RowWrapper from "../../templates/RowWrapper";
import TotalDaily from "./TotalDaily";
import DailyRow from "./DailyRow";
import styles from "./DailyTab.module.css";

const DailyTab = () => {
  const [day, setDay] = useState(0);
  const {
    inMonthObject,
    workPlaces,
    loading: { inMonthLoading, workPlaceLoading },
    error: { inMonthError, workPlaceError },
  } = useGlobalContext();
  const daysRecords = mergeDayRecords(inMonthObject);
  const dayRecord = daysRecords[day];
  console.log(dayRecord);
  const activeDays = Object.keys(daysRecords);
  const dailyRowsObject = dayRecord?.reduce((total, item) => {
    if (!total[item.work_place.id]) {
      total[item.work_place.id] = [item];
    } else {
      total[item.work_place.id] = [...total[item.work_place.id], item];
    }
    return total;
  }, {});
  const dayTotal = (key) => {
    if (!dayRecord) return "-";
    return dayRecord.reduce((total, item) => {
      const option = item[key];
      return total + option;
    }, 0);
  };
  const dailyRows =
    dailyRowsObject && !workPlaceLoading
      ? Object.entries(dailyRowsObject).map((dailyRow) => {
          const { name } = workPlaces?.find((item) => item.id == dailyRow[0]);
          return (
            <DailyRow
              key={dailyRow[0]}
              records={dailyRow[1]}
              title={name}></DailyRow>
          );
        })
      : "";

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
        totalTime={dayTotal("time")}
        totalPrice={dayTotal("price")}
        activeDays={activeDays}
      />
    </ContentWrapper>
  );
};
export default DailyTab;
