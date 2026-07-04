import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CategoriesList from "./pages/CategoriesList/CategoriesList";
import AddCategory from "./pages/AddCategory/AddCategory";
import EditCategory from "./pages/EditCategory/EditCategory";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={"/categories"} element={<CategoriesList />} />
        <Route path={"/add-category"} element={<AddCategory />} />
        <Route path={"/edit-category/:id"} element={<EditCategory />} />
      </Routes>
    </Layout>
  );
}

export default App;
