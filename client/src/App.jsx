import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Header from './components/header';
import Footer from './components/footer';
import PrivateRoute from './components/privateRoute';
import OnlyAdmin from './components/admin';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/about' element={ <About /> }/>
            <Route element={ <PrivateRoute /> }>
              <Route path='/dashboard' element={ <Dashboard /> }/>
            </Route>
            <Route element={ <OnlyAdmin /> }>
              <Route path='/projects' element={ <Projects /> }/>
            </Route>
            {/* Need removing for signed in users             */}
            <Route path='/sign-in' element={ <SignIn /> }/>
            <Route path='/sign-up' element={ <SignUp /> }/>
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}
