import { useState } from "react";
import { toJalaali } from "jalaali-js";

import { useGlobalContext } from "../context/record-context";
import { getTimesForweek } from "../utils/getTimesForweek";
import mergeWeekRecords from "../utils/mergeWeekRecords";
import ContentWrapper from "../templates/ContentWrapper";
import RowWrapper from "../templates/RowWrapper";
import WeaklyRow from "./WeaklyRow";
import TotalWeak from "./TotalWeak";
import styles from "./WeaklyTab.module.css";

const WeaklyTab = () => {
  const [sepratedWeekIndex, setSepratedWeekIndex] = useState(0);
  const { inMonthObject } = useGlobalContext();
  const dateSepratedWithWeek = getTimesForweek(inMonthObject);
  const dateSepratedWithWeekWithRecords = dateSepratedWithWeek.filter(
    (weekObject) => weekObject.recordes.length > 0
  );
  console.log(dateSepratedWithWeekWithRecords);
  const weekObject = dateSepratedWithWeekWithRecords[sepratedWeekIndex];
  const mergedRecords = mergeWeekRecords(weekObject);

  const handleChangeWeek = (id) => {
    const index = dateSepratedWithWeekWithRecords.findIndex(
      (item) => item.id === id
    );

    setSepratedWeekIndex(index);
  };
  const weekTotals = (key) => {
    return weekObject?.recordes.reduce((total, item) => {
      const option = item[key];
      return total + option;
    }, 0);
  };
  const weekRows = mergedRecords?.map((day) => {
    const { date, record } = day;
    const price = record ? record.price : "-";
    const time = record ? record.time : "-";
    const weekDay = date.toLocaleDateString("fa-ir", { weekday: "long" });
    const localeDate = date.toLocaleDateString("fa-ir", { dateStyle: "long" });
    const outOfMonth =
      toJalaali(date).jm === inMonthObject.month ? false : true;
    return (
      <WeaklyRow
        key={weekDay}
        weekDay={weekDay}
        date={localeDate}
        price={price}
        time={time}
        outOfMonth={outOfMonth}
        empty={!record}
      />
    );
  });
  return (
    <ContentWrapper>
      <RowWrapper>
        <WeaklyRow weekDay='روز هفته' date='تاریخ' price='مبلغ' time='زمان' />
        {weekRows}
      </RowWrapper>
      <TotalWeak
        handleChangeWeek={handleChangeWeek}
        dateSepratedWithWeek={dateSepratedWithWeek}
        weekIncome={weekTotals("price")}
        weekTime={weekTotals("time")}
      />
    </ContentWrapper>
  );
};
export default WeaklyTab;
