import { MailOutline, Person, VerifiedUser } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails, updateUser, clearErrors } from '../../actions/userActions';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import './newProduct.css';
import Sidebar from './Sidebar';

const UpdateUser = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = params.id;

      useEffect(() => {

        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);

        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors)
        }
        if (isUpdated) {
            alert.success("User Updated Successfully")
            navigate("/admin/users");
            dispatch({type: UPDATE_USER_RESET})
        }
      }, [dispatch, alert, isUpdated, updateError, user, userId, error, navigate]);
      

      const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('role', role);

        dispatch(updateUser(userId, myForm));
      }


  return (
    <Fragment>
        <MetaData title="Update User" />
        <div className='dashboard'>
            <Sidebar />
            <div className='newProductContainer'>
                {
                    loading ? <Loader/> : <form
                    className='createProductForm'
                    onSubmit={updateUserSubmitHandler}
                >
                    <h1> Update User</h1>
                    <div>
                        <Person />
                        <input 
                            type='text'
                            placeholder='Name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <MailOutline />
                        <input 
                            type='email'
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <VerifiedUser />
                        <select 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}>
                                <option value=''>Choose Role</option>
                                <option value='admin'>Admin</option>
                                <option value='user'>User</option>
                                
                            </select>
                    </div>
                   


                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={updateLoading ? true : false || role === "" ? true : false}
                    > Update</Button>
                    


                </form>
                }
            </div>
        </div>
    </Fragment>
  )
}

export default UpdateUser