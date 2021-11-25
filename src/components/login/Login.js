
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";


const Login = (props) => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  return (
      <div className="Login">
        <Form>
          <Form.Group size="lg" controlId="userID">
            <Form.Label>UserID</Form.Label>
            <Form.Control
              autoFocus
              type="userID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label >Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" onClick={() => {
            props.history.push({
              pathname:"/Filebox/user/" + userID,
              state:{
                userID : userID,
                password : password
              }
            });
          }}>
            Login
          </Button>
        </Form>
      </div>
  );
};

export default Login;