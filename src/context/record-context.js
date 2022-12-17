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
    loading: getInMonthLoading,
    error: getInMonthError,
  } = useGetInMonthRecords(1401, 8);
  const {
    data: workPlaces,
    loading: getDataLoading,
    error: getDataError,
  } = useGetDataFromDb("work_place", "name");

  const contextData = {
    workPlaces,
    inMonthObject,
    loading: getDataLoading || getInMonthLoading,
    error: getInMonthError || getDataError,
  };
  return (
    <recordsData.Provider value={contextData}>{children}</recordsData.Provider>
  );
}
const useGetGlobalContext = () => {
  return useContext(recordsData);
};

export { RecordProvider as default, useGetGlobalContext };
