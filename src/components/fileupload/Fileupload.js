import React, { useState } from "react";
import ReactDom from "react-dom";
import "./Fileupload.css";
import axios from "axios";
import Button from "react-bootstrap/Button";



const Fileupload = ({
  userID,
  password,
  closeUpload
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);
    const url = "http://localhost:8080/file/save";
    
    const uploadFile = async (url, file) =>{
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
        axios.post(url, formData,{headers: {
            userID: userID,
            password: password
          }}).then((response) => {
            if(response.status === 200){
              alert("Upload was successful");
            }
        })
        .catch((err) => {
          if(err.response && err.response.data){
            alert("Upload failed due to the following:\n" + err.response.data.message);
          }
        });
    }
    
    const changeHandler = (e) => {
		  setSelectedFile(e.target.files[0]);
	  	setIsFilePicked(true);
    };

    const removeHandler = (e) => {
      setSelectedFile(null);
      setIsFilePicked(false);
    };
    
    const uploadHandler = async () => {
        uploadFile(url, selectedFile);
        closeUpload();
	};
    
  return ReactDom.createPortal(
    <>
      <div className="popup-box">
        <div className="box">
          <span
            className="close-icon"
            onClick={() => {
              setSelectedFile(null);
              closeUpload();
            }}
          >
            x
          </span>
          <form>
            <label>
              File:  
              <input
                type="file"
                onChange={changeHandler}
              />
            </label>
            {isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
                
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
            <Button variant = "cancel"
                    onClick={removeHandler}
                    disabled={!isFilePicked}
                    
            > Remove file </Button>
            <Button
                    onClick={uploadHandler}
                    disabled={!isFilePicked}
            > Upload </Button>
            
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Fileupload;
