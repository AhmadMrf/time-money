import { useEffect, useState } from "react";

import { useGlobalContext } from "../../context/record-context";
import RowWrapper from "../../templates/RowWrapper";
import ContentWrapper from "../../templates/ContentWrapper";
import IncomeRow from "./IncomeRow";
import TotalIncomes from "./TotalIncomes";
import Button from "../../templates/Button";
import styles from "./IncomesTab.module.css";

const IncomesTab = () => {
  const {
    incomes,
    workPlaces,
    loading: { incomeLoading, workPlaceLoading },
    error: { incomeError },
  } = useGlobalContext();
  const [selectedId, setSelectedId] = useState(undefined);
  useEffect(() => {
    if (!workPlaceLoading) {
      const firstId = workPlaces.length ? "all" : "noId";
      setSelectedId(firstId);
    }
  }, [workPlaceLoading]);
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
