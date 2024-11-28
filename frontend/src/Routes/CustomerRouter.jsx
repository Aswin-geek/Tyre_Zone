import React from 'react'
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const Customer_Navbar = lazy(() => import('../components/Customer/Customer_Navbar'));
const Customer_Sidebar = lazy(() => import('../components/Customer/Customer_Sidebar'));
const Dashboard = lazy(() => import('../components/Customer/Dashboard'));

const CustomerRouter = () => {
  return (
    <>
    <Customer_Navbar />
    <div className='flex'>
        {/* <Customer_Sidebar /> */}
        <Routes>
            <Route path={'/'} element={<Dashboard/>} />

        </Routes>
    </div>
    </>
  )
}

export default CustomerRouter