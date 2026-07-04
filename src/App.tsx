import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CategoriesList from "./pages/CategoriesList/CategoriesList";
import AddCategory from "./pages/AddCategory/AddCategory";
import EditCategory from "./pages/EditCategory/EditCategory";
import TransactionList from "./pages/TransactionList/TransactionList";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={"/tracker/categories"} element={<CategoriesList />} />
        <Route path={"/add-category"} element={<AddCategory />} />
        <Route path={"/tracker/categories/edit-category/:id"} element={<EditCategory />} />
        <Route path={'/'} element={<TransactionList />}/>
      </Routes>
    </Layout>
  );
}

export default App;
