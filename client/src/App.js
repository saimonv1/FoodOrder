import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import TitlePage from './pages/Utility/TitlePage';
import NotFound from './pages/Utility/NotFound';
import Login from './pages/Authenticate/Login';
import Register from './pages/Authenticate/Register';
import Location from './pages/Main/Location';
import LocationMenu from './pages/Main/LocationMenu';
import MenuDishes from './pages/Main/MenuDishes';
import AddLocation from './components/Location/AddLocation';
import EditLocation from './components/Location/EditLocation';
import AllLocations from './components/Location/AllLocations';
import Panel from './components/Admin/Panel';
import Logout from './components/Authenticate/Logout';
import AllMenus from './components/Menu/AllMenus';
import AddMenu from './components/Menu/AddMenu';
import EditMenu from './components/Menu/EditMenu';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/location" element={<Location />} />
        <Route path="/location/:locationId/" element={<LocationMenu />} />
        <Route path="/location/:locationId/menu/:menuId/" element={<MenuDishes />} />

        <Route path="/admin/" element={<Panel />} />

        <Route path="/locations/" element={<AllLocations />} />
        <Route path="/addLocation" element={<AddLocation />} />
        <Route path="/editLocation/:locationId/" element={<EditLocation />} />

        <Route path="/locations/:locationId/menus" element={<AllMenus />} />
        <Route path="/locations/:locationId/addMenu" element={<AddMenu />}/>
        <Route path="/locations/:locationId/editMenu/:menuId" element={<EditMenu />}/>


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
