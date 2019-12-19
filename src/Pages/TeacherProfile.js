import React from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Image,
  Card,
  ListGroup,
  Nav,
  ProgressBar
} from "react-bootstrap";
import "../styles/StudentProfile.css";
import axios from "axios";

import profileImg from "../assets/images/dumbledore.jpeg";
import ScoreboardTch from "../Containers/ScoreboardTch";

class TeacherProfile extends React.Component {
  state = {
    graph: "weekly",
    id_number: ``,
    full_name: ``,
    accumulated_score: ``,
    favourites: [],
    favActs: [],
    ranking: []
  };

  componentDidMount() {
    axios
      .post("http://localhost:5000/api/v1/students/users/me", {
        id_number: localStorage.getItem("id_number")
      })
      .then(res => {
        console.log(res.data);
        if (res.data.isStudent) {
          this.setState({
            id_number: res.data.id_number,
            full_name: res.data.full_name,
            creativity_score: res.data.creativity_score,
            leadership_score: res.data.leadership_score,
            respect_score: res.data.respect_score,
            accumulated_score: res.data.accumulated_score
          });
        } else {
          this.setState({
            id_number: res.data.id_number,
            full_name: res.data.full_name
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/api/v1/calendar/clubs")
      .then(response => {
        let newFave = response.data.filter(favourite => {
          return favourite.fav;
        });
        this.setState({
          favourites: newFave
        });
        console.log(this.state.favourites);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/api/v1/calendar/activities")
      .then(response => {
        let newActs = response.data.filter(favourite => {
          return favourite.fav;
        });
        this.setState({
          favActs: newActs
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/api/v1/students/scoreboard/all")
      .then(res => {
        console.log(res.data.ranking);
        this.setState({
          ranking: res.data.ranking
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { graph, id_number, full_name, accumulated_score } = this.state;
    let display_points;

    display_points = <ScoreboardTch ranking={this.state.ranking} />;

    console.log(this.state.favourites);
    console.log(this.state.favActs);
    return (
      <>
        <Container className="Dashboard-container">
          <Row className="Dashboard-row">
            <Col className="Dashboard-sidebar" lg={2} md={2} sm={12}>
              <Image
                className="Dashboard-sidebar-img"
                src={profileImg}
                roundedCircle
                alt="profile pic"
              />
              <div className="Dashboard-sidebar-info">
                <p>
                  <strong>{full_name}</strong>
                </p>
                <p>Head Master</p>
              </div>
              {/* Nav to display Points or Progress component */}
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link className="Sidebar-link">
                  “Why do i wear sunglasses ? because my students future are so
                  bright ha ha ha”
                </Nav.Link>
              </Nav>
            </Col>
            <Col className="Dashboard-charts" lg={10} md={10} sm={12}>
              <div className="Dashboard-charts-header">
                <p className="Dashboard-charts-header-li">
                  <strong>Hello, {full_name}. Welcome to your dashboard</strong>
                </p>
              </div>

              <Row>
                <Col className="Dashboard-points">
                  {" "}
                  <div className="Wrapper">
                    <div className="Wrapper-header">
                      {" "}
                      <h3 className="Dashboard-points-header w-100">
                        Student Dashboard
                      </h3>
                      <p className="Dashboard-points-header w-100">
                        Reach out to the student when their Dropout rate higher
                        than 50%
                      </p>
                    </div>
                  </div>
                  {display_points}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default TeacherProfile;
