import React from 'react'
import {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import {showLoading, hideLoading} from "../../redux/alertsSlice";
import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';
import {toast} from 'react-hot-toast';

function DoctorsList() {

  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getDoctorsData = async () =>{
    try{
      dispatch(showLoading())
      const response = await axios.get("http://localhost:7777/api/admin/get-all-doctors", {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading())
      if(response.data.success)
      {
        setDoctors(response.data.data);
      }
    } catch(error){
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record , status) =>{
    try{
      dispatch(showLoading())
      const response = await axios.post("http://localhost:7777/api/admin/change-doctor-request-status", 
      {doctorId : record._id , userId : record.userId , status : status}, {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading())
      if(response.data.success)
      {
        toast.success(response.data.message);
        getDoctorsData();
      }
    } catch(error){
      toast.error("Error in handling doctor account status")
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: "Name", //title can be variable no restrictions
      dataIndex: "name", //dataIndex should be same as the one used in DB (refer user & doctor models)
      render: (text, record) => ( //any manipulation of data before displaying it to UI, use render method
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
      // render: (text, record) => <h7 className='normal text'>{record.firstName} {record.lastName}</h7> //any manipulation of data before displaying it to UI, use render method    
    },
    {
      title:'specialization',
      dataIndex:'specialization',
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
    title: 'Phone Nummber',
    dataIndex: 'phoneNumber',
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title:'status',
      dataIndex: 'status',
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && <h1 className='block-action2' onClick={()=> changeDoctorStatus(record , 'approved')}>Approve</h1>} 
          {record.status === "approved" && <h1 className='block-action2' onClick={()=> changeDoctorStatus(record , 'blocked')}>Block</h1>} 
        </div> // '==='strict equality opr, checks for both  value and type
      ),
    },
  ];

  return (
    <Layout>
      <h1 className='page-title'>Doctors List</h1>
      <hr/>
      <Table columns={columns} dataSource={doctors} className='glassy-table' />
    </Layout>
  )
}

export default DoctorsList