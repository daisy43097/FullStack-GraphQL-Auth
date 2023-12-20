import styles from './navbar.module.css';

import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";

const NavBar = () => {
  const {user, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  }

  console.log(user);

  return (
    <div className={styles.navbar}>
      <div className={styles.main}>
        <div className={styles.title}>
          <Link to='/'
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'bolder',
                }}> GraphQL </Link>
        </div>
        <div className={styles.buttonGroup}>
          {
            user ?
              <>
                <button
                  className={styles.logoutBtn}
                  onClick={logout}
                >
                  Logout
                </button>
              </>
              :
              <>
                <Link to='/login'
                      style={{
                        color: 'white',
                        padding: '0 1rem',
                        textDecoration: 'none',
                      }}
                >Login</Link>
              </>
          }

          <Link to='register'
                style={{
                  color: 'white',
                  padding: '0 1rem',
                  textDecoration: 'none',
          }}
          >Register</Link>
        </div>
      </div>

    </div>
  );
};

export default NavBar;
