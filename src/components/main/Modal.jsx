import { createPortal } from "react-dom";

import { useUiContext } from "../../context/ui-context";
import styles from "./Modal.module.css";

const modalElement = document.getElementById("modal");
const Modal = ({ children }) => {
  const modal = useUiContext();
  return createPortal(<p>modal</p>, modalElement);
};
export default Modal;

// income modal => income_date , description , price , w_p_id
// work_place modal => name
// records modal => price , start_time , time , description , work_place
