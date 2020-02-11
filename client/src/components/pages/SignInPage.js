import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { signIn } from '../../store/actions/usersActions'

const inputOkClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
const inputNokClass = "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

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


const SignInPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.currentUser);
    let submitMessage = '';
    console.log('Current User:', currentUser)
    return (
        <div className="flex flex-wrap justify-center ">
            <h1 className="block w-full text-gray-700">CREATE ACCOUNT</h1>
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
                    <div className="w-full max-w-xs">
                        <form 
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto"
                            onSubmit={ handleSubmit }
                        >
                            <div className ="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2" >
                                    Email Address
                                </label>
                                <input 
                                    className= { touched.id && errors.id ? inputNokClass : inputOkClass }
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter valid Email Address"
                                    value={ values.email }
                                    onBlur={ handleBlur }
                                    onChange={ handleChange }
                                />
                                <p className="text-xs text-gray-200 italic">
                                    { touched.email && errors.email ? 
                                    errors.email : "We'll never share your email with anyone else." }
                                </p>
                                
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input 
                                    className= { touched.id && errors.id ? inputNokClass : inputOkClass }
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    value={ values.password }
                                    onChange={ handleChange }
                                    onBlur={ handleBlur }
                                />
                                { touched.password && errors.password ? (
                                    <p className="text-red-500 text-xs italic">{errors.password}</p>
                                    ) : null 
                                }
                            </div>
                            <div className="flex items-center justify-center">
                                <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                type="submit"
                                disabled={ isSubmitting }
                                >
                                    Sign In
                                </button>
                            </div>
                            { submitMessage ? (<p className="text-left">{submitMessage}</p>) : null }
                        </form>
                    </div>
            )}               
            </Formik>
            <p className="block w-full text-left">USER: {currentUser.name || 'unknown'}</p>
        </div>
    )
}

export default SignInPage;
