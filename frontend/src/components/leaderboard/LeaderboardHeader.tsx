import '../css/Navbar.css';

export function LeaderboardHeader(props:any) {

    const leaderboardItem = {
        width: '60%',
        color: 'white',
        borderRadius: 8,
        height: 50,
        margin: 'auto',
        marginTop: 25,
        marginBottom: -15,
        alignItems: 'space-between',
        padding: 5,
        fontWeight: 'bold'

    }

    const img = {
        width: '40px',
        borderRadius: '50%',
        marginLeft: '-12%',
    }

	return(
    <>
        <div className='d-flex justify-content-evenly align-items-end' style={leaderboardItem}>
            <label style={{marginRight: '2%', width: '15%'}}>{props.id}</label>
            <label style={{width: '20%'}}>{props.nickname}</label>
            <label style={{width: '15%'}}>{props.win}</label>
            <label style={{width: '15%'}}>{props.score}</label>
            <label style={{width: '15%'}}>{props.status}</label>
            <label>Invite</label>
        </div>

    </>
	)
}
