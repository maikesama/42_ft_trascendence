import {Header} from '../components/generic/Header'
import {ChatContain} from '../components/chat/ChatContain'
import React, {useState} from 'react';
export const Chat = () => {

    return (
        <>
        <Header/>
        <React.StrictMode>
        
        <ChatContain status="online"/>
        </React.StrictMode>
        </>
    );
}