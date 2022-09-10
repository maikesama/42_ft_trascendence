
import {Header} from '../components/Header';

import '../font/font.css';

let logged = false;

export const Settings = () => {
   
    const lightText = {
        color: 'white',
        backgroundColor : '#510ac2',
        borderRadius: 4,
        padding: 15,
        marginTop: '2%'
    }

    const submitButton = {
        width: '25%',
        marginTop: 15
    }

	return (
        <>
        <Header/>
        <div className="container" style={{justifyContent: 'center', alignItems: 'center'}}>
            <div className="row">
                <div className="col-12" style={lightText}>
                    <h3>Choose your Nickname</h3>
                    <br />
                    <input type="text" placeholder="Insert your nickname..." style={{width: 200}}/>
                    <br /><br /><br />
                    <h3>Choose a profile picture</h3>
                    <input style={{marginTop: '1%', marginLeft:'10%'}} type="file" name="upload_image" id="upload_image" />
                    <br /><br /><br />
                    <input type="checkbox" name="two_factor_auth" id="two_factor_auth" style={{width: 18, height: 18}}/>
                    <label>&nbsp; Two Factor Authenticator</label>
                    <br></br><br />
                    <input style={submitButton} type="submit" value="Salva" />
                </div>
            </div>
        </div>
        </>
	);
}