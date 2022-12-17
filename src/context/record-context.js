import { createContext, useContext, useState } from "react";
import { useGetInMonthRecords } from "../hooks/useGetInMonthRecords";

const defaultData = {
  inMonthObject: {},
  error: null,
};
const recordsData = createContext(defaultData);

function RecordProvider({ children }) {
  const inMonthDate = useGetInMonthRecords(1401, 8);
  return (
    <recordsData.Provider value={inMonthDate}>{children}</recordsData.Provider>
  );
}
const useGetGlobalContext = () => {
  return useContext(recordsData);
};

export { RecordProvider as default, useGetGlobalContext };
