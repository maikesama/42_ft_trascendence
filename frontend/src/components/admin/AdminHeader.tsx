import "../css/Header.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export function AdminHeader(props:any){
    
    const adminItem = {
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
    }



    return(
        <>
            <div className='d-flex justify-content-evenly align-items-end' style={adminItem}>
            <label style={{marginRight:20}}>{props.elem1}</label>
            <label>{props.elem2}</label>
            <label>{props.elem3}</label>
            <label>{props.elem4}</label>
            <label>{props.elem5}</label>
        </div>
        </>
    )
}