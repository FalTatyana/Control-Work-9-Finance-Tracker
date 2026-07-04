import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { deleteCategorie, fetchCategories } from "../../app/categorysSlice";
import Spinner from "../../components/Spinner/Spinner";
import { NavLink } from "react-router-dom";

const CategoriesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const loading = useSelector((state: RootState) => state.categories.loading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id: string) => {
   await dispatch(deleteCategorie(id))
};

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
        <h5>Categories</h5>
        <NavLink to={'/add-category'} className="btn btn-outline-primary">Add categorie</NavLink>
      </div>
      {categories.map((cat) => (
        <CategoryCard key={cat.id} name={cat.name} type={cat.type} onDelete={() => handleDelete(cat.id)} />
      ))}
    </>
  );
};

export default CategoriesList;
