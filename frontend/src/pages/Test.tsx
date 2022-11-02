import React, {useState, useEffect} from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
console.log(process.env.HOST4444)
export function Test() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

    const uploadImage = async (imageList: ImageListType) => {
      console.log(JSON.stringify(imageList[0].dataURL))
      try {
        const response = await fetch('http://localhost:3333/user/update/pp', {
          method: "POST",
          credentials: 'include',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({dataURL: imageList[0].dataURL}),
      });
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    


  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList as never[]);
    uploadImage(imageList)
  };

  // const uploadCristo = async () => {
  //   let x = JSON.stringify(imageList[0].dataURL);
  //   console.log(x)
  //   try {
  //   const response = await fetch("", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
      
  //   });
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };  
    
  

  console.log(process.env.REACT_APP_HOST4444)
  console.log(process.env.REACT_APP_HOST4444)
  return (
    
      <ImageUploading value={images} onChange={onChange}>
      {({
          onImageUpload,
        }) => (
          // write your building UI
            <button onClick={onImageUpload}>Click or Drop here</button>
        )}
      </ImageUploading>
  );
}
