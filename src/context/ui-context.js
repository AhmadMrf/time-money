import { createContext, useContext, useState } from "react";

const ui_context = createContext();
const initialValue = {
  isIncomeModalOpen: false,
  isAddWorkModalOpen: false,
};
const UiContextProvider = ({ children }) => {
  const [isModalsOpen, setIsModalsOpen] = useState(initialValue);
  const openModals = (modal) => {
    modal === "income"
      ? setIsModalsOpen({ ...isModalsOpen, isIncomeModalOpen: true })
      : setIsModalsOpen({ ...isModalsOpen, isAddWorkModalOpen: true });
  };
  const closeModals = () => {
    setIsModalsOpen(initialValue);
  };
  return (
    <ui_context.Provider value={{ ...isModalsOpen, openModals, closeModals }}>
      {children}
    </ui_context.Provider>
  );
};
const useUiContext = () => useContext(ui_context);
export { UiContextProvider as default, useUiContext };
