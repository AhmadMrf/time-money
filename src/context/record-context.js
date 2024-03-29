import { createContext, useContext, useState } from "react";
import jalaali from "jalaali-js";

import useGetInMonthRecords from "../hooks/useGetInMonthRecords";
import useGetData from "../hooks/useGetData";

const defaultData = {
  inMonthObject: {},
  workPlaces: [],
  incomes: [],
  error: null,
  loading: true,
  handleMonthTab: (value, date) => {},
};

const now = new Date(Date.now());
const { jy: year } = jalaali.toJalaali(now);
const { jm: month } = jalaali.toJalaali(now);

const recordsData = createContext(defaultData);

const RecordProvider = ({ children }) => {
  const [date, setDate] = useState({ year, month });
  function handleMonthTab(value, dateInfo) {
    if (dateInfo === "month") {
      setDate({ ...date, month: value });
    } else {
      setDate({ ...date, year: value });
    }
  }
  const {
    getRecords,
    inMonthObject,
    loading: inMonthLoading,
    error: inMonthError,
  } = useGetInMonthRecords(date.year, date.month);
  const {
    getData: getWorkPlaceData,
    data: workPlaces,
    loading: workPlaceLoading,
    error: workPlaceError,
  } = useGetData("work_place", "name");

  const {
    getData: getIncomeData,
    data: incomes,
    loading: incomeLoading,
    error: incomeError,
  } = useGetData("income");

  const contextData = {
    workPlaces,
    inMonthObject,
    incomes,
    loading: { workPlaceLoading, inMonthLoading, incomeLoading },
    error: { inMonthError, workPlaceError, incomeError },
    handleMonthTab,
    getIncomeData,
    getWorkPlaceData,
    getRecords,
  };

  return (
    <recordsData.Provider value={contextData}>{children}</recordsData.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(recordsData);
};

export { RecordProvider as default, useGlobalContext };
