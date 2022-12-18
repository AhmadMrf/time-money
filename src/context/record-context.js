import { createContext, useContext, useState } from "react";
import { useGetInMonthRecords } from "../hooks/useGetInMonthRecords";
import { useGetDataFromDb } from "../hooks/useGetDataFromDb";
import jalaali from "jalaali-js";
const defaultData = {
  inMonthObject: {},
  workPlaces: [],
  error: null,
  loading: true,
  handleMonthTab: (value, date) => {},
};
function initialDate() {
  const now = new Date(Date.now());
  const { jy: year } = jalaali.toJalaali(now);
  const { jm: month } = jalaali.toJalaali(now);
  return { year, month };
}

const recordsData = createContext(defaultData);

function RecordProvider({ children }) {
  const [date, setDate] = useState(initialDate);
  function handleMonthTab(value, dateInfo) {
    if (dateInfo === "month") {
      setDate({ ...date, month: value });
    } else {
      setDate({ ...date, year: value });
    }
  }
  const {
    inMonthObject,
    loading: inMonthLoading,
    error: inMonthError,
  } = useGetInMonthRecords(date.year, date.month);
  const {
    data: workPlaces,
    loading: workPlaceLoading,
    error: workPlaceError,
  } = useGetDataFromDb("work_place", "name");

  const {
    data: incomes,
    loading: incomeLoading,
    error: incomeError,
  } = useGetDataFromDb("income");

  const contextData = {
    workPlaces,
    inMonthObject,
    incomes,
    loading: { workPlaceLoading, inMonthLoading, incomeLoading },
    error: { inMonthError, workPlaceError, incomeError },
    handleMonthTab,
  };
  return (
    <recordsData.Provider value={contextData}>{children}</recordsData.Provider>
  );
}
const useGlobalContext = () => {
  return useContext(recordsData);
};

export { RecordProvider as default, useGlobalContext };
