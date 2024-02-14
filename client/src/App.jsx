import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/about' element={ <About /> }/>
            <Route path='/projects' element={ <Projects /> }/>
            <Route path='/dashboard' element={ <Dashboard /> }/>
            <Route path='/sign-in' element={ <SignIn /> }/>
            <Route path='/sign-up' element={ <SignUp /> }/>
        </Routes>
    </BrowserRouter>
  )
}
