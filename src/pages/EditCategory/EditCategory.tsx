import { useParams } from "react-router-dom";
import FormCategory from "../../components/FormCategory/FormCategory"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect } from "react";
import { fetchCategories } from "../../app/categorysSlice";

const EditCategory = () => {

  const { id } = useParams();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const categoryToEdit = categories.find(c => c.id === id);

  if (!categoryToEdit) {
    return <Spinner />;
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);
  
  return (
    <FormCategory isEdit={true} categorie={categoryToEdit} />
  )
}

export default EditCategory