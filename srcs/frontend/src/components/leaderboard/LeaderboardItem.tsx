import '../css/Navbar.css';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import { socket } from "../../App";
import { useNavigate } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useAuth } from '../../hooks/useAuth';

export function LeaderboardItem(props: any) {
    const { idIntra } = useAuth();
    let navigate = useNavigate();

    const leaderboardItem = {
        width: '60%',
        backgroundColor: '#f5f4f2',
        borderRadius: 8,
        height: 50,
        margin: 'auto',
        marginTop: 15,
        alignItems: 'space-between',
        padding: 5,
    }

    const leaderboardItemCliccable = {
        cursor: 'pointer',
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
        
        socket.emit('notification', { type: 2, idIntra: props.intra });
        navigate('/games/1' + props.intra);
        // window.location.assign("/games/1" + props.idIntra);
    };

    return (
        <>
            <div className='d-flex justify-content-evenly align-items-center' style={leaderboardItem}>
                <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${props.intra}`} underline="none" color="inherit" sx={{ display: "contents" }}>
                    <label style={{width: '6%'}}>
                        <span style={{width: '100%', float: 'left', textAlign: 'right'}}>
                            <span style={leaderboardItemCliccable}>{props.index + 1}</span>
                        </span>
                    </label>
                        <span style={{width: '8%', textAlign: 'left'}}>
                            <img src={props.image} style={img} />
                        </span>
                    <label  style={{width: '20%'}}><span style={leaderboardItemCliccable}>{props.nickname}</span></label>
                    <label  style={{width: '15%'}}><span style={leaderboardItemCliccable}>{props.win}</span></label>
                    <label  style={{width: '15%'}}><span style={leaderboardItemCliccable}>{props.score}</span></label>
                    <label  style={{width: '15%'}}>
                        <span style={{width: '40%', float: 'left', paddingRight: '0.5rem', textAlign: 'right'}}>
                            <span style={leaderboardItemCliccable}>{status}</span>
                        </span>
                        <span style={{width: '60%',  float: 'left', textAlign: 'left'}}>
                            <span style={leaderboardItemCliccable}>{props.status}</span>
                        </span>
                    </label>
                </Link>
                {props.status === "online" && props.intra !== idIntra ? <SportsEsportsOutlinedIcon onClick={handleInvite} fontSize="large" style={{cursor: 'pointer'}} /> : props.status === "in game" ? <RemoveRedEyeIcon fontSize="large"  style={{cursor: 'pointer'}} onClick={() => window.location.assign("/games/" + props.intra)} /> : <SportsEsportsOutlinedIcon style={{color: 'grey'}} fontSize="large"  />}

            </div>
        </>
    )
}
