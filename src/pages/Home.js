import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

import Layout from '../components/Layout'

function Home() { //book appointment screen bhi kar sakthe import bg from new repo guya
    const getData = async () => {
        try {
            const response = await axios.post("http://localhost:7777/api/user/get-user-info-by-id", {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token") //token value gets stored in authorization
                    }
                })
            console.log(response.data)
        } catch (err) {
            console.log('Error', err);
        }
    }
    useEffect(() => {
        getData();
    }, [])



    return (
        <Layout> 
            <h1>homepage</h1>
        </Layout>
    );
}
export default Home;