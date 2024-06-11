import React from 'react'
import './UserProfile.css'
import { NavLink,Outlet } from 'react-router-dom'
function UserProfile() {
  return (
    <>
    <NavLink to='articles' className='user-profile fs-4 text-dark  fw-bold nav-link mt-4 mx-4'>
      <span className='fs-3 fw-bold text-dark'>Articles</span>
    </NavLink>
    <Outlet/>
    </>
  )
}

export default UserProfile