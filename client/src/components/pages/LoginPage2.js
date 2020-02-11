import React from 'react'
import GoogleLogin from 'react-google-login'
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

    const responseGoogleOk = (response) => {
        const data = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            img: response.profileObj.imageUrl,
            googleId: response.profileObj.googleId
        }
        // console.log('Data to BE from Google response:', data);
        axios.post('/users/login-google', data)
        .then(res => {
            // console.log('Login Google BE response', res.data)
            dispatch( signIn( res.data ) );
            history.push('/')
        }).catch( (error) => {
            console.log('Login error',error);
            submitMessage = 'Login Failed';
        });
    }
    
    const responseGoogleFail = (response) => {
        console.log('Google Failed Response:', response);
    }
    
    function submitCredentials (values) {
        
        let data = { password: values.password };
        if (emailCheck.test(values.id)) {
            data.email = values.id;
        } else {
          data.name = values.id;
        }
        // console.log("User Data:", data)
        return axios.post('/users/check-credentials', data);
    }

    // console.log('Current User:', currentUser)
    return (
        <div className="flex flex-wrap justify-center ">
            <h1 className="block w-full text-gray-700">LOGIN PAGE</h1>
            <Formik
                initialValues={{id: "", password: ""}}
                validationSchema={valSchema}
                onSubmit={ (values, {setSubmitting, resetForm}) => {
                    submitMessage = '';
                    setSubmitting(true);
                    submitCredentials(values)
                        .then(res => {
                                dispatch( signIn( res.data ) );
                                // console.log("Login User Ok:", res.data);
                                submitMessage = 'Login Successful';
                                resetForm();
                                history.push('/')
                            },
                            error => {
                                console.log('Login failed:',error.response);
                                submitMessage = error.response.data;
                                resetForm();  
                            }
                        ).catch( (error) => {
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
                    <div className="w-full max-w-xs">
                        <form 
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto"
                            onSubmit={ handleSubmit }
                        >
                            <div className ="mb-4">
                                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2" >
                                    Username
                                </label>
                                <input 
                                    className= { touched.id && errors.id ? inputNokClass : inputOkClass }
                                    id="username"
                                    name="id"
                                    type="text"
                                    autoComplete="username"
                                    placeholder="Enter user identity"
                                    value={ values.id }
                                    onBlur={ handleBlur }
                                    onChange={ handleChange }
                                />
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
                            <div className="flex items-center justify-between">
                                <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                type="submit"
                                disabled={ isSubmitting }
                                >
                                    Sign In
                                </button>
                                <GoogleLogin
                                    clientId="159623294096-sqld2e4427asa4pa4u5a1eedgdgg8s18.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseGoogleOk}
                                    onFailure={responseGoogleFail}
                                    cookiePolicy={'single_host_origin'}
                                />
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

export default LoginPage;
