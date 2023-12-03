// Login.js
import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {NavLink, useNavigate} from 'react-router-dom';
import {authAPI} from '../../../api/api';
import styles from './Login.module.css';
import {getUserProfile, setAuthStatus} from "../../../actions/usersActions";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const {isAuth} = useSelector((state) => state.userReducer);
    localStorage.setItem('requestedPath', '/')
    useEffect(() => {
        if (isAuth){
            dispatch(getUserProfile());
        }
    }, [dispatch, isAuth]);
    const handleBlur = () => {
        if (errorMessage) {
            setErrorMessage(''); // Скрываем сообщение об ошибке, если ошибка была видна и поле теряет фокус
        }
    };
    const initialValues = {email: '', password: ''};
    const handleSubmit = async (values, {setSubmitting}) => {
        // Пример декодирования JWT-токена
        try {
            const response = await authAPI.login(values);
            const {token} = response;
            localStorage.setItem('token', token);
            dispatch(setAuthStatus(true))
            navigate(localStorage.getItem('requestedPath'));
        } catch (error) {
            setErrorMessage(Object.values(error.response.data)[0]);
        } finally {
            setSubmitting(false);
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'This field is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid e-mail address';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validate={validate}
            >
                {({isSubmitting}) => (
                    <Form className={styles.form}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" onFocus={handleBlur} autoComplete={'off'}/>
                            <ErrorMessage name="email" component="div" className={styles.error}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" onFocus={handleBlur} />
                            <ErrorMessage name="password" component="div" className={styles.error}/>
                        </div>
                        {errorMessage ? <div className={styles.error}>{errorMessage}</div> : ''}
                        <button className={isSubmitting ? styles.disabled_button : ''} type="submit"
                                disabled={isSubmitting}>
                            Login
                        </button>

                        <NavLink to="/register"><p className={styles.redirect_p}>Don't have an account?</p></NavLink>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
