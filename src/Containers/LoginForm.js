import React from "react";
import { Container, Col, Form, FormGroup, Label, Input } from "reactstrap";

import axios from "axios";

class LoginForm extends React.Component {
  state = {
    id_number: ``,
    password: ``
  };

  handleIdNumber = e => {
    console.log(e.target.value);
    this.setState({
      id_number: e.target.value
    });
  };

  handlePassword = e => {
    console.log(e.target.value);
    this.setState({
      password: e.target.value
    });
  };

  handleLoginButton = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/students/login", {
        id_number: this.state.id_number,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          localStorage.setItem("authToken", res.data.authToken);
          localStorage.setItem("id_number", res.data.id_number);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("isStudent", JSON.stringify(res.data.isStudent));
          alert("logged in successfully. welcome back " + res.data.full_name);
          return (window.location = "/homepage");
        } else {
          alert("User does not exist, check the id or password");
          this.setState({
            id_number: ``,
            password: ``
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let { id_number, password } = this.state;

    return (
      <Container className="Login">
        <Col lg={6} className="Login-header">
          <h1 style={{ paddingTop: 100, paddingBottom: 30 }}>Log In</h1>
          <Form className="Login-form">
            <FormGroup>
              <Label for="id_number">ID Number</Label>
              <Input
                type="text"
                id="id_number"
                placeholder="Student ID"
                value={id_number}
                onChange={this.handleIdNumber}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Don't tell anyone....."
                value={password}
                onChange={this.handlePassword}
              />
            </FormGroup>
            <input
              type="submit"
              placeholder="Submit"
              onClick={this.handleLoginButton}
            />
          </Form>
        </Col>
      </Container>
    );
  }
}

export default LoginForm;
