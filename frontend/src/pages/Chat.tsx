import {Header} from '../components/Header'
import {MessageSent, MessageReceived} from '../components/Message'
import {ChatContain} from '../components/ChatContain'

import './css/Chat.css'
export const Chat = () => {

    function sendMessage(){
        let message = ((document.getElementById("message") as HTMLInputElement).value);
        let box = document.getElementById('demo');
        if (message && box)
        {
            box.append(message);
            box.innerHTML += '<br/>';

        }
        // if (message && box)
        // {
        //     console.log(<MessageSent message="Hey come va?" time="11.00"/>);
        //     box.innerHTML += <MessageSent message="Hey come va?" time="11.00"/>;
        //     box.innerHTML += '<br/>';

        // }
    }

    const title = {
        marginTop: '2%',
        marginBottom: '1%',
        color : 'black',
        fontFamily: 'MyWebFont',
        textAlign: 'center' as 'center'
    }

    const chatBox = {
        marginTop: '2%',
    }
    
    const textbox = {
       width: '70%',
       marginRight: 15,
       
    }

    return (
        <>
        <Header/>
        
        <ChatContain />
        
        </>
    );
}