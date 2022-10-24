import React, { useState, useEffect, useRef } from 'react';
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import './css/Homepage.css';
import { upload } from "@testing-library/user-event/dist/upload";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Typography from '@mui/material/Typography';



export const Middleware = () => {

    async function logFunction(evt: any) {
        evt.preventDefault();

        window.location.replace(`http://10.11.11.3:3000/home`)
    }

    const [user, setUser] = useState({} as any);

    useEffect(() => {
        const url = "http://10.11.11.3:3333/user/me";

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const json = await response.json();
                console.log(json);
                setUser(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    const nick = useRef<any>('');
    const img = useRef<any>();
    const [images, setImages] = React.useState([]);

    //const [user, setUser] = useState({} as any);

    const clickSave = async () => {
        //return console.log(nick.current.value)

        let url = "http://10.11.11.3:3333/user/update/username";


        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: nick.current.value })
            }).then((response) => {
                if (response.status === 400) {
                    alert("Username already exists");
                    document.location.reload();
                }
                else if (response.status === 201) {
                    document.location.reload();
                }
            });
            // const json = await response.json();
            // // console.log(json);
            // // setUser(json);
            // if (json && json.status === 400) {
            //     console.log(json.message);
            
        } catch (error) {
            console.log("error", error);
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
        console.log(JSON.stringify(imageList[0].dataURL))
        try {
            const response = await fetch('http://10.11.11.3:3333/user/update/pp', {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dataURL: imageList[0].dataURL }),
            });
            const json = await response.json();
            //console.log(json);
        } catch (error) {
            console.log("error", error);
        }
        window.location.reload()
    };

    function handleNick() {
        const inputbox = document.getElementById('txtNick');
        inputbox?.removeAttribute('disabled')
        inputbox?.setAttribute('placeholder', 'Inserisci Nickname');
    }

    return (
        <>
            <section className="vh-100" id="back" style={{ backgroundColor: '#282c34' }}>
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
            </section>
        </>
    );
}