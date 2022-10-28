import "../css/Header.css"

import 'bootstrap/dist/css/bootstrap.min.css';

export function FriendsHeader(props:any){
    
    const friendsItem = {
        width: '80%',
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
            <div className='d-flex justify-content-evenly align-items-end' style={friendsItem}>
            <label style={{marginRight:20}}>{props.id}</label>
            
            <label>{props.nickname}</label>
            <label>{props.username}</label>
            <label>{props.score}</label>
            <label>{props.status}</label>
        </div>
        </>
    )
}