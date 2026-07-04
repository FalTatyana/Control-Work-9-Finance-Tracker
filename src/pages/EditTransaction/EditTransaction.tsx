import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../../app/categoriesSlice";
import type { AppDispatch, RootState } from "../../app/store";
import FormTransaction from "../../components/FormTransaction/FormTransaction";
import Spinner from "../../components/Spinner/Spinner";

const EditTransaction = () => {

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const transactionToEdit = transactions.find(c => c.id === id);

  if (!transactionToEdit) {
    return <Spinner />;
  }

  useEffect(() => {
    if (!transactions.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, transactions.length]);
  
  return (
    <>
    <FormTransaction isEdit={true} transaction={transactionToEdit}/>
    </>
  );
};

export default EditTransaction;