import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

import hill1 from '../assets/parallax2/hill1.png'
import hill2 from '../assets/parallax2/hill2.png'
import hill3 from  "../assets/parallax2/hill3.png"
import hill4 from "../assets/parallax2/hill4.png"
import hill5 from "../assets/parallax2/hill5.png"
import leaf from "../assets/parallax2/leaf.png"
import plant from "../assets/parallax2/plant.png"
import tree from "../assets/parallax2/tree.png"

import '../parallax2.css';

import { Link } from 'react-router-dom';




function DashBoard2() { //book appointment screen bhi kar sakthe import bg from new repo guya
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
    const handleScroll = () => {
      let value = window.scrollY;

      const text = document.querySelector('.text');
      const leaf = document.querySelector('.leaf');
      const hill1 = document.querySelector('.hill1');
      const hill4 = document.querySelector('.hill4');
      const hill5 = document.querySelector('.hill5');

      if (text && leaf && hill1 && hill4 && hill5) {
        text.style.marginTop = value * 2.5 + 'px';
        leaf.style.top = -value * 1.5 + 'px';
        leaf.style.left = value * 1.5 + 'px';
        hill5.style.left = value * 1.5 + 'px';
        hill4.style.left = -value * 1.5 + 'px';
        hill1.style.top = value * 1.5 + 'px';
      }
    };

    document.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  
  return(
    <div>
      <div className='head'>
          {/* <div className="company-name">HealthDoc</div> */}
             <nav>
                <Link to="/" className="active">About</Link>
                <Link to="/home" >Dashboard</Link>
                <Link to="/service">Services</Link>
                <Link to="/contact">find a doctor</Link>
                <Link to="/register">user </Link>
             </nav>
            
       </div>

    <section className="body2">
        <img src={hill1} className="hill1" alt="hill1" />
        <img src={hill2} className="hill2" alt="hill2" />
        <img src={hill3} className="hill3" alt="hill3" />
        <img src={hill4} className="hill4" alt="hill4" />
        <img src={hill5} className="hill5" alt="hill5" />
        <img src={tree} className="tree" alt="tree" />

        <h1 className="text">HEALTHDOC</h1>

        <img src={leaf} className="leaf" alt="leaf" />
        <img src={plant} className="plant" alt="plant" />
    </section>

    <section className="about2">
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
export default DashBoard2;















  
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

