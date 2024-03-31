//rfce=react functional component export
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import bush1 from '../assets/parallax/bush1.png'
import bush2 from '../assets/parallax/bush2.png'
import leaf1 from  "../assets/parallax/leaf1.png"
import leaf2 from "../assets/parallax/leaf2.png"
import mount1 from "../assets/parallax/mount1.png"
import mount2 from "../assets/parallax/mount2.png"

import '../parallax.css';
// import { Menu, Flex } from 'antd';
//import { HomeOutlined, UserOutlined, SearchOutlined,AppstoreOutlined, LoginOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// const { SubMenu } = Menu;



function DashBoard() { //book appointment screen bhi kar sakthe import bg from new repo guya
//functionality
  const getData = async() =>{
    try{
      const response = await axios.post("http://localhost:7777/api/user/get-user-info-by-id", {},
      {
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem( "token" ) //token value gets stored in authorization
        }
      })
      console.log(response.data)
    } catch (err) {
      console.log('Error', err);
    }
  }
  useEffect(() =>{
    getData();
  },  []);

//parallax effect 
  useEffect(() => {
    const title = document.querySelector('.title');
    const leaf1 = document.querySelector('.leaf1');
    const leaf2 = document.querySelector('.leaf2');
    const bush2 = document.querySelector('.bush2');
    const mount1 = document.querySelector('.mount1');
    const mount2 = document.querySelector('.mount2');

    const handleScroll = () => {
        let value = window.scrollY;

        title.style.marginTop = value * 1.1 + 'px';
        leaf1.style.marginLeft = -value + 'px';
        leaf2.style.marginLeft = value + 'px';
        bush2.style.marginBottom = -value + 'px';
        mount1.style.marginBottom = -value * 1.1 + 'px';
        mount2.style.marginBottom = -value * 1.2 + 'px';
    };

    document.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
        document.removeEventListener('scroll', handleScroll);
    };
},
  [])
  
  
  return(
    <div>
      <header>
        <div className='Plogo'>
        {/* <img src='https://raw.githubusercontent.com/roshan0708/HealthDoc/29dda452f6addcc2db2e8285a142834080863870/client/src/assets/healthcare.svg' alt='logo'/> */}
        </div>
          {/* <div className="company-name">HealthDoc</div> */}
             <nav>
                <Link to="/" className="active">About</Link>
                <Link to="/home" >Home</Link>
                <Link to="/service">Services</Link>
                <Link to="/contact">find a doctor</Link>
                <Link to="/register">user </Link>
             </nav>
            
       </header>

    <section className="home">
        <img src={mount2} className="mount2" alt="Mount 2" />
        <img src={mount1} className="mount1" alt="Mount 1" />
        <img src={bush2} className="bush2" alt="Bush 2" />

        <h1 className="title">HEALTHDOC</h1>

        <img src={bush1} className="bush1" alt="Bush 1" />
        <img src={leaf2} className="leaf2" alt="Leaf 2" />
        <img src={leaf1} className="leaf1" alt="Leaf 1" />
    </section>

    <section className="about">
        <h1>Parallax</h1>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid unde praesentium harum consequuntur consequatur exercitationem quas officiis quod quidem amet, illum facere ipsam vitae quae, a aut non numquam minus voluptate doloremque. Fugiat dolor dolores, temporibus, culpa quia illo, enim sint harum adipisci voluptatem aliquid. Officia tempore dolore natus iure, odit blanditiis? Voluptate aliquid vel suscipit fugiat dolor distinctio, blanditiis cupiditate rerum quidem repellat sint vero error minima? Culpa, porro ipsa totam consequuntur molestiae nulla dignissimos voluptatum provident, minima eligendi sapiente tempore quas asperiores, reiciendis veritatis placeat? Odit nobis rem a iste reiciendis nemo tempore quae asperiores quia.</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, aliquam illum. Totam inventore beatae, facilis harum adipisci molestias blanditiis voluptatibus consequatur, explicabo, voluptates consectetur eaque nihil perferendis ratione architecto. Unde odio modi dolor, suscipit nostrum quibusdam quia minima, facilis distinctio aliquid excepturi. Repellendus consequuntur numquam, minus tenetur commodi ipsum velit aspernatur nostrum suscipit explicabo possimus molestiae minima doloribus. Doloribus architecto voluptates perferendis nostrum ullam hic odio sunt. Dolores facilis, pariatur eligendi excepturi accusamus optio aliquam maxime aspernatur, explicabo velit cum, quia a cumque voluptas quis nesciunt. Repellendus hic consequuntur aperiam delectus ratione reprehenderit expedita adipisci ut nesciunt amet, exercitationem illo.</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt saepe dolorem consectetur architecto officiis. Unde, at. Magnam sed aliquid nesciunt error sint repudiandae ad. Reiciendis minus, esse eos soluta mollitia quia est! Inventore aliquid ut hic fuga ratione consectetur ea? Ratione tempore, ab dolor, assumenda neque doloremque voluptate nesciunt eaque, illo ipsa quia. Nihil dolor libero animi quibusdam recusandae et cumque deleniti minima unde iste sint possimus numquam nam, corporis cupiditate? Maxime voluptate atque alias consequuntur tenetur non quia amet, eligendi libero odio adipisci aperiam dolore perferendis illum vero, nam temporibus numquam cumque, neque fuga iste? Totam cum modi excepturi!</p>
    </section>
</div>
  );
}
export default DashBoard;















  
//   return (
//     <div className="App">
//       <Flex justify="space-between">
//         <div className="logo">
//           <img src='https://raw.githubusercontent.com/roshan0708/HealthDoc/29dda452f6addcc2db2e8285a142834080863870/client/src/assets/healthcare.svg' alt='logo'/>
//         </div>
//         <div className="company-name">HEALTHDOC</div>
//         <Menu mode="horizontal" className="menu">
//         <Menu.Item key="about" >About
//               <Link to='/'></Link>
//           </Menu.Item>
//           <Menu.Item key="dashboard" >DashBoard
//               <Link to='/home'></Link>
//           </Menu.Item>
//           <Menu.Item key="Services" >Services
//               <Link to='/service'></Link>
//           </Menu.Item>
//           <Menu.Item key="find-doctor">Find a Doctor</Menu.Item>
//           <SubMenu key="user" icon={<UserOutlined />} title="User">
//              <Menu.Item className='log' key="login" icon={<LoginOutlined />}>Login
//                 <Link to='/register'></Link>
//               </Menu.Item>
//           </SubMenu>
//         </Menu>
//       </Flex>
//     </div>
//   );
// }

// export default DashBoard;

