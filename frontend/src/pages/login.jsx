import React, {useContext, useState} from 'react';
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {AuthContext} from "../context/authContext";
import {useNavigate} from "react-router-dom";
import {useForm} from "../utilities/hooks";
import styles from './login.module.css';

const LOGIN_USER = gql`
    mutation LoginUser($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
            token
            email
            username
        }
    }
`

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState([]);

  const loginUserCallback = () => {
    loginUser();
  }

  const {onChange, onSubmit, values} = useForm(loginUserCallback, {
    email: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, {
      data: {
        loginUser: userData
      }
    }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors}) {
      setError(graphQLErrors);
    },
    variables: { loginInput: values}
  });
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Login User</h3>
      </div>

      <div className={styles.inputStack}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.inputField}
          onChange={onChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.inputField}
          onChange={onChange}
        />

        {
          error.map((e, index) => {
            return (
              <div className={styles.error} key={index}>
                {e.message}
              </div>
            )})
        }

        <div className={styles.submitRow}>
          <button
            onClick={onSubmit}
            className={styles.submitBtn}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
