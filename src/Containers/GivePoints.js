import React from "react";
import { Container, Col, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "../App.css";

class GivePoints extends React.Component {
  state = {
    allStd: [],
    selStd: ``,
    givePoints: ``,
    category: ``
  };

  handleSelUser = e => {
    console.log(e.target.value);
    this.setState({
      selStd: e.target.value
    });
  };

  handleScore = e => {
    this.setState({
      givePoints: e.target.value
    });
  };

  handleCategory = e => {
    console.log(e.target.value);
    this.setState({
      category: e.target.value
    });
  };

  handleSubmitButton = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/students/givepoints", {
        selStd: this.state.selStd,
        givePoints: this.state.givePoints,
        category: this.state.category
      })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          alert("Score has been successfully updated");
          return (window.location = "/givepoints");
        } else {
          alert("Something went wrong, refresh and try again");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/v1/students/getall")
      .then(res => {
        this.setState({
          allStd: res.data.students
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let { selStd, givePoints, category } = this.state;

    return (
      <Container className="Signup">
        <Col lg={6} className="Signup-header">
          <h1 style={{ paddingTop: 100, paddingBottom: 30 }}>Give Points</h1>
          <h5 style={{ paddingBottom: 30 }}>
            Who would you like to give extra score to ?
          </h5>
          <Form className="form">
            <FormGroup>
              <Label for="selStd">Select a student</Label>
              <Input
                onChange={this.handleSelUser}
                type="select"
                value={selStd}
                name="selStd"
                id="selStd"
              >
                <option selected>- Select one -</option>
                {this.state.allStd.map((eachStd, index) => (
                  <option key={index}>{eachStd}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="givePoints">Score Awarded</Label>
              <Input
                onChange={this.handleScore}
                type="text"
                value={givePoints}
                name="givePoints"
                id="givePoints"
                placeholder="Score given"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                onChange={this.handleCategory}
                type="select"
                value={category}
                name="category"
                id="category"
              >
                <option selected>- Select one -</option>
                <option value="creativity_score">Creativity</option>
                <option value="leadership_score">Leadership</option>
                <option value="respect_score">Respect</option>
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
      </Container>
    );
  }
}

export default GivePoints;
