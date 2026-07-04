import { NavLink } from "react-router-dom";

interface Props {
  name: string;
  summ: string;
  id: string;
  date: string;
  type: string;
  onDelete: () => void;
}

const TransactionCard = ({ name, summ, id, date, type, onDelete }: Props) => {
  return (
    <div className="card mb-3" style={{ maxWidth: 700 }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <p className="card-text m-0 me-3">{date}</p>
        <p className="card-text m-0 me-3">{name}</p>
        <div className="d-flex align-items-center">
          <p
            className="card-text mb-0 me-5"
            style={{ color: type === "Income" ? "green" : "#dc3545" }}
          >
            {type === "Income" ? "+ " : "- "}
            {summ} KGS
          </p>
          <NavLink
            to={`/edit-transaction/${id}`}
            className="btn btn-outline-primary me-2"
          >
            <i className="bi bi-pencil-square"></i>
          </NavLink>
          <button onClick={onDelete} className="btn btn-outline-danger">
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
