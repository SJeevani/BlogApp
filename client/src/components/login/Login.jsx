import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { userAuthorLoginThunk } from '../../redux/slices/userAuthorSlice';
import { useNavigate } from 'react-router-dom';


function Login() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let dispatch=useDispatch()
  let {loginUserStatus,errorOccured,errMsg,currentUser}=useSelector(state=>state.userAuthorLoginReducer)
  let navigate=useNavigate()

  function onLoginFormSubmit(userCredentialsObject) {
    console.log(userCredentialsObject);
    dispatch(userAuthorLoginThunk(userCredentialsObject))
  }

  useEffect(()=>{
    if(loginUserStatus===true){
      if(currentUser.userType==='user'){
      navigate('/user-profile')
      }
      if (currentUser.userType==='author'){
        navigate('/author-profile')
      }
    }
  },[loginUserStatus])

  return (
    <div className='abc p-3'>
      <div className=''>
        <div className='p-3'>
          <div className='text-center m-5'>
            <div className='de d-block mx-auto w-50 container rounded-5 pt-4 pb-4 shadow-lg mx-5 my-5'>
              <h1 className="display-2 text-dark fw-semibold">Login</h1>
              {/* display user register error message */}
              {errMsg.length!==0 && <div className='alert alert-danger w-75 d-block mx-auto fw-bold fs-5' role='alert'>{errMsg}</div>}
              <form className="w-50 mx-auto" onSubmit={handleSubmit(onLoginFormSubmit)}>
                {/* Role selection radio buttons */}
              <div className="mb-3 fw-medium">
                <div className="form-check form-check-inline fs-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("userType", { required: true })}
                    value="admin"
                  />
                  <label className="form-check-label">Admin</label>
                </div>
                <div className="form-check form-check-inline fs-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("userType", { required: true })}
                    value="author"
                  />
                  <label className="form-check-label">Author</label>
                </div>
                <div className="form-check form-check-inline fs-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("userType", { required: true })}
                    value="user"
                  />
                  <label className="form-check-label">User</label>
                </div>
                {errors.role?.type === 'required' && (
                  <h5 className='mt-2 mx-4 text-start text-danger'>Please select a role</h5>
                )}
              </div>
                {/* username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label"></label>
                  <input type="text" {...register("username", { required: true })} id="username" className="form-control fs-5" placeholder='Username' />
                </div>
                {errors.username?.type === 'required' && <h5 className='mx-4 text-start text-danger'>Username is required</h5>}
                {/* password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label"></label>
                  <input type="password" {...register("password", { required: true })} id="password" className="form-control fs-5 " placeholder='Password' />
                </div>
                {errors.password?.type === 'required' && <h5 className='mx-4 text-start text-danger'>Password is required</h5>}
                <button type="submit" className="btn btn-dark fs-5 fw-medium m-3">Login</button>
                <p className='lead text-center fw-semibold fs-3'>
                  New User !!
                  <Link to='/register' className='fs-4 fw-semibold'>
                    <p className='lead fw-medium'> Register Here!</p>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;