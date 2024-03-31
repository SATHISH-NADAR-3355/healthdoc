import React from 'react'
import {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import {showLoading, hideLoading} from "../../redux/alertsSlice";
import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUserData = async () =>{
    try{
      dispatch(showLoading())
      const response = await axios.get("http://localhost:7777/api/admin/get-all-users", {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading())
      if(response.data.success)
      {
        setUsers(response.data.data);
      }
    } catch(error){
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: "Name", //title can be variable no restrictions
      dataIndex: "name", //dataIndex should be same as the one used in DB (refer user & doctor models)
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="link_a block-action">Block</h1>
        </div>
      ),
    },
  ];

  return (

    <Layout>
      <h1 className='page-title'> Users List</h1>
      <hr/>
      <Table columns={columns} dataSource={users} className='glassy-table' />
    </Layout>
  )
}

export default UsersList;