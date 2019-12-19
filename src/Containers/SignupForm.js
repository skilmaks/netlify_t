import React from "react";
import { Container, Col, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "../App.css";

class SignupForm extends React.Component {
  state = {
    id_number: ``,
    full_name: ``,
    password: ``,
    confirm_password: ``,
    redirect: false,
    user_group: ``
  };

  handleId = e => {
    this.setState({
      id_number: e.target.value
    });
  };

  handleFullname = e => {
    this.setState({
      full_name: e.target.value
    });
  };

  handlePass = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleConfPass = e => {
    this.setState({
      confirm_password: e.target.value
    });
  };

  handleUserGroup = e => {
    this.setState({
      user_group: e.target.value
    });
  };



  handleSubmitButton = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/students/signup", {
        id_number: this.state.id_number,
        full_name: this.state.full_name,
        password: this.state.password,
        confirm_password: this.state.confirm_password,
        user_group: this.state.user_group
      })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          // create token for persistent login
          localStorage.setItem("authToken", res.data.auth_token);
          if (this.state.user_group === "Student") {
            alert("Student successfuly enrolled!");
          } else {
            alert("Teacher successfully enrolled!")
          }
          return (window.location = "/homepage");
        } else {
          alert("Given student_id already exist! please change the student_id");
          this.setState({
            id_number: ``,
            full_name: ``,
            password: ``,
            confirm_password: ``,
            user_group: ``
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let { id_number, full_name, password, confirm_password, user_group } = this.state;

    return (
      <Container className="Signup">
        <Col lg={6} className="Signup-header">
          <h1 style={{ paddingTop: 100, paddingBottom: 30, }}>Sign Up</h1>
          <Form className="form">
            <FormGroup>
              <Label for="id_number">ID Number</Label>
              <Input
                type="text"
                name="id_number"
                id="id_number"
                placeholder="Integer number only"
                value={id_number}
                onChange={this.handleId}
              />
            </FormGroup>
            <FormGroup>
              <Label for="full_name">Full Name</Label>
              <Input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="John Lewis"
                value={full_name}
                onChange={this.handleFullname}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={this.handlePass}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirm_password">Confirm Password</Label>
              <Input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="********"
                value={confirm_password}
                onChange={this.handleConfPass}
              />
            </FormGroup>
            <FormGroup>
              <Label for="user_group">Select</Label>
              <Input
                onChange={this.handleUserGroup}
                type="select"
                value={user_group}
                name="user_group"
                id="user_group"
                placeholder="Role"
              >
                <option selected>Select one</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </Input>
            </FormGroup>


            <br />
            <input
              type="submit"
              placeholder="Submit"
              onClick={this.handleSubmitButton}
            />
          </Form>
        </Col>
      </Container >
    );
  }
}

export default SignupForm;
