import {Header} from '../components/generic/Header';
import '../font/font.css';
import './css/Homepage.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

let logged = false;

export const Homepage = () => {


/*    function richiedi() {
        axios.get("api/user", {
            responseType: "json",
        })
        .then(function (response) {
            console.log(response.data);
        });
}
    richiedi();*/

    //https://img.freepik.com/free-vector/vector-cartoon-background-quest-room-with-closed-doors_33099-1202.jpg
    //d-flex justify-content-evenly align-items-center mw-100
    //w-50 h-50 d-inline-block
    //backgroundImage: `url(${background})`
    //d-flex justify-content-center align-items-center

    function classico()
    {
        window.location.assign('games/classic')
    }

    function custom()
    {
        window.location.assign('games/custom')
    }

	return (
        <>
        <Header/>
        <div className="container-fluid " id="bodybox">
                <div className="row" id="row">

                    <div onClick={classico} className="col-md-6 d-flex justify-content-center align-items-center" id="classic">
                        <h1 className="modalityName">Classico</h1>
                    </div>

                    <div onClick={custom} className="col-md-6 d-flex justify-content-center align-items-center" id="custom">
                        <h1 className="modalityName">Custom</h1>
                    </div>
                </div>
        </div>
        </>
	);
}
