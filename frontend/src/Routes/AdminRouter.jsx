import React from 'react'
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";


const Dashboard = lazy(() => import('../components/Admin/Dashboard'));

const AdminRouter = () => {
  return (
    <div>AdminRouter</div>
  )
}

export default AdminRouter