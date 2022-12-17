import { createContext, useContext } from "react";
import { useGetDataFromDb } from "../hooks/useGetDataFromDb";
const defaultData = {
  inMonthObject: {},
  incomes: [],
  error: null,
  loading: true,
};
const incomeData = createContext(defaultData);

function IncomeProvider({ children }) {
  const { data: incomes, loading, error } = useGetDataFromDb("income");

  return (
    <incomeData.Provider value={{ incomes, loading, error }}>
      {children}
    </incomeData.Provider>
  );
}
const useIncomeContext = () => {
  return useContext(incomeData);
};

export { IncomeProvider as default, useIncomeContext };
