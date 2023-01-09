import { useUiContext } from "../../context/ui-context";
import Total from "../../templates/Total";
import Button from "../../templates/Button";
import SelectInput from "../../templates/SelectInput";
import styles from "./FooterStartTab.module.css";

const FooterStartTab = () => {
  const { openModal } = useUiContext();
  return (
    <Total>
      <SelectInput>
        <option value='0'>مطب</option>
        <option value='1'>منزل</option>
      </SelectInput>
      <Button onClick={openModal} className={styles.button}>
        افزودن
      </Button>
    </Total>
  );
};

export default FooterStartTab;
