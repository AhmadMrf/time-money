import { createContext, useContext, useState } from "react";

import useGetInMonthRecords from "../hooks/useGetInMonthRecords";
import useGetData from "../hooks/useGetData";

const defaultData = {
  inMonthObject: {},
  workPlaces: [],
  error: null,
  loading: true,
  handleMonthTab: (value, date) => {},
};

const recordsData = createContext(defaultData);

const RecordProvider = ({ children }) => {
  const [date, setDate] = useState(null);

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
  } = useGetInMonthRecords();
  const {
    data: workPlaces,
    loading: workPlaceLoading,
    error: workPlaceError,
  } = useGetData("work_place", "name");

  const {
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
  };

  return (
    <recordsData.Provider value={contextData}>{children}</recordsData.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(recordsData);
};

export { RecordProvider as default, useGlobalContext };
