import { useState, type ChangeEvent, type SubmitEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import {
  editCategorie,
  addCategorie,
  fetchCategories,
  type Categorie,
} from "../../app/categorysSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  isEdit?: boolean;
  categorie?: Categorie;
}

const FormCategory = ({ isEdit, categorie }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Categorie>({
    id: "",
    type: "",
    name: "",
  });

  useEffect(() => {
    if (categorie) {
      setForm(categorie);
    }
  }, [categorie]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      await dispatch(editCategorie(form));
      await dispatch(fetchCategories());
      navigate("/categories");
      return;
    }

    if (!form.type.trim() || !form.name.trim()) {
      toast.error("Enter all data");
      return;
    }

    const newCategory = {
      type: form.type,
      name: form.name,
    };

    await dispatch(addCategorie(newCategory));
    await dispatch(fetchCategories());
    navigate("/categories");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-4">{isEdit ? "Edit category" : "Add new category"}</h5>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name of category
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter category name"
          name="name"
          onChange={handleChange}
          value={form.name}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type of category
        </label>
        <select
          className="form-select"
          id="type"
          name="type"
          onChange={handleChange}
          value={form.type}
        >
          <option value="">Choose category type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {isEdit ? "Edit category" : "Add category"}
      </button>
    </form>
  );
};

export default FormCategory;
