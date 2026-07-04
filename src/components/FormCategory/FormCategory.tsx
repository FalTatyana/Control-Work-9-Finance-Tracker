interface Props {
  isEdit: boolean;
}

const FormCategory = ({ isEdit }: Props) => {
  return (
    <form>
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
        />
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type of category
        </label>
        <select className="form-select" id="type">
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
