import "../css/Header.css"

import 'bootstrap/dist/css/bootstrap.min.css';

export function AdminItem(props:any) {
    
    const adminItem = {
        width: '80%',
        backgroundColor: '#f5f4f2',
        borderRadius: 8,
        height: 50,
        margin: 'auto',
        marginTop: 15,
        alignItems: 'space-between',
        padding: 5,
        color: 'black'

    }

    const img = {
        width: '40px',
        borderRadius: '50%',
        right: '2%',
    }
    
    const onstatus = props.status;
    let status;

    if (onstatus && onstatus === "online") {
        status = (
        <i style={{fontSize: 8, color: 'green'}} className="bi bi-circle-fill"></i>
      );
    } else if (onstatus === "offline") {
        status = (
        <i style={{fontSize: 8, color: 'red'}} className="bi bi-circle-fill"></i>
      );
    } else {
        status = (
        <i style={{fontSize: 8, color: 'grey'}} className="bi bi-circle-fill"></i>
        );
    }
      

	return(
    <>
        <div className='d-flex justify-content-evenly align-items-center' style={adminItem}>
            <label>{props.id}</label>
            <label>{props.nickname}</label>
            <label>{props.banned}</label>
            <label>{props.admin}</label>
            <label>{status} {props.status}</label>
        </div>
    </>
	)
}