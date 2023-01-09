import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useUiContext } from "../../context/ui-context";
import styles from "./Modal.module.css";

const modalElement = document.getElementById("modal");
const Modal = ({ children }) => {
  const { isModalOpen, closeModal } = useUiContext();
  const handleCloseModal = (e) => {
    if (e.target.parentElement.id === "modal") closeModal();
  };
  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);
  if (!isModalOpen) return null;
  return createPortal(
    <div onClick={handleCloseModal} className={styles.modal_wrapper}>
      {children}
    </div>,
    modalElement
  );
};
export default Modal;

// income modal => income_date , description , price , w_p_id
// work_place modal => name
// records modal => price , start_time , time , description , work_place
