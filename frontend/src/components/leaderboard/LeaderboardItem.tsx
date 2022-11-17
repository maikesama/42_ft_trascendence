import '../css/Navbar.css';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import { socket } from "../../App";
import { useNavigate } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export function LeaderboardItem(props: any) {

    let navigate = useNavigate();

    const leaderboardItem = {
        width: '80%',
        backgroundColor: '#f5f4f2',
        borderRadius: 8,
        height: 50,
        margin: 'auto',
        marginTop: 15,
        alignItems: 'space-between',
        padding: 5,


    }

    const img = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginLeft: '-13%',
    }

    const onstatus = props.status;
    let status;

    if (onstatus && onstatus === "online") {
        status = (
            <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill"></i>
        );
    } else if (onstatus === "offline") {
        status = (
            <i style={{ fontSize: 8, color: 'red' }} className="bi bi-circle-fill"></i>
        );
    } else {
        status = (
            <i style={{ fontSize: 8, color: 'grey' }} className="bi bi-circle-fill"></i>
        );
    }

    const handleInvite = () => {
        console.log("Invite");
        socket.emit('notification', { type: 2, idIntra: props.intra });
        navigate('/games/1' + props.intra);
        // window.location.assign("/games/1" + props.idIntra);
    };

    return (
        <>
            <div className='d-flex justify-content-evenly align-items-center' style={leaderboardItem}>
                <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${props.intra}`} underline="none" color="inherit" sx={{ display: "contents" }}>
                    <label style={{ marginRight: '34px' }}>{props.index + 1}</label>
                    <img src={props.image} style={img} />
                    <label>{props.nickname}</label>
                    <label>{props.win}</label>
                    <label>{props.score}</label>
                    <label>{status} {props.status}</label>
                </Link>
                {props.status === "online" ? <SportsEsportsOutlinedIcon onClick={handleInvite} fontSize="large" /> : props.status === "in game" ? <RemoveRedEyeIcon fontSize="large" onClick={() => window.location.assign("/games/" + props.intra)}/> : <DesktopAccessDisabledIcon fontSize="large" />}
                
            </div>
        </>
    )
}
