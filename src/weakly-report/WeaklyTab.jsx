import { useGlobalContext } from "../context/record-context";
import { getTimesForweek } from "../utils/getTimesForweek";

import ContentWrapper from "../templates/ContentWrapper";
import RowWrapper from "../templates/RowWrapper";
import WeaklyRow from "./WeaklyRow";
import { useState } from "react";
import TotalWeak from "./TotalWeak";
import styles from "./WeaklyTab.module.css";

const WeaklyTab = () => {
  const [sepratedWeekIndex, setSepratedWeekIndex] = useState(0);
  const { inMonthObject } = useGlobalContext();
  const dateSepratedWithWeek = getTimesForweek(inMonthObject);
  console.log(dateSepratedWithWeek[sepratedWeekIndex]);

  const handleChangeWeek = (index) => {
    setSepratedWeekIndex(index);
  };
  return (
    <ContentWrapper>
      <RowWrapper>
        <WeaklyRow weekDay='روز هفته' date='تاریخ' price='مبلغ' time='زمان' />
        <WeaklyRow weekDay='شنبه' date='1/5/1401' price={200} time={1} />
        <WeaklyRow weekDay='شنبه' date='1/5/1401' price={200} time={1} />
        <WeaklyRow weekDay='شنبه' date='1/5/1401' price={200} time={1} />
        <WeaklyRow weekDay='شنبه' date='1/5/1401' price={200} time={1} />
        <WeaklyRow weekDay='شنبه' date='1/5/1401' price={200} time={1} />
        <WeaklyRow weekDay='شنبه' date='1/5/1401' price={200} time={1} />
        <WeaklyRow weekDay='شنبه' date='1/5/1401' price={200} time={1} />
      </RowWrapper>
      <TotalWeak
        handleChangeWeek={handleChangeWeek}
        dateSepratedWithWeek={dateSepratedWithWeek}
        weekIncome={500}
        weekTime={6}
      />
    </ContentWrapper>
  );
};
export default WeaklyTab;
