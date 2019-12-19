import React from "react";
import axios from "axios";
import "../styles/HomePage.css";

import { Button, Carousel, Card, Row, Col, CarouselItem, Container } from 'react-bootstrap';

class HomePage extends React.Component {
  state = {
    clubs: [],
    activities: [],
    isLoadingClub: true,
    isLoadingAct: true,
    student_id: localStorage.getItem("id"),
    fullname: ""
  };

  handleClick = (category_id, student_id, category, index) => {
    axios
      .post(`http://localhost:5000/api/v1/calendar/${category}/favourite`, {
        student_id: student_id,
        category_id: category_id
      })
      .then(response => {
        let copy = [...this.state[category]]
        copy[index].fav = !copy[index].fav

        this.setState({
          [category]: [...copy]
        });

      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    let id = localStorage.getItem("id")
    this.setState({
      student_id: localStorage.getItem("id")
    })
    axios
      .get(`http://localhost:5000/api/v1/calendar/clubs/${id}`)
      .then(response => {
        this.setState({
          clubs: response.data,
          isLoadingClub: false
        });
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/api/v1/calendar/activities/${id}`)
      .then(response => {
        // console.log(response);
        this.setState({
          activities: response.data,
          isLoadingAct: false
        });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let { clubs, activities, full_name } = this.state;
    let isStudent = localStorage.getItem("isStudent")
    const fullHeart = "\u2665";
    const hollowHeart = "\u2661";
    let clubsMatrix = [];
    for (let i = 0; i < Math.ceil(clubs.length / 3); i++) {
      let newArr = [];
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        if (index < clubs.length) {
          newArr.push(clubs[index]);
        }
      }
      clubsMatrix.push(newArr);
    }

    let activitiesMatrix = [];
    for (let i = 0; i < Math.ceil(activities.length / 3); i++) {
      let newArr = [];
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        if (index < activities.length) {
          newArr.push(activities[index]);
        }
      }
      activitiesMatrix.push(newArr);
    }
    if (this.state.isLoadingClub || this.state.isLoadingAct) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <h2> Welcome back, {full_name}</h2>
        <Container className="Homepage">
          <Row className="Header-wrapper">
            <Col className="Homepage-header">
              <h1>2019 School Calendar</h1>
              <p>Choose your favourite clubs and activities.</p>
            </Col>
          </Row>

          <Row className="Clubs-wrapper">
            <h3 className="Clubs-header">Clubs</h3>
            <Col>
              <Carousel
                indicators={false}
                prevIcon={
                  <h2
                    aria-hidden="true"
                    style={{
                      color: "black",
                      fontWeight: "bolder",
                      display: "inline"
                    }}
                  >
                    &lt;
                  </h2>
                }
                nextIcon={
                  <h2
                    aria-hidden="true"
                    style={{
                      color: "black",
                      fontWeight: "bolder",
                      display: "inline"
                    }}
                  >
                    &gt;
                  </h2>
                }
              >
                {clubsMatrix.map((clubArr, index) => (
                  <CarouselItem key={`C${index}`}>
                    <Row>
                      {clubArr.map((club, index) => (
                        <Col key={`club${club.id}`}>
                          <Card>
                            <Card.Img variant="top" src={club.image} />
                            <Card.Body>
                              <Card.Title>{club.name}</Card.Title>
                              <Card.Text>{club.description}</Card.Text>
                              <hr></hr>
                              <Card.Text>{`Points to qualify: ${club.points}`}</Card.Text>
                              {isStudent=="true" ? (
                              <Button
                                variant={club.fav ? "danger" : "secondary"}
                                onClick={() =>
                                  this.handleClick(
                                    club.id,
                                    this.state.student_id,
                                    "clubs",
                                    index
                                  )
                                }
                                key={club.name}>
                                {club.fav ? fullHeart : hollowHeart}
                              </Button>) 
                              : null}
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </CarouselItem>
                ))}
              </Carousel>
            </Col>
          </Row>

          <Row className="Activities-wrapper">
            <h3 className="Activities-header">Activities</h3>
            <Col>
              <Carousel indicators={false}
                prevIcon={<h2 aria-hidden="true" style={{ color: 'black', fontWeight: "bolder", display: 'inline' }}>&lt;</h2>}
                nextIcon={<h2 aria-hidden="true" style={{ color: 'black', fontWeight: "bolder", display: 'inline' }}>&gt;</h2>}>
                {activitiesMatrix.map((actArr, index) =>
                  <CarouselItem key={`A${index}`}>
                    <Row>
                      {actArr.map((activity, index) =>
                        <Col key={`act${activity.id}`}>
                          <Card>
                            <Card.Img variant="top" src={activity.image} />
                            <Card.Body>
                              <Card.Title>{activity.name}</Card.Title>
                              <Card.Text>{activity.description}</Card.Text>
                              <hr></hr>
                              <Card.Text>{`Points to qualify: ${activity.points}`}</Card.Text>
                              {isStudent=="true" ? (
                              <Button variant={activity.fav ? "danger" : "secondary"}
                                onClick={() => this.handleClick(activity.id, this.state.student_id, "activities", index)}
                                key={activity.name}>{activity.fav ? fullHeart : hollowHeart}</Button>)
                                : null}
                            </Card.Body>
                          </Card>
                        </Col>
                      )}
                    </Row>
                  </CarouselItem>
                )}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default HomePage;
