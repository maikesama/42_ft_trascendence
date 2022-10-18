import { upload } from "@testing-library/user-event/dist/upload";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

export function Test() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
    uploadCristo(imageList);
  };

  const uploadCristo = async (imageList: ImageListType) => {
    const formData:any = new FormData();
    try {
    formData.append("image", imageList[0].file);
    const response = await fetch("http://10.11.10.4:3333/user/update/pp", {
      method: "POST",
      body: formData,
    });
    } catch (error) {
      console.log("error", error);
    }
  };  
    
    


  return (
    <div className="App">
      <ImageUploading
        
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
