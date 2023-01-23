import { useState, useEffect } from "react";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useGlobalContext } from "../../context/record-context";
import { useUiContext } from "../../context/ui-context";
import Total from "../../templates/Total";
import Button from "../../templates/Button";
import SelectInput from "../../templates/SelectInput";
import styles from "./FooterStartTab.module.css";

const FooterStartTab = ({ setLocalStorage }) => {
  const [workPlaceSelect, setWorkPlaceSelect] = useState();
  const {
    workPlaces,
    loading: { workPlaceLoading },
    error: { workPlaceError },
  } = useGlobalContext();
  const { openModal } = useUiContext();
  const { setLocalData } = useLocalStorage();
  useEffect(() => {
    if (workPlaceError || workPlaceLoading || !workPlaces.length) return;
    setWorkPlaceSelect(workPlaces[0].id);
  }, [workPlaceLoading, workPlaceError]);

  const handleSelect = (e) => {
    setWorkPlaceSelect(e.target.value);
  };
  const handleStartRecord = (e) => {
    let startRecord = {
      id: Math.random(),
      work_place: workPlaces.find((w) => w.id === workPlaceSelect),
      start_time: Date.now(),
    };
    const newData = setLocalData("record", startRecord);
    setLocalStorage(newData);
  };

  const disabled = workPlaceLoading || workPlaceError;
  return (
    <Total>
      <SelectInput
        value={workPlaceSelect}
        onChange={handleSelect}
        disabled={disabled || !workPlaces.length}>
        {workPlaceLoading ? (
          <option>در حا دریافت اطلاعات</option>
        ) : !workPlaces.length ? (
          <option>اطلاعاتی وارد نشده </option>
        ) : (
          workPlaces.map((workPlace) => (
            <option value={workPlace.id} key={workPlace.id}>
              {workPlace.name}
            </option>
          ))
        )}
      </SelectInput>
      <Button
        disabled={disabled || !workPlaces.length}
        onClick={handleStartRecord}
        className={styles.button}>
        شروع
      </Button>
      <Button disabled={disabled} onClick={openModal} className={styles.button}>
        افزودن کار
      </Button>
    </Total>
  );
};

export default FooterStartTab;

/*

 get work-places and render in options
 select an option and click start to 
  add a card with name of work-place and current time
  add this infos to localstorag
    click on end to render completed card and update localstorag
    click on cancle to remove card and clear related localstorag data

  in completed card after fill inputs (on blur every input , save data in localstorag),
    click submit to send data to db and clear localstorag

 
 click add work-place to open modal and complete form ,
  send data to db and get them again , then update options

*/
