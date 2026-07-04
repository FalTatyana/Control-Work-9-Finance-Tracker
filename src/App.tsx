import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import CategoriesList from './pages/CategoriesList/CategoriesList'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={'/categories'} element={<CategoriesList/>}/>
      </Routes>
    </Layout>
  )
}

export default App
