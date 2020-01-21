import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { signIn } from '../../store/actions/usersActions'

import './pagesDesign.css'


// Yup Validation schema

const valSchema =  Yup.object().shape({
    id: Yup.string()
        .max(100, "*Email/userId must be less than 100 characters")
        .required("*Please provide a valid id/email"),
    password: Yup.string()
        .min(7, "*Password must have at least 7 characters")
        .max(14, "*Passord can't be longer than 14 characters")
        .required("*Password is required")
});


const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.currentUser);
    let submitMessage = '';
    const emailCheck = new RegExp('.+@.+.[A-Za-z]+$');

    console.log('Current User:', currentUser)
    return (
        <div>
            <h1>LOGIN PAGE</h1>
            <Formik
                initialValues={{id: "", password: ""}}
                validationSchema={valSchema}
                onSubmit={ (values, {setSubmitting, resetForm}) => {
                    let qData = 'password=' + values.password;
                    if (emailCheck.test(values.id)) {
                        qData = qData + '&email=' + values.id;
                    } else {
                        qData = qData + '&name=' + values.id;
                    }
                    console.log("THE NAME:", qData)
                    submitMessage = '';
                    setSubmitting(true);
                    axios.get('http://localhost:5000/users/check-credentials?' + qData)
                    .then(res => {
                        const newUser = res.data;
                        dispatch(signIn(newUser));
                        console.log("Login User Ok:", newUser);
                        submitMessage = 'Login Successful';
                        resetForm();
                        history.push('/')
                    }).catch( (error) => {
                        console.log('Login error',error);
                        submitMessage = 'Login Failed';
                        resetForm();  
                    });
                    setSubmitting(false)
                }}
            >
            {( { values,
                 errors,
                 touched,
                 handleChange,
                 handleBlur,
                 handleSubmit,
                 isSubmitting }) => (
                <Form onSubmit={ handleSubmit }>
                    <Form.Group controlId="formUserId">
                        <Form.Label className="text-left">User ID</Form.Label>
                        <Form.Control 
                            type="text"
                            name="id"
                            placeholder="Enter user identity"
                            value={ values.id }
                            onBlur={ handleBlur }
                            onChange={ handleChange }
                            className={ touched.id && errors.id ? "errorSign" : null }
                        />
                        <Form.Text className="text-muted text-left">
                            { touched.email && errors.email ? errors.email : null }                            
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="text-left">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={ values.password }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ touched.password && errors.password ? "errorSign" : null}
                        />
                        { touched.password && errors.password ? (
                            <Form.Text className="text-muted text-left">{errors.password}</Form.Text>
                        ) : null}
                    </Form.Group>
                    <Button 
                        variant="primary"
                        type="submit"
                        disabled={ isSubmitting }
                    >
                        Submit
                    </Button>
                    { submitMessage ? (<p className="text-left">{submitMessage}</p>) : null }
                </Form>
            )}               
            </Formik>
            <p className="text-left">USER: {currentUser.name || 'unknown'}</p>
        </div>
    )
}

export default LoginPage;
