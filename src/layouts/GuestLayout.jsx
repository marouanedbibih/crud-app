import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

function GuestLayout() {
  const {token} = useStateContext()
  if(token){
    return <Navigate to= "/users"/>
  }

  return (
    <div>
      <h1>Guest Layout</h1>
      <Outlet/>
    </div>
  )
}

export default GuestLayout