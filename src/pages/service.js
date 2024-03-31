
import React, { useState } from 'react';
import { Card } from 'antd'; // Import Card component from Ant Design
import '../serviceDoctor.css';


function Service() {
  // State to store the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Array of service names
  const services = ['Dentist', 'Pediatrician', 'Dermatologist', 'Cardiologist', 'Neurologist', 'Ophthalmologist', 'Orthopedic'];

  return (
    <div className='main'>
      <div className='d-flex layout'>
        <div className='sidebar-header'></div>
        <div className='menus'></div>
        <div className='content'>
          <div className='header'>
            <div className='d-flex align-items-center px-4'>
              {/* Search bar in the header */}
              <div className="container">
                <div className="search-container">
                  <input className="input2" type="text" placeholder="Search.." onChange={(e) => setSearchTerm(e.target.value)} />
                  <svg viewBox="0 0 24 24" className="search__icon">
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className='body'>
            {/* Display service cards */}
            {services.map((service, index) => (
              <Card
                key={index}
                className='service-card'
                hoverable // Add hover effect
                style={{ opacity: searchTerm && service.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1 ? '0' : '1' }}
              >
                <h3>{service}</h3>
                <p>Description of {service}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
