//rfce=react functional component export
import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showLoading,hideLoading } from '../redux/alertsSlice';
//import { registerController } from '../services/user';


function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => { //onFinish function is used to collect values from the webpages menus and submit it to the MongoDB database

    console.log("received values of form:", values) //this is for debugging
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:7777/api/user/register", values);
      dispatch(hideLoading());
      //const response = await registerController(formData);  //bhavika didi mod
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/login");
      }
      else {
        // Check if the error message indicates that the username is already taken
        if (response.data.message === "Username is taken, please choose a different username") {
          toast.error('Username is taken, please choose a different username');
        }

        else if (response.data.message === "User already exists") {
          toast.error('user already exists');
          toast("Redirecting to login page");
          navigate("/login");
        }

        else {
          toast.error(response.data.message); //hmm 
        }
      }
    }
    catch (error) {
      dispatch(hideLoading());
      toast.error('something went wrong');
    }
  };

  return (
    <div className='authentication'>
      <div className='authentication-form p-3'>
        <h1 className='card-title'>Nice To Meet You</h1>
        <Form layout='vertical' on onFinish={onFinish}>
          <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please enter your name!' }]}>
            <Input placeholder='Name' autoComplete="on" />
          </Form.Item>
          <Form.Item label='Email' name='email' rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}>
            <Input placeholder='Email' autoComplete="on" />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input placeholder='Password' type='password' autoComplete="off" />
          </Form.Item>

          <Button className='primary-button my-2' htmlType='submit'>REGISTER</Button>
          <Link className='anchor' to='/login'>CLICK HERE TO LOGIN</Link>

        </Form>
      </div>
    </div>
  )
}
export default Register;







// const [data, setData] = useState() //bhavika didi
// const onFinish = async(values) => { //onFinish function is used to collect values from the webpages menus and submit it to the MongoDB database

//   console.log("received values of form:", values) //this is for debugging
//   registerController().then(()=>{
//     console.log("registered")
//   })

// };


// // Define state variables
// const [formData, setFormData] = useState({
//   name: '',
//   email: '',
//   password: ''
// });

// // Handle form input change
// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };//gpt mod

