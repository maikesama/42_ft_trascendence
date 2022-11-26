import {Header} from '../components/generic/Header';
import '../font/font.css';
import './css/Homepage.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Tutorial} from '../components/generic/Tutorial'
import React, {useState} from 'react';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export const Homepage = () => {

    const [openTutorial, setOpenTutorial]= useState(false)

    const handleClickOpenTutorial = () =>
    {
        setOpenTutorial(true);
    }

    const handleClickCloseTutorial = () => {
        setOpenTutorial(false);
    }

    function classico()
    {
        // window.location.assign('games/classic')
        window.location.assign('/games/0')
    }

    function custom()
    {
        window.location.assign('/games/1')
    }

	return (
        <>
        <Header/>

        <div className="container-fluid " id="bodybox">
                <div className="row" id="row">

                    {/* <div onClick={classico} className="col-md-5 d-flex justify-content-center align-items-center" id="classic" style={{cursor: "pointer"}}>
                        <h1 className="modalityName">Classico</h1>
                    </div> */}
                    <div className="col-md-5 d-flex justify-content-center align-items-center" style={{position: 'relative'}}>
                        <div className="classic_hover" onClick={classico}>
                            <div>
                                <img className="image_hover" alt="img" src={require('../images/classic.jpg')} />
                                <img className="image_hover" alt="img" src={require('../images/classic.gif')} />
                            </div>
                            <div className="text"><h1 className="modalityName">Classico</h1></div>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center align-items-center" id="tutorial">
                        <Button onClick={handleClickOpenTutorial} size="large" variant="contained" endIcon={<HelpIcon />}>
                            Tutorial
                        </Button>
                    </div>
                    {/* <div onClick={custom} className="col-md-5 d-flex justify-content-center align-items-center" id="custom" style={{cursor: "pointer"}}>
                        <h1  className="modalityName">Custom</h1>
                    </div> */}
                    <div className="col-md-5 d-flex justify-content-center align-items-center" style={{position: 'relative'}}>
                        <div className="classic_hover" onClick={custom}>
                            <div>
                                <img className="image_hover" alt="img" src={require('../images/custom.jpg')} />
                                <img className="image_hover" alt="img" src={require('../images/custom.gif')} />
                            </div>
                            <div className="text"><h1 className="modalityName">Custom</h1></div>
                        </div>
                    </div>
                </div>
        </div>
        <Tutorial status={openTutorial} closeStatus={handleClickCloseTutorial} />

        </>
	);
}
