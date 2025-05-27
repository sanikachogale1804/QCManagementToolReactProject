import logo from './logo.svg';
import './App.css';
import RegisterPage from './Components/Users/RegisterPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Components/Users/LoginPage';
import TicketCreationForm from './Components/Tickets/TicketCreationForm';
import AdminPanel from './Components/Users/AdminPanel';

const routes= createBrowserRouter([
  {
    path:"/registerPage",
    element:<RegisterPage/>
  },
  {
    path:"/loginPage",
    element:<LoginPage/>
  },
  {
    path:"/ticketCreationForm",
    element:<TicketCreationForm/>
  },
  {
    path:"/adminPanel",
    element:<AdminPanel/>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;
