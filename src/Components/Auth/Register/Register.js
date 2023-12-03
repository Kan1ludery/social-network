import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {NavLink, useNavigate} from 'react-router-dom';
import styles from '../Login/Login.module.css';
import {authAPI} from "../../../api/api";
import {useDispatch} from "react-redux";
import {setAuthStatus} from "../../../actions/usersActions";


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    localStorage.setItem('requestedPath', '/')
    const handleBlur = () => {
        if (errorMessage) {
            setErrorMessage(''); // Скрываем сообщение об ошибке, если ошибка была видна и поле теряет фокус
        }
    };
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const validate = (values) => {
        const errors = {};

        const requiredErrorMessage = 'This field is required';

        if (!values.username) {
            errors.username = requiredErrorMessage;
        }

        if (!values.email) {
            errors.email = requiredErrorMessage;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid e-mail address';
        }

        if (!values.password) {
            errors.password = requiredErrorMessage;
        } else if (values.password.length < 8) {
            errors.password = 'Password must contain a minimum of 8 characters';
        }

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = `The passwords don't match`;
        }

        return errors;
    }

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const response = await authAPI.register(values);
            const {token} = response;
            localStorage.setItem('token', token);
            dispatch(setAuthStatus(true))
            navigate("/");
        } catch (error) {
            setErrorMessage(Object.values(error.response.data)[0]);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className={styles.container}>
            <h2>Registration</h2>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form className={styles.form}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <Field type="text" id="username" name="username" required onFocus={handleBlur}/>
                            <ErrorMessage name="username" component="div" className={styles.error}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field type="email" id="email" name="email" required onFocus={handleBlur}/>
                            <ErrorMessage name="email" component="div" className={styles.error}/>
                        </div>
                        <div>
                            <label htmlFor="password">Enter a password:</label>
                            <Field type="password" id="password" name="password" required onFocus={handleBlur}/>
                            <ErrorMessage name="password" component="div" className={styles.error}/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm password:</label>
                            <Field type="password" id="confirmPassword" name="confirmPassword" required onFocus={handleBlur}/>
                            <ErrorMessage name="confirmPassword" component="div" className={styles.error}/>
                        </div>
                        {errorMessage ? <div className={styles.error}>{errorMessage}</div> : ''}
                        <button className={isSubmitting ? styles.disabled_button : ''} type="submit"
                                disabled={isSubmitting}>
                            Register
                        </button>
                        <NavLink to="/login">
                            <p className={styles.redirect_p}>Already have an account?</p>
                        </NavLink>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
