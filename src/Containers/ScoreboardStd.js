import React from "react";
import "../styles/scoreboard.css";
import { Button } from "react-bootstrap";

class ScoreboardStd extends React.Component {
  render() {
    return (
      <>
        <div className="scoreboard">
          <div className="title">Leaderboard</div>
          <div className="header d-flex justify-content-between">
            <div className="">Name</div>
            <div className="d-flex">
              <div className="mx-5">Score</div>
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
                  <Button className="btn-sm">Give Points</Button>
                  <div className="mx-5">{rank.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default ScoreboardStd;
