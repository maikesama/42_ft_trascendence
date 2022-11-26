import React, { useState, useEffect, useRef } from 'react';
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import './css/Homepage.css';
import ImageUploading, { ImageListType } from "react-images-uploading";
import Typography from '@mui/material/Typography';
import { Alert, manageError } from '../components/generic/Alert';



export const Middleware = () => {

    async function logFunction(evt: any) {
        evt.preventDefault();

        window.location.replace(`http://${process.env.REACT_APP_HOST_URI}/home`)
    }

    const [user, setUser] = useState({} as any);

    useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/me`;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const json = await response.json();

                setUser(json);
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    const nick = useRef<any>('');
    const img = useRef<any>();
    const [images, setImages] = React.useState([]);
    const [alert, setAlert] = React.useState("");

    //const [user, setUser] = useState({} as any);

    const clickSave = async () => {


        let url = `http://${process.env.REACT_APP_HOST_URI}/api/user/update/username`;


        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: nick.current.value })
            })
            const data = await response.json();
            manageError(data, response, null, setAlert)
            // const json = await response.json();

            // // setUser(json);
            // if (json && json.status === 400) {


        } catch (error) {

        }
    }

    const onChange = (
        imageList: ImageListType,
    ) => {
        // data for submit
        setImages(imageList as never[]);
        uploadImage(imageList)
    };

    const uploadImage = async (imageList: ImageListType) => {

        try {
            const response = await fetch(`http://${process.env.REACT_APP_HOST_URI}/api/user/update/pp`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dataURL: imageList[0].dataURL }),
            });
            const json = await response.json();

        } catch (error) {

        }
        window.location.reload()
    };

    function handleNick() {
        const inputbox = document.getElementById('txtNick');
        inputbox?.removeAttribute('disabled')
        inputbox?.setAttribute('placeholder', 'Inserisci Username');
    }

    return (
        <>
        <section className="vh-100" id="back" style={{ backgroundColor: '#282c34' }}>
            <div className="container" style={{paddingTop: 300}}>
                <div className="row d-flex justify-content-center align-items-center h-100"  style={{backgroundColor: 'white', borderRadius: 20}}>
                    <div style={{ color: 'white', padding: 0}} className="col-12 col-md-6">
                    <ImageUploading value={images}  onChange={onChange}>
                            {({
                                onImageUpload,
                            }) => (
                                // write your building UI
                                <button onClick={onImageUpload} style={{ padding: 0, margin: 0, border: 'none', backgroundColor: 'transparent' }}>
                                    <img src={user.img} width="100%" height="100%" style={{borderRadius: '20px 0px 0px 20px', maxWidth: 700, maxHeight: 700}} alt="" />
                                </button>
                            )}
                        </ImageUploading>
                    </div>
                    <div style={{ color: 'white' }} className="col-12 col-md-6">
                        <div className="card-body p-4 p-lg-5 text-black">
                            <form>
                                <div className="align-items-center mb-3 pb-1" style={{ marginBottom: 0 }}>
                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                    <span className="h1 fw-bold mb-0 center">Hello {user.idIntra}!</span>
                                </div>
                                <h5 className="align-items-center fw-normal mb-1 pb-1" style={{ letterSpacing: '1px', margin: '0' }}>Choose your username:</h5>
                                <TextField label={user.userName} inputRef={nick} id="txtNick" variant="outlined" onBlur={clickSave} />
                                <div className="pt-1 mb-4">
                                    <button className="btn btn-dark btn-lg btn-block" style={{ marginTop: '10px', backgroundColor: '#1976d2', border: '2px solid #1976d2', marginRight: '2px' }} onClick={logFunction}>Next</button>
                                    <button className="btn btn-dark btn-lg btn-block" style={{ marginTop: '10px', backgroundColor: 'transparent', border: '2px solid #1976d2', color: '#1976d2', marginLeft: '2px' }} onClick={logFunction}>Skip</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            </section>
            <Alert status={alert !== "" ? true : false} closeStatus={() => setAlert("")} error={alert} />
        </>
    );
}


//container -> h-100
//row -> d-flex justify-content-center align-items-center h-100


{/* <section className="vh-100" id="back" style={{ backgroundColor: '#282c34' }}>
            <div className="container " >
                <div className="row"  style={{backgroundColor: 'white', borderRadius: 20}}>
                    <div style={{ color: 'white', padding: 0}} className="col-12 col-md-6">
                    <ImageUploading value={images}  onChange={onChange}>
                            {({
                                onImageUpload,
                            }) => (
                                // write your building UI
                                <button onClick={onImageUpload} style={{ padding: 0, margin: 0, border: 'none', backgroundColor: 'transparent' }}>
                                    <img src={user.img} width="100%" height="100%" style={{borderRadius: '20px 0px 0px 20px'}} alt="" />
                                </button>
                            )}
                        </ImageUploading>
                    </div>
                    <div style={{ color: 'white' }} className="col-12 col-md-6">
                        <div className="card-body p-4 p-lg-5 text-black">
                            <form>
                                <div className="align-items-center mb-3 pb-1" style={{ marginBottom: 0 }}>
                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                    <span className="h1 fw-bold mb-0 center">Hello {user.idIntra}!</span>
                                </div>
                                <h5 className="align-items-center fw-normal mb-1 pb-1" style={{ letterSpacing: '1px', margin: '0' }}>Choose your nickname:</h5>
                                <TextField label={user.userName} inputRef={nick} id="txtNick" variant="outlined" onBlur={clickSave} />
                                <div className="pt-1 mb-4">
                                    <button className="btn btn-dark btn-lg btn-block" style={{ marginTop: '10px', backgroundColor: '#1976d2', border: '2px solid #1976d2', marginRight: '2px' }} onClick={logFunction}>Next</button>
                                    <button className="btn btn-dark btn-lg btn-block" style={{ marginTop: '10px', backgroundColor: 'transparent', border: '2px solid #1976d2', color: '#1976d2', marginLeft: '2px' }} onClick={logFunction}>Skip</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            </section> */}

{/* <section className="vh-100" id="back" style={{ backgroundColor: '#282c34' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem', }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">

                                        <Typography className="UploadImageTxt">Upload Image</Typography>
                                        <ImageUploading value={images} onChange={onChange}>
                                            {({
                                                onImageUpload,
                                            }) => (
                                                // write your building UI
                                                <button onClick={onImageUpload} style={{padding: 0, border: 'none', backgroundColor: 'transparent'}}>
                                                <Avatar src={user.img}
                                                    alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem', objectFit: 'cover', width: '100%', height: '100%' }} />
                                                </button>
                                            )}
                                        </ImageUploading>
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="align-items-center mb-3 pb-1" style={{ marginBottom: 0 }}>
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                    <span className="h1 fw-bold mb-0 center">Hello {user.idIntra}!</span>
                                                </div>
                                                <h5 className="align-items-center fw-normal mb-1 pb-1" style={{ letterSpacing: '1px', margin: '0' }}>Choose your nickname:</h5>
                                                <TextField label={user.userName} inputRef={nick} id="txtNick" variant="outlined" onBlur={clickSave}/>
                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" style={{ marginTop: '10px', backgroundColor: '#1976d2', border: '2px solid #1976d2', marginRight: '2px' }} onClick={logFunction}>Next</button>
                                                    <button className="btn btn-dark btn-lg btn-block" style={{ marginTop: '10px', backgroundColor: 'transparent', border: '2px solid #1976d2', color: '#1976d2', marginLeft: '2px' }} onClick={logFunction}>Skip</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
