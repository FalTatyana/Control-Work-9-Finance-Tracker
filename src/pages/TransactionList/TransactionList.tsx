import { useDispatch, useSelector } from "react-redux";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import {
  deleteTransaction,
  fetchTransactions,
} from "../../app/transactionsSlice";
import Spinner from "../../components/Spinner/Spinner";

const TransactionList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const loading = useSelector((state: RootState) => state.categories.loading);

  const total = transactions.reduce(
    (acc, item) =>
      item.type === "Income"
        ? acc + Number(item.summ)
        : acc - Number(item.summ),
    0
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = confirm("Delete transaction?");

    if (!isConfirmed) return;

    await dispatch(deleteTransaction(id));
  };

  return (
    <>
      <div
        className="card mb-3"
        style={{ maxWidth: 300, borderColor: total > 0 ? "green" : "red" }}
      >
        <div className="card-body m-auto">
          <h4 className="m-0" style={{ color: total > 0 ? "green" : "red" }}>Total: {total} KGS</h4>
        </div>
      </div>
      {transactions.map((trans) => (
        <TransactionCard
          key={trans.id}
          name={trans.name}
          onDelete={() => handleDelete(trans.id)}
          summ={trans.summ}
          id={trans.id}
          date={trans.date}
          type={trans.type}
        />
      ))}
    </>
  );
};

export default TransactionList;
