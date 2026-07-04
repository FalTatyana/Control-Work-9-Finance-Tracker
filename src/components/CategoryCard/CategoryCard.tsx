import { NavLink } from "react-router-dom";

interface Props {
  name: string;
  type: string;
}

const CategoryCard = ({ name, type }: Props) => {
  return (
    <div className="card mb-3" style={{ width: 500 }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <p className="card-text m-0 me-3">{name}</p>
        <div className="d-flex align-items-center">
          <p 
          className="card-text mb-0 me-2"
          style={{ color: type === "Income" ? "green" : "#dc3545" }}
          >{type}</p>
          <NavLink to={"/edit"} className="btn btn-outline-primary me-2">
            <i className="bi bi-pencil-square"></i>
          </NavLink>
          <button className="btn btn-outline-danger">
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
