import React from 'react'
import { Navigate, Outlet } from 'react-router';
import {Useauth}from '../Hooks/Useauth';

const Privateroute = () => {
    const {loggedIn,checkingStatus}=Useauth();
    if(checkingStatus){
        return <h3>Loading.....</h3>
    }
    return loggedIn ? <Outlet/>: <Navigate to = "/Sign-In"/>
}

export default Privateroute
