import React from 'react'
import { NavLink } from 'react-router-dom'
import {} from 'E:/Projects/Blog-App/client/src/components/navbar/Navbar.css'
import { useSelector,useDispatch } from 'react-redux'
import { resetState } from '../../redux/slices/userAuthorSlice';

function NavBar() {

  let {loginUserStatus,errorOccured,errMsg,currentUser}=useSelector(state=>state.userAuthorLoginReducer)

  let dispatch=useDispatch()

  function logOut(){
    // remove token from local storage
    localStorage.removeItem('token')
    dispatch(resetState())
  }

  return (
    <div>
      <nav className='navbar bg-dark bg-gradient d-flex justify-content-between'>
          <NavLink to='/home' className='navbar-brand'>
          <img src='https://logo.com/image-cdn/images/kts928pd/production/3d0a1942ea617825e187c3c9a3811a5d93a331be-370x366.png?w=1080&q=72' alt=''
            className='mx-3 m-1'
          />
          </NavLink>
            <ul className='nav fs-4 fw-semibold justify-content-end align-items-center'>
              {loginUserStatus===false?(
                <>
                <li className='nav-item'>
                    <NavLink className='text-light nav-link' to='home'>
                    Home
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='text-light nav-link' to='register'>
                    Register
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='text-light nav-link' to='login'>
                    Login
                    </NavLink>
                </li>
                </>)
                :
                (<>
                <li className='nav-item'>
                      <span><p className='welcome_msg fs-3 fw-bold'>Welcome {currentUser.username} <sup>({currentUser.userType})</sup></p></span>
                  </li>
                  <li className='nav-item'>
                      <NavLink className='fs-4 text-light nav-link' to='home' onClick={logOut}>
                    Logout
                    </NavLink>
                  </li>
                </>)
                }
            </ul>
        </nav>
    </div>
  )
}

export default NavBar

