import {Header} from '../components/Header'
import {MessageSent, MessageReceived} from '../components/Message'
import {ChatContain} from '../components/ChatContain'

import './css/Chat.css'
export const Chat = () => {

    return (
        <>
        <Header/>
        
        <ChatContain status="online"/>
        
        </>
    );
}