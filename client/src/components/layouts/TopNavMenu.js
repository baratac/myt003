import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom'

import { signOut } from '../../store/actions/usersActions'

const hideBlock = "hidden";
const showBlock = "block flex-grow";

export default function TopNavMenu() {
   //const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.currentUser);
    const sessionActive = useSelector(state => state.users.sessionActive);

    const [ mainMenu, setMainMenu ] = useState(false);
   


    function userPicture() {
        if (sessionActive) {
          if (currentUser.img) {
            return (
                <div className="border-gray-200 border rounded-full overflow-hidden">
                    <img className="w-10 h-10 " src={currentUser.img} alt="User" />
                </div>
            );
          } else {
            return (
                <div className="border-gray-200 border rounded-full overflow-hidden">
                    <img className="w-10 h-10" src={require("../../assets/user-blue-02.png")} alt="User" />
                </div>
            );
          }
        } else {
           return (
                <div className="border border-red-200 rounded-full overflow-hidden">
                    <img className="w-10 h-10" src={require("../../assets/user-red-02.png")} alt="User" />
                </div>
            );
        }                 
    }
/*
    function showUserInfo() {

        return (
            sessionActive ? (
                <div>
                    <p>USER: { currentUser.name }</p>
                    <p>EMAIL: { currentUser.email }</p>
                </div> ) 
            : null
        );
    }

*/
    function toogleBlock() {
        //setBlockClass(mainMenu ? showBlock : hideBlock);
        setMainMenu(!mainMenu);
    }

    function punchingOut () {
        setMainMenu(false);
        dispatch( signOut() );
    }

    function menuShow() {
        // console.log('Session Status:', sessionActive)
        if (sessionActive) {
          return (
            <div>
                <Link to="/city-list" onClick={toogleBlock} className="mt-1 self-start block text-center sm:inline-block rounded sm:mr-2 lg:mt-0 text-white hover:bg-gray-600">
                    ciTies
                </Link>
                <Link to="/" onClick={punchingOut } className="self-start block sm:inline-block sm:mr-2 lg:mt-0 text-white hover:bg-gray-600">
                    logouT
                </Link>
                <Link to="/" onClick={toogleBlock} className="mt-1 self-start text-center block rounded sm:inline-block sm:mr-2 lg:mt-0 text-white hover:bg-gray-600">
                  abouT
                </Link>
            </div>
          );
        } else {
          return (
            <div className="mt-2">
                <Link to="/city-list" onClick={toogleBlock} className="mt-1 self-start block text-center sm:inline-block rounded sm:mr-2 lg:mt-0 text-white hover:bg-gray-600">
                    Cities
                </Link>
                <Link to="/login" onClick={toogleBlock} className="mt-1 self-start block text-center sm:inline-block rounded sm:mr-2 lg:mt-0 text-white hover:bg-gray-600">
                    Login
                </Link>
                <Link to="/create-account" onClick={toogleBlock} className="mt-1 self-start text-center block rounded sm:inline-block sm:mr-2 lg:mt-0 text-white hover:bg-gray-600">
                  Sign IN
                </Link>
                <Link to="/" onClick={toogleBlock} className="mt-1 self-start text-center block rounded sm:inline-block sm:mr-2 lg:mt-0 text-white hover:bg-gray-600">
                  About
                </Link>
            </div>
          );
        }
    }


    return (
        <div className="mb-2">
            <nav className="flex flex-col sm:flex-row sm:justify-between bg-gray-700 p-2">
                <div  className="flex items-center justify-between flex-wrap w-full">
                    { userPicture() }
                    <div className="w-56 sm:w-64  sm:ml-20" style= {{boxSizing:"content-box"}}>
                        <img className="w-full h-12" src={require("../../assets/MYtineraryLogo.png")} alt="Logo"/>
                    </div>
                    <div className="block sm:hidden">
                        <button onClick={ toogleBlock } className="flex items-center px-2 py-1 border rounded border-gray-300 text-gray-200 hover:border-white">
                            { mainMenu ? 
                                <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                            :
                            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                            }
                        </button>
                    </div>
                    <div className="hidden sm:block sm:text-lg sm:items-end">
                        { menuShow() }
                    </div>
                </div>
                <div className={ mainMenu ? showBlock : hideBlock }>
                    <div className="text-lg sm:flex-grow sm:items-end">
                        { menuShow() }
                    </div>
                </div>
            </nav>
        </div>
    )
}
