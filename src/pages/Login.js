 //rfce=react functional component export
import React from 'react'
import{Form,Input,Button} from 'antd'
import { Link } from 'react-router-dom';
import { useDispatch } from  "react-redux";
import { showLoading, hideLoading } from '../redux/alertsSlice';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



function Login() {
   const {loading} = useSelector(state => state.alerts );
   console.log(loading); //show loading and hideloading is working perfectly
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => { //onFinish function is used to collect values from the webpages menus and submit it to the MongoDB database
    
    console.log("received values of form:", values) //this is for debugging
    try{
      dispatch(showLoading());
      const response = await axios.post('http://localhost:7777/api/user/login', values); //in post method we can send token while in get method we cant
      dispatch(hideLoading());
      if(response.data.success)
      {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data); //token
        navigate("/home");
      }
      else
      {
        //toast.error(response.data.message);
        if (response.data.message === "User does not exist") {
          // Redirect to register page if user does not exist
          toast.error('User is not registered');
          navigate("/register");
        }
        else if (response.data.message === "Password is incorrect") {
          // Display error message for incorrect password
          toast.error('Password is incorrect');
        }
        else {
          // Display generic error message
          toast.error(response.data.message);
        }
      }
    }
    catch(error)
    {
      dispatch(hideLoading());
      toast.error('something went wrong');
    }
  };
  return (
      <div className= 'authentication'>
      <div className='authentication-form p3'>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout ='vertical' on onFinish={onFinish}>
          <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please enter your name!' }]}>
            <Input placeholder ='Name'/>
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input placeholder ='Password' type ='password'/>
          </Form.Item>

          <Button className='primary-button my-2' htmlType='submit'>LOGIN</Button>
          <Link className='anchor' to='/register'>CLICK HERE TO REGISTER</Link>

        </Form>
      </div>
    </div>
  )
}

export default Login;