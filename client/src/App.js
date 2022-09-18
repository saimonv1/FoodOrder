import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Login from './pages/Authenticate/Login';
import Register from './pages/Authenticate/Register';
import City from './pages/City/City';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/city" element={<City />} />
      </Routes>
    </Layout>
  );
}

export default App;
