import { useState, type ChangeEvent, type SubmitEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addTransaction,
  editTransaction,
  fetchTransactions,
  type Transaction,
} from "../../app/transactionsSlice";
import { fetchCategories } from "../../app/categoriesSlice";

interface Props {
  isEdit?: boolean;
  transaction?: Transaction;
}

const FormTransaction = ({ isEdit, transaction }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [form, setForm] = useState<Transaction>({
    id: "",
    type: "",
    name: "",
    summ: "",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setForm(transaction);
    }
  }, [transaction]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      const amount = Number(form.summ);
      if (!form.name || !form.type || Number.isNaN(amount) || amount <= 0) {
        toast.error("Enter all data");
        return;
      }
      await dispatch(editTransaction(form));
      await dispatch(fetchTransactions());
      navigate("/");
      return;
    }

    const amount = Number(form.summ);
    if (!form.name || !form.type || Number.isNaN(amount) || amount <= 0) {
      toast.error("Enter all data");
      return;
    }

    const newTransaction = {
      type: form.type,
      name: form.name,
      summ: form.summ,
      date: new Date().toLocaleString(),
    };

    await dispatch(addTransaction(newTransaction));
    await dispatch(fetchTransactions());
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-4">
        {isEdit ? "Edit transaction" : "Add new transaction"}
      </h5>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type of transaction
        </label>
        <select
          className="form-select"
          id="type"
          name="type"
          onChange={handleChange}
          value={form.type}
        >
          <option value="">Choose transaction type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Name of transaction
        </label>
        <select
          className="form-select"
          id="name"
          name="name"
          onChange={handleChange}
          value={form.name}
        >
          <option value="">Choose transaction name</option>
          {categories
            .filter((cat) => cat.type === form.type)
            .map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          id="summ"
          placeholder="Enter transaction amout"
          name="summ"
          onChange={handleChange}
          value={form.summ}
        />
        <span className="input-group-text" id="inputGroup-sizing-default">
          KGS
        </span>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!form.name || !form.summ || !form.type}
      >
        {isEdit ? "Edit transaction" : "Add transaction"}
      </button>
    </form>
  );
};

export default FormTransaction;
