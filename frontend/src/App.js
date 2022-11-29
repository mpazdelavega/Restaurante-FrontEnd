import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/login'
import Register from './components/auth/register'
import Client from './components/client/client'
import Home from './components/client/components/home'
import HomeMesa from './components/client/components/homeMesa'
import Detail from './components/client/components/detail'
import Cart from './components/client/components/cart'
import HeadlineCards from './components/client/components/HeadlineCards';
import Food from './components/client/components/Food';
import Footer from './components/client/components/Footer';
import Mesa from './components/client/components/Mesa';
import ReservaUsuario from './components/client/components/reservaUsuario';
import VerMenu from './components/client/components/VerMenu';
import Index from './components/client/components/Index';
import HeaderMenu from './components/client/components/headerMenu';
import HeaderIndex from './components/client/components/headerIndex';
import HeaderReserva from './components/client/components/headerReserva';
import PagoRecibido from './components/client/components/pagoRecibido';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="index" element={<><HeaderIndex /><Index /><Footer/></>} />
      <Route path="register" element={<Register />} />
      <Route path="redirect" element={<PagoRecibido />} />
      <Route path="menu" element={<><HeaderMenu /><VerMenu /><Footer/></>} />
      <Route path="reserva" element={<><HeaderReserva /><HomeMesa /><Mesa/><Footer/></> } />
      <Route path="reservas" element={<><HeaderReserva /><HomeMesa /><ReservaUsuario/><Footer/></> } />
      <Route path="store" element={<Client />}>
        <Route path="" element={<><Home /><HeadlineCards/><Food/><Footer/></> } />
        <Route path="detail/:id/:category" element={<><Detail /><Footer/></> } />
        <Route path="cart" element={<><Cart /><Footer/></>} />
      </Route>
    </Routes>
  );
}

export default App;
