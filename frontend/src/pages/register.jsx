import React, {useContext, useState} from 'react';
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {AuthContext} from "../context/authContext";
import {useNavigate} from "react-router-dom";
import {useForm} from "../utilities/hooks";
import styles from './register.module.css';

const REGISTER_USER = gql`
    mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            token
            email
            username
        }
    }
`

const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState([]);

  const registerUserCallback = () => {
    registerUser();
  }

  const {onChange, onSubmit, values} = useForm(registerUserCallback, {
    username: '',
    email: '',
    password: '',
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, {
      data: {
        registerUser: userData
      }
    }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors}) {
      setError(graphQLErrors);
    },
    variables: { registerInput: values}
  });
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Register User</h3>
      </div>

      <div className={styles.inputStack}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={styles.inputField}
          onChange={onChange}
        />

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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
