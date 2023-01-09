import { createContext, useContext, useState } from "react";

const ui_context = createContext();

const UiContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <ui_context.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ui_context.Provider>
  );
};
const useUiContext = () => useContext(ui_context);
export { UiContextProvider as default, useUiContext };
