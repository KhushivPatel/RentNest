import React from 'react'
import { Navigate, Outlet } from 'react-router';
import {Useauth}from '../Hooks/Useauth';
import Spinner from './Spinner';

const Privateroute = () => {
    const {loggedIn,checkingStatus}=Useauth();
    if(checkingStatus){
        return <Spinner/>
    }
    return loggedIn ? <Outlet/>: <Navigate to = "/Sign-In"/>
}

export default Privateroute
