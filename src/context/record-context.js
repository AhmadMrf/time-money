import { createContext, useContext, useState } from "react";
import { useGetInMonthRecords } from "../hooks/useGetInMonthRecords";
import { useGetDataFromDb } from "../hooks/useGetDataFromDb";
const defaultData = {
  inMonthObject: {},
  workPlaces: [],
  error: null,
  loading: true,
};
const recordsData = createContext(defaultData);

function RecordProvider({ children }) {
  const {
    inMonthObject,
    loading: inMonthLoading,
    error: inMonthError,
  } = useGetInMonthRecords(1401, 8);
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
  };
  return (
    <recordsData.Provider value={contextData}>{children}</recordsData.Provider>
  );
}
const useGlobalContext = () => {
  return useContext(recordsData);
};

export { RecordProvider as default, useGlobalContext };
