import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors, deleteUser, getAllUsers} from '../../actions/userActions'
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { DELETE_USER_RESET } from '../../constants/userConstants';


const UsersList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();
    const navigate = useNavigate();

    const { error, users } = useSelector((state) => state.allUser);

    const {error: deleteError, isDeleted, message} = useSelector((state) => state.profile)

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }


    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }

      if (isDeleted) {
        alert.success(message);
        navigate("/admin/users")
        dispatch({type: DELETE_USER_RESET});
      }

      dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate, message])
    
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5},
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
              return params.getValue(params.id, "role") === "admin"
              ? "greenColor" : "redColor";
          },
        },
        {
            field: "action",
            headerName: "Actions",
            flex: 0.3,
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                        <Button onClick={() => 
                            deleteUserHandler(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </Fragment>
                )
            }
        }
    ];

    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
        })
        
    });

  return (
    <Fragment>
        <MetaData title={`ALL USERS -Admin`} />
        {/* { loading ? (<Loader />) : ( */}
            <div className='dashboard'>
            <Sidebar />
            <div className='productListContainer'>
                <h1 id='productListHeading'>ALL USERS</h1>

                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight 
                />
            </div>
        </div>
        {/* )} */}
    </Fragment>
  )
}


export default UsersList