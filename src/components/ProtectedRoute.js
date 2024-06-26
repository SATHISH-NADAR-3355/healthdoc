import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import {setUser} from '../redux/userSlice';
import axios from 'axios';

function ProtectedRoute(props) {
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const getUser =async() =>{
        try{
            dispatch(showLoading());
            const response = await axios.post('http://localhost:7777/api/user/get-user-info-by-id', 
            {token : localStorage.getItem('token')},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                },
            
            });
            dispatch(hideLoading());
            if (response.data.success) {
                dispatch(setUser(response.data.data));
            }
            else{
                localStorage.clear();
                navigate('/login');
            }
        } catch(error) {
            dispatch(hideLoading());
            localStorage.clear();
            navigate('/login');
        }
    };

    useEffect(() => {
        if(!user){  //dependencies = user & reloadUser; 
            getUser();
        }
    },[user]);
    if (localStorage.getItem('token')) {
        return props.children;
    }else {
        return <Navigate to = "/"/> //earlier it was '/login'
    }
}

export default ProtectedRoute;