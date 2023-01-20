import { useEffect, useState } from "react";

import { useUiContext } from "../../context/ui-context";
import { useGlobalContext } from "../../context/record-context";
import useSendData from "../../hooks/useSendData";

import RowWrapper from "../../templates/RowWrapper";
import ContentWrapper from "../../templates/ContentWrapper";
import IncomeRow from "./IncomeRow";
import TotalIncomes from "./TotalIncomes";
import Button from "../../templates/Button";
import Input from "../../templates/Input";
import Modal from "../../components/modal/Modal";
import styles from "./IncomesTab.module.css";
import SelectInput from "../../templates/SelectInput";

const IncomesTab = () => {
  const { closeModal } = useUiContext();
  const {
    incomes,
    workPlaces,
    loading: { incomeLoading, workPlaceLoading },
    error: { incomeError },
    getIncomeData,
  } = useGlobalContext();

  const { result, error, loading, sendData } = useSendData();
  const [selectedId, setSelectedId] = useState(undefined);
  useEffect(() => {
    if (!workPlaceLoading) {
      const firstId = workPlaces.length ? "all" : "noId";
      setSelectedId(firstId);
    }
  }, [workPlaceLoading]);
  useEffect(() => {
    if (!error && !loading) {
      closeModal();
      getIncomeData(result?.id);
    }
  }, [error, loading, result]);
  const selectedPrice = (selectedWorkPlaceId) => {
    if (selectedWorkPlaceId === "all") {
      return incomes.reduce((total, { price }) => total + price, 0);
    }
    return incomes
      .filter((income) => income.w_p_id.id === selectedWorkPlaceId)
      .reduce((total, { price }) => total + price, 0);
  };
  const totalPrice = incomes?.reduce((total, { price }) => total + price, 0);
  const onSelectedPrice = (id) => {
    setSelectedId(id);
  };
  const incomeRows = () => {
    let newIncomes = incomes;
    if (selectedId !== "all") {
      newIncomes = incomes.filter((income) => income.w_p_id.id === selectedId);
    }
    return newIncomes.map((income, index) => (
      <IncomeRow
        key={income.id}
        id={++index}
        workPlace={
          workPlaces.find((workPlace) => workPlace.id === income.w_p_id.id).name
        }
        description={income.description}
        incomeDate={income.income_date}
        price={income.price}
      />
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const incomeData = {
      income_date: new Date(e.target.elements.date.value),
      description: e.target.elements.desc.value,
      price: +e.target.elements.price.value,
      w_p_id: {
        __type: "Pointer",
        className: "work_place",
        objectId: e.target.elements.workPlace.value,
      },
    };

    sendData("income", incomeData);
  };

  let noResult = null;
  if (incomeError) {
    noResult = (
      <RowWrapper className={styles.center}>
        <h4>خطا در دریافت اطلاعات</h4>
        <Button
          className={styles.button}
          onClick={() => window.location.reload()}>
          دریافت مجدد اطلاعات
        </Button>
      </RowWrapper>
    );
  }
  if (incomeLoading || workPlaceLoading) {
    noResult = (
      <RowWrapper className={styles.center}>
        <h4> درحال دریافت اطلاعات</h4>
      </RowWrapper>
    );
  }

  return (
    <ContentWrapper>
      <Modal
        pending={loading || error}
        form='income'
        title='اطلاعات دریافتی را وارد کنید'>
        <form onSubmit={handleSubmit} id='income'>
          <Input id='date' name='date' title='تاریخ' type='date'></Input>
          <Input id='desc' name='desc' title='توضیحات' type='text'></Input>
          <Input id='price' name='price' title='مبلغ' type='number'></Input>
          <SelectInput
            className={styles.select}
            id='workPlace'
            name='workPlace'
            title='محل درآمد'>
            {workPlaces?.map((workPlace) => (
              <option value={workPlace.id} key={workPlace.id}>
                {workPlace.name}
              </option>
            ))}
          </SelectInput>
        </form>
      </Modal>
      {noResult || (
        <RowWrapper>
          <IncomeRow
            id={"شماره"}
            workPlace={"شغل"}
            description={"توضیحات"}
            incomeDate={"تاریخ"}
            price={"مبلغ"}
          />
          {incomeRows()}
        </RowWrapper>
      )}
      <div className={styles.bottom_section}>
        <TotalIncomes
          onSelect={onSelectedPrice}
          selected={selectedPrice(selectedId)}
          selectedId={selectedId}
          total={totalPrice}
        />
      </div>
    </ContentWrapper>
  );
};

export default IncomesTab;
