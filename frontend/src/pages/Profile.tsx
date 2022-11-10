import React,{useEffect} from 'react';
import {Header} from '../components/generic/Header'
import { ProfileContain } from '../components/profile/ProfileContain';

export const Profile = () => {
    console.log("Profile.tsx")
    
    return (
        <>
        <Header/>
        <ProfileContain/>
        </>
    );
}