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
    email: Yup.string()
        .email("*Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
    password: Yup.string()
        .min(7, "*Password must have at least 7 characters")
        .max(14, "*Passord can't be longer than 14 characters")
        .required("*Password is required")
});


const CreateAcountPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.currentUser);
    let submitMessage = '';
    console.log('Current User:', currentUser)
    return (
        <div>
            <h1>CREATE ACCOUNT</h1>
            <Formik
                initialValues={{email: "", password: ""}}
                validationSchema={valSchema}
                onSubmit={ (values, {setSubmitting, resetForm}) => {

                    const theName = values.email.split('@')[0];
                    const theData = {...values, name: theName}
                    console.log("THE NAME:", theData)
                    submitMessage = '';
                    setSubmitting(true);
                    axios.post('http://localhost:5000/users/create', theData)
                    .then(res => {
                        const newUser = res.data;
                        dispatch(signIn(newUser));
                        console.log("Create User Ok:", newUser);
                        submitMessage = 'Create Account Successful';
                        resetForm();
                        history.push('/')
                    }).catch( (error) => {
                        console.log('CReate Account error',error);
                        submitMessage = 'Create Account Failed';
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
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="text-left">Email address</Form.Label>
                        <Form.Control 
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={ values.email }
                            onBlur={ handleBlur }
                            onChange={ handleChange }
                            className={ touched.email && errors.email ? "errorSign" : null }
                        />
                        <Form.Text className="text-muted text-left">
                            { touched.email && errors.email ? 
                                errors.email : "We'll never share your email with anyone else." }                            
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

export default CreateAcountPage;
