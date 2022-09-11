import {Header} from '../components/Header'
import {MessageSent, MessageReceived} from '../components/Message'
import './css/Chat.css'
export const Chat = () => {

    const title = {
        marginTop: '2%',
        marginBottom: '1%',
        color : 'white',
        fontFamily: 'MyWebFont'
    }

    return (
        <>
        <Header/>
        <h3 style={title}>Chat</h3>
        <div className="chat-box">
        <MessageSent message="Hey come va?" time="11.00"/>
        <MessageReceived message="Ma tutt appost e tu?" time="11.02" />
        </div>
        
        </>
    );
}