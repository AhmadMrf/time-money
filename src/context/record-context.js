import { createContext, useState } from "react";
import { useGetInMonthRecords } from "../hooks/useGetInMonthRecords";

const defaultData = {
  inMonthObject: {},
  error: null,
};
export const recordsData = createContext(defaultData);

export default function RecordProvider({ children }) {
  const inMonthDate = useGetInMonthRecords(1401, 8);
  return (
    <recordsData.Provider value={inMonthDate}>{children}</recordsData.Provider>
  );
}
