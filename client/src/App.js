import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import TitlePage from './pages/Utility/TitlePage';
import NotFound from './pages/Utility/NotFound';
import Login from './pages/Authenticate/Login';
import Register from './pages/Authenticate/Register';
import Location from './pages/Main/Location';
import LocationMenu from './pages/Main/LocationMenu';
import Dish from './pages/Main/Dish';
import MenuDishes from './pages/Main/MenuDishes';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/location" element={<Location />} />
        <Route path="/location/:locationId/" element={<LocationMenu />} />
        <Route path="/location/:locationId/menu/:menuId/" element={<MenuDishes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
