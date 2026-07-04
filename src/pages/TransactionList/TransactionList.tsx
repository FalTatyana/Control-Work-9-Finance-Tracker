import { useDispatch, useSelector } from "react-redux";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { deleteTransaction, fetchTransactions } from "../../app/transactionsSlice";
import Spinner from "../../components/Spinner/Spinner";

const TransactionList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  const loading = useSelector((state: RootState) => state.categories.loading);

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
      <div>
        <h5>Total: 0 KGS</h5>
      </div>
      {transactions.map((trans) => (
        <TransactionCard
          key={trans.id}
          name={trans.name}
          onDelete={() => handleDelete(trans.id)}
          summ={trans.summ}
          id={trans.id}
          date={trans.date}
        />
      ))}
    </>
  );
};

export default TransactionList;
