import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import MetaData from '../layout/MetaData'
import Loader from "../layout/Loader/Loader";
import "./Profile.css";

const Profile = () => {

    console.log("Profile = ");

    const navigate = useNavigate()

    const { user, loading, isAuthenticated } = useSelector((state) => state.user)

    console.log("User = ", user);
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated])
    

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={`${user.name}'s Profile`} />
                <div className='profileContainer'>
                <div>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name} />
                    <Link to="/me/update">Edit Pofile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(user.createdAt)}</p>
                    </div>
                    <div>
                        <Link to="/orders"> My Orders</Link>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default Profile