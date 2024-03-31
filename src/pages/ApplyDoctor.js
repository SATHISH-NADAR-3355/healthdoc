import React from 'react'
import Layout from '../components/Layout'
import {Form, Row, Col} from 'antd'
import {Input,Button, TimePicker} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
// import Forms from '../components/Forms' //me tho bolunga importing froms is useless

function ApplyDoctor() {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user);
    const navigate = useNavigate();    
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("http://localhost:7777/api/user/apply-doctor-account", 
            {...values,
             userId: user._id,
             timings: [moment(values.timings[0]).format("HH:mm"),
                       moment(values.timings[0]).format("HH:mm")],
            }, //to merge the properties of req_body and status we use '...' (it is called as spread syntax)
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
            ); 
            dispatch(hideLoading());
            if (response.data.success) {
              toast.success(response.data.message);
              toast("Redirecting to homepage");
              navigate("/"); 
            }else {
                toast.error(response.data.message); //hmm 
                }   
            }
          catch (error) {
            dispatch(hideLoading());
            toast.error('something went wrong');
          }
        }; 

  return (
    <Layout>
        <h1 className='page-title '>Apply Doctor</h1>
        <hr/>
        <Form layout='vertical' onFinish={onFinish}>
            <Row gutter={30}>
                <h1 className='card-title mt-3'>Personal Information</h1>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="First Name" name='firstName' rules={[{required: true}]}>
                        <Input placeHolder='First Name'/>
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Last Name" name='lastName' rules={[{required: true}]}>
                        <Input placeHolder='Last Name'/>
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Phone Number" name='phoneNumber' rules={[{required: true}]}>
                        <Input placeHolder='Phone Number'/>
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Website" name='website' rules={[{required: false}]}>
                        <Input placeHolder='Website'/>
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Email" name='email' rules={[{required: true}]}>
                        <Input placeHolder='Email'/>
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Address" name='address' rules={[{required: true}]}>
                        <Input placeHolder='Address'/>
                    </Form.Item>
                </Col>


            </Row>
            <hr/>
            <Row gutter={30}>
                <h1 className='card-title mt-3'>Professional Information</h1>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Specialization" name='specialization' rules={[{required: true}]}>
                        <Input placeHolder='Specialization'/>
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Experience (in years)" name='experience' rules={[{required: true}]}>
                        <Input placeHolder='Experience (years)' type='number'/>
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Fee Per Consultation(₹)" name='feePerConsultation' rules={[{required: true}]}>
                        <Input placeHolder='Fee Per Consultation(rupees)' type='number'/>
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Timings" name='timings' rules={[{required: true}]}>
                    <TimePicker.RangePicker/>
                    </Form.Item>
                </Col>
            </Row>
            <div className='d-flex justify-content-end'>
                <Button className='primary-button2' htmlType='submit'>SUBMIT</Button>
            </div>
        </Form>
        {/* <Forms onFinish={onFinish}/> */}
    </Layout>
  )
}

export default ApplyDoctor