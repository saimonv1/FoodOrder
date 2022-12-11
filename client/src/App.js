import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import TitlePage from './pages/Utility/TitlePage';
import NotFound from './pages/Utility/NotFound';
import Login from './pages/Authenticate/Login';
import Register from './pages/Authenticate/Register';
import Location from './components/Location/LocationForm';
import AddLocation from './components/Location/AddLocation';
import EditLocation from './components/Location/EditLocation';
import AllLocations from './components/Location/AllLocations';
import Panel from './components/Admin/Panel';
import AllMenus from './components/Menu/AllMenus';
import AddMenu from './components/Menu/AddMenu';
import EditMenu from './components/Menu/EditMenu';
import AllDishes from './components/Dish/AllDishes';
import AddDish from './components/Dish/AddDish';
import EditDish from './components/Dish/EditDish';
import AllOrders from './components/Order/AllOrders';
import Cart from './components/Cart/Cart';
import Users from './components/Admin/Users';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/location" element={<Location />} />
        <Route path="/locations/" element={<AllLocations />} />
        
        <Route path="/locations/:locationId/menus" element={<AllMenus />} />
        <Route path="/locations/:locationId/menus/:menuId/dishes" element={<AllDishes />} />

        <Route path="/admin/" element={<Panel />} />
        <Route path="/users/" element={<Users />} />

        <Route path="/addLocation" element={<AddLocation />} />
        <Route path="/editLocation/:locationId/" element={<EditLocation />} />

        <Route path="/locations/:locationId/addMenu" element={<AddMenu />}/>
        <Route path="/locations/:locationId/editMenu/:menuId" element={<EditMenu />}/>

        <Route path="/locations/:locationId/menus/:menuId/addDish" element={<AddDish />}/>
        <Route path="/locations/:locationId/menus/:menuId/editDish/:dishId" element={<EditDish />}/>

        <Route path="/orders/" element={<AllOrders />} />
        <Route path="/cart/" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
