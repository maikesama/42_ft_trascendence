import {Header} from '../components/Header'
import {MessageSent, MessageReceived} from '../components/Message'
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
        
        <div className="chat-box" style={chatBox}>
        <h3 style={title}>Chat</h3><br />
        <div id="demo">
        <MessageSent message="Hey come va?" time="11.00"/>
        <MessageReceived message="Ma tutt appost e tu?" time="11.02" />
        <MessageSent message="Anche io grazie !!" time="11.03"/>
        </div>
        <br />
        <input placeholder='Messaggio' type="textbox" name="message" id="message" style={textbox}/>
        <input type="button" value="Invia"onClick={sendMessage} />
        </div>
        
        </>
    );
}