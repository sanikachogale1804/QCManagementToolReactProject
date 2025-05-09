import logo from './logo.svg';
import './App.css';
import RegisterPage from './Components/Users/RegisterPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Components/Users/LoginPage';

const routes= createBrowserRouter([
  {
    path:"/registerPage",
    element:<RegisterPage/>
  },
  {
    path:"/loginPage",
    element:<LoginPage/>
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
