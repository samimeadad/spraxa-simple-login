import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Shared/Header/Header';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import PageNotFound from './Shared/PageNotFound';
import Footer from './Shared/Footer/Footer';
import Login from './Pages/Login/Login';
import Register from './Register/Register';
import UsersTable from './Pages/Users/UsersTable';
import SampleForm from './Pages/SampleForm/SampleForm';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import SingleUserModals from './Components/SingleUserModals/SingleUserModals';


function App () {
  return (
    <div className="App css">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/home" element={ <Home /> } />
          <Route path="/users/" element={ <PrivateRoute><UsersTable /></PrivateRoute> } />
          <Route path="/users/:userId" element={ <SingleUserModals /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/contact" element={ <Contact /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/sampleform" element={ <PrivateRoute><SampleForm /></PrivateRoute> } />
          <Route path="*" element={ <PageNotFound /> } />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
