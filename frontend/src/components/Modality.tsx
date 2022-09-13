import "./css/Modality.css"

export const Modality = (props:any) => {

    return (
        <div style={{paddingLeft:'15%', paddingRight:'15%'}}>
            <a href={props.page}>
                <div className="modality">
                    <h3>{props.name}</h3>
                </div>
            </a>
        </div>
    );
}