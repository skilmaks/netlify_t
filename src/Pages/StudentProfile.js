import React from "react";
import { Container, Col, Row, Button, Image, Nav } from "react-bootstrap";
import "../styles/StudentProfile.css";
import axios from "axios";

import profileImg from "../assets/profile_jw_small.png";
import PointsWeekly from "../Containers/PointsWeekly";
import ScoreboardStd from "../Containers/ScoreboardStd";
import MyProgress from "../Containers/ProgressCard";

class StudentProfile extends React.Component {
  state = {
    graph: "Own",
    id_number: ``,
    full_name: ``,
    accumulated_score: ``,
    favourites: [],
    favActs: [],
    ranking: []
  };

  toggleView = e => {
    this.setState({ graph: e.target.name });
  };

  componentDidMount() {
    let id = localStorage.getItem("id")
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
      .get(`http://localhost:5000/api/v1/calendar/clubs/${id}`)
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
      .get(`http://localhost:5000/api/v1/calendar/activities/${id}`)
      .then(response => {
        console.log(response)
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
      .get("http://localhost:5000/api/v1/students/scoreboard")
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
    const {
      graph,
      id_number,
      full_name,
      accumulated_score,
      ranking
    } = this.state;
    let display_points;

    if (graph === "Own") {
      display_points = (
        <PointsWeekly
          creativity_score={this.state.creativity_score}
          leadership_score={this.state.leadership_score}
          respect_score={this.state.respect_score}
          accumulated_score={this.state.accumulated_score}
        />
      );
    } else if (graph === "yearly") {
      display_points = <ScoreboardStd ranking={this.state.ranking} />;
    }
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
                <p>Year 9</p>
              </div>
              {/* Nav to display Points or Progress component */}
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link className="Sidebar-link">
                  “Ask not what your country can do for you – ask what you can
                  do for your country”
                </Nav.Link>
              </Nav>
            </Col>
            <Col className="Dashboard-charts" lg={10} md={10} sm={12}>
              <div className="Dashboard-charts-header">
                <p className="Dashboard-charts-header-li">
                  <strong>Hello, {full_name}. Welcome to your dashboard</strong>
                </p>
                <p className="Dashboard-charts-header-li">
                  <strong>Total Points: {accumulated_score}</strong>
                </p>
              </div>

              <Row>
                <Col className="Dashboard-points">
                  {" "}
                  <div className="Wrapper">
                    <div className="Wrapper-header">
                      {" "}
                      <h3 className="Dashboard-points-header">My Points</h3>
                    </div>

                    {/* Nav to toggle between Own and yearly */}
                    <div className="Wrapper-btn">
                      <Button
                        className="Dashboard-points-button"
                        variant="warning"
                        name="Own"
                        onClick={e => this.toggleView(e)}
                      >
                        Own
                      </Button>
                      <Button
                        className="Dashboard-points-button"
                        variant="warning"
                        name="yearly"
                        onClick={e => this.toggleView(e)}
                      >
                        Top5
                      </Button>
                    </div>
                  </div>
                  {display_points}
                </Col>
              </Row>
              <Row>
                <Col className="Dashboard-progress">
                  {" "}
                  <h3 className="Dashboard-progress-header">My Progress</h3>
                  {/* render progress for clubs */}
                  <hr style={{'border-top': '2px solid rgba(0,0,0,.1)'}}></hr>
                  <h4 style={{color: '#362ca9'}}>Clubs</h4>
                  {this.state.favourites.map(favourite => (
                    <MyProgress
                      key={favourite.id}
                      fave={favourite}
                      accumulated_score={accumulated_score}
                    />
                  ))}
                  {/* render progress for activities */}
                  <hr style={{'border-top': '2px solid rgba(0,0,0,.1)'}}></hr>
                  <h4 style={{color: '#362ca9'}}>Activities</h4>
                  {this.state.favActs.map(favAct => (
                    <MyProgress
                      key={favAct.id}
                      fave={favAct}
                      accumulated_score={accumulated_score}
                    />
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default StudentProfile;
