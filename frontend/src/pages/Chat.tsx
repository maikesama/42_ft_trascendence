import {Header} from '../components/generic/Header'
import {MessageSent, MessageReceived} from '../components/chat/Message'
import {ChatContain} from '../components/chat/ChatContain'

import './css/Chat.css'
export const Chat = () => {

    return (
        <>
        <Header/>
        
        <ChatContain status="online"/>
        
        </>
    );
}