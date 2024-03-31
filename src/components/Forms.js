import { Col, Form, Row } from 'antd'
import {Input,Button, TimePicker} from 'antd'
import React from 'react'

function Forms({onFinish, initialValues}) {
  return (
      <Form layout='vertical' onFinish={onFinish} initialValues= {initialValues}>
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
  )
}

export default Forms