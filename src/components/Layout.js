import React from 'react';
import '../layout.css';
import { Link, useNavigate} from 'react-router-dom';
import { HomeOutlined, CalendarOutlined, UserAddOutlined, UserOutlined, LogoutOutlined, MedicineBoxOutlined, TeamOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useSelector } from 'react-redux';


function Layout({ children }) {
    const [collapsed, setcollapsed] = React.useState(false);
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();

    // const location = useLocation(); hover state active
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login'); // Redirect to login page
    };

    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: <HomeOutlined />,
        },
        {
            name: 'Appointment',
            path: '/appointments',
            icon: <CalendarOutlined />,
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: <UserAddOutlined />,
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: <UserOutlined />,
        },
    ];

    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: <HomeOutlined />,
        },
        {
            name:'Users',
            path: '/admin/users-list',
            icon: <TeamOutlined />, 
        },
        {
            name:'Doctors',
            path: '/admin/doctors-list',
            icon: <MedicineBoxOutlined />
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: <UserOutlined />,
        },
    ];

    const doctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: <HomeOutlined />,
        },
        {
            name: 'Appointment',
            path: '/appointments',
            icon: <CalendarOutlined />,
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: <UserOutlined />,
        },
    ];
    //is user the admin-> render adminmenu else {is the user doctor-> render doctormenu else [render usermenu]} 
const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu; 

const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User"; 
    return (
        <div className='main'>
            <div className='d-flex layout'> {/*display flex*/}
                <div className=     {`${collapsed ? 'collapsed-sidebar' : 'sidebar'}`}>    {/* 'sidebar'>*/}  {/*its backtick, one near numerical no.1 above shift*/}
                    <div className='sidebar-header'>
                    {!collapsed && <h1 className="comp-name">HealthDoc</h1>}
                    {collapsed && <h1 className='comp-name'>MedX</h1>} {/*MedEase*/}
                    <h4 className='descriptor'>{role}</h4>
                    </div>
                    <div className='menus'>
                        {menuToBeRendered.map((menu, index) => (
                            <div className='d-flex menu-item' key={index}>
                                {menu.icon} {/* Display icon */}
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                        ))}
                        <div
                          className={`d-flex menu-item`}
                          onClick={handleLogout}>
                          {collapsed && <LogoutOutlined />}
                          {!collapsed && (
                                <>
                                    <LogoutOutlined /> {/* Ant Design Logout icon */}
                                    <Link to="/login">Logout</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        {collapsed ? ( <i className='ri-menu-unfold-2-fill remix-icons' onClick={() => setcollapsed(false)}></i> ) : (<i className='ri-menu-fold-2-fill remix-icons' onClick={() => setcollapsed(true)}></i> )}
                        <div className ='d-flex align-items-center px-4'>

                        <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/notifications')}>
                        <i className='ri-notification-4-line remix-icons px-1'></i>
                        </Badge>
                            <Link className="ri-user-heart-line profile" to="/profile"> {user?.name}</Link>

                        </div>
                    </div>
                    <div className='body'>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
