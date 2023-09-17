import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

function DashboardLayout() {
  const {token}= useStateContext()
  if(!token){
    return <Navigate to="/login"/>
  }
  return (
    <div>
      <h1>Dashboard Layout</h1>
      <Outlet/>
    </div>
  )
}

export default DashboardLayout