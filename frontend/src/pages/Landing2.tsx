import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import './css/Homepage.css';

export const Landing2 = () => {

	async function logFunction(evt: any) {
		evt.preventDefault();

		window.location.replace(`http://10.11.10.4:3000/home`)
	}

	return (
		<>
			<section className="vh-100" id="back" style={{backgroundColor: '#282c34'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{borderRadius: '1rem',}}>
                    <div className="row g-0">
                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <Avatar src="https://cdn.intra.42.fr/users/lricci.jpeg"
                            alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem', objectFit: 'cover', width: '100%', height: '100%'}} />
                        </div>
                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">
                            <form>
                            <div className="align-items-center mb-3 pb-1" style={{marginBottom: 0}}>
                                <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                                <span className="h1 fw-bold mb-0 center">Hello User!</span>
                            </div>
                            <h5 className="align-items-center fw-normal mb-1 pb-1" style={{letterSpacing: '1px', margin: '0'}}>Choose your nickname:</h5>
                            <TextField id="outlined-basic" label="Default ID: IntraID" variant="outlined"/>
                            <div className="pt-1 mb-4">
                                <button className="btn btn-dark btn-lg btn-block" style={{marginTop: '10px', backgroundColor: '#1976d2', border: '2px solid #1976d2', marginRight: '2px'}} onClick={logFunction}>Save</button>
                                <button className="btn btn-dark btn-lg btn-block" style={{marginTop: '10px', backgroundColor: 'transparent', border: '2px solid #1976d2', color: '#1976d2', marginLeft: '2px'}}>Skip</button>
                            </div>
                            </form>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
		</>
	);
}