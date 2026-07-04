import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchCategories } from "../../app/categorysSlice";
import Spinner from "../../components/Spinner/Spinner";

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

  return (
    <>
      {categories.map((cat) => (
        <CategoryCard key={cat.id} name={cat.name} type={cat.type} />
      ))}
    </>
  );
};

export default CategoriesList;
