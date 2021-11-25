import './Filebox.css'
import "react-pro-sidebar/dist/css/styles.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Fileupload from "../fileupload/Fileupload"
import axios from "axios";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaList } from "react-icons/fa";
import { FiLogOut, FiUpload, FiDownload } from "react-icons/fi";
import { BiCog } from "react-icons/bi";

const Filebox = (props) => {
    axios.defaults.baseURL = "http://localhost:8080";

    const userID = props.location.state.userID;
    const password = props.location.state.password;
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState([]);

    const getFiles = async () => {
      axios.get("/file/user/" + userID,
      {headers : {
        password: password,
      }}).then((response) => {
        if (response.data !== "") {
          setFiles(response.data);
        }
      });
    };
    
    var fileDownload = require('js-file-download');
    const downloadFile = async (fileID,password,filename) => {
        axios.get("file/download/" + fileID,{responseType: 'arraybuffer', headers: {
          password: password,
        }}).then((response) => {fileDownload(response.data, filename)})  
    }
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };

    return (
        <div id="header">
          {isOpen && (
            <Fileupload
              userID = {userID}
              password = {password}
              closeUpload = {togglePopup}
            />
          )}
          <ProSidebar>
            <SidebarHeader>
            <div className="logotext">
                <p>{"MiraiEx filebox"}</p>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem icon={<FaList />}
                onClick={() => {
                  if(isOpen){
                    togglePopup();
                  }
                  getFiles();
                }}>Filelist</MenuItem>
                <MenuItem icon={<FiUpload />}onClick={() => {
                  setFiles([]);
                  togglePopup();
                }}>Upload Files</MenuItem>
                <MenuItem icon={<BiCog />}>test</MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem 
                icon={<FiLogOut />} 
                onClick={() => {
                    props.history.push("/");     
          }} >Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
          <div className="rest">
            {!isOpen && files.map((file) =>(
              <li className = "fileline">
                <h4>
                    {file.fileName}
                </h4>
            <p>{file.uploadedDate}</p>
            <Button onClick={() => {
                downloadFile(file.fileID,password,file.fileName);
                }}> Download </Button>
              </li>
            ))}
          </div>
        </div>
    );
};

export default Filebox;
