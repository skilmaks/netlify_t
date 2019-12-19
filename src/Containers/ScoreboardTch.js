import React from "react";
import "../styles/scoreboard.css";
import { Button } from "react-bootstrap";

class Scoreboard extends React.Component {
  render() {
    return (
      <>
        <div className="scoreboard">
          <div className="title">Year 9 Class</div>
          <div className="header d-flex justify-content-between">
            <div className="">Name</div>
            <div className="d-flex">
              <div className="mx-5">Score</div>
              <div className="mx-5">Dropout %</div>
            </div>
          </div>
          <div className="students">
            {this.props.ranking.map((rank, index) => (
              <div
                className="student py-2 d-flex justify-content-between"
                key={index}
              >
                <div className="student-name mx-2">{rank.name}</div>
                <div className="student-score">
                  {/* <Button className="btn-sm">Give Points</Button> */}
                  <div className="mx-5">{rank.score}</div>

                  {rank.anotherScore > 50 ? (
                    <div className="mx-5 text-danger">{rank.anotherScore}</div>
                  ) : (
                    <div className="mx-5">{rank.anotherScore}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default Scoreboard;
