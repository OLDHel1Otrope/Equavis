
import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
      <div >
          {/* <ul>
          <li><Link to="/workspace">Workspace</Link></li>
        </ul> */}

        <div className="overlay top-left"><h2><b>EQUAVIS</b></h2></div>
        <Link to="/login">
        <div 
        className="overlay top-right" 
        style={{ color: 'white',transition: 'color 0.2s ease',cursor: 'pointer' }} 
        onMouseOver={(e) => e.currentTarget.style.color = '  #9479f4  '} 
        onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
          <img src="./src/assets/account.svg" alt="Logo" style={{ width: '50px', height: '35px' }} />
          <b><h3>USER</h3></b>
      </div>
      </Link>
      </div>
    );
  };
  
  export default Header;
  

  