import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/record-context";
import { useUiContext } from "../../context/ui-context";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useSendData from "../../hooks/useSendData";
import ContentWrapper from "../../templates/ContentWrapper";
import RowWrapper from "../../templates/RowWrapper";
import TimeCard from "./TimeCard";
import CompletedTimeCard from "./CompletedTimeCard";
import Modal from "../../components/modal/Modal";
import Input from "../../templates/Input";
import SelectInput from "../../templates/SelectInput";
import styles from "./StartTab.module.css";
import FooterStartTab from "./FooterStartTab";

const StartTab = () => {
  const { getWorkPlaceData } = useGlobalContext();
  const [_, setLocalStorage] = useState();
  const { closeModal } = useUiContext();
  const { getLocalData } = useLocalStorage();
  const { sendData, loading, error, result } = useSendData();
  useEffect(() => {
    if (!loading && !error) {
      closeModal();
      getWorkPlaceData(result?.id);
    }
  }, [loading, error, result?.id]);
  const records = getLocalData("record");
  const handleSubmit = (e) => {
    e.preventDefault();

    const workPlaceData = {
      name: e.target.elements.name.value,
    };
    sendData("work_place", workPlaceData);
  };

  let noResult = null;
  if (!records.length) {
    noResult = (
      <RowWrapper className={styles.no_result}>
        هنوز کاری را شروع نکرده اید.
      </RowWrapper>
    );
  }
  let timeCards = records.map((record) => {
    if (record.end_time)
      return (
        <CompletedTimeCard
          setLocalStorage={setLocalStorage}
          key={record.start_time}
          {...record}
        />
      );
    return (
      <TimeCard
        setLocalStorage={setLocalStorage}
        key={record.start_time}
        {...record}
      />
    );
  });
  return (
    <ContentWrapper>
      <Modal
        pending={loading || error}
        form='workPlace'
        title='عنوان شغل را وارد کنید'>
        <form onSubmit={handleSubmit} id='workPlace'>
          <Input id='name' name='name' title='عنوان شغل' type='text'></Input>
        </form>
      </Modal>
      {noResult || <RowWrapper>{timeCards}</RowWrapper>}
      <FooterStartTab setLocalStorage={setLocalStorage} />
    </ContentWrapper>
  );
};
export default StartTab;
