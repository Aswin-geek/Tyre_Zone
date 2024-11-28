import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'


import CustomerLogin from './components/CustomerLogin'
import Register from './components/Register'
import Customer from './Routes/CustomerRouter'


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />}/>
        <Route path='/login' element={<CustomerLogin />}/>
        <Route path={'/Customer/*'} element={<Customer />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
