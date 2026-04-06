import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Services from '../pages/Services'
import Providers from '../pages/Providers/Providers'
import ProviderDetails from '../pages/Providers/ProviderDetails';
import Dashboard from '../pages/Dashboard';

import { Routes, Route } from 'react-router-dom'


const Routers = () => {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/providers' element={<Providers />} />
        <Route path='/providers/:id' element={<ProviderDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/services' element={<Services />} />
        <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
}

export default Routers