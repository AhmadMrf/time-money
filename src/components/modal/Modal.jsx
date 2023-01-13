import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useUiContext } from "../../context/ui-context";
import Button from "../../templates/Button";
import styles from "./Modal.module.css";

const modalElement = document.getElementById("modal");

const Modal = ({ children, title, form }) => {
  const { isModalOpen, closeModal } = useUiContext();
  const handleCloseModal = (e) => {
    if (e.target.parentElement.id === "modal") closeModal();
  };
  useEffect(() => {
    return () => {
      // closeModal();
    };
  }, []);

  if (!isModalOpen) return null;

  return createPortal(
    <section onClick={handleCloseModal} className={styles.modal_wrapper}>
      <div className={styles.content_wrapper}>
        <span className={styles.title}>{title}</span>
        {children}
        <div className={styles.btns}>
          <Button
            onClick={() => {
              closeModal();
            }}>
            انصراف
          </Button>
          <Button form={form} type='submit'>
            تایید
          </Button>
        </div>
      </div>
    </section>,
    modalElement
  );
};
export default Modal;

// income modal => income_date , description , price , w_p_id
// work_place modal => name
// records modal => price , start_time , time , description , work_place
