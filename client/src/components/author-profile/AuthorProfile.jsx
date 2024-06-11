import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';
import './AuthorProfile.css'

function AuthorProfile() {

  let {currentUser}=useSelector(state=>state.userAuthorLoginReducer)
  return (
    <div className="author-profile">
      <ul className="nav justify-content-around">
        <li className="nav-item">
          <NavLink
            className="nav-link p-2 mt-4 fs-3 fw-bold"
            to={`articles-by-author/${currentUser.username}`}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link p-2 mt-4 fs-3 fw-bold"
            to="new-article"
          >
            Add new
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}

export default AuthorProfile